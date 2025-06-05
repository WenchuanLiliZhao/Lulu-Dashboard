import React, { useState, useRef, useCallback } from "react";
import styles from "./TimelineSidebar.module.scss";
import { TimelineConst } from "../_constants";
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
  onWidthChange?: (width: number) => void;
  initialWidth?: number;
}

const MIN_WIDTH = 150;
const MAX_WIDTH = 400;
const DEFAULT_WIDTH = 200;

export const TimelineSidebar: React.FC<TimelineSidebarProps> = ({
  groupPlacements,
  cellHeight,
  groupGap,
  onWidthChange,
  initialWidth = DEFAULT_WIDTH
}) => {
  const [sidebarWidth, setSidebarWidth] = useState(initialWidth);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 处理拖拽调整宽度
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sidebarRef.current) return;

      const rect = sidebarRef.current.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      
      const clampedWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
      setSidebarWidth(clampedWidth);
      onWidthChange?.(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onWidthChange]);

  // 计算每个组的高度和位置
  const getGroupHeight = (placements: PlacementResult[]) => {
    if (placements.length === 0) return cellHeight;
    const maxColumn = Math.max(...placements.map(p => p.column));
    return (maxColumn + 1) * cellHeight;
  };

  return (
    <div
      ref={sidebarRef}
      className={styles["timeline-sidebar"]}
      style={{ width: sidebarWidth }}
    >
      <div className={styles["timeline-sidebar-content"]}>
        {/* 与时间线尺子对齐的占位区域 */}
        <div 
          className={styles["timeline-sidebar-ruler-space"]}
          style={{ height: TimelineConst.yearLabelHight + TimelineConst.monthLabelHight + TimelineConst.dayLabelHight }}
        />
        
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
                  marginBottom: marginBottom
                }}
              >
                <div className={styles["timeline-sidebar-group-title"]}>
                  {group.groupTitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 调整大小的拖拽手柄 */}
      <div
        className={`${styles["timeline-sidebar-resizer"]} ${
          isDragging ? styles["dragging"] : ""
        }`}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}; 