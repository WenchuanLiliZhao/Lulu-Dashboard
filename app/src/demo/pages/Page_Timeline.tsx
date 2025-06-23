/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
// 使用新的示例数据入口
import { AllExampleIssues } from "../../example-data";
// 使用新的设计系统组件 - 现在Timeline就是通用版本
import { Timeline } from "../../design-system";
// 使用新的数据层 - 通用函数
import { 
  GroupableFields, 
  type GroupableFieldValue,
  // 新的通用类型和函数
  groupTimelineItemsByField,
  type TimelineItem,
  type ExampleExtendedData
} from "../../data-layer";
import type { PageShape } from "../object-shapes/Page";

// 使用合并的示例数据
const Example_Issues = AllExampleIssues;

// 转换传统IssueShape数据为通用TimelineItem格式
const convertToTimelineItems = (issues: typeof Example_Issues): TimelineItem<ExampleExtendedData>[] => {
  return issues.map(issue => ({
    // 基础必需字段
    id: issue.id,
    name: issue.name,
    startDate: issue.startDate,
    endDate: issue.endDate,
    // 扩展字段
    status: issue.status,
    description: issue.description,
    progress: issue.progress,
    category: issue.category,
    team: issue.team,
    priority: issue.priority,
  }));
};

// 创建时间线内容组件 - 使用通用Timeline
const TimelineContent: React.FC = () => {
  const [groupBy, setGroupBy] = useState<GroupableFieldValue>(GroupableFields.CATEGORY);

  // 禁用 body 滚动和浏览器左滑右滑手势
  useEffect(() => {
    // 保存原始样式
    const originalOverflow = document.body.style.overflow;
    const originalOverscrollBehaviorX = document.body.style.overscrollBehaviorX;
    const originalHtmlOverscrollBehaviorX = document.documentElement.style.overscrollBehaviorX;
    
    // 禁用滚动和滑动手势
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehaviorX = 'none';
    document.documentElement.style.overscrollBehaviorX = 'none';
    
    // 清理函数：组件卸载时恢复所有样式
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehaviorX = originalOverscrollBehaviorX;
      document.documentElement.style.overscrollBehaviorX = originalHtmlOverscrollBehaviorX;
    };
  }, []);

  const handleGroupByChange = (newGroupBy: GroupableFieldValue) => {
    setGroupBy(newGroupBy);
  };

  // 准备通用Timeline数据
  const timelineItems = convertToTimelineItems(Example_Issues);
  const genericTimelineData = groupTimelineItemsByField(timelineItems, groupBy as keyof (TimelineItem<ExampleExtendedData>));

  return (
    <Timeline<ExampleExtendedData>
      init={{
        dataType: {
          status: 'On Track' as const,
          description: '',
          progress: 0,
          category: '',
          team: 'Tech' as const,
          priority: 'Medium' as const,
        },
        groupBy: 'category'
      }}
      inputData={genericTimelineData}
      onGroupByChange={handleGroupByChange as (groupBy: keyof (TimelineItem<ExampleExtendedData>)) => void}
    />
  );
};

const Page_Timeline: PageShape = {
  info: {
    title: "Timeline",
    slug: "timeline",
  },
  content: <TimelineContent />,
};

export default Page_Timeline;