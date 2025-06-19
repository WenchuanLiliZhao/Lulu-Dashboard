# Lulu Dashboard - 项目结构

## 概述

项目已成功重构为模块化架构，分为四个清晰的部分：

1. **Design System** - 设计系统
2. **Data Layer** - 数据层
3. **Example Data** - 示例数据
4. **Demo Pages** - 演示页面

## 📂 目录结构

```
app/src/
├── design-system/           # 🎨 设计系统
│   ├── ui/                 # 纯UI组件
│   │   ├── Button/
│   │   ├── Switch/
│   │   ├── Icon/
│   │   ├── CircularProgress/
│   │   ├── Boxes/
│   │   └── index.ts
│   ├── interactive/        # 交互组件
│   │   ├── Timeline/       # Timeline主组件
│   │   ├── Nav/
│   │   ├── FullscreenButton/
│   │   └── index.ts
│   ├── assets/            # 设计资源
│   │   ├── global-style/
│   │   ├── Img/
│   │   └── index.ts
│   └── index.ts           # 设计系统入口
│
├── data-layer/             # 📊 数据层
│   ├── types/             # 类型定义
│   │   ├── timeline.ts
│   │   └── index.ts
│   ├── processors/        # 数据处理器
│   │   ├── groupingProcessor.ts
│   │   └── index.ts
│   ├── adapters/          # 数据适配器
│   │   ├── baseAdapter.ts
│   │   ├── staticDataAdapter.ts
│   │   ├── notionAdapter.ts    # 模板
│   │   ├── jiraAdapter.ts      # 模板
│   │   └── index.ts
│   ├── utils/             # 工具函数
│   │   ├── functions.ts
│   │   ├── urlSync.ts
│   │   ├── Utils.ts
│   │   └── (其他工具文件)
│   └── index.ts           # 数据层入口
│
├── example-data/          # 📋 示例数据
│   ├── timeline-examples/
│   │   ├── example1.ts
│   │   ├── example2.ts
│   │   ├── example3.ts
│   │   └── index.ts
│   ├── README.md          # 使用说明
│   └── index.ts
│
├── demo/                  # 🚀 演示页面
│   ├── pages/
│   │   ├── Page_Timeline.tsx
│   │   ├── Page_Home.tsx
│   │   └── (其他演示页面)
│   └── object-shapes/
│
├── App.tsx               # 应用入口
└── main.tsx              # 主入口
```

## 🚀 使用方式

### 1. 仅使用设计系统

```typescript
import { Timeline, Button, Switch } from './design-system';

// 使用组件
<Button>点击我</Button>
<Timeline inputData={data} />
```

### 2. 使用静态数据

```typescript
import { StaticDataAdapter } from './data-layer/adapters';
import { AllExampleIssues } from './example-data';

const adapter = new StaticDataAdapter(AllExampleIssues);
const groupedData = adapter.getGroupedData('category');
```

### 3. 集成外部API

```typescript
import { createAdapter } from './data-layer/adapters';

// Notion集成
const notionAdapter = createAdapter({
  type: 'notion',
  notionConfig: {
    baseUrl: 'https://api.notion.com',
    apiKey: 'your-api-key',
    databaseId: 'your-db-id'
  }
});

// Jira集成
const jiraAdapter = createAdapter({
  type: 'jira',
  jiraConfig: {
    baseUrl: 'https://your-domain.atlassian.net',
    apiKey: 'your-token',
    projectKey: 'PROJ'
  }
});
```

## 🔧 自定义和扩展

### 删除示例数据

1. 删除 `example-data` 目录
2. 更新 `demo/pages/Page_Timeline.tsx` 中的数据引用
3. 配置你的数据适配器

### 添加新的数据源

1. 创建新的适配器类，继承自 `BaseAdapter`
2. 实现必要的方法
3. 在 `adapters/index.ts` 中导出
4. 更新工厂函数支持新类型

### 自定义UI组件

1. 在 `design-system/ui` 中添加新组件
2. 在 `design-system/ui/index.ts` 中导出
3. 遵循现有的组件设计模式

## 📦 导出清单

### Design System
- **UI组件**: Button, Switch, Icon, CircularProgress, Boxes
- **交互组件**: Timeline, Nav, FullscreenButton
- **资源**: Logo, 样式文件

### Data Layer
- **类型**: IssueShape, SortedIssueShape, GroupableFieldValue
- **处理器**: groupIssuesByField, sortTimelineItemsByStartDate
- **适配器**: StaticDataAdapter, NotionAdapter, JiraAdapter
- **工具**: createAdapter, URL同步工具

### Example Data
- **数据集**: 3个示例数据集
- **合并数据**: AllExampleIssues

## 🎯 设计原则

1. **模块化**: 每个部分都有明确的职责
2. **可替换**: 示例数据可以轻松删除
3. **可扩展**: 支持添加新的数据源和UI组件
4. **类型安全**: 完整的TypeScript类型定义
5. **文档化**: 每个模块都有清晰的文档

## 🔗 相关文档

- [示例数据使用指南](./example-data/README.md)
- [重构计划详情](../REFACTORING_PLAN.md)
- [Timeline组件文档](./design-system/interactive/Timeline/README.md)

## 版本信息

- Design System: v1.0.0
- Data Layer: v1.0.0 