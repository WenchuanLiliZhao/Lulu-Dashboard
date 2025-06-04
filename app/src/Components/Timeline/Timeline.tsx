import React, { useState } from "react";
import { TimelineItemInterval } from "./Utils/functions";
import {
  sortTimelineItemsByStartDate,
  type SortedIssueShape,
} from "./Utils/Shapes";
import {
  monthNames,
  getDaysInMonth,
  findPlacement,
  type PlacementResult,
} from "./Utils/Utils";
import { type SwitchOption } from "../Switch/Switch";
import { TimelineNav } from "./Elements/OnNav/_Nav";
import { useLeftBasedZoom } from "./Utils/useLeftBasedZoom";
import styles from "./Timeline.module.scss";
import { TimelineConst } from "./Elements/_constants";
import { TimelineGroup } from "./Elements/OnTimeline/Group";
import { GroupLabels } from "./Elements/OnTimeline/GroupLabels";

interface TimelineProps {
  inputData: SortedIssueShape;
}

// 时间视图配置
const TIME_VIEW_CONFIG = {
  year: { dayWidth: 4.5, label: "Year", zoomThreshold: 9 },
  month: { dayWidth: 8, label: "6 Months", zoomThreshold: 8 },
  day: { dayWidth: 24, label: "Day", zoomThreshold: 9 },
} as const;

type TimeViewType = keyof typeof TIME_VIEW_CONFIG;

// 时间视图选项配置
const timeViewOptions = {
  year: TIME_VIEW_CONFIG.year.label,
  month: TIME_VIEW_CONFIG.month.label,
  day: TIME_VIEW_CONFIG.day.label,
} as const;

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

export const Timeline: React.FC<TimelineProps> = ({ inputData }) => {
  // Time view switch options - 转换为Switch组件需要的格式
  const switchOptions: SwitchOption[] = Object.entries(timeViewOptions).map(
    ([value, label]) => ({ value, label })
  );

  // Constants for layout calculations
  const cellHeight = TimelineConst.cellHeight; // Height of each item row in pixels
  const groupGapForTesting = TimelineConst.groupGap;

  // State for time view mode and corresponding dayWidth
  const [currentTimeView, setCurrentTimeView] = useState<TimeViewType>("month");
  const dayWidth = TIME_VIEW_CONFIG[currentTimeView].dayWidth;
  const zoomThreshold = TIME_VIEW_CONFIG[currentTimeView].zoomThreshold;

  // 使用自定义hook实现左侧缩放功能
  const { containerRef } = useLeftBasedZoom(dayWidth);

  // Flatten all items from all groups for timeline calculations
  const allItems = inputData.data.flatMap((group) => group.groupItems);

  // Sort items by start date to ensure consistent placement
  const sortedItems = sortTimelineItemsByStartDate(allItems);
  // Get list of years and start month that need to be displayed
  const { years: yearList, startMonth } = TimelineItemInterval({
    inputData: sortedItems,
  });

  // Early return if no items to display
  if (allItems.length === 0) {
    return (
      <div className={styles["timeline-ruler-container"]}>
        <div>No timeline items to display</div>
      </div>
    );
  }

  // Handler for time view changes
  const handleTimeViewChange = (value: string) => {
    setCurrentTimeView(value as TimeViewType);
  };

  // Reusable column component for consistent styling
  const Column = ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <div className={`${styles["timeline-ruler-column"]} ${className}`}>
        {children}
      </div>
    );
  };

  // Pre-calculate placements for each group separately
  const groupPlacements = inputData.data.map((group) => {
    const sortedGroupItems = sortTimelineItemsByStartDate(group.groupItems);
    const placements: PlacementResult[] = [];

    sortedGroupItems.forEach((item) => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);

      const column = findPlacement(placements, item, startDate, endDate);

      placements.push({
        column,
        item,
        startDate,
        endDate,
      });
    });

    return {
      groupTitle: group.groupTitle,
      groupItems: group.groupItems,
      placements,
    };
  });

  return (
    <div className={styles["timeline-container"]}>
      {/* 时间视图切换器和回到今天按钮 */}
      <TimelineNav
        switchOptions={switchOptions}
        currentTimeView={currentTimeView}
        onTimeViewChange={handleTimeViewChange}
        dayWidth={dayWidth}
        containerRef={containerRef}
        yearList={yearList}
        startMonth={startMonth}
      />

      <div className={styles["timeline-content-wrapper"]}>
        {/* 分组标题列组件 */}
        <GroupLabels
          groupPlacements={groupPlacements}
          cellHeight={cellHeight}
          sortedBy={inputData.meta.sortBy}
        />

        {/* 时间线内容 */}
        <div ref={containerRef} className={styles["timeline-ruler-container"]}>
          <Column>
            {yearList.map((year, yearIndex) => (
              <div key={year} className={styles["timeline-ruler-year"]}>
                {/* 年份标签 - 只在每年的第一个月显示 */}
                <div
                  className={styles["timeline-ruler-year-label"]}
                  style={{ height: `${TimelineConst.yearLabelHight}px` }}
                >
                  {year}
                </div>
                <Column>
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
                        {monthNames[monthIndex]}
                      </div>
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

                              <div className={styles["timeline-groups"]}>
                                {groupPlacements.map(
                                  (groupData, groupIndex) => (
                                    <TimelineGroup
                                      key={groupIndex}
                                      groupData={groupData}
                                      year={year}
                                      monthIndex={monthIndex}
                                      dayIndex={dayIndex}
                                      dayWidth={dayWidth}
                                      cellHeight={cellHeight}
                                      groupGap={groupGapForTesting}
                                    />
                                  )
                                )}
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
        </div>
      </div>
    </div>
  );
};
