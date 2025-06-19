# Jira API 集成说明

## 概述

已为时间线演示成功集成了 Jira API 连接功能，支持从公开测试 Jira 实例获取实际数据。

## 实现特性

### 🔌 Jira 适配器 (JiraAdapter)
- **位置**: `app/src/data-layer/adapters/jiraAdapter.ts`
- **功能**: 连接到公开 Jira 测试实例 `https://jira.demo.almworks.com`
- **特点**:
  - 无需认证的公开测试环境
  - 支持 JQL 查询自定义
  - 自动数据类型转换
  - CORS 错误处理
  - 后备模拟数据

### 📊 新演示页面
- **位置**: `app/src/demo/pages/Page_Timeline_Jira.tsx`
- **功能**: 专门展示 Jira API 集成的时间线页面
- **特点**:
  - 加载状态显示
  - 错误状态处理
  - 重试功能
  - 用户友好的错误提示

### 🔄 数据转换
- 自动将 Jira Issue 转换为内部数据格式
- 状态映射：`new/todo` → `Not Yet Started`，`progress` → `On Track`，`done` → `On Track`
- 优先级映射：`critical/highest` → `High`，`medium` → `Medium`，`low/lowest` → `Low`
- 团队映射：基于关键词智能匹配到预定义团队

## 使用方法

### 基础使用
```typescript
import { createJiraAdapter } from './data-layer/adapters/jiraAdapter';

const jiraAdapter = createJiraAdapter({
  projectKey: 'DEMO',
  jqlQuery: 'project = DEMO ORDER BY created DESC',
  maxResults: 50
});

const issues = await jiraAdapter.getRawData();
```

### 自定义配置
```typescript
const jiraAdapter = createJiraAdapter({
  baseUrl: 'https://your-jira-instance.com',
  projectKey: 'YOUR_PROJECT',
  jqlQuery: 'project = YOUR_PROJECT AND status != Closed',
  maxResults: 100
});
```

## 页面路由

- **主页**: `/` - 包含 Jira API 演示的入口链接
- **静态数据时间线**: `/timeline` - 原有示例数据演示
- **Jira API 时间线**: `/timeline-jira` - 新增的 Jira API 集成演示

## 错误处理

### CORS 限制
由于浏览器 CORS 限制，直接连接到 Jira 实例可能失败。系统会：
1. 尝试连接到 Jira API
2. 如果失败，显示友好的错误信息
3. 自动回退到模拟数据进行演示
4. 提供重试选项

### 生产环境建议
在生产环境中，建议：
- 配置服务端代理处理 CORS
- 使用适当的认证机制（API Token、OAuth）
- 实现数据缓存策略
- 添加错误监控

## 技术架构

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React 组件    │───▶│   Jira 适配器    │───▶│   Jira REST API │
│ (Timeline UI)   │    │ (数据转换/处理)  │    │  (测试实例)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   错误处理 UI   │    │   模拟数据后备   │    │   真实 Issues   │
│ (加载/错误状态) │    │  (CORS 失败时)   │    │  (API 成功时)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 测试实例信息

- **URL**: `https://jira.demo.almworks.com`
- **项目**: DEMO、STR 等测试项目
- **访问**: 无需认证，公开访问
- **限制**: 只读访问，无法修改数据

## 开发说明

1. **启动项目**: `cd app && npm run dev`
2. **访问演示**: 浏览器打开 `http://localhost:5173/timeline-jira`
3. **查看控制台**: 监控 API 调用日志和错误信息
4. **测试功能**: 尝试不同的分组选项和数据展示

## 下一步改进

- [ ] 支持更多 Jira 实例配置
- [ ] 添加数据缓存机制
- [ ] 实现分页支持
- [ ] 添加更多字段映射选项
- [ ] 支持实时数据更新 