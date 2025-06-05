import React from "react";
import {
  getDaysInMonth,
  type PlacementResult,
} from "../../Utils/Utils";
import { type IssueShape } from "../../Utils/Shapes";
import { TimelineGroup } from "../OnTimeline/Group";
import styles from "../../Timeline.module.scss";

interface TimelineItemsProps {
  yearList: number[];
  startMonth: number;
  dayWidth: number;
  zoomThreshold: number;
  cellHeight: number;
  groupGap: number;
  groupPlacements: Array<{
    groupTitle: string;
    groupItems: IssueShape[];
    placements: PlacementResult[];
  }>;
}

// 可复用的列组件
const Column = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`${styles["timeline-ruler-column"]} ${className || ""}`}>
      {children}
    </div>
  );
};

export const TimelineItems: React.FC<TimelineItemsProps> = ({
  yearList,
  startMonth,
  dayWidth,
  zoomThreshold,
  cellHeight,
  groupGap,
  groupPlacements,
}) => {
  return (
    <Column>
      {yearList.map((year, yearIndex) => (
        <React.Fragment key={yearIndex}>
          {/* 占位空间，与年份标签对齐 - 透明占位 */}
          <Column>
            {Array.from(
              { length: yearIndex === 0 ? 12 - startMonth : 12 },
              (_, i) => (yearIndex === 0 ? i + startMonth : i)
            ).map((monthIndex) => (
              <div
                key={monthIndex}
                className={styles["timeline-ruler-month"]}
              >
                <Column className={styles["timeline-ruler-month-grid"]}>
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

                        {/* 时间线项目内容 */}
                        <div className={styles["timeline-groups"]}>
                          {groupPlacements.map((groupData, groupIndex) => (
                            <TimelineGroup
                              key={groupIndex}
                              groupData={groupData}
                              year={year}
                              monthIndex={monthIndex}
                              dayIndex={dayIndex}
                              dayWidth={dayWidth}
                              cellHeight={cellHeight}
                              groupGap={groupGap}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </Column>
              </div>
            ))}
          </Column>
        </React.Fragment>
      ))}
    </Column>
  );
}; 