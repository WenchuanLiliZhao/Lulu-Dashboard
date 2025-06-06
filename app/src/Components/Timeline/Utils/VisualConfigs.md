# Visual Configurations 视觉配置系统

## 概述
`VisualConfigs.ts` 是一个统一的视觉配置管理系统，用于管理 Teams、Status 和 Priority 的颜色、emoji 和显示名称。

## 特性
- 🎨 **统一的颜色管理**：所有颜色都基于全局 CSS 变量系统
- 📝 **易于修改**：集中配置，方便日后调整
- 🔄 **向后兼容**：保持与现有 `TeamColors.ts` 的兼容性
- 🌍 **多语言支持**：支持中文显示名称
- 🎯 **类型安全**：完整的 TypeScript 类型定义

## 快速开始

### 1. 获取颜色
```typescript
import { getTeamColor, getStatusColor, getPriorityColor } from './VisualConfigs';

// 团队颜色
const techColor = getTeamColor('Tech');           // 'var(--color-team-cyan)'
const retailColor = getTeamColor('Retail');       // 'var(--color-team-red)'

// 状态颜色  
const highRiskColor = getStatusColor('High Risks');      // 'var(--color-team-red)'
const onTrackColor = getStatusColor('On Track');         // 'var(--color-team-green)'

// 优先级颜色
const highPriorityColor = getPriorityColor('High');      // 'var(--color-team-red)'
```

### 2. 获取完整视觉配置
```typescript
import { getTeamVisual, getStatusVisual } from './VisualConfigs';

const techVisual = getTeamVisual('Tech');
// { name: "技术团队", emoji: "💻", color: "cyan", description: "..." }

const highRiskVisual = getStatusVisual('High Risks');
// { name: "高风险", emoji: "🚨", color: "red", description: "..." }
```

### 3. 获取显示名称和 Emoji
```typescript
import { 
  getTeamDisplayName, 
  getTeamEmoji,
  getStatusDisplayName,
  getStatusEmoji 
} from './VisualConfigs';

const teamName = getTeamDisplayName('Tech');      // "技术团队"
const teamEmoji = getTeamEmoji('Tech');           // "💻"
const statusName = getStatusDisplayName('High Risks');  // "高风险"
const statusEmoji = getStatusEmoji('High Risks');       // "🚨"
```

## 配置修改

### 修改团队配置
在 `CustomTeamVisuals` 对象中添加或修改配置：

```typescript
const CustomTeamVisuals: Partial<Record<TeamType, VisualConfig>> = {
  "Tech": {
    name: "技术团队",           // 修改显示名称
    emoji: "💻",               // 修改 emoji
    color: "cyan",             // 修改颜色（必须是 ColorName 类型）
    description: "负责技术开发和基础设施"  // 添加描述
  },
  // 添加新团队配置...
};
```

### 修改状态配置
在 `CustomStatusVisuals` 对象中修改：

```typescript
const CustomStatusVisuals: Record<StatusType, VisualConfig> = {
  "High Risks": {
    name: "高风险",
    emoji: "🚨",
    color: "red",              // 可选：red, amber, green, blue, gray 等
    description: "需要立即关注的高风险项目"
  },
  // 其他状态配置...
};
```

### 修改优先级配置
在 `CustomPriorityVisuals` 对象中修改：

```typescript
const CustomPriorityVisuals: Record<PriorityType, VisualConfig> = {
  "High": {
    name: "高优先级",
    emoji: "🔥",
    color: "red",
    description: "需要优先处理的重要项目"
  },
  // 其他优先级配置...
};
```

## 可用颜色
支持的颜色名称（对应 CSS 变量系统）：
- `red`, `blue`, `green`, `yellow`
- `purple`, `pink`, `indigo`, `cyan`
- `orange`, `lime`, `violet`, `sky`
- `gray`, `slate`, `emerald`, `teal`
- `amber`, `rose`

## 调试工具
```typescript
import { debugAllVisuals } from './VisualConfigs';

// 在浏览器控制台查看所有配置
debugAllVisuals();
```

## 迁移指南

### 从旧的 TeamColors.ts 迁移
```typescript
// 旧的方式
import { getTeamColor } from './TeamColors';

// 新的方式（完全兼容）
import { getTeamColor } from './VisualConfigs';
```

### 从 sidebarFunctions.ts 迁移状态颜色
```typescript
// 旧的方式
const getStatusColor = (statusName: string): string => {
  switch (statusName) {
    case Status["High Risks"]:
      return getCssVar(semanticColors.error.primary);
    // ...
  }
};

// 新的方式
import { getStatusColor } from './VisualConfigs';
const color = getStatusColor(statusName as StatusType);
```

## 类型定义
```typescript
export interface VisualConfig {
  name: string;        // 显示名称
  emoji: string;       // emoji 图标
  color: ColorName;    // 颜色名称
  description?: string; // 可选描述
}

export type TeamType = "Tech" | "Brand Marketing" | "Product" | ...;
export type StatusType = "High Risks" | "Manageable Risk" | "On Track" | "Not Yet Started";
export type PriorityType = "High" | "Medium" | "Low";
```

## 最佳实践

1. **统一使用新的配置系统**：避免在多个地方重复定义颜色映射
2. **使用语义化的颜色**：状态用红色表示风险，绿色表示正常等
3. **保持一致性**：相同类型的项目使用相同的视觉风格
4. **定期检查**：使用 `debugAllVisuals()` 确保配置正确

## 注意事项

- 所有颜色都基于 CSS 变量，支持主题切换
- 如果添加新的 Team/Status/Priority，需要在对应的 `Shapes.ts` 中先定义
- 颜色名称必须在 `ColorName` 类型中存在
- 自动生成的配置会按照 `DefaultColorPalette` 顺序分配颜色 