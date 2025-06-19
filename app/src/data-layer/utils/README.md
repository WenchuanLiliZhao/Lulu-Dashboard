# Timeline Utils

## useIsTodayVisible Hook

这个自定义 Hook 用于检测今天的日期是否在 Timeline 的可视区域内。

### 功能特性

- ✅ 实时监听滚动事件
- ✅ 自动响应视图变化（如缩放级别改变）
- ✅ 性能优化的事件监听器管理
- ✅ 封装良好，使用简单

### 使用方法

```tsx
import { useIsTodayVisible } from './useIsTodayVisible';

// 在组件中使用（单行调用）
const isTodayVisible = useIsTodayVisible(containerRef, dayWidth, yearList, startMonth);

// 在BackToTodayButton中的实际应用
const BackToTodayButton = ({ containerRef, dayWidth, yearList, startMonth }) => {
  const isTodayVisible = useIsTodayVisible(containerRef, dayWidth, yearList, startMonth);
  
  return (
    <Button active={isTodayVisible}>
      Today
    </Button>
  );
};
```

### 参数说明

- `containerRef`: Timeline 容器的 React ref
- `dayWidth`: 每天的宽度（像素）
- `yearList`: 年份列表数组
- `startMonth`: 开始月份（0-based，0 = 一月）

### 返回值

返回一个 `boolean` 值：
- `true`: 今天的日期在可视区域内
- `false`: 今天的日期不在可视区域内

### 工作原理

1. 计算从 Timeline 开始到今天的总天数
2. 根据天数和 `dayWidth` 计算今天在 Timeline 中的像素位置
3. 获取当前可视区域的范围
4. 检测今天的格子是否与可视区域有重叠
5. 监听滚动事件，实时更新状态 

## 团队颜色系统 (TeamColors)

独立的团队颜色管理模块，提供统一的颜色配置和丰富的工具函数。

### 基本用法

```typescript
import { 
  getTeamColor, 
  getTeamVisual, 
  getTeamDisplayName, 
  getTeamEmoji,
  getTeamColorName 
} from './Utils/TeamColors';
// 或者
import { getTeamColor, getTeamVisual } from './Utils';

// 获取团队主色
const primaryColor = getTeamColor('Tech'); // "#06b6d4"

// 获取团队视觉配置
const visual = getTeamVisual('Tech');
// {
//   name: "技术团队",
//   emoji: "💻", 
//   color: "cyan"
// }

// 获取团队显示信息
const displayName = getTeamDisplayName('Tech'); // "技术团队"
const emoji = getTeamEmoji('Tech');             // "💻"
const colorName = getTeamColorName('Tech');     // "cyan"

// 颜色名称获取（用于 CSS 类名）
const colorName = getCSSVarFromColorName('cyan');     // "cyan"
const colorValue = getHexFromColorName('cyan');       // "cyan" (向后兼容)
const teamColorName = getTeamColorName('Tech');       // "cyan"

// 获取完整主题样式
const theme = getTeamTheme('Tech');
// {
//   primary: "#06b6d4",
//   primaryLight: "rgba(6, 182, 212, 0.1)",
//   primaryMedium: "rgba(6, 182, 212, 0.3)",
//   textOnPrimary: "#ffffff",
//   border: "#06b6d4",
//   background: "rgba(6, 182, 212, 0.05)"
// }
```

### 在组件中使用

```tsx
import React from 'react';
import { 
  getTeamColorName, 
  getTeamVisual,
  getTeamDisplayName,
  getTeamEmoji 
} from './Utils/TeamColors';
import type { IssueShape } from './Utils/Shapes';

// 使用 CSS 类名的方式（推荐）
const TimelineItem: React.FC<{ issue: IssueShape }> = ({ issue }) => {
  const colorName = getTeamColorName(issue.team); // 获取颜色名称如 "cyan"
  
  return (
    <div className={`timeline-item team-color-${colorName}`}>
      {issue.name}
    </div>
  );
};

// 使用视觉配置的丰富展示
const RichTimelineItem: React.FC<{ issue: IssueShape }> = ({ issue }) => {
  const visual = getTeamVisual(issue.team);
  const colorName = getTeamColorName(issue.team);
  
  return (
    <div className={`timeline-item team-color-${colorName}`}>
      <div className="team-info">
        <span className="team-emoji">{visual.emoji}</span>
        <span className="team-name">{visual.name}</span>
      </div>
      <div className="issue-name">{issue.name}</div>
    </div>
  );
};
```

对应的 SCSS 示例：
```scss
.timeline-item {
  &.team-color-red {
    border-left: 3px solid var(--color-team-red);
    background-color: rgba(var(--color-team-red-rgb), 0.05);
  }
  
  &.team-color-blue {
    border-left: 3px solid var(--color-team-blue);
    background-color: rgba(var(--color-team-blue-rgb), 0.05);
  }
  
  // ... 其他颜色
}
```

### 可用颜色变体

```typescript
import { getTeamColorVariant, TeamColorVariants } from './Utils/TeamColors';

// 使用预设变体
const subtleColor = getTeamColorVariant('Tech', 'subtle'); // 5% 透明度
const lightColor = getTeamColorVariant('Tech', 'light');   // 10% 透明度
const mediumColor = getTeamColorVariant('Tech', 'medium'); // 30% 透明度
const strongColor = getTeamColorVariant('Tech', 'strong'); // 60% 透明度
const solidColor = getTeamColorVariant('Tech', 'solid');   // 100% 不透明
```

### 工具函数列表

- `getTeamColor(team)` - 获取团队主色
- `getTeamColorWithAlpha(team, alpha)` - 获取带透明度的颜色
- `getTeamStyles(team)` - 获取基础样式对象
- `getTeamTheme(team)` - 获取完整主题样式
- `getAllTeamColors()` - 获取所有团队颜色列表
- `getContrastTextColor(team)` - 获取对比文字颜色
- `getTeamColorVariant(team, variant)` - 根据预设变体获取颜色
- `getCSSVarFromColorName(colorName)` - 从颜色名称获取颜色名称（用于 CSS 类名）
- `getColorNameFromColorName(colorName)` - 从颜色名称获取颜色名称
- `isColorDark(hexColor)` - 检查颜色是否为深色

### 🎨 智能颜色管理

团队颜色现在**自动与 `Team` 对象同步**！无需手动维护两个地方。

#### 工作原理

1. **自动生成**: 颜色映射从 `Team` 对象自动生成
2. **调色板分配**: 未指定的团队自动从预定义调色板获取颜色
3. **自定义优先**: 可为特定团队指定自定义颜色

#### 查看当前映射

```typescript
import { debugTeamVisuals, debugTeamColors } from './Utils/TeamColors';

// 在控制台查看当前团队视觉配置
debugTeamVisuals();

// 在控制台查看当前团队颜色映射（向后兼容）
debugTeamColors();
```

### 🔧 管理团队颜色

#### 方法1：自动分配（推荐）

在 `Shapes.ts` 中添加新团队，颜色会自动分配：

```typescript
// Shapes.ts
export const Team = {
  // ... 现有团队
  "新团队": "新团队",
} as const;
```

颜色会从预定义调色板自动分配，无需额外配置！

#### 方法2：自定义特定团队视觉配置

在 `TeamColors.ts` 的 `CustomTeamVisual` 中指定：

```typescript
// TeamColors.ts
const CustomTeamVisual: Partial<Record<TeamType, TeamVisual>> = {
  "Tech": {
    name: "技术团队",
    emoji: "💻", 
    color: "cyan"
  },
  "Brand Marketing": {
    name: "品牌营销",
    emoji: "🎨",
    color: "pink"
  },
  "新团队": {
    name: "新团队显示名",
    emoji: "✨",
    color: "purple"
  },
};
```

#### 方法3：扩展颜色和 Emoji 调色板

为更多团队提供更多选择：

```typescript
// TeamColors.ts

// 扩展颜色调色板
const ColorNameMap = {
  red: "#ef4444",
  blue: "#3b82f6",
  // ... 现有颜色
  "new-color": "#新颜色hex值", // 添加新颜色名称
} as const;

// 扩展默认调色板
const DefaultColorPalette: ColorName[] = [
  "indigo", "red", "amber", 
  // ... 现有颜色
  "new-color", // 使用新颜色
];

// 扩展 Emoji 调色板
const DefaultEmojiPalette = [
  "⭐", "🔥", "⚡",
  // ... 现有 emoji
  "🎉", "🌈", // 添加新 emoji
];
```

### 🎨 CSS 类名系统

团队颜色现在使用简洁的 CSS 类名系统，将样式逻辑完全分离到 CSS 层：

```typescript
// TypeScript 只负责提供颜色名称
const colorName = getTeamColorName('Tech'); // "cyan"

// 在 JSX 中使用 CSS 类名
<div className={`timeline-item team-color-${colorName}`}>
```

```scss
// 在 SCSS 中定义具体的颜色样式
.timeline-item {
  &.team-color-red {
    border-left: 3px solid var(--color-team-red);
    background-color: rgba(var(--color-team-red-rgb), 0.05);
    
    &:hover {
      background-color: rgba(var(--color-team-red-rgb), 0.1);
    }
  }
  
  &.team-color-blue {
    border-left: 3px solid var(--color-team-blue);
    background-color: rgba(var(--color-team-blue-rgb), 0.05);
    
    &:hover {
      background-color: rgba(var(--color-team-blue-rgb), 0.1);
    }
  }
  
  // ... 其他颜色
}
```

颜色定义仍在 CSS 变量中，支持主题切换：
```scss
:root {
  // 梵高风格的团队颜色
  --color-team-red: #DC2626;
  --color-team-blue: #1E40AF;
  --color-team-cyan: #0891B2;
  // ... 更多颜色
}
```

### ✅ 优势

- 🔄 **自动同步**: 添加团队时颜色自动分配
- 🎯 **零维护**: 无需手动管理颜色映射
- 🎨 **样式分离**: TypeScript 只负责逻辑，SCSS 负责样式
- 🌓 **主题支持**: 支持明暗主题切换
- 🎭 **梵高配色**: 基于梵高画作的专业配色方案
- 📊 **调试友好**: 提供调试函数查看映射状态
- 🔒 **类型安全**: TypeScript 确保类型一致性
- ⚡ **性能优化**: CSS 类名比内联样式性能更好
- 🎯 **易维护**: 颜色逻辑集中在 SCSS 中管理 