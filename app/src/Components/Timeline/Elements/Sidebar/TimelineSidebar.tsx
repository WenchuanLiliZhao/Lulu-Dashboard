import React from "react";
import styles from "./TimelineSidebar.module.scss";
import { TimelineConst, TimelineConstCalc } from "../_constants";
import { type PlacementResult } from "../../Utils/Utils";
import { type IssueShape } from "../../Utils/Shapes";

interface GroupPlacement {
  groupTitle: string;
  groupItems: IssueShape[];
  placements: PlacementResult[];
}

interface TimelineSidebarProps {
  groupPlacements: GroupPlacement[];
  cellHeight: number;
  groupGap: number;
  isRulerMode?: boolean;
}

const SIDEBAR_WIDTH = 200;

export const TimelineSidebar: React.FC<TimelineSidebarProps> = ({
  groupPlacements,
  cellHeight,
  groupGap,
  isRulerMode = false
}) => {

  // 计算每个组的高度和位置
  const getGroupHeight = (placements: PlacementResult[]) => {
    if (placements.length === 0) return cellHeight;
    const maxColumn = Math.max(...placements.map(p => p.column));
    return (maxColumn + 1) * cellHeight;
  };

  // 如果是 ruler 模式，只返回占位区域
  if (isRulerMode) {
    return (
      <div
        className={styles["timeline-sidebar"]}
        style={{ width: SIDEBAR_WIDTH }}
      >
        <div 
          className={styles["timeline-sidebar-ruler-space"]}
          style={{ height: TimelineConst.yearLabelHight + TimelineConst.monthLabelHight + TimelineConst.dayLabelHight }}
        ></div>
      </div>
    );
  }

  return (
    <div
      className={styles["timeline-sidebar"]}
      style={{ width: SIDEBAR_WIDTH }}
    >
      <div className={styles["timeline-sidebar-content"]}>
        {/* 与时间线尺子对齐的占位区域 */}
        
        {/* 组标题列表 */}
        <div className={styles["timeline-sidebar-groups"]}>
          {groupPlacements.map((group, index) => {
            const groupHeight = getGroupHeight(group.placements);
            const marginBottom = index < groupPlacements.length - 1 ? groupGap : 0;
            
            return (
              <div
                key={group.groupTitle}
                className={styles["timeline-sidebar-group"]}
                style={{
                  height: groupHeight,
                  minHeight: TimelineConstCalc.groupMinHeight,
                  marginBottom: marginBottom,
                }}
              >
                <div className={styles["timeline-sidebar-group-title"]} style={{
                  position: "sticky",
                  top: TimelineConstCalc.rulerHeight,
                  bottom: 0
                }}>
                  {group.groupTitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 