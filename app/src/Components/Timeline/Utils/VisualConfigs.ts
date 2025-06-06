import { Team } from './Shapes';
import type { TeamType, StatusType, PriorityType } from './Shapes';
import { teamColors, getCssVar } from '../../../assets/global-style/css-variables';
import type { ColorName } from './ColorName';

// =============================================================================
// 通用视觉配置接口
// =============================================================================

export interface VisualConfig {
  name: string;        // 显示名称
  emoji: string;       // emoji 图标
  color: string;       // CSS 变量字符串
  description?: string; // 可选描述
}

// =============================================================================
// TEAMS 视觉配置
// =============================================================================

// 团队自定义视觉配置
const CustomTeamVisuals: Partial<Record<TeamType, VisualConfig>> = {
  "Tech": {
    name: Team["Tech"],
    emoji: "💻",
    color: getCssVar(teamColors.cyan.base),
    description: "负责技术开发和基础设施"
  },
  "Brand Marketing": {
    name: Team["Brand Marketing"],
    emoji: "🎨", 
    color: getCssVar(teamColors.pink.base),
    description: "品牌推广和市场营销"
  },
  "Product": {
    name: Team["Product"],
    emoji: "🚀",
    color: getCssVar(teamColors.green.base),
    description: "产品规划和管理"
  },
  "E-com": {
    name: Team["E-com"],
    emoji: "🛒",
    color: getCssVar(teamColors.orange.base),
    description: "电子商务和在线销售"
  },
  "Retail": {
    name: Team["Retail"],
    emoji: "🏪",
    color: getCssVar(teamColors.red.base),
    description: "实体零售和门店运营"
  },
  "Function": {
    name: Team["Function"],
    emoji: "⚙️",
    color: getCssVar(teamColors.indigo.base),
    description: "支持性职能部门"
  },
  "Fulfillment": {
    name: Team["Fulfillment"],
    emoji: "📦",
    color: getCssVar(teamColors.purple.base),
    description: "订单履约和物流配送"
  },
  "Corporate": {
    name: Team["Corporate"],
    emoji: "🏢",
    color: getCssVar(teamColors.gray.base),
    description: "企业管理和战略规划"
  },
};

// =============================================================================
// STATUS 视觉配置
// =============================================================================

// 状态自定义视觉配置
const CustomStatusVisuals: Record<StatusType, VisualConfig> = {
  "High Risks": {
    name: "高风险",
    emoji: "🚨",
    color: getCssVar(teamColors.red.base),
    description: "需要立即关注的高风险项目"
  },
  "Manageable Risk": {
    name: "可管理风险",
    emoji: "⚠️",
    color: getCssVar(teamColors.amber.base),
    description: "存在风险但可控制的项目"
  },
  "On Track": {
    name: "正常进行",
    emoji: "✅",
    color: getCssVar(teamColors.green.base),
    description: "按计划顺利进行的项目"
  },
  "Not Yet Started": {
    name: "未开始",
    emoji: "⏳",
    color: getCssVar(teamColors.gray.base),
    description: "尚未启动的项目"
  },
};

// =============================================================================
// PRIORITY 视觉配置
// =============================================================================

// 优先级自定义视觉配置
const CustomPriorityVisuals: Record<PriorityType, VisualConfig> = {
  "High": {
    name: "高优先级",
    emoji: "🔥",
    color: getCssVar(teamColors.red.base),
    description: "需要优先处理的重要项目"
  },
  "Medium": {
    name: "中优先级", 
    emoji: "📋",
    color: getCssVar(teamColors.amber.base),
    description: "正常优先级的项目"
  },
  "Low": {
    name: "低优先级",
    emoji: "📝",
    color: getCssVar(teamColors.blue.base),
    description: "可以延后处理的项目"
  },
};

// =============================================================================
// 默认配置
// =============================================================================

// 默认颜色调色板（用于自动分配）
const DefaultColorPalette: string[] = [
  getCssVar(teamColors.indigo.base), 
  getCssVar(teamColors.red.base), 
  getCssVar(teamColors.amber.base), 
  getCssVar(teamColors.pink.base), 
  getCssVar(teamColors.emerald.base), 
  getCssVar(teamColors.purple.base), 
  getCssVar(teamColors.slate.base), 
  getCssVar(teamColors.cyan.base), 
  getCssVar(teamColors.orange.base), 
  getCssVar(teamColors.lime.base), 
  getCssVar(teamColors.violet.base), 
  getCssVar(teamColors.sky.base), 
  getCssVar(teamColors.blue.base), 
  getCssVar(teamColors.green.base), 
  getCssVar(teamColors.yellow.base),
  getCssVar(teamColors.rose.base), 
  getCssVar(teamColors.teal.base)
];

// 默认 emoji 调色板（用于自动分配）
const DefaultEmojiPalette = [
  "⭐", "🔥", "⚡", "🎯", "💎", "🌟", 
  "🚀", "⚙️", "🎨", "📊", "🔧", "💡",
  "📈", "🎪", "🎭", "🎬", "🎵"
];

// =============================================================================
// 自动生成函数
// =============================================================================

// 自动生成团队视觉配置
function generateTeamVisuals(): Record<TeamType, VisualConfig> {
  const teamKeys = Object.keys(Team) as TeamType[];
  const visuals: Record<string, VisualConfig> = {};
  
  teamKeys.forEach((team, index) => {
    if (CustomTeamVisuals[team]) {
      visuals[team] = CustomTeamVisuals[team]!;
    } else {
      visuals[team] = {
        name: team,
        emoji: DefaultEmojiPalette[index % DefaultEmojiPalette.length],
        color: DefaultColorPalette[index % DefaultColorPalette.length],
      };
    }
  });
  
  return visuals as Record<TeamType, VisualConfig>;
}

// =============================================================================
// 导出的视觉配置对象
// =============================================================================

export const TeamVisuals = generateTeamVisuals();
export const StatusVisuals = CustomStatusVisuals;
export const PriorityVisuals = CustomPriorityVisuals;

// =============================================================================
// 颜色映射
// =============================================================================

// 团队颜色映射
export const TeamColors = Object.fromEntries(
  Object.entries(TeamVisuals).map(([team, visual]) => [
    team, 
    visual.color
  ])
) as Record<TeamType, string>;

// 状态颜色映射
export const StatusColors = Object.fromEntries(
  Object.entries(StatusVisuals).map(([status, visual]) => [
    status,
    visual.color
  ])
) as Record<StatusType, string>;

// 优先级颜色映射
export const PriorityColors = Object.fromEntries(
  Object.entries(PriorityVisuals).map(([priority, visual]) => [
    priority,
    visual.color
  ])
) as Record<PriorityType, string>;

// =============================================================================
// 获取函数
// =============================================================================

// 团队相关获取函数
export const getTeamVisual = (team: TeamType): VisualConfig => {
  return TeamVisuals[team] || {
    name: team,
    emoji: "⭐",
    color: getCssVar(teamColors.gray.base)
  };
};

export const getTeamColor = (team: TeamType): string => {
  return TeamColors[team] || getCssVar(teamColors.gray.base);
};

export const getTeamDisplayName = (team: TeamType): string => {
  return TeamVisuals[team]?.name || team;
};

export const getTeamEmoji = (team: TeamType): string => {
  return TeamVisuals[team]?.emoji || "⭐";
};

// 状态相关获取函数
export const getStatusVisual = (status: StatusType): VisualConfig => {
  return StatusVisuals[status] || {
    name: status,
    emoji: "❓",
    color: getCssVar(teamColors.gray.base)
  };
};

export const getStatusColor = (status: StatusType): string => {
  return StatusColors[status] || getCssVar(teamColors.gray.base);
};

export const getStatusDisplayName = (status: StatusType): string => {
  return StatusVisuals[status]?.name || status;
};

export const getStatusEmoji = (status: StatusType): string => {
  return StatusVisuals[status]?.emoji || "❓";
};

// 优先级相关获取函数
export const getPriorityVisual = (priority: PriorityType): VisualConfig => {
  return PriorityVisuals[priority] || {
    name: priority,
    emoji: "📋",
    color: getCssVar(teamColors.gray.base)
  };
};

export const getPriorityColor = (priority: PriorityType): string => {
  return PriorityColors[priority] || getCssVar(teamColors.gray.base);
};

export const getPriorityDisplayName = (priority: PriorityType): string => {
  return PriorityVisuals[priority]?.name || priority;
};

export const getPriorityEmoji = (priority: PriorityType): string => {
  return PriorityVisuals[priority]?.emoji || "📋";
};

// =============================================================================
// 辅助函数
// =============================================================================

// 向后兼容：获取颜色名称（从CSS变量字符串中提取颜色名称）
export const getTeamColorName = (team: TeamType): ColorName => {
  const visual = getTeamVisual(team);
  // 从CSS变量字符串中提取颜色名称（简化版本）
  if (visual.color.includes('cyan')) return 'cyan';
  if (visual.color.includes('pink')) return 'pink';
  if (visual.color.includes('green')) return 'green';
  if (visual.color.includes('orange')) return 'orange';
  if (visual.color.includes('red')) return 'red';
  if (visual.color.includes('indigo')) return 'indigo';
  if (visual.color.includes('purple')) return 'purple';
  if (visual.color.includes('gray')) return 'gray';
  if (visual.color.includes('amber')) return 'amber';
  if (visual.color.includes('blue')) return 'blue';
  if (visual.color.includes('yellow')) return 'yellow';
  if (visual.color.includes('emerald')) return 'emerald';
  if (visual.color.includes('lime')) return 'lime';
  if (visual.color.includes('violet')) return 'violet';
  if (visual.color.includes('sky')) return 'sky';
  if (visual.color.includes('slate')) return 'slate';
  if (visual.color.includes('teal')) return 'teal';
  if (visual.color.includes('rose')) return 'rose';
  return 'gray';
};

// 向后兼容：原函数名别名
export const getTeamColorWithAlpha = (team: TeamType): string => {
  return getTeamColor(team);
};

// 向后兼容：从颜色名称获取十六进制颜色（简化版本）
export const getHexFromColorName = (colorName: string): string => {
  // 返回CSS变量，浏览器会解析
  return `var(--color-team-${colorName})`;
};

// 向后兼容：从颜色名称获取CSS变量
export const getCSSVarFromColorName = (colorName: string): string => {
  return `var(--color-team-${colorName})`;
};

// 向后兼容：颜色名称映射
export const getColorNameFromColorName = (colorName: string): string => {
  return colorName;
};

// 向后兼容：颜色变体获取
export const getTeamColorVariant = (team: TeamType, variant: string): string => {
  const baseColor = getTeamColor(team);
  switch (variant) {
    case 'subtle': return `color-mix(in srgb, ${baseColor} 5%, transparent)`;
    case 'light': return `color-mix(in srgb, ${baseColor} 10%, transparent)`;
    case 'medium': return `color-mix(in srgb, ${baseColor} 30%, transparent)`;
    case 'strong': return `color-mix(in srgb, ${baseColor} 60%, transparent)`;
    case 'solid': return baseColor;
    default: return baseColor;
  }
};

// 向后兼容：调试函数
export const debugTeamColors = () => {
  console.table(
    Object.entries(TeamColors).map(([team, color]) => ({
      Team: team,
      Color: color,
      Source: CustomTeamVisuals[team as TeamType] ? 'Custom' : 'Auto-generated'
    }))
  );
};

// 辅助函数：获取团队颜色的透明度变体
export const getTeamColorWithAlphaRGBA = (team: TeamType, alpha: number = 0.1): string => {
  // 对于CSS变量，建议使用CSS的color-mix或透明度变量
  // 这里返回原色，透明度应该在CSS中处理
  return `color-mix(in srgb, ${getTeamColor(team)} ${alpha * 100}%, transparent)`;
};

// 辅助函数：生成团队相关的 CSS 样式对象
export const getTeamStyles = (team: TeamType) => ({
  backgroundColor: `color-mix(in srgb, ${getTeamColor(team)} 10%, transparent)`,
  borderColor: getTeamColor(team),
  color: getTeamColor(team),
});

// 辅助函数：获取所有团队颜色列表（用于图例等）
export const getAllTeamColors = (): Array<{ team: TeamType; color: string }> => {
  return Object.keys(TeamVisuals).map(team => ({
    team: team as TeamType,
    color: getTeamColor(team as TeamType),
  }));
};

// 辅助函数：生成完整的团队主题样式
export const getTeamTheme = (team: TeamType) => ({
  primary: getTeamColor(team),
  primaryLight: `color-mix(in srgb, ${getTeamColor(team)} 10%, white)`,
  primaryMedium: `color-mix(in srgb, ${getTeamColor(team)} 30%, white)`,
  border: getTeamColor(team),
  background: `color-mix(in srgb, ${getTeamColor(team)} 5%, white)`,
});

// 获取所有配置列表
export const getAllTeamVisuals = (): Array<{ team: TeamType; visual: VisualConfig }> => {
  return Object.keys(TeamVisuals).map(team => ({
    team: team as TeamType,
    visual: getTeamVisual(team as TeamType),
  }));
};

export const getAllStatusVisuals = (): Array<{ status: StatusType; visual: VisualConfig }> => {
  return Object.keys(StatusVisuals).map(status => ({
    status: status as StatusType,
    visual: getStatusVisual(status as StatusType),
  }));
};

export const getAllPriorityVisuals = (): Array<{ priority: PriorityType; visual: VisualConfig }> => {
  return Object.keys(PriorityVisuals).map(priority => ({
    priority: priority as PriorityType,
    visual: getPriorityVisual(priority as PriorityType),
  }));
};

// =============================================================================
// 调试函数
// =============================================================================

export const debugAllVisuals = () => {
  console.group('🎨 Visual Configurations Debug');
  
  console.group('👥 Teams');
  console.table(
    Object.entries(TeamVisuals).map(([key, visual]) => ({
      Key: key,
      Name: visual.name,
      Emoji: visual.emoji,
      Color: visual.color,
      CSSVar: TeamColors[key as TeamType],
      Source: CustomTeamVisuals[key as TeamType] ? 'Custom' : 'Auto-generated'
    }))
  );
  console.groupEnd();
  
  console.group('📊 Statuses');
  console.table(
    Object.entries(StatusVisuals).map(([key, visual]) => ({
      Key: key,
      Name: visual.name,
      Emoji: visual.emoji,
      Color: visual.color,
      CSSVar: StatusColors[key as StatusType],
      Description: visual.description
    }))
  );
  console.groupEnd();
  
  console.group('⚡ Priorities');
  console.table(
    Object.entries(PriorityVisuals).map(([key, visual]) => ({
      Key: key,
      Name: visual.name,
      Emoji: visual.emoji,
      Color: visual.color,
      CSSVar: PriorityColors[key as PriorityType],
      Description: visual.description
    }))
  );
  console.groupEnd();
  
  console.groupEnd();
};

// =============================================================================
// 类型定义
// =============================================================================

export type TeamColorType = typeof TeamColors;
export type StatusColorType = typeof StatusColors;
export type PriorityColorType = typeof PriorityColors;

export type TeamVisualsType = typeof TeamVisuals;
export type StatusVisualsType = typeof StatusVisuals;
export type PriorityVisualsType = typeof PriorityVisuals; 