import { type ColorName, ColorNameMap } from './ColorName';
import { Team } from './Shapes';
import type { TeamType } from './Shapes';

// 团队视觉配置接口
export interface TeamVisual {
  name: string;        // 团队显示名称
  emoji: string;       // 团队 emoji
  color: ColorName;    // 颜色名称
}

// 特殊团队的自定义视觉配置（可选）
const CustomTeamVisual: Partial<Record<TeamType, TeamVisual>> = {
  "Tech": {
    name: Team["Tech"],
    emoji: "💻",
    color: "cyan"
  },
  "Brand Marketing": {
    name: Team["Brand Marketing"],
    emoji: "🎨",
    color: "pink"
  },
  "Product": {
    name: Team["Product"], 
    emoji: "🚀",
    color: "green"
  },
  "E-com": {
    name: Team["E-com"],
    emoji: "🛒",
    color: "orange"
  },
  "Retail": {
    name: Team["Retail"],
    emoji: "🏪",
    color: "red"
  },
  "Function": {
    name: Team["Function"],
    emoji: "⚙️",
    color: "indigo"
  },
  "Fulfillment": {
    name: Team["Fulfillment"],
    emoji: "📦",
    color: "purple"
  },
  "Corporate": {
    name: Team["Corporate"],
    emoji: "🏢",
    color: "gray"
  },
};

// 默认颜色调色板（用于自动分配）
const DefaultColorPalette: ColorName[] = [
  "indigo", "red", "amber", "pink", "emerald", 
  "purple", "slate", "cyan", "orange", "lime", 
  "violet", "sky"
];

// 默认 emoji 调色板（用于自动分配）  
const DefaultEmojiPalette = [
  "⭐", "🔥", "⚡", "🎯", "💎", "🌟", 
  "🚀", "⚙️", "🎨", "📊", "🔧", "💡"
];

// 自动生成团队视觉配置
function generateTeamVisuals(): Record<TeamType, TeamVisual> {
  const teamKeys = Object.keys(Team) as TeamType[];
  const visuals: Record<string, TeamVisual> = {};
  
  teamKeys.forEach((team, index) => {
    // 优先使用自定义配置，否则自动生成
    if (CustomTeamVisual[team]) {
      visuals[team] = CustomTeamVisual[team]!;
    } else {
      visuals[team] = {
        name: team, // 默认使用原始团队名称
        emoji: DefaultEmojiPalette[index % DefaultEmojiPalette.length],
        color: DefaultColorPalette[index % DefaultColorPalette.length],
      };
    }
  });
  
  return visuals as Record<TeamType, TeamVisual>;
}

// 团队视觉配置映射 - 自动与 Team 对象同步
export const TeamVisuals = generateTeamVisuals();

// 团队颜色映射（向后兼容）
export const TeamColors = Object.fromEntries(
  Object.entries(TeamVisuals).map(([team, visual]) => [
    team, 
    ColorNameMap[visual.color]
  ])
) as Record<TeamType, string>;

// 类型定义
export type TeamColorType = typeof TeamColors;
export type TeamVisualsType = typeof TeamVisuals;

// 辅助函数：获取团队颜色名称
export const getTeamColor = (team: TeamType): string => {
  return TeamColors[team] || ColorNameMap.gray;
};

// 新增：获取团队视觉配置
export const getTeamVisual = (team: TeamType): TeamVisual => {
  return TeamVisuals[team] || {
    name: team,
    emoji: "⭐",
    color: "gray"
  };
};

// 新增：获取团队显示名称
export const getTeamDisplayName = (team: TeamType): string => {
  return TeamVisuals[team]?.name || team;
};

// 新增：获取团队 emoji
export const getTeamEmoji = (team: TeamType): string => {
  return TeamVisuals[team]?.emoji || "⭐";
};

// 新增：获取颜色名称
export const getTeamColorName = (team: TeamType): ColorName => {
  return TeamVisuals[team]?.color || "gray";
};

// 新增：从颜色名称获取颜色名称（用于 CSS 类名）
export const getColorNameFromColorName = (colorName: ColorName): string => {
  return ColorNameMap[colorName];
};

// 向后兼容：保留原函数名，但现在返回颜色名称
export const getHexFromColorName = (colorName: ColorName): string => {
  return ColorNameMap[colorName];
};

// 向后兼容：保留原函数名，但现在返回颜色名称
export const getCSSVarFromColorName = (colorName: ColorName): string => {
  return ColorNameMap[colorName];
};

// 辅助函数：获取团队颜色的透明度变体
export const getTeamColorWithAlpha = (team: TeamType, alpha: number = 0.1): string => {
  const color = getTeamColor(team);
  // 将 hex 颜色转换为 rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// 辅助函数：生成团队相关的 CSS 样式对象
export const getTeamStyles = (team: TeamType) => ({
  backgroundColor: getTeamColorWithAlpha(team, 0.1),
  borderColor: getTeamColor(team),
  color: getTeamColor(team),
});

// 辅助函数：获取所有团队颜色列表（用于图例等）
export const getAllTeamColors = (): Array<{ team: TeamType; color: string }> => {
  return Object.keys(TeamColors).map(team => ({
    team: team as TeamType,
    color: getTeamColor(team as TeamType),
  }));
};

// 新增：获取所有团队视觉配置列表
export const getAllTeamVisuals = (): Array<{ team: TeamType; visual: TeamVisual }> => {
  return Object.keys(TeamVisuals).map(team => ({
    team: team as TeamType,
    visual: getTeamVisual(team as TeamType),
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
  const color = getTeamColor(team);
  return isColorDark(color) ? '#ffffff' : '#000000';
};

// 辅助函数：生成完整的团队主题样式
export const getTeamTheme = (team: TeamType) => ({
  primary: getTeamColor(team),
  primaryLight: getTeamColorWithAlpha(team, 0.1),
  primaryMedium: getTeamColorWithAlpha(team, 0.3),
  textOnPrimary: getContrastTextColor(team),
  border: getTeamColor(team),
  background: getTeamColorWithAlpha(team, 0.05),
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
  return getTeamColorWithAlpha(team, TeamColorVariants[variant]);
};

// 调试函数：打印当前团队视觉映射
export const debugTeamVisuals = () => {
  console.table(
    Object.entries(TeamVisuals).map(([team, visual]) => ({
      Team: team,
      Name: visual.name,
      Emoji: visual.emoji,
      ColorName: visual.color,
      ColorHex: ColorNameMap[visual.color],
      Source: CustomTeamVisual[team as TeamType] ? 'Custom' : 'Auto-generated'
    }))
  );
};

// 调试函数：打印当前团队颜色映射（向后兼容）
export const debugTeamColors = () => {
  console.table(
    Object.entries(TeamColors).map(([team, color]) => ({
      Team: team,
      Color: color,
      Source: CustomTeamVisual[team as TeamType] ? 'Custom' : 'Auto-generated'
    }))
  );
}; 