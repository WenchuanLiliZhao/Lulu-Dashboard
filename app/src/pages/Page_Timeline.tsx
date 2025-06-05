
import React, { useState } from "react";
import { Example_Issues_1 } from "../Components/Timeline/ExampleData/Example_Issues_1";
import { Example_Issues_2 } from "../Components/Timeline/ExampleData/Example_Issues_2";
import { Example_Issues_3 } from "../Components/Timeline/ExampleData/Example_Issues_3";
import { Timeline } from "../Components/Timeline/Timeline";
import { groupIssuesByField } from "../Components/Timeline/Utils/Shapes";
import type { PageShape } from "../object-shapes/Page";

const Example_Issues = [
  ...Example_Issues_1,
  ...Example_Issues_2,
  ...Example_Issues_3,
];

// 创建时间线内容组件
const TimelineContent: React.FC = () => {
  const [groupBy, setGroupBy] = useState<"status" | "vision" | "team" | "priority">("vision");

  const handleGroupByChange = (newGroupBy: "status" | "vision" | "team" | "priority") => {
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