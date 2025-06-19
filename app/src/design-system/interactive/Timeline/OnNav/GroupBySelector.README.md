# GroupBySelector 组件

一个专门用于 Timeline 分组功能的下拉选择器组件，让用户可以选择按不同字段对 issues 进行分组。

## 功能特性

- 🎯 **专用分组选择**: 专门设计用于 Timeline 的分组功能
- 📱 **现代下拉界面**: 美观的下拉菜单设计，带有动画效果
- 🎨 **一致的视觉风格**: 与现有组件保持一致的设计语言
- 📏 **多尺寸支持**: 支持 small、medium、large 三种尺寸
- ♿ **无障碍支持**: 支持键盘导航和焦点管理
- 🎛️ **高度可定制**: 支持自定义样式和配置

## 组件架构

### 核心组件
- `GroupBySelector.tsx` - 主要的分组选择器组件
- `GroupBySelector.module.scss` - 组件样式文件

### 类型定义
```typescript
export interface GroupOption {
  value: "status" | "vision" | "team" | "priority";
  label: string;
}

interface GroupBySelectorProps {
  options: GroupOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}
```

## 使用方法

### 基础用法

```typescript
import GroupBySelector, { type GroupOption } from './GroupBySelector';

const groupOptions: GroupOption[] = [
  { value: "vision", label: "Vision" },
  { value: "status", label: "Status" },
  { value: "team", label: "Team" },
  { value: "priority", label: "Priority" },
];

function MyComponent() {
  const [groupBy, setGroupBy] = useState<string>("vision");

  return (
    <GroupBySelector
      options={groupOptions}
      defaultValue={groupBy}
      onChange={setGroupBy}
      size="small"
    />
  );
}
```

### 在 Timeline 中的集成

```typescript
// 在 TimelineNav 组件中
<Nav
  left={[
    <LogoBar logo={<Logo mode="FullColorNoText" />} title="Timeline" />,
    <GroupBySelector
      options={groupOptions}
      defaultValue={currentGroupBy}
      onChange={onGroupByChange}
      size="small"
    />,
  ]}
  right={[
    // 其他组件...
  ]}
/>
```

## 分组字段说明

支持按以下字段进行分组：

- **vision**: 按愿景分组 - 将具有相同愿景的 issues 归为一组
- **status**: 按状态分组 - 如 "Planning", "In Progress", "Completed" 等
- **team**: 按团队分组 - 如 "Tech", "Product", "Marketing" 等
- **priority**: 按优先级分组 - 如 "High", "Medium", "Low"

## 样式特性

### 颜色主题
- 使用 `color.scss` 中定义的颜色变量
- 支持深色模式自动适配
- 语义化的状态颜色（active、hover、selected）

### 动画效果
- 下拉菜单展开/收起的平滑动画
- 图标旋转动画
- Hover 状态的过渡效果

### 响应式设计
- 移动端适配
- 不同尺寸的自适应布局

## 交互特性

- **点击展开**: 点击触发器展开/收起下拉菜单
- **选项选择**: 点击选项即可选择并关闭菜单
- **外部点击**: 点击组件外部自动关闭菜单
- **视觉反馈**: 当前选中项带有勾选图标

## 无障碍支持

- 键盘导航支持
- 适当的 ARIA 标签
- 焦点管理
- 屏幕阅读器友好

## 示例文件

查看 `GroupBySelectorExample.tsx` 文件获取完整的使用示例。

## 与其他组件的关系

- **TimelineNav**: 在导航栏中使用此组件
- **Timeline**: 主要的时间线组件，接收分组变更事件
- **Page_Timeline**: 页面级组件，管理分组状态
- **groupIssuesByField**: 工具函数，实际执行分组逻辑 