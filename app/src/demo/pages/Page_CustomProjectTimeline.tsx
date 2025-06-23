import React, { useState, useEffect } from "react";
// 使用自定义项目示例数据
import { CustomProjectTimelineExample } from "../../example-data/timeline-examples/custom-project-example";
// 使用新的设计系统组件
import { Timeline } from "../../design-system";
// 使用新的数据层函数
import { groupTimelineItemsByField, type TimelineItem } from "../../data-layer";
import type { PageShape } from "../object-shapes/Page";

// 自定义项目数据的接口（从示例文件复制接口定义）
interface CustomProjectData {
  budget: {
    allocated: number;
    spent: number;
    currency: "USD" | "EUR" | "CNY";
  };
  developers: {
    lead: string;
    frontend: string[];
    backend: string[];
    qa: string[];
  };
  technologies: {
    frontend: string[];
    backend: string[];
    database: string[];
    cloud: string[];
  };
  clientInfo: {
    company: string;
    contactPerson: string;
    industry: string;
    region: "NA" | "EU" | "APAC" | "LATAM";
  };
  milestones: {
    kickoff: Date;
    designComplete: Date;
    developmentComplete: Date;
    testing: Date;
    deployment: Date;
  };
  riskAssessment: {
    technical: "LOW" | "MEDIUM" | "HIGH";
    timeline: "LOW" | "MEDIUM" | "HIGH";
    budget: "LOW" | "MEDIUM" | "HIGH";
    overall: "GREEN" | "YELLOW" | "RED";
  };
  estimatedHours: {
    design: number;
    development: number;
    testing: number;
    deployment: number;
    total: number;
  };
  projectType: "WEB_APP" | "MOBILE_APP" | "API" | "DESKTOP" | "MICROSERVICE";
  features: string[];
  qualityMetrics: {
    codeCoverage: number;
    performanceScore: number;
    securityScore: number;
    maintainabilityIndex: number;
  };
}

// 创建自定义项目时间线内容组件
const CustomProjectTimelineContent: React.FC = () => {
  // 可分组的字段类型
  type GroupableField = keyof TimelineItem<CustomProjectData>;

  // 设置默认分组字段
  const [groupBy, setGroupBy] = useState<GroupableField>("clientInfo");

  // 禁用 body 滚动和浏览器左滑右滑手势
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalOverscrollBehaviorX = document.body.style.overscrollBehaviorX;
    const originalHtmlOverscrollBehaviorX =
      document.documentElement.style.overscrollBehaviorX;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehaviorX = "none";
    document.documentElement.style.overscrollBehaviorX = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehaviorX = originalOverscrollBehaviorX;
      document.documentElement.style.overscrollBehaviorX =
        originalHtmlOverscrollBehaviorX;
    };
  }, []);

  const handleGroupByChange = (newGroupBy: GroupableField) => {
    setGroupBy(newGroupBy);
  };

  // 准备自定义项目Timeline数据 - 处理对象字段分组
  const getGroupedData = () => {
    // 对于对象类型字段，需要提取具体的字符串值进行分组
    if (groupBy === "clientInfo") {
      // 按客户地区分组 - 提取 region 字段
      const itemsWithRegion = CustomProjectTimelineExample.map((item) => ({
        ...item,
        clientRegion: item.clientInfo.region, // 提取地区作为分组字段
      }));
      return groupTimelineItemsByField(
        itemsWithRegion,
        "clientRegion" as keyof (typeof itemsWithRegion)[0]
      );
    } else if (groupBy === "riskAssessment") {
      // 按整体风险等级分组 - 提取 overall 字段
      const itemsWithRisk = CustomProjectTimelineExample.map((item) => ({
        ...item,
        overallRisk: item.riskAssessment.overall, // 提取整体风险等级
      }));
      return groupTimelineItemsByField(
        itemsWithRisk,
        "overallRisk" as keyof (typeof itemsWithRisk)[0]
      );
    } else if (groupBy === "budget") {
      // 按预算规模分组 - 根据金额计算规模
      const itemsWithBudgetSize = CustomProjectTimelineExample.map((item) => ({
        ...item,
        budgetSize:
          item.budget.allocated > 500000
            ? "Large (>500K)"
            : item.budget.allocated > 200000
            ? "Medium (200K-500K)"
            : "Small (<200K)",
      }));
      return groupTimelineItemsByField(
        itemsWithBudgetSize,
        "budgetSize" as keyof (typeof itemsWithBudgetSize)[0]
      );
    } else {
      // 直接按字段分组（适用于基础字段）
      return groupTimelineItemsByField(CustomProjectTimelineExample, groupBy);
    }
  };

  const timelineData =
    getGroupedData() as import("../../data-layer").SortedTimelineData<CustomProjectData>;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 顶部控制面板 */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
          flexShrink: 0,
        }}
      >
        <h2 style={{ margin: "0 0 16px 0", color: "#333" }}>
          自定义项目时间线演示 - 完全不同的数据结构
        </h2>
        <p style={{ margin: "0 0 16px 0", color: "#666", fontSize: "14px" }}>
          这个示例展示了Timeline组件如何处理除BaseTimelineItem四个基础字段外，
          拥有完全不同数据结构的项目。包含预算、团队、技术栈、客户信息等自定义字段。
        </p>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <label style={{ fontWeight: "bold", color: "#333" }}>
            分组方式：
          </label>

          <button
            onClick={() => handleGroupByChange("clientInfo")}
            style={{
              padding: "8px 16px",
              backgroundColor: groupBy === "clientInfo" ? "#007bff" : "#e9ecef",
              color: groupBy === "clientInfo" ? "white" : "#495057",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            客户地区
          </button>

          <button
            onClick={() => handleGroupByChange("projectType")}
            style={{
              padding: "8px 16px",
              backgroundColor:
                groupBy === "projectType" ? "#007bff" : "#e9ecef",
              color: groupBy === "projectType" ? "white" : "#495057",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            项目类型
          </button>

          <button
            onClick={() => handleGroupByChange("riskAssessment")}
            style={{
              padding: "8px 16px",
              backgroundColor:
                groupBy === "riskAssessment" ? "#007bff" : "#e9ecef",
              color: groupBy === "riskAssessment" ? "white" : "#495057",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            风险等级
          </button>

          <button
            onClick={() => handleGroupByChange("budget")}
            style={{
              padding: "8px 16px",
              backgroundColor: groupBy === "budget" ? "#007bff" : "#e9ecef",
              color: groupBy === "budget" ? "white" : "#495057",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            预算规模
          </button>

          <button
            onClick={() => handleGroupByChange("name")}
            style={{
              padding: "8px 16px",
              backgroundColor: groupBy === "name" ? "#007bff" : "#e9ecef",
              color: groupBy === "name" ? "white" : "#495057",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            项目名称
          </button>
        </div>
      </div>

      {/* Timeline 组件 */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Timeline<CustomProjectData>
          init={{
            dataType: {
              budget: { allocated: 0, spent: 0, currency: "USD" as const },
              developers: { lead: "", frontend: [], backend: [], qa: [] },
              technologies: {
                frontend: [],
                backend: [],
                database: [],
                cloud: [],
              },
              clientInfo: {
                company: "",
                contactPerson: "",
                industry: "",
                region: "NA" as const,
              },
              milestones: {
                kickoff: new Date(),
                designComplete: new Date(),
                developmentComplete: new Date(),
                testing: new Date(),
                deployment: new Date(),
              },
              riskAssessment: {
                technical: "LOW" as const,
                timeline: "LOW" as const,
                budget: "LOW" as const,
                overall: "GREEN" as const,
              },
              estimatedHours: {
                design: 0,
                development: 0,
                testing: 0,
                deployment: 0,
                total: 0,
              },
              projectType: "WEB_APP" as const,
              features: [],
              qualityMetrics: {
                codeCoverage: 0,
                performanceScore: 0,
                securityScore: 0,
                maintainabilityIndex: 0,
              },
            },
            groupBy: "name",
          }}
          inputData={timelineData}
          onGroupByChange={handleGroupByChange}
        />
      </div>
    </div>
  );
};

// 页面配置
const Page_CustomProjectTimeline: PageShape = {
  info: {
    title: "Custom Project Timeline",
    slug: "custom-project-timeline",
  },
  content: <CustomProjectTimelineContent />,
};

export default Page_CustomProjectTimeline;
