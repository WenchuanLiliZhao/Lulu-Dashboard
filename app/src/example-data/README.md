# 示例数据 (Example Data)

这个目录包含了用于演示和测试的示例数据。**用户可以安全地删除这个整个目录**，并使用自己的数据源。

## 📂 目录结构

```
example-data/
├── timeline-examples/     # Timeline 组件的示例数据
│   ├── example1.ts       # 示例数据集 1
│   ├── example2.ts       # 示例数据集 2
│   ├── example3.ts       # 示例数据集 3
│   └── index.ts          # 统一入口
├── README.md             # 本文档
└── index.ts              # 示例数据总入口
```

## 🚀 使用方式

### 1. 使用现有示例数据

```typescript
import { AllExampleIssues, ExampleDatasets } from './example-data';
import { StaticDataAdapter } from './data-layer/adapters';

// 使用所有示例数据
const adapter = new StaticDataAdapter(AllExampleIssues);

// 或者使用特定的数据集
const adapter = new StaticDataAdapter(ExampleDatasets.dataset1);
```

### 2. 替换为自己的静态数据

```typescript
import { StaticDataAdapter } from './data-layer/adapters';
import type { IssueShape } from './data-layer/types';

// 定义你自己的数据
const myData: IssueShape[] = [
  {
    id: "my-1",
    name: "我的第一个任务",
    status: "On Track",
    description: "任务描述",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    progress: 75,
    category: "开发",
    team: "Tech",
    priority: "High"
  },
  // ... 更多数据
];

const adapter = new StaticDataAdapter(myData);
```

### 3. 集成外部 API

```typescript
import { createAdapter } from './data-layer/adapters';

// 使用 Notion 数据源
const notionAdapter = createAdapter({
  type: 'notion',
  notionConfig: {
    baseUrl: 'https://api.notion.com',
    apiKey: 'your-notion-api-key',
    databaseId: 'your-database-id'
  }
});

// 使用 Jira 数据源
const jiraAdapter = createAdapter({
  type: 'jira',
  jiraConfig: {
    baseUrl: 'https://your-domain.atlassian.net',
    apiKey: 'your-jira-api-token',
    username: 'your-email@example.com',
    projectKey: 'PROJ'
  }
});
```

## 🗑️ 删除示例数据

如果你不需要示例数据，可以：

1. **删除整个 `example-data` 目录**
2. **更新 Demo 页面中的数据引用**
3. **配置你自己的数据适配器**

### 删除步骤

```bash
# 1. 删除示例数据目录
rm -rf src/example-data

# 2. 更新 Demo 页面 (demo/pages/TimelineDemo.tsx)
# 将示例数据替换为你的数据源
```

### 更新 Demo 页面示例

```typescript
// demo/pages/TimelineDemo.tsx
import { createAdapter } from '../../data-layer/adapters';

// 替换示例数据使用
const dataAdapter = createAdapter({
  type: 'static', // 或 'notion', 'jira'
  data: yourData  // 你的数据
});

// 在组件中使用
const [groupBy, setGroupBy] = useState<GroupableFieldValue>('category');
const groupedData = dataAdapter.getGroupedData(groupBy);
```

## 🔧 数据格式

所有数据都必须符合 `IssueShape` 接口：

```typescript
interface IssueShape {
  id: string;              // 唯一标识符
  name: string;            // 任务名称
  status: StatusType;      // 状态
  description: string;     // 描述
  startDate: Date;         // 开始日期
  endDate: Date;          // 结束日期
  progress: number;        // 进度 (0-100)
  category: string;        // 分类
  team: TeamType;         // 团队
  priority: PriorityType; // 优先级
}
```

## 📝 支持的数据源

1. **静态数据** - 直接在代码中定义
2. **Notion API** - 从 Notion 数据库读取
3. **Jira API** - 从 Jira 项目读取
4. **自定义 API** - 实现自己的适配器

## 🆘 需要帮助？

查看 `data-layer/adapters/` 目录中的适配器模板和文档了解更多信息。 