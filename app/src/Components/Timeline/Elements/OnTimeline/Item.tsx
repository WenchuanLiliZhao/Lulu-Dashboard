import React from "react";
import styles from "./Item.module.scss";
import CircularProgress from "../../../CircularProgress/CircularProgress";
import type { IssueShape } from "../../Utils/Shapes";
import { TimelineConst } from "../_constants";
import HoverBox from "../../../Boxes/HoverBox";
import {
  getTeamEmoji,
  getTeamDisplayName,
  getTeamColorName,
} from "../../Utils/TeamColors";
import TransBgBox from "../../../Boxes/TransBgBox";

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
  const fontSize = 12;
  const lineHeight = 18;
  const iconSize = 16;
  const iconPadding = (lineHeight - iconSize) / 2;

  return (
    <div className={styles["timeline-item"]}>
      <div
        className={styles["timeline-item-container"]}
        style={{
          height: cellHeight - TimelineConst.itemVPadding * 2,
          width: durationInDays * dayWidth - TimelineConst.itemHPadding * 2 - 1,
          position: "absolute",
          top: `${
            column * cellHeight +
            TimelineConst.groupGap / 2 +
            TimelineConst.itemVPadding
          }px`,
          left: `${TimelineConst.itemHPadding}px`,
        }}
      >
        <div className={styles["timeline-property-content"]}>
          <div
            className={styles["timeline-item-progress-svg-container"]}
            style={{ padding: iconPadding }}
          >
            <CircularProgress 
              progress={item.progress} 
              size={iconSize} 
              style={{
                stroke: item.status === "Highly risky" 
                  ? "var(--color-semantic-error)" 
                  : item.status === "Risk in control"
                  ? "var(--color-semantic-warning)"
                  : undefined
              }} 
            />
          </div>
          <div className={styles["timeline-item-property-body"]}>
            <div
              className={styles["timeline-item-name"]}
              style={{
                fontSize: fontSize,
                lineHeight: `${lineHeight}px`,
              }}
            >
              {item.name}
            </div>
            <div className={styles["timeline-item-tags"]}>
              <div className={styles["timeline-item-team"]}>
                <span className={styles["timeline-item-team-emoji"]}>
                  {getTeamEmoji(item.team)}
                </span>
                <span className={styles["timeline-item-team-name"]}>
                  {getTeamDisplayName(item.team)}
                </span>
                <TransBgBox color={getTeamColorName(item.team)} />
              </div>
            </div>
          </div>
        </div>
        <HoverBox className={styles["hover-box"]} />
      </div>
    </div>
  );
};
