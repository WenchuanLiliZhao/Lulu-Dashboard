# Design System

一个独立的React设计系统，专注于Timeline组件和基础UI组件。

## 🎯 核心特性

- **完全独立**: 无外部数据层依赖，可直接复制到其他项目
- **Timeline组件**: 强大的时间线展示组件，支持分组、缩放、响应式布局
- **基础UI组件**: Button、Switch、CircularProgress等可复用组件
- **TypeScript支持**: 完整的类型定义
- **模块化设计**: 按需导入

## 📁 项目结构

```
design-system/
├── data/                    # 内置数据层
│   ├── types.ts            # 数据类型定义
│   ├── utils.ts            # 工具函数
│   ├── hooks.ts            # React Hooks
│   └── index.ts            # 数据层入口
├── ui/                     # 基础UI组件
│   ├── Button/             # 按钮组件
│   ├── Switch/             # 开关组件
│   ├── CircularProgress/   # 进度条组件
│   ├── Boxes/              # 容器组件
│   ├── Icon/               # 图标组件
│   └── BrowserCompatibility/ # 浏览器兼容性检查
├── interactive/            # 交互组件
│   └── Timeline/           # 时间线组件
│       ├── Timeline.tsx    # 主组件
│       ├── OnLayout/       # 布局相关组件
│       ├── OnTimeline/     # 时间线项目组件
│       ├── Sidebar/        # 侧边栏组件
│       └── Shared/         # 共享组件
├── assets/                 # 静态资源
│   ├── global-style/       # 全局样式
│   │   ├── css-variables.ts # CSS变量
│   │   └── *.scss          # SCSS样式文件
│   └── Img/               # 图片资源
└── index.ts               # 设计系统主入口
```

## 🚀 快速开始

### 安装使用

直接复制 `design-system` 文件夹到你的项目中：

```bash
# 复制整个design-system文件夹到你的src目录
cp -r /path/to/design-system ./src/
```

### 基本使用

```tsx
import { Timeline, Button, Switch } from './design-system';
import type { SortedTimelineData } from './design-system';

// 使用Timeline组件
const timelineData: SortedTimelineData = {
  meta: { sortBy: 'name' },
  data: [
    {
      groupTitle: "开发团队",
      groupItems: [
        {
          id: "1",
          name: "项目A",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-02-01")
        }
      ]
    }
  ]
};

function App() {
  return (
    <div>
      <Timeline inputData={timelineData} />
      <Button variant="primary">点击按钮</Button>
      <Switch checked={true} onChange={() => {}} />
    </div>
  );
}
```

## 📊 Timeline组件

### 基本用法

```tsx
import { Timeline } from './design-system';
import type { SortedTimelineData, TimelineItem } from './design-system';

// 定义你的数据类型
interface ProjectData {
  priority: 'High' | 'Medium' | 'Low';
  team: string;
  status: string;
}

// 创建Timeline数据
const data: SortedTimelineData<ProjectData> = {
  meta: { sortBy: 'team' },
  data: [
    {
      groupTitle: "技术团队",
      groupItems: [
        {
          id: "proj-1",
          name: "网站重构",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-03-15"),
          priority: "High",
          team: "前端团队",
          status: "进行中"
        }
      ]
    }
  ]
};

<Timeline<ProjectData> inputData={data} />
```

### 数据格式

Timeline组件要求数据包含以下必需字段：

```tsx
interface BaseTimelineItem {
  id: string;        // 唯一标识符
  name: string;      // 显示名称
  startDate: Date;   // 开始日期
  endDate: Date;     // 结束日期
}
```

你可以添加任意自定义字段：

```tsx
interface MyCustomItem extends BaseTimelineItem {
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  budget: number;
  // ... 其他字段
}
```

## 🎨 样式定制

设计系统使用CSS变量进行主题定制：

```scss
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-warning: #ffc107;
  --color-error: #dc3545;
}
```

## 🔧 开发依赖

- React 18+
- TypeScript 4.5+
- SCSS支持

## 📦 组件列表

### UI组件
- `Button` - 按钮组件，支持多种变体
- `Switch` - 开关组件
- `CircularProgress` - 圆形进度条
- `HoverBox`, `MenuBox`, `TransBgBox` - 容器组件
- `Icon` - 图标组件
- `BrowserCompatibility` - 浏览器兼容性检查

### 交互组件
- `Timeline` - 时间线组件，支持分组、缩放、响应式

### 数据工具
- `TimelineItemInterval` - 时间间隔计算
- `sortTimelineItemsByStartDate` - 按日期排序
- `findPlacement` - 布局算法
- `useCenterBasedZoom` - 缩放Hook

## 🤝 贡献

这是一个独立的设计系统，可以自由复制和修改以适应你的项目需求。

## 📄 许可证

根据项目许可证使用。 