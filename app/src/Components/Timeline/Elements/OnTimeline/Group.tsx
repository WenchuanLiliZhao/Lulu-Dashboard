import React from "react";
import { calculateDurationInDays, calculateMaxOverlapCardinality, type PlacementResult } from "../../Utils/Utils";
import { type IssueShape } from "../../Utils/Shapes";
import { TimelineItem } from "./Item";
import styles from "./Group.module.scss";

interface TimelineGroupProps {
  groupData: {
    groupTitle: string;
    groupItems: IssueShape[];
    placements: PlacementResult[];
  };
  year: number;
  monthIndex: number;
  dayIndex: number;
  dayWidth: number;
  cellHeight: number;
  groupGap: number;
}

export const TimelineGroup: React.FC<TimelineGroupProps> = ({
  groupData,
  year,
  monthIndex,
  dayIndex,
  dayWidth,
  cellHeight,
  groupGap,
}) => {
  return (
    <div
      className={styles["timeline-group"]}
      style={{
        height: `${
          calculateMaxOverlapCardinality(groupData.groupItems) *
          cellHeight + groupGap
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
            <TimelineItem
              key={placement.item.id}
              item={placement.item}
              durationInDays={durationInDays}
              dayWidth={dayWidth}
              cellHeight={cellHeight}
              column={placement.column}
            />
          );
        }
        return null;
      })}
    </div>
  );
}; 