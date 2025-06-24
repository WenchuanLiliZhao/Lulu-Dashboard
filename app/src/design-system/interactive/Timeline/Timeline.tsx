/**
 * 📅 Timeline时间线主组件
 * 
 * 这是设计系统中最重要的组件之一，用于展示项目或任务的时间线。
 * Timeline可以显示多个项目在时间轴上的分布，支持分组、缩放和响应式布局。
 * 
 * 🎯 主要特性：
 * - 智能布局：自动避免项目重叠，垂直分层显示
 * - 分组显示：可以按团队、状态等字段分组
 * - 时间缩放：支持年、月、日三种时间视图
 * - 响应式：自适应不同屏幕尺寸
 * 
 * 📊 数据要求：
 * 每个时间线项目必须包含：id（唯一标识）、name（名称）、startDate（开始日期）、endDate（结束日期）
 * 
 * 💡 使用示例：
 * const data = {
 *   meta: { sortBy: 'team' },
 *   data: [{
 *     groupTitle: "开发团队",
 *     groupItems: [{
 *       id: "1", name: "项目A", 
 *       startDate: new Date("2024-01-01"), 
 *       endDate: new Date("2024-02-01")
 *     }]
 *   }]
 * };
 * <Timeline inputData={data} />
 */

import { useState, useRef, useCallback } from "react";
import {
  TimelineItemInterval,
  sortTimelineItemsByStartDate,
  IssueShapeKeys,
  type TimelineProps,
  type TimelineItem,
  BaseTimelineItemKeys,
  findPlacement,
  type PlacementResult
} from "../../data";
import { TimelineRuler } from "./OnLayout/TimelineRuler";
import { TimelineItems } from "./OnLayout/TimelineItems";
import { TimelineSidebar, SIDEBAR_WIDTH } from "./Sidebar/TimelineSidebar";
import { useCenterBasedZoom } from "../../data/hooks";
import styles from "./Timeline.module.scss";
import { TimelineConst } from "./_constants";

// 时间视图配置
const TIME_VIEW_CONFIG = {
  year: { dayWidth: 4.5, label: "Year", zoomThreshold: 9 },
  month: { dayWidth: 8, label: "Month", zoomThreshold: 8 },
  day: { dayWidth: 24, label: "Day", zoomThreshold: 9 },
} as const;

type TimeViewType = keyof typeof TIME_VIEW_CONFIG;

// 通用的Timeline组件 - 支持泛型，现在作为主要接口
export function Timeline<T = Record<string, unknown>>({
  // init 参数为未来扩展保留，暂时不使用
  inputData,
}: TimelineProps<T>) {
  // Constants for layout calculations
  const cellHeight = TimelineConst.cellHeight; // Height of each item row in pixels
  const groupGapForTesting = TimelineConst.groupGap;

  // State for time view mode and corresponding dayWidth - 使用默认值
  const [currentTimeView] = useState<TimeViewType>("month");
  const dayWidth = TIME_VIEW_CONFIG[currentTimeView].dayWidth;
  const zoomThreshold = TIME_VIEW_CONFIG[currentTimeView].zoomThreshold;

  // 添加主滚动容器的引用 - 现在只需要一个
  const mainScrollRef = useRef<HTMLDivElement>(null);

  // 使用自定义hook实现中心缩放功能，针对主内容容器
  const { containerRef: zoomContainerRef } = useCenterBasedZoom(dayWidth);

  // Flatten all items from all groups for timeline calculations
  const allItems = inputData.data.flatMap((group) => group.groupItems);

  // Sort items by start date to ensure consistent placement
  const sortedItems = sortTimelineItemsByStartDate(allItems as TimelineItem<T>[]);
  
  // 构建用于计算时间间隔的数据，使用基础字段键
  const timelineIntervalData = sortedItems.map(item => ({
    [IssueShapeKeys.ID]: item.id || '',
    [IssueShapeKeys.NAME]: item.name || '',
    [IssueShapeKeys.STATUS]: 'On Track' as const,
    [IssueShapeKeys.DESCRIPTION]: '',
    [IssueShapeKeys.START_DATE]: item.startDate || item[BaseTimelineItemKeys.START_DATE as keyof typeof item],
    [IssueShapeKeys.END_DATE]: item.endDate || item[BaseTimelineItemKeys.END_DATE as keyof typeof item],
    [IssueShapeKeys.PROGRESS]: 0,
    [IssueShapeKeys.CATEGORY]: '',
    [IssueShapeKeys.TEAM]: 'Tech' as const,
    [IssueShapeKeys.PRIORITY]: 'Medium' as const,
  }));

  // Get list of years and start month that need to be displayed
  const { years: yearList, startMonth } = TimelineItemInterval({
    inputData: timelineIntervalData,
  });

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

  // Pre-calculate placements for each group separately
  const groupPlacements = inputData.data.map((group) => {
    const sortedGroupItems = sortTimelineItemsByStartDate(group.groupItems as TimelineItem<T>[]);
    const placements: PlacementResult[] = [];

    sortedGroupItems.forEach((item) => {
      const startDate = new Date(item.startDate || item[BaseTimelineItemKeys.START_DATE as keyof typeof item]);
      const endDate = new Date(item.endDate || item[BaseTimelineItemKeys.END_DATE as keyof typeof item]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const column = findPlacement(placements, item as any, startDate, endDate);

      placements.push({
        column,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        item: item as any,
        startDate,
        endDate,
      });
    });

    return {
      groupTitle: group.groupTitle,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      groupItems: group.groupItems as any,
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
                onIssueClick={() => {
                  // Issue 点击事件，不再同步到URL
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 为了向后兼容，提供一个别名
export const GenericTimeline = Timeline;

// 默认导出Timeline组件
export { Timeline as default };
