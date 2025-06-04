// 导出数据结构和类型
export * from './Shapes';

// 导出团队颜色相关功能
export * from './TeamColors';

// 重新导出常用的组合
export type { TeamType } from './Shapes';
export type { TeamVisual, ColorName } from './TeamColors';
export { 
  // 颜色相关（向后兼容）
  getTeamColor, 
  getTeamColorWithAlpha, 
  getTeamStyles,
  getAllTeamColors,
  getTeamTheme,
  getTeamColorVariant,
  
  // 新增：视觉配置相关
  getTeamVisual,
  getTeamDisplayName,
  getTeamEmoji,
  getTeamColorName,
  getAllTeamVisuals,
  getHexFromColorName,
  getCSSVarFromColorName,
  getColorNameFromColorName,
  
  // 调试函数
  debugTeamColors,
  debugTeamVisuals
} from './TeamColors'; 