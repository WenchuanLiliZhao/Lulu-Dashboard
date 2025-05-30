import React from "react";
import { calculateDurationInDays, calculateMaxOverlapCardinality, type PlacementResult } from "./TimelineUtils";
import { type IssueType } from "./TimelineItemShape";
import styles from "./TimelineRuler.module.scss";

interface TimelineGroupProps {
  groupData: {
    groupTitle: string;
    groupItems: IssueType[];
    placements: PlacementResult[];
  };
  year: number;
  monthIndex: number;
  dayIndex: number;
  dayWidth: number;
  cellHeight: number;
  groupGapForTesting: number;
}

export const TimelineGroup: React.FC<TimelineGroupProps> = ({
  groupData,
  year,
  monthIndex,
  dayIndex,
  dayWidth,
  cellHeight,
  groupGapForTesting,
}) => {
  return (
    <div
      className={styles["timeline-group"]}
      style={{
        height: `${
          calculateMaxOverlapCardinality(groupData.groupItems) *
          cellHeight + groupGapForTesting
        }px`,
      }}
    >
      {groupData.placements.map((placement) => {
        const itemStartDate = placement.startDate;
        const itemStartYear = itemStartDate.getFullYear();
        const itemStartMonth = itemStartDate.getMonth();
        const itemStartDay = itemStartDate.getDate();

        // Only render item if it starts on this exact day
        if (
          itemStartYear === year &&
          itemStartMonth === monthIndex &&
          itemStartDay === dayIndex + 1
        ) {
          const durationInDays = calculateDurationInDays(
            itemStartDate,
            placement.endDate
          );

          return (
            <div
              key={placement.item.id}
              className={styles["timeline-item"]}
              style={{
                height: cellHeight,
                width: `${durationInDays * dayWidth - 1}px`,
                position: "absolute",
                top: `${placement.column * cellHeight}px`,
              }}
            >
              <div className={styles["timeline-item-name"]}>
                {placement.item.name}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}; 