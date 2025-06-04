import React, { useState } from "react";
import { TimelineItemInterval } from "./Utils/functions";
import {
  sortTimelineItemsByStartDate,
  type SortedIssueShape,
} from "./Utils/Shapes";
import {
  findPlacement,
  type PlacementResult,
} from "./Utils/Utils";
import { type SwitchOption } from "../Switch/Switch";
import { TimelineNav } from "./Elements/OnNav/_Nav";
import { TimelineRuler } from "./Elements/OnLayout/TimelineRuler";
import { TimelineItems } from "./Elements/OnLayout/TimelineItems";
import { useLeftBasedZoom } from "./Utils/useLeftBasedZoom";
import styles from "./Timeline.module.scss";
import { TimelineConst } from "./Elements/_constants";
import { GroupLabels } from "./Elements/OnTimeline/GroupLabels";

interface TimelineProps {
  inputData: SortedIssueShape;
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



export const Timeline: React.FC<TimelineProps> = ({ inputData }) => {
  // Time view switch options - 转换为Switch组件需要的格式
  const switchOptions: SwitchOption[] = Object.entries(timeViewOptions).map(
    ([value, label]) => ({ value, label })
  );

  // Constants for layout calculations
  const cellHeight = TimelineConst.cellHeight; // Height of each item row in pixels
  const groupGapForTesting = TimelineConst.groupGap;

  // State for time view mode and corresponding dayWidth
  const [currentTimeView, setCurrentTimeView] = useState<TimeViewType>("month");
  const dayWidth = TIME_VIEW_CONFIG[currentTimeView].dayWidth;
  const zoomThreshold = TIME_VIEW_CONFIG[currentTimeView].zoomThreshold;

  // 使用自定义hook实现左侧缩放功能
  const { containerRef } = useLeftBasedZoom(dayWidth);

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
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);

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
        containerRef={containerRef}
        yearList={yearList}
        startMonth={startMonth}
      />

      <div className={styles["timeline-content-wrapper"]}>
        {/* 分组标题列组件 */}
        <GroupLabels
          groupPlacements={groupPlacements}
          cellHeight={cellHeight}
          sortedBy={inputData.meta.sortBy}
        />

        {/* 时间线内容 - 分为 Ruler 和 Items 两个平级组件 */}
        <div ref={containerRef} className={styles["timeline-content-container"]}>
          {/* 时间线尺子组件 */}
          <TimelineRuler
            yearList={yearList}
            startMonth={startMonth}
            dayWidth={dayWidth}
            zoomThreshold={zoomThreshold}
          />
          
          {/* 时间线项目组件 */}
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
  );
};
