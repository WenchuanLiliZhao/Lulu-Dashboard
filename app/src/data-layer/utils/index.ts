// 导出数据结构和类型
export * from './Shapes';

// 导出统一的视觉配置功能
export * from './VisualConfigs';

// 重新导出常用的组合
export type { TeamType, StatusType, PriorityType } from './Shapes';
export type { VisualConfig, TeamColorType, TeamVisualsType, StatusColorType, PriorityColorType } from './VisualConfigs';
export type { ColorName } from './ColorName';
export { 
  // 团队相关
  getTeamColor, 
  getTeamColorWithAlpha, 
  getTeamColorWithAlphaRGBA,
  getTeamStyles,
  getAllTeamColors,
  getTeamTheme,
  getTeamColorVariant,
  getTeamVisual,
  getTeamDisplayName,
  getTeamEmoji,
  getTeamColorName,
  getAllTeamVisuals,
  
  // 状态相关
  getStatusColor,
  getStatusVisual,
  getStatusDisplayName,
  getStatusEmoji,
  getAllStatusVisuals,
  
  // 优先级相关
  getPriorityColor,
  getPriorityVisual,
  getPriorityDisplayName,
  getPriorityEmoji,
  getAllPriorityVisuals,
  
  // 向后兼容
  getHexFromColorName,
  getCSSVarFromColorName,
  getColorNameFromColorName,
  
  // 调试函数
  debugTeamColors,
  debugAllVisuals
} from './VisualConfigs'; 