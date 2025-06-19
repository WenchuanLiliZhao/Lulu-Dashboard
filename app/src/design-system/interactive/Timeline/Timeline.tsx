import React, { useState, useRef, useEffect, useCallback } from "react";
import { TimelineItemInterval } from "../../../data-layer/utils/functions";
import {
  sortTimelineItemsByStartDate,
  type SortedIssueShape,
  type IssueShape,
  IssueShapeKeys,
  GroupableFields,
  type GroupableFieldValue,
  mapStringToGroupableField,
} from "../../../data-layer";
import { findPlacement, type PlacementResult } from "../../../data-layer/utils/Utils";
import { type SwitchOption } from "../../ui/Switch/Switch";
import { TimelineNav } from "./OnNav/_Nav";
import { type GroupOption } from "./OnNav/GroupBySelector";
import { TimelineRuler } from "./OnLayout/TimelineRuler";
import { TimelineItems } from "./OnLayout/TimelineItems";
import { TimelineSidebar, SIDEBAR_WIDTH } from "./Sidebar/TimelineSidebar";
import { IssueDetail } from "./IssueDetail/IssueDetail";
import { useCenterBasedZoom } from "../../../data-layer/utils/useCenterBasedZoom";
import {
  getTimeViewFromUrl,
  syncTimeViewToUrl,
  getIssueIdFromUrl,
  syncIssueIdToUrl,
  listenToHistoryChanges,
  type TimeViewType as UrlTimeViewType,
} from "../../../data-layer/utils/urlSync";
import { useDateUrlSync } from "../../../data-layer/utils/useDateUrlSync";
import styles from "./Timeline.module.scss";
import { TimelineConst } from "./_constants";

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

export const Timeline: React.FC<TimelineProps> = ({
  inputData,
  onGroupByChange,
}) => {
  // State for selected issue in detail panel
  const [selectedIssue, setSelectedIssue] = useState<IssueShape | null>(null);
  
  // State for right sidebar visibility
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState<boolean>(false);

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

  // State for time view mode and corresponding dayWidth - 使用 URL 同步的初始值
  const [currentTimeView, setCurrentTimeView] = useState<TimeViewType>(
    getTimeViewFromUrl() as TimeViewType
  );
  const dayWidth = TIME_VIEW_CONFIG[currentTimeView].dayWidth;
  const zoomThreshold = TIME_VIEW_CONFIG[currentTimeView].zoomThreshold;

  // 同步 timeView 到 URL 参数
  useEffect(() => {
    syncTimeViewToUrl(currentTimeView as UrlTimeViewType);
  }, [currentTimeView]);

  // 初始化时从URL读取issue ID并设置选中的issue
  useEffect(() => {
    const issueIdFromUrl = getIssueIdFromUrl();
    if (issueIdFromUrl) {
      // 在所有items中查找对应的issue
      const allItems = inputData.data.flatMap((group) => group.groupItems);
      const targetIssue = allItems.find(item => item[IssueShapeKeys.ID] === issueIdFromUrl);
      if (targetIssue) {
        setSelectedIssue(targetIssue);
        setIsRightSidebarVisible(true);
      }
    }
  }, [inputData]);

  // 监听浏览器历史变化（前进/后退按钮）
  useEffect(() => {
    const cleanup = listenToHistoryChanges(() => {
      const issueIdFromUrl = getIssueIdFromUrl();
      if (issueIdFromUrl) {
        const allItems = inputData.data.flatMap((group) => group.groupItems);
        const targetIssue = allItems.find(item => item[IssueShapeKeys.ID] === issueIdFromUrl);
        if (targetIssue) {
          setSelectedIssue(targetIssue);
          setIsRightSidebarVisible(true);
        }
      } else {
        setSelectedIssue(null);
        setIsRightSidebarVisible(false);
      }
    });

    return cleanup;
  }, [inputData]);

  // 添加主滚动容器的引用 - 现在只需要一个
  const mainScrollRef = useRef<HTMLDivElement>(null);

  // 使用自定义hook实现中心缩放功能，针对主内容容器
  const { containerRef: zoomContainerRef } = useCenterBasedZoom(dayWidth);

  // Flatten all items from all groups for timeline calculations
  const allItems = inputData.data.flatMap((group) => group.groupItems);

  // Sort items by start date to ensure consistent placement
  const sortedItems = sortTimelineItemsByStartDate(allItems);
  // Get list of years and start month that need to be displayed
  const { years: yearList, startMonth } = TimelineItemInterval({
    inputData: sortedItems,
  });

  // 使用日期位置URL同步功能
  useDateUrlSync(
    mainScrollRef,
    dayWidth,
    yearList,
    startMonth,
    setCurrentTimeView
  );

  // 计算 Timeline 的总宽度
  const calculateTimelineWidth = useCallback(() => {
    let totalDays = 0;
    
    yearList.forEach((year, yearIndex) => {
      // 第一年从 startMonth 开始，其他年份从1月开始
      const monthStart = yearIndex === 0 ? startMonth : 0;
      const monthEnd = 11; // 12月结束
      
      for (let month = monthStart; month <= monthEnd; month++) {
        // 计算当前月份的天数
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        totalDays += daysInMonth;
      }
    });
    
    // 加上左侧边栏的宽度
    return totalDays * dayWidth + SIDEBAR_WIDTH;
  }, [yearList, startMonth, dayWidth]);

  // 获取计算出的 Timeline 总宽度
  const timelineWidth = calculateTimelineWidth();

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

  // 添加一个空的占位分组，确保垂直滚动到底部时有足够的空白区域
  groupPlacements.push({
    groupTitle: "", // 空标题
    groupItems: [], // 空项目列表
    placements: [], // 空放置结果
  });

  return (
    <div className={styles["timeline-container"]}>
      {/* 浏览器兼容性检查 */}
      {/* <BrowserCompatibility /> */}
      
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

      <div className={styles["timeline-body"]}>
        {/* 主滚动容器 - 处理横向滚动，ruler 和 content 都在其中 */}
        <div
          ref={(el) => {
            mainScrollRef.current = el;
            zoomContainerRef.current = el;
          }}
          className={styles["timeline-main-scroll"]}
        >
          {/* 时间线尺子组件 - sticky 定位在顶部 */}
          <div 
            className={styles["timeline-ruler-sticky"]}
            style={{ width: `${timelineWidth}px` }}
          >
            {/* 左侧边栏的尺子占位区域 */}
            <div className={styles["timeline-sidebar-ruler-placeholder"]}>
              <TimelineSidebar
                groupPlacements={groupPlacements}
                cellHeight={cellHeight}
                groupGap={groupGapForTesting}
                isRulerMode={true}
              />
            </div>

            {/* 右侧时间线尺子 */}
            <div className={styles["timeline-ruler-content"]}>
              <TimelineRuler
                yearList={yearList}
                startMonth={startMonth}
                dayWidth={dayWidth}
                zoomThreshold={zoomThreshold}
              />
            </div>
          </div>

          {/* 时间线内容区域 */}
          <div 
            className={styles["timeline-content-inner"]}
            style={{ width: `${timelineWidth}px` }}
          >
            {/* 左侧可调整大小的侧边栏 */}
            <div className={styles["timeline-sidebar"]}>
              <TimelineSidebar
                groupPlacements={groupPlacements}
                cellHeight={cellHeight}
                groupGap={groupGapForTesting}
              />
            </div>

            {/* 时间线项目容器 */}
            <div className={styles["timeline-items-container"]}>
              <TimelineItems
                yearList={yearList}
                startMonth={startMonth}
                dayWidth={dayWidth}
                zoomThreshold={zoomThreshold}
                cellHeight={cellHeight}
                groupGap={groupGapForTesting}
                groupPlacements={groupPlacements}
                onIssueClick={(issue) => {
                  setSelectedIssue(issue);
                  setIsRightSidebarVisible(true);
                  syncIssueIdToUrl(issue[IssueShapeKeys.ID]);
                }}
              />
            </div>
          </div>
        </div>

        {/* 右侧信息栏 */}
        {isRightSidebarVisible && (
          <div className={styles["timeline-right-sidebar"]}>
            <IssueDetail 
              selectedIssue={selectedIssue} 
              onClose={() => {
                setSelectedIssue(null);
                setIsRightSidebarVisible(false);
                syncIssueIdToUrl(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
