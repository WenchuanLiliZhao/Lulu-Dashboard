/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import { Example_Issues_1 } from "../Components/Timeline/ExampleData/Example_Issues_1";
import { Example_Issues_2 } from "../Components/Timeline/ExampleData/Example_Issues_2";
import { Example_Issues_3 } from "../Components/Timeline/ExampleData/Example_Issues_3";
import { Timeline } from "../Components/Timeline/Timeline";
import { groupIssuesByField, GroupableFields, type GroupableFieldValue } from "../Components/Timeline/Utils/Shapes";
import type { PageShape } from "../object-shapes/Page";

const Example_Issues = [
  ...Example_Issues_1,
  ...Example_Issues_2,
  ...Example_Issues_3,
];

// 创建时间线内容组件
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

  return (
    <Timeline 
      inputData={groupIssuesByField(Example_Issues, groupBy)} 
      onGroupByChange={handleGroupByChange}
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