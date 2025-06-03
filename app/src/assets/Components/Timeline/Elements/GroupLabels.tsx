import React from "react";
import { calculateMaxOverlapCardinality, type PlacementResult } from "../Utils/Utils";
import { type IssueShape } from "../Utils/Shapes";
import styles from "./GroupLabels.module.scss";
import { TimelineConst } from "./_constants";

interface GroupData {
  groupTitle: string;
  groupItems: IssueShape[];
  placements: PlacementResult[];
}

interface GroupLabelsProps {
  groupPlacements: GroupData[];
  cellHeight: number;
  groupGap: number;
}

export const GroupLabels: React.FC<GroupLabelsProps> = ({
  groupPlacements,
  cellHeight,
  groupGap
}) => {
  return (
    <div className={styles["timeline-group-labels"]}>
      <div className={styles["timeline-group-labels-header"]}>
        <div className={styles["timeline-group-labels-year-placeholder"]}></div>
        <div className={styles["timeline-group-labels-month-placeholder"]} style={{ height: `${TimelineConst.monthLabelHight}px` }}></div>
        <div className={styles["timeline-group-labels-day-placeholder"]} style={{ height: `${TimelineConst.dayLabelHight}px` }}></div>
      </div>
      <div className={styles["timeline-group-labels-content"]}>
        {groupPlacements.map((groupData, groupIndex) => {
          const groupHeight = 
            calculateMaxOverlapCardinality(groupData.groupItems) * cellHeight + 
            groupGap;
          return (
            <div
              key={groupIndex}
              className={styles["timeline-group-label"]}
              style={{ height: `${groupHeight}px` }}
            >
              <span className={styles["timeline-group-label-text"]}>
                {groupData.groupTitle}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 