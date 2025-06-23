/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
// 使用新的设计系统组件
import { Timeline } from "../../design-system";
// 使用新的数据层 - Jira 适配器
import { createJiraAdapter } from "../../data-layer/adapters/jiraAdapter";
// import { createCustomJiraAdapter } from "../../data-layer/adapters/jiraAdapter"; // 连接自己的Jira时取消注释
import { 
  GroupableFields, 
  type GroupableFieldValue,
  // 新的通用类型和函数
  groupTimelineItemsByField,
  type TimelineItem,
  type ExampleExtendedData
} from "../../data-layer";
import type { PageShape } from "../object-shapes/Page";
import type { IssueShape } from "../../data-layer/types/timeline";

// 🔧 连接到你自己的Jira实例，取消注释并配置下面的代码：
/*
const jiraAdapter = createCustomJiraAdapter({
  // 必需配置
  baseUrl: 'https://your-company.atlassian.net',  // 你的Jira实例URL
  projectKey: 'YOUR_PROJECT_KEY',                 // 你的项目键
  
  // Atlassian Cloud 认证（推荐）
  email: 'your-email@company.com',                // 你的邮箱
  apiToken: 'your-api-token',                     // API Token

  // 或者 Jira Server 认证
  // username: 'your-username',
  // password: 'your-password',
  
  // 可选配置
  jqlQuery: 'project = YOUR_PROJECT_KEY AND status != Done ORDER BY created DESC',
  maxResults: 50
});
*/

// 当前使用测试实例
const jiraAdapter = createJiraAdapter({
  // 可以自定义配置
  projectKey: 'DEMO',
  jqlQuery: 'project = DEMO OR project = STR ORDER BY created DESC',
  maxResults: 30
});

// 转换Jira数据为通用TimelineItem格式
const convertJiraToTimelineItems = (issues: IssueShape[]): TimelineItem<ExampleExtendedData>[] => {
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

// 创建时间线内容组件
const TimelineJiraContent: React.FC = () => {
  const [groupBy, setGroupBy] = useState<GroupableFieldValue>(GroupableFields.STATUS);
  const [issuesData, setIssuesData] = useState<IssueShape[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取 Jira 数据
  useEffect(() => {
    const fetchJiraData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('🚀 开始从 Jira 获取数据...');
        
        const data = await jiraAdapter.getRawData();
        console.log('✅ 成功获取 Jira 数据:', data);
        
        setIssuesData(data);
      } catch (err) {
        console.error('❌ 获取 Jira 数据失败:', err);
        setError(err instanceof Error ? err.message : '获取数据时发生未知错误');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJiraData();
  }, []);

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

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>正在从 Jira 获取数据...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // 如果有错误，显示信息状态（但继续显示模拟数据）
  if (error) {
    console.info('📋 Jira 连接信息:', error);
    // 不显示错误页面，让组件继续使用模拟数据
  }

  // 准备通用Timeline数据
  const timelineItems = convertJiraToTimelineItems(issuesData);
  const timelineData = groupTimelineItemsByField(timelineItems, groupBy as keyof (TimelineItem<ExampleExtendedData>));

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
        groupBy: 'status'
      }}
      inputData={timelineData}
      onGroupByChange={handleGroupByChange as (groupBy: keyof (TimelineItem<ExampleExtendedData>)) => void}
    />
  );
};

const Page_Timeline_Jira: PageShape = {
  info: {
    title: "Timeline (Jira API)",
    slug: "timeline-jira",
  },
  content: <TimelineJiraContent />,
};

export default Page_Timeline_Jira; 