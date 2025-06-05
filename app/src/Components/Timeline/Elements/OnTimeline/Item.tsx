import React from "react";
import styles from "./Item.module.scss";
import CircularProgress from "../../../CircularProgress/CircularProgress";
import { Status, type IssueShape, type PriorityType, IssueShapeKeys } from "../../Utils/Shapes";
import { TimelineConst } from "../_constants";
import HoverBox from "../../../Boxes/HoverBox";
import {
  getTeamEmoji,
  getTeamDisplayName,
  getTeamColorName,
} from "../../Utils/TeamColors";
import TransBgBox from "../../../Boxes/TransBgBox";
import Icon from "../../../Icon/Icon";

interface TimelineItemProps {
  item: IssueShape;
  durationInDays: number;
  dayWidth: number;
  cellHeight: number;
  column: number;
}

function getPriorityIcon(priority: PriorityType) {
  switch (priority) {
    case "High":
      return {
        icon: "keyboard_double_arrow_up",
        color: "var(--color-semantic-warning)",
      };
    case "Medium":
      return {
        icon: "keyboard_capslock",
        color: "var(--color-semantic-active)",
      };
    case "Low":
      return {
        icon: "keyboard_double_arrow_down",
        color: "var(--color-neg)",
      };
  }
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
  const verticalCap = 4;

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
            style={{ padding: iconPadding, gap: verticalCap }}
          >
            <CircularProgress 
              progress={item[IssueShapeKeys.PROGRESS]} 
              size={iconSize} 
              style={{
                stroke: item[IssueShapeKeys.STATUS] === Status["High Risks"] 
                  ? "var(--color-semantic-error)" 
                  : item[IssueShapeKeys.STATUS] === Status["Manageable Risk"]
                  ? "var(--color-semantic-warning)"
                  : item[IssueShapeKeys.STATUS] === Status["On Track"]
                  ? "var(--color-semantic-active)"
                  : undefined
              }}
            />
            <Icon name={getPriorityIcon(item[IssueShapeKeys.PRIORITY]).icon} size={iconSize} style={{ color: getPriorityIcon(item[IssueShapeKeys.PRIORITY]).color }} />
          </div>
          <div className={styles["timeline-item-property-body"]} style={{ gap: verticalCap }}>
            <div
              className={styles["timeline-item-name"]}
              style={{
                fontSize: fontSize,
                lineHeight: `${lineHeight}px`,
              }}
            >
              {item[IssueShapeKeys.NAME]}
            </div>
            <div className={styles["timeline-item-tags"]}>
              <div className={styles["timeline-item-team"]}>
                <span className={styles["timeline-item-team-emoji"]}>
                  {getTeamEmoji(item[IssueShapeKeys.TEAM])}
                </span>
                <span className={styles["timeline-item-team-name"]}>
                  {getTeamDisplayName(item[IssueShapeKeys.TEAM])}
                </span>
                <TransBgBox color={getTeamColorName(item[IssueShapeKeys.TEAM])} />
              </div>
            </div>
          </div>
        </div>
        <HoverBox className={styles["hover-box"]} />
      </div>
    </div>
  );
};
