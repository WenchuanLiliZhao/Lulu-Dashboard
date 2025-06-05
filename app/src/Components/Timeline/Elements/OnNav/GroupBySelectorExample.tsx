import React, { useState } from "react";
import GroupBySelector, { type GroupOption } from "./GroupBySelector";

const GroupBySelectorExample: React.FC = () => {
  const [selectedGroupBy, setSelectedGroupBy] = useState<string>("vision");

  // 分组选项配置
  const groupOptions: GroupOption[] = [
    { value: "vision", label: "Vision" },
    { value: "status", label: "Status" },
    { value: "team", label: "Team" },
    { value: "priority", label: "Priority" },
  ];

  const handleGroupByChange = (value: string) => {
    setSelectedGroupBy(value);
    console.log("分组方式改变为:", value);
  };

  return (
    <div style={{ padding: "20px", background: "var(--color-bg-main)" }}>
      <h2>分组选择器示例</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <h3>默认尺寸 (small)</h3>
        <GroupBySelector
          options={groupOptions}
          defaultValue={selectedGroupBy}
          onChange={handleGroupByChange}
          size="small"
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>中等尺寸 (medium)</h3>
        <GroupBySelector
          options={groupOptions}
          defaultValue={selectedGroupBy}
          onChange={handleGroupByChange}
          size="medium"
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>大尺寸 (large)</h3>
        <GroupBySelector
          options={groupOptions}
          defaultValue={selectedGroupBy}
          onChange={handleGroupByChange}
          size="large"
        />
      </div>

      <div style={{ 
        marginTop: "20px", 
        padding: "10px", 
        background: "var(--color-bg-sec)", 
        borderRadius: "8px" 
      }}>
        <p>当前选中的分组方式: <strong>{selectedGroupBy}</strong></p>
      </div>
    </div>
  );
};

export default GroupBySelectorExample; 