import React, { useState } from "react";
import { TimelineItemInterval } from "./functions";
import {
  sortTimelineItemsByStartDate,
  type SortedIssueShape,
} from "./Shapes";
import {
  monthNames,
  getDaysInMonth,
  findPlacement,
  type PlacementResult,
} from "./Utils";
import { TimelineGroup } from "./Group";
import { GroupLabels } from "./GroupLabels";
import { DayWidthSlider } from "./DayWidthSlider";
import { useCenterBasedZoom } from "./useCenterBasedZoom";
import styles from "./Timeline.module.scss";

interface TimelineProps {
  inputData: SortedIssueShape;
}

export const Timeline: React.FC<TimelineProps> = ({ inputData }) => {
  // Constants for layout calculations
  const cellHeight = 48; // Height of each item row in pixels
  const groupGapForTesting = 8;
  const [yearZoom, monthZoom] = [4.5, 24];

  // State for zoom level with initial value
  const [dayWidth, setDayWidth] = useState(yearZoom);

  // 使用自定义hook实现居中缩放功能
  const { containerRef } = useCenterBasedZoom(dayWidth);

  // Flatten all items from all groups for timeline calculations
  const allItems = inputData.data.flatMap((group) => group.groupItems);

  // Early return if no items to display
  if (allItems.length === 0) {
    return (
      <div className={styles["timeline-ruler-container"]}>
        <div>No timeline items to display</div>
      </div>
    );
  }

  // Sort items by start date to ensure consistent placement
  const sortedItems = sortTimelineItemsByStartDate(allItems);
  // Get list of years and start month that need to be displayed
  const { years: yearList, startMonth } = TimelineItemInterval({
    inputData: sortedItems,
  });

  // Handler for day width changes
  const handleDayWidthChange = (newWidth: number) => {
    setDayWidth(newWidth);
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
      <DayWidthSlider
        dayWidth={dayWidth}
        onDayWidthChange={handleDayWidthChange}
        minWidth={1}
        maxWidth={60}
      />
      <div className={styles["timeline-content-wrapper"]}>
        {/* 分组标题列组件 */}
        <GroupLabels
          groupPlacements={groupPlacements}
          cellHeight={cellHeight}
          groupGapForTesting={groupGapForTesting}
        />

        {/* 时间线内容 */}
        <div ref={containerRef} className={styles["timeline-ruler-container"]}>
          <Column>
            {yearList.map((year, yearIndex) => (
              <div key={year} className={styles["timeline-ruler-year"]}>
                <Column>
                  {Array.from(
                    { length: yearIndex === 0 ? 12 - startMonth : 12 },
                    (_, i) => (yearIndex === 0 ? i + startMonth : i)
                  ).map((monthIndex) => (
                    <div
                      key={monthIndex}
                      className={styles["timeline-ruler-month"]}
                    >
                      <div className={styles["timeline-ruler-month-label"]}>
                        {monthNames[monthIndex]}
                      </div>
                      <Column className={styles["timeline-ruler-month-grid"]}>
                        {Array.from(
                          { length: getDaysInMonth(year, monthIndex) },
                          (_, dayIndex) => (
                            <div
                              key={dayIndex}
                              className={`${styles["timeline-ruler-day"]} ${
                                dayWidth > yearZoom ? styles["zoomed"] : ""
                              }`}
                              style={{ width: `${dayWidth}px` }}
                            >
                              <div
                                className={`${
                                  styles["timeline-ruler-day-label"]
                                } ${
                                  dayWidth >= monthZoom ? styles["zoomed"] : ""
                                }`}
                              >
                                {dayIndex + 1}
                              </div>

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
                                    groupGapForTesting={groupGapForTesting}
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
              </div>
            ))}
          </Column>
        </div>
      </div>
    </div>
  );
};
