import React from "react";
import {
  getDaysInMonth,
  type PlacementResult,
} from "../../../../data-layer/utils/Utils";
import { type IssueShape } from "../../../../data-layer/types/timeline";
import { TimelineGroup } from "../OnTimeline/Group";
import { Column } from "../Shared/Column";
// import styles from "../../Timeline.module.scss";
import styles from "./TimelineItems.module.scss"
import { HoverBox } from "../../../ui";

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
  onIssueClick?: (issue: IssueShape) => void;
}



export const TimelineItems: React.FC<TimelineItemsProps> = ({
  yearList,
  startMonth,
  dayWidth,
  zoomThreshold,
  cellHeight,
  groupGap,
  groupPlacements,
  onIssueClick,
}) => {
  return (
    <Column className={styles["timeline-vertical-column-container"]}>
      {yearList.map((year, yearIndex) => (
        <React.Fragment key={yearIndex}>
          {/* 占位空间，与年份标签对齐 - 透明占位 */}
          <Column className={styles["timeline-ruler-column"]}>
            {Array.from(
              { length: yearIndex === 0 ? 12 - startMonth : 12 },
              (_, i) => (yearIndex === 0 ? i + startMonth : i)
            ).map((monthIndex) => (
              <div
                key={monthIndex}
                className={styles["timeline-ruler-month-column"]}
              >
                <HoverBox className={styles["hover-box"]} />
                <Column className={`${styles["timeline-ruler-column"]}`}>
                  {Array.from(
                    { length: getDaysInMonth(year, monthIndex) },
                    (_, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`${styles["timeline-ruler-day-column"]} ${
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
                              onIssueClick={onIssueClick}
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