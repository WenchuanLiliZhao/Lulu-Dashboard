import React, { useState, useRef, useCallback } from "react";
import { TimelineItemInterval } from "./Utils/functions";
import {
  sortTimelineItemsByStartDate,
  type SortedIssueShape,
  IssueShapeKeys,
  GroupableFields,
  type GroupableFieldValue,
  mapStringToGroupableField,
} from "./Utils/Shapes";
import {
  findPlacement,
  type PlacementResult,
} from "./Utils/Utils";
import { type SwitchOption } from "../Switch/Switch";
import { TimelineNav } from "./Elements/OnNav/_Nav";
import { type GroupOption } from "./Elements/OnNav/GroupBySelector";
import { TimelineRuler } from "./Elements/OnLayout/TimelineRuler";
import { TimelineItems } from "./Elements/OnLayout/TimelineItems";
import { TimelineSidebar } from "./Elements/Sidebar/TimelineSidebar";
import { useLeftBasedZoom } from "./Utils/useLeftBasedZoom";
import styles from "./Timeline.module.scss";
import { TimelineConst } from "./Elements/_constants";

interface TimelineProps {
  inputData: SortedIssueShape;
  onGroupByChange?: (groupBy: GroupableFieldValue) => void;
}

// 时间视图配置
const TIME_VIEW_CONFIG = {
  year: { dayWidth: 4.5, label: "Year", zoomThreshold: 9 },
  month: { dayWidth: 8, label: "Month", zoomThreshold: 8 },
  day: { dayWidth: 24, label: "Day", zoomThreshold: 9 },
} as const;

type TimeViewType = keyof typeof TIME_VIEW_CONFIG;

// 时间视图选项配置
const timeViewOptions = {
  year: TIME_VIEW_CONFIG.year.label,
  month: TIME_VIEW_CONFIG.month.label,
  day: TIME_VIEW_CONFIG.day.label,
} as const;

export const Timeline: React.FC<TimelineProps> = ({ inputData, onGroupByChange }) => {
  // Time view switch options - 转换为Switch组件需要的格式
  const switchOptions: SwitchOption[] = Object.entries(timeViewOptions).map(
    ([value, label]) => ({ value, label })
  );

  // Group by options - 分组选项配置
  const groupOptions: GroupOption[] = [
    { value: GroupableFields.CATEGORY, label: "Category" },
    { value: GroupableFields.STATUS, label: "Status" },
    { value: GroupableFields.TEAM, label: "Team" },
    { value: GroupableFields.PRIORITY, label: "Priority" },
  ];

  // State for current group by method
  const [currentGroupBy, setCurrentGroupBy] = useState<GroupableFieldValue>(
    mapStringToGroupableField(inputData.meta.sortBy)
  );

  // Handler for group by changes
  const handleGroupByChange = (value: string) => {
    const groupByValue = value as GroupableFieldValue;
    setCurrentGroupBy(groupByValue);
    onGroupByChange?.(groupByValue);
  };

  // Constants for layout calculations
  const cellHeight = TimelineConst.cellHeight; // Height of each item row in pixels
  const groupGapForTesting = TimelineConst.groupGap;

  // State for time view mode and corresponding dayWidth
  const [currentTimeView, setCurrentTimeView] = useState<TimeViewType>("month");
  const dayWidth = TIME_VIEW_CONFIG[currentTimeView].dayWidth;
  const zoomThreshold = TIME_VIEW_CONFIG[currentTimeView].zoomThreshold;

  // 添加尺子滚动容器的引用
  const rulerScrollRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);
  
  // 使用自定义hook实现左侧缩放功能，针对主内容容器
  const { containerRef: zoomContainerRef } = useLeftBasedZoom(dayWidth);
  
  // 同步滚动函数
  const syncScroll = useCallback((sourceRef: React.RefObject<HTMLDivElement | null>, targetRef: React.RefObject<HTMLDivElement | null>) => {
    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollLeft = sourceRef.current.scrollLeft;
    }
  }, []);

  // 处理尺子滚动
  const handleRulerScroll = useCallback(() => {
    syncScroll(rulerScrollRef, mainScrollRef);
  }, [syncScroll]);

  // 处理主内容滚动
  const handleMainScroll = useCallback(() => {
    syncScroll(mainScrollRef, rulerScrollRef);
  }, [syncScroll]);

  // Flatten all items from all groups for timeline calculations
  const allItems = inputData.data.flatMap((group) => group.groupItems);

  // Sort items by start date to ensure consistent placement
  const sortedItems = sortTimelineItemsByStartDate(allItems);
  // Get list of years and start month that need to be displayed
  const { years: yearList, startMonth } = TimelineItemInterval({
    inputData: sortedItems,
  });

  // Early return if no items to display
  if (allItems.length === 0) {
    return (
      <div className={styles["timeline-ruler-container"]}>
        <div>No timeline items to display</div>
      </div>
    );
  }

  // Handler for time view changes
  const handleTimeViewChange = (value: string) => {
    setCurrentTimeView(value as TimeViewType);
  };

  // Pre-calculate placements for each group separately
  const groupPlacements = inputData.data.map((group) => {
    const sortedGroupItems = sortTimelineItemsByStartDate(group.groupItems);
    const placements: PlacementResult[] = [];

    sortedGroupItems.forEach((item) => {
      const startDate = new Date(item[IssueShapeKeys.START_DATE]);
      const endDate = new Date(item[IssueShapeKeys.END_DATE]);

      const column = findPlacement(placements, item, startDate, endDate);

      placements.push({
        column,
        item,
        startDate,
        endDate,
      });
    });

    return {
      groupTitle: group.groupTitle,
      groupItems: group.groupItems,
      placements,
    };
  });

  return (
    <div className={styles["timeline-container"]}>
      {/* 时间视图切换器和回到今天按钮 */}
      <TimelineNav
        switchOptions={switchOptions}
        currentTimeView={currentTimeView}
        onTimeViewChange={handleTimeViewChange}
        dayWidth={dayWidth}
        containerRef={mainScrollRef}
        yearList={yearList}
        startMonth={startMonth}
        groupOptions={groupOptions}
        currentGroupBy={currentGroupBy}
        onGroupByChange={handleGroupByChange}
      />

      {/* 外层包装器 - 处理垂直滚动 */}
      <div className={styles["timeline-content-wrapper"]}>
        {/* 时间线尺子组件 - sticky 定位在垂直滚动容器中 */}
        <div className={styles["timeline-ruler-sticky"]}>
          <div className={styles["timeline-ruler-inner"]}>
            {/* 左侧边栏的尺子占位区域 */}
            <div className={styles["timeline-sidebar-ruler-placeholder"]}>
              <TimelineSidebar
                groupPlacements={groupPlacements}
                cellHeight={cellHeight}
                groupGap={groupGapForTesting}
                isRulerMode={true}
              />
            </div>
            
            {/* 右侧时间线尺子 - 可水平滚动 */}
            <div 
              ref={rulerScrollRef}
              className={styles["timeline-ruler-content"]}
              onScroll={handleRulerScroll}
            >
              <TimelineRuler
                yearList={yearList}
                startMonth={startMonth}
                dayWidth={dayWidth}
                zoomThreshold={zoomThreshold}
              />
            </div>
          </div>
        </div>

        {/* 内层容器 - 处理水平布局 */}
        <div className={styles["timeline-content-inner"]}>
          {/* 左侧可调整大小的侧边栏 - 固定在左侧但参与垂直滚动 */}
          <TimelineSidebar
            groupPlacements={groupPlacements}
            cellHeight={cellHeight}
            groupGap={groupGapForTesting}
          />

          {/* 时间线内容 - 只处理水平滚动 */}
          <div 
            ref={(el) => {
              mainScrollRef.current = el;
              zoomContainerRef.current = el;
            }}
            className={styles["timeline-content-container"]}
            onScroll={handleMainScroll}
          >
            {/* 时间线项目组件 */}
            <div className={styles["timeline-items-container"]}>
              <TimelineItems
                yearList={yearList}
                startMonth={startMonth}
                dayWidth={dayWidth}
                zoomThreshold={zoomThreshold}
                cellHeight={cellHeight}
                groupGap={groupGapForTesting}
                groupPlacements={groupPlacements}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
