import React from "react";
import { type IssueShape } from "../Utils/Shapes";
import styles from "./Item.module.scss";
import CircularProgress from "../../CircularProgress/CircularProgress";
import { TimelineConst } from "./_constants";

interface TimelineItemProps {
  item: IssueShape;
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
        top: `${column * cellHeight + (TimelineConst.groupGap / 2)}px`,
      }}
    >
      <div className={styles["timeline-item-name"]}>
        <CircularProgress
          progress={item.progress}
        />
        {item.name}
      </div>
    </div>
  );
}; 