# 项目重构计划

## 目标
将项目重新组织成四个清晰的部分，使用户可以轻易地删除示例数据并集成自己的数据源（静态数据、Notion API、Jira API等）。

## 新的目录结构

```
app/src/
├── design-system/           # 1. Design System 部分
│   ├── ui/                 # 纯UI组件
│   │   ├── Button/
│   │   ├── Switch/
│   │   ├── Icon/
│   │   ├── Boxes/
│   │   ├── CircularProgress/
│   │   └── index.ts
│   ├── interactive/        # 交互组件
│   │   ├── Timeline/
│   │   ├── Nav/
│   │   ├── FullscreenButton/
│   │   └── index.ts
│   ├── assets/            # 设计系统资源
│   │   ├── global-style/
│   │   ├── Img/
│   │   └── index.ts
│   └── index.ts           # Design System 总入口
│
├── data-layer/             # 2. 数据映射及数据处理
│   ├── types/             # 数据类型定义
│   │   ├── timeline.ts
│   │   ├── common.ts
│   │   └── index.ts
│   ├── processors/        # 数据处理器
│   │   ├── timelineProcessor.ts
│   │   ├── groupingProcessor.ts
│   │   └── index.ts
│   ├── adapters/          # 数据适配器（可扩展支持不同数据源）
│   │   ├── staticDataAdapter.ts
│   │   ├── notionAdapter.ts    # 示例（未实现）
│   │   ├── jiraAdapter.ts      # 示例（未实现）
│   │   └── index.ts
│   ├── utils/             # 工具函数
│   │   ├── dateUtils.ts
│   │   ├── urlSync.ts
│   │   ├── calculations.ts
│   │   └── index.ts
│   └── index.ts           # Data Layer 总入口
│
├── example-data/          # 3. 示例数据（用户可删除）
│   ├── timeline-examples/
│   │   ├── example1.ts
│   │   ├── example2.ts
│   │   ├── example3.ts
│   │   └── index.ts
│   ├── README.md          # 如何替换示例数据的说明
│   └── index.ts
│
├── demo/                  # 4. Demo 页面
│   ├── pages/
│   │   ├── TimelineDemo.tsx
│   │   ├── ComponentDemo.tsx
│   │   ├── Home.tsx
│   │   └── index.ts
│   ├── router/
│   │   ├── routes.ts
│   │   └── index.ts
│   └── index.ts
│
├── App.tsx               # 应用入口
├── main.tsx              # 主入口
└── vite-env.d.ts
```

## 重构原则

1. **清晰分离**: 每个部分有明确的职责边界
2. **可替换性**: 示例数据可以轻易删除和替换
3. **可扩展性**: 数据适配器支持多种数据源
4. **独立性**: Design System 可以独立使用
5. **文档化**: 每个部分都有清晰的使用说明

## 分步重构计划

### 第一步：创建新目录结构
- 创建四个主要目录
- 移动现有文件到对应位置
- 更新所有 import 路径

### 第二步：重构 Design System
- 分离纯UI组件和交互组件
- 创建统一的导出文件
- 优化组件接口

### 第三步：重构 Data Layer
- 提取数据类型定义
- 创建数据处理器
- 实现数据适配器模式

### 第四步：整理示例数据
- 将示例数据独立为单独模块
- 添加使用说明文档

### 第五步：重构 Demo 页面
- 简化演示页面结构
- 创建清晰的路由系统

### 第六步：更新文档
- 更新 README
- 添加使用指南
- 创建API文档

## 用户使用流程

1. **仅使用 Design System**: 只导入 `design-system` 模块
2. **使用静态数据**: 删除 `example-data`，在 `data-layer/adapters` 中配置自己的数据
3. **集成API**: 实现新的 adapter（如 NotionAdapter、JiraAdapter）
4. **自定义Demo**: 修改 `demo` 目录下的页面

## 优势

1. **模块化**: 用户可以按需使用不同部分
2. **可维护性**: 清晰的代码组织结构
3. **可扩展性**: 易于添加新的数据源支持
4. **用户友好**: 简单的集成和自定义流程 