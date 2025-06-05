# Timeline Sidebar 实现说明

## 功能概述

为 Timeline 组件添加了一个可调整大小的左侧边栏，用于显示每个组（group）的名称。该侧边栏具有以下特性：

### 基本功能
- **组名显示**: 显示每个 vision 组的名称
- **可调整大小**: 用户可以通过拖拽右边缘来调整侧边栏宽度
- **宽度限制**: 最小宽度 150px，最大宽度 400px，默认宽度 200px

### 交互特性
- **水平固定**: 在时间线水平滚动时，侧边栏保持固定在左侧
- **垂直同步**: 侧边栏与时间线内容一起垂直滚动，确保组标题与对应的时间线项目保持水平对齐
- **尺子对齐**: 侧边栏顶部与时间线尺子高度对齐

## 实现细节

### 组件结构

1. **TimelineSidebar** (`app/src/Components/Timeline/Elements/Sidebar/TimelineSidebar.tsx`)
   - 主要的侧边栏组件
   - 处理拖拽调整大小的逻辑
   - 计算并显示每个组的标题

2. **TimelineSidebar.module.scss** (`app/src/Components/Timeline/Elements/Sidebar/TimelineSidebar.module.scss`)
   - 侧边栏的样式定义
   - 响应式布局和拖拽交互样式

### 布局架构

```
timeline-container
├── timeline-nav (导航栏)
└── timeline-content-wrapper (外层容器 - 处理垂直滚动)
    └── timeline-content-inner (内层容器 - 处理水平布局)
        ├── timeline-sidebar (左侧边栏 - 固定宽度)
        └── timeline-content-container (时间线内容 - 可水平滚动)
            ├── timeline-ruler-sticky (时间线尺子)
            └── timeline-items-container (时间线项目)
```

### 关键特性实现

#### 1. 垂直滚动同步
- 外层容器 (`timeline-content-wrapper`) 处理垂直滚动
- 侧边栏和时间线内容都在同一个垂直滚动容器内
- 确保组标题与时间线项目完美对齐

#### 2. 水平固定定位
- 侧边栏在内层容器 (`timeline-content-inner`) 中固定位置
- 时间线内容可以独立进行水平滚动
- 侧边栏始终保持在可视区域左侧

#### 3. 可调整大小
- 右边缘有一个 4px 宽的拖拽手柄
- 拖拽时提供视觉反馈（颜色变化）
- 拖拽期间禁用文本选择，提升用户体验

#### 4. 高度计算
- 自动计算每个组的高度，基于该组中的最大重叠数
- 与时间线项目的高度计算逻辑保持一致
- 确保组标题区域与对应的时间线区域高度匹配

## 使用方式

在 Timeline 组件中，侧边栏会自动显示按 vision 分组的数据：

```tsx
<Timeline inputData={groupIssuesByField(Example_Issues, "vision")} />
```

侧边栏将显示所有不同的 vision 名称，例如：
- "To revolutionize personal productivity through intuitive mobile solutions."
- "Advance Capabilities"
- "Evolving Cyber Threats"
- "Awareness and Action"
- "Data Analysis"
- 等等...

## 技术细节

### Props 接口
```typescript
interface TimelineSidebarProps {
  groupPlacements: GroupPlacement[];
  cellHeight: number;
  groupGap: number;
  onWidthChange?: (width: number) => void;
  initialWidth?: number;
}
```

### 样式变量
- `--color-bg-main`: 背景色
- `--color-border-main`: 边框色
- `--color-text-main`: 文字色
- `--color-primary`: 拖拽时的主题色

## 未来扩展可能性

1. **记住用户设置**: 将侧边栏宽度保存到 localStorage
2. **折叠功能**: 添加折叠/展开侧边栏的按钮
3. **组操作**: 添加组级别的操作按钮（如筛选、隐藏等）
4. **自定义内容**: 支持显示更多组的元数据信息
5. **主题适配**: 支持深色/浅色主题切换 