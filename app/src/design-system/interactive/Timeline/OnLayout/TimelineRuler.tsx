import React from "react";
import {
  monthNames,
  getDaysInMonth,
} from "../../../../data-layer/utils/Utils";
import { TimelineConst } from "../_constants";
import { Column } from "../Shared/Column";
import styles from "./TimelineRuler.module.scss";

interface TimelineRulerProps {
  yearList: number[];
  startMonth: number;
  dayWidth: number;
  zoomThreshold: number;
  style?: React.CSSProperties;
}

// 判断指定日期是否为今天的函数
const isToday = (
  year: number,
  monthIndex: number,
  dayIndex: number
): boolean => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-based (0 = January)
  const currentDay = today.getDate(); // 1-based (1-31)

  return (
    year === currentYear &&
    monthIndex === currentMonth &&
    dayIndex + 1 === currentDay
  );
};



export const TimelineRuler: React.FC<TimelineRulerProps> = ({
  yearList,
  startMonth,
  dayWidth,
  zoomThreshold,
  style
}) => {
  return (
    <Column className={styles["timeline-ruler-column"]} style={style}>
      {yearList.map((year, yearIndex) => (
        <div key={year} className={styles["timeline-ruler-year"]}>
          {/* 年份标签 - 只在每年的第一个月显示 */}
          <div
            className={styles["timeline-ruler-year-label"]}
            style={{ height: `${TimelineConst.yearLabelHight}px` }}
          >
            {year}
          </div>
          <Column className={styles["timeline-ruler-column"]}>
            {Array.from(
              { length: yearIndex === 0 ? 12 - startMonth : 12 },
              (_, i) => (yearIndex === 0 ? i + startMonth : i)
            ).map((monthIndex) => (
              <div
                key={monthIndex}
                className={styles["timeline-ruler-month"]}
              >
                <div
                  className={styles["timeline-ruler-month-label"]}
                  style={{ height: `${TimelineConst.monthLabelHight}px` }}
                >
                  {monthNames[monthIndex]}<span className={styles["year-for-month"]}>{year}</span>
                </div>
                <Column className={`${styles["timeline-ruler-column"]} ${styles["timeline-ruler-month-grid"]}`}>
                  {Array.from(
                    { length: getDaysInMonth(year, monthIndex) },
                    (_, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`${styles["timeline-ruler-day"]} ${
                          dayWidth > zoomThreshold ? styles["zoomed"] : ""
                        }`}
                        style={{ width: `${dayWidth}px` }}
                      >
                        <div
                          className={`${
                            styles["timeline-ruler-day-label"]
                          } ${
                            isToday(year, monthIndex, dayIndex)
                              ? styles["today"]
                              : ""
                          }`}
                          style={{
                            height: `${TimelineConst.dayLabelHight}px`,
                          }}
                        >
                          <div
                            className={`${
                              styles["timeline-ruler-day-label-text"]
                            } ${
                              dayWidth > zoomThreshold
                                ? styles["zoomed"]
                                : ""
                            }`}
                          >
                            {dayIndex + 1}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </Column>
              </div>
            ))}
          </Column>
        </div>
      ))}
    </Column>
  );
}; 