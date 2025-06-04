import React from "react";

import { type IssueShape } from "../../Utils/Shapes";
import styles from "./GroupLabels.module.scss";
import { TimelineConst } from "../_constants";
import { ResizableSidebar } from "../OnLayout/ResizableSidebar";
import {
  type PlacementResult,
  calculateMaxOverlapCardinality,
} from "../../Utils/Utils";

interface GroupData {
  groupTitle: string;
  groupItems: IssueShape[];
  placements: PlacementResult[];
}

interface GroupLabelsProps {
  groupPlacements: GroupData[];
  cellHeight: number;
  sortedBy: string;
}

export const GroupLabels: React.FC<GroupLabelsProps> = ({
  groupPlacements,
  cellHeight,
  sortedBy,
}) => {
  return (
    <ResizableSidebar
      minWidth={150}
      maxWidth={400}
      defaultWidth={200}
      position="left"
      storageKey="timeline-group-labels-width"
    >
      <div className={styles["timeline-group-labels"]}>
        <div className={styles["timeline-group-labels-header"]}>
          <div
            className={styles["timeline-group-labels-year-placeholder"]}
            style={{ height: `${TimelineConst.yearLabelHight}px` }}
          ></div>
          <div
            className={styles["timeline-group-labels-month-placeholder"]}
            style={{ height: `${TimelineConst.monthLabelHight}px` }}
          >
            {sortedBy}
          </div>
          <div
            className={styles["timeline-group-labels-day-placeholder"]}
            style={{ height: `${TimelineConst.dayLabelHight}px` }}
          ></div>
        </div>
        <div className={styles["timeline-group-labels-content"]}>
          {groupPlacements.map((groupData, groupIndex) => {
            const groupHeight =
              calculateMaxOverlapCardinality(groupData.groupItems) *
                cellHeight +
              TimelineConst.groupGap;
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
    </ResizableSidebar>
  );
};
