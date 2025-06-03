import React from "react";
import { calculateMaxOverlapCardinality, type PlacementResult } from "./Utils";
import { type IssueShape } from "./Shapes";
import styles from "./Timeline.module.scss";

interface GroupData {
  groupTitle: string;
  groupItems: IssueShape[];
  placements: PlacementResult[];
}

interface GroupLabelsProps {
  groupPlacements: GroupData[];
  cellHeight: number;
  groupGapForTesting: number;
}

export const GroupLabels: React.FC<GroupLabelsProps> = ({
  groupPlacements,
  cellHeight,
  groupGapForTesting,
}) => {
  return (
    <div className={styles["timeline-group-labels"]}>
      <div className={styles["timeline-group-labels-header"]}>
        <div className={styles["timeline-group-labels-year-placeholder"]}></div>
        <div className={styles["timeline-group-labels-month-placeholder"]}></div>
        <div className={styles["timeline-group-labels-day-placeholder"]}></div>
      </div>
      <div className={styles["timeline-group-labels-content"]}>
        {groupPlacements.map((groupData, groupIndex) => {
          const groupHeight = 
            calculateMaxOverlapCardinality(groupData.groupItems) * cellHeight + 
            groupGapForTesting;
          
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