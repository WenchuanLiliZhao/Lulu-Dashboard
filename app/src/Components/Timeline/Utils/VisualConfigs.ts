import { type ColorName, ColorNameMap } from './ColorName';
import { Team } from './Shapes';
import type { TeamType, StatusType, PriorityType } from './Shapes';
import { teamColors, getCssVar } from '../../../assets/global-style/css-variables';

// =============================================================================
// 通用视觉配置接口
// =============================================================================

export interface VisualConfig {
  name: string;        // 显示名称
  emoji: string;       // emoji 图标
  color: ColorName;    // 颜色名称（对应 CSS 变量）
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
    color: "cyan",
    description: "负责技术开发和基础设施"
  },
  "Brand Marketing": {
    name: Team["Brand Marketing"],
    emoji: "🎨", 
    color: "pink",
    description: "品牌推广和市场营销"
  },
  "Product": {
    name: Team["Product"],
    emoji: "🚀",
    color: "green",
    description: "产品规划和管理"
  },
  "E-com": {
    name: Team["E-com"],
    emoji: "🛒",
    color: "orange",
    description: "电子商务和在线销售"
  },
  "Retail": {
    name: Team["Retail"],
    emoji: "🏪",
    color: "red",
    description: "实体零售和门店运营"
  },
  "Function": {
    name: Team["Function"],
    emoji: "⚙️",
    color: "indigo",
    description: "支持性职能部门"
  },
  "Fulfillment": {
    name: Team["Fulfillment"],
    emoji: "📦",
    color: "purple",
    description: "订单履约和物流配送"
  },
  "Corporate": {
    name: Team["Corporate"],
    emoji: "🏢",
    color: "gray",
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
    color: "red",
    description: "需要立即关注的高风险项目"
  },
  "Manageable Risk": {
    name: "可管理风险",
    emoji: "⚠️",
    color: "amber",
    description: "存在风险但可控制的项目"
  },
  "On Track": {
    name: "正常进行",
    emoji: "✅",
    color: "green",
    description: "按计划顺利进行的项目"
  },
  "Not Yet Started": {
    name: "未开始",
    emoji: "⏳",
    color: "gray",
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
    color: "red",
    description: "需要优先处理的重要项目"
  },
  "Medium": {
    name: "中优先级", 
    emoji: "📋",
    color: "amber",
    description: "正常优先级的项目"
  },
  "Low": {
    name: "低优先级",
    emoji: "📝",
    color: "blue",
    description: "可以延后处理的项目"
  },
};

// =============================================================================
// 默认配置
// =============================================================================

// 默认颜色调色板（用于自动分配）
const DefaultColorPalette: ColorName[] = [
  "indigo", "red", "amber", "pink", "emerald", 
  "purple", "slate", "cyan", "orange", "lime", 
  "violet", "sky", "blue", "green", "yellow",
  "rose", "teal"
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
// 颜色映射（基于 CSS 变量）
// =============================================================================

// CSS 变量颜色映射函数
const getCSSVariableFromColorName = (colorName: ColorName): string => {
  const colorMap: Record<ColorName, string> = {
    red: getCssVar(teamColors.red.base),
    blue: getCssVar(teamColors.blue.base),
    green: getCssVar(teamColors.green.base),
    yellow: getCssVar(teamColors.yellow.base),
    purple: getCssVar(teamColors.purple.base),
    pink: getCssVar(teamColors.pink.base),
    indigo: getCssVar(teamColors.indigo.base),
    cyan: getCssVar(teamColors.cyan.base),
    orange: getCssVar(teamColors.orange.base),
    lime: getCssVar(teamColors.lime.base),
    violet: getCssVar(teamColors.violet.base),
    sky: getCssVar(teamColors.sky.base),
    gray: getCssVar(teamColors.gray.base),
    slate: getCssVar(teamColors.slate.base),
    emerald: getCssVar(teamColors.emerald.base),
    teal: getCssVar(teamColors.teal.base),
    amber: getCssVar(teamColors.amber.base),
    rose: getCssVar(teamColors.rose.base),
  };
  
  return colorMap[colorName] || getCssVar(teamColors.gray.base);
};

// 团队颜色映射
export const TeamColors = Object.fromEntries(
  Object.entries(TeamVisuals).map(([team, visual]) => [
    team, 
    getCSSVariableFromColorName(visual.color)
  ])
) as Record<TeamType, string>;

// 状态颜色映射
export const StatusColors = Object.fromEntries(
  Object.entries(StatusVisuals).map(([status, visual]) => [
    status,
    getCSSVariableFromColorName(visual.color)
  ])
) as Record<StatusType, string>;

// 优先级颜色映射
export const PriorityColors = Object.fromEntries(
  Object.entries(PriorityVisuals).map(([priority, visual]) => [
    priority,
    getCSSVariableFromColorName(visual.color)
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
    color: "gray"
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
    color: "gray"
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
    color: "gray"
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
// 新增：从 TeamColors.ts 合并的功能
// =============================================================================

// 获取颜色名称
export const getTeamColorName = (team: TeamType): ColorName => {
  return TeamVisuals[team]?.color || "gray";
};

// 从颜色名称获取字符串颜色值（用于向后兼容）
export const getColorNameFromColorName = (colorName: ColorName): string => {
  return ColorNameMap[colorName];
};

// 向后兼容：保留原函数名
export const getHexFromColorName = (colorName: ColorName): string => {
  return ColorNameMap[colorName];
};

// 向后兼容：保留原函数名 
export const getCSSVarFromColorName = (colorName: ColorName): string => {
  return ColorNameMap[colorName];
};

// 辅助函数：获取团队颜色的透明度变体
export const getTeamColorWithAlphaRGBA = (team: TeamType, alpha: number = 0.1): string => {
  const colorName = getTeamColorName(team);
  const hexColor = ColorNameMap[colorName];
  
  // 将 hex 颜色转换为 rgba
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// 辅助函数：生成团队相关的 CSS 样式对象
export const getTeamStyles = (team: TeamType) => ({
  backgroundColor: getTeamColorWithAlphaRGBA(team, 0.1),
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

// 辅助函数：检查颜色是否为深色（用于自动选择文字颜色）
export const isColorDark = (hexColor: string): boolean => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // 计算亮度值 (0-255)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

// 辅助函数：获取对比文字颜色（白色或黑色）
export const getContrastTextColor = (team: TeamType): string => {
  const colorName = getTeamColorName(team);
  const hexColor = ColorNameMap[colorName];
  return isColorDark(hexColor) ? '#ffffff' : '#000000';
};

// 辅助函数：生成完整的团队主题样式
export const getTeamTheme = (team: TeamType) => ({
  primary: getTeamColor(team),
  primaryLight: getTeamColorWithAlphaRGBA(team, 0.1),
  primaryMedium: getTeamColorWithAlphaRGBA(team, 0.3),
  textOnPrimary: getContrastTextColor(team),
  border: getTeamColor(team),
  background: getTeamColorWithAlphaRGBA(team, 0.05),
});

// 预设的颜色变体
export const TeamColorVariants = {
  subtle: 0.05,
  light: 0.1,
  medium: 0.3,
  strong: 0.6,
  solid: 1.0,
} as const;

// 辅助函数：根据预设变体获取颜色
export const getTeamColorVariant = (
  team: TeamType, 
  variant: keyof typeof TeamColorVariants
): string => {
  return getTeamColorWithAlphaRGBA(team, TeamColorVariants[variant]);
};

// 调试函数：打印当前团队颜色映射（向后兼容）
export const debugTeamColors = () => {
  console.table(
    Object.entries(TeamColors).map(([team, color]) => ({
      Team: team,
      Color: color,
      Source: CustomTeamVisuals[team as TeamType] ? 'Custom' : 'Auto-generated'
    }))
  );
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
      ColorName: visual.color,
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
      ColorName: visual.color,
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
      ColorName: visual.color,
      CSSVar: PriorityColors[key as PriorityType],
      Description: visual.description
    }))
  );
  console.groupEnd();
  
  console.groupEnd();
};

// =============================================================================
// 向后兼容（保留原有接口）
// =============================================================================

// 保持与原 TeamColors.ts 的兼容性（已在上面定义）

// 获取团队颜色（保持向后兼容，alpha 参数暂时保留但不使用）
export const getTeamColorWithAlpha = (team: TeamType): string => {
  const color = getTeamColor(team);
  // 这里返回 CSS 变量，浏览器会处理透明度
  return color; // 如果需要透明度，建议使用 CSS 的 color-mix 或单独的透明度变量
};

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