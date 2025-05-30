import React from "react";
import { type IssueType } from "./TimelineItemShape";
import styles from "./Timeline.module.scss";

interface TimelineItemProps {
  item: IssueType;
  durationInDays: number;
  dayWidth: number;
  cellHeight: number;
  column: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  durationInDays,
  dayWidth,
  cellHeight,
  column,
}) => {
  return (
    <div
      className={styles["timeline-item"]}
      style={{
        height: cellHeight,
        width: `${durationInDays * dayWidth - 1}px`,
        position: "absolute",
        top: `${column * cellHeight}px`,
      }}
    >
      <div className={styles["timeline-item-name"]}>
        {item.name}
      </div>
    </div>
  );
}; 