/**
 * 🎨 CSS变量集合 - 设计系统的核心配置
 * 
 * 这个文件包含了设计系统中所有CSS变量的TypeScript定义。
 * 它是连接SCSS样式文件和JavaScript/TypeScript代码的桥梁。
 * 
 * 🎯 主要作用：
 * - 提供类型安全的CSS变量访问
 * - 统一管理设计token（颜色、间距、字体等）
 * - 支持主题切换和动态样式
 * - 确保设计的一致性
 * 
 * 🌈 颜色系统：
 * - 团队颜色：基于梵高画作灵感的艺术色彩
 * - 语义颜色：成功、警告、错误等状态颜色
 * - 主题颜色：主色、辅助色、背景色、边框色
 * 
 * 📏 设计token类型：
 * - 颜色：品牌色、团队色、语义色、主题色
 * - 字体：无衬线、衬线、等宽字体
 * - 间距：导航、内容区域的标准间距
 * - 阴影：弹出层阴影效果
 * - 层级：z-index层级管理
 * 
 * 💡 使用示例：
 * import { getCssVar, teamColors } from './css-variables';
 * 
 * // 在React组件中使用
 * const style = {
 *   color: getCssVar(teamColors.blue.base),
 *   backgroundColor: getCssVar(cssVariables.colorBgMain)
 * };
 * 
 * // 在SCSS中使用
 * .my-component {
 *   color: var(--color-team-blue);
 *   background-color: var(--color-bg-main);
 * }
 * 
 * 🎨 团队颜色灵感：
 * - Red: "The Red Vineyard" 红色葡萄园
 * - Blue: "The Starry Night" 星夜
 * - Green: "The Cypresses" 柏树
 * - Yellow: "Sunflowers" 向日葵
 * - Purple: "Irises" 鸢尾花
 * - 更多梵高画作主题色彩...
 */

export const cssVariables = {
  // Brand Colors
  brandColor: '--brand-color',

  // Team Colors - Van Gogh Inspired
  // Red - "The Red Vineyard"
  colorTeamRed: '--color-team-red',
  colorTeamRedLight: '--color-team-red-light',
  colorTeamRedDark: '--color-team-red-dark',

  // Blue - "The Starry Night"
  colorTeamBlue: '--color-team-blue',
  colorTeamBlueLight: '--color-team-blue-light',
  colorTeamBlueDark: '--color-team-blue-dark',

  // Green - "The Cypresses"
  colorTeamGreen: '--color-team-green',
  colorTeamGreenLight: '--color-team-green-light',
  colorTeamGreenDark: '--color-team-green-dark',

  // Yellow - "Sunflowers"
  colorTeamYellow: '--color-team-yellow',
  colorTeamYellowLight: '--color-team-yellow-light',
  colorTeamYellowDark: '--color-team-yellow-dark',

  // Purple - "Irises"
  colorTeamPurple: '--color-team-purple',
  colorTeamPurpleLight: '--color-team-purple-light',
  colorTeamPurpleDark: '--color-team-purple-dark',

  // Pink - "Almond Blossoms"
  colorTeamPink: '--color-team-pink',
  colorTeamPinkLight: '--color-team-pink-light',
  colorTeamPinkDark: '--color-team-pink-dark',

  // Indigo - "The Potato Eaters"
  colorTeamIndigo: '--color-team-indigo',
  colorTeamIndigoLight: '--color-team-indigo-light',
  colorTeamIndigoDark: '--color-team-indigo-dark',

  // Cyan - "Wheatfield under Thunderclouds"
  colorTeamCyan: '--color-team-cyan',
  colorTeamCyanLight: '--color-team-cyan-light',
  colorTeamCyanDark: '--color-team-cyan-dark',

  // Orange - "The Bedroom"
  colorTeamOrange: '--color-team-orange',
  colorTeamOrangeLight: '--color-team-orange-light',
  colorTeamOrangeDark: '--color-team-orange-dark',

  // Lime - "The Mulberry Tree"
  colorTeamLime: '--color-team-lime',
  colorTeamLimeLight: '--color-team-lime-light',
  colorTeamLimeDark: '--color-team-lime-dark',

  // Violet - "Self-Portrait"
  colorTeamViolet: '--color-team-violet',
  colorTeamVioletLight: '--color-team-violet-light',
  colorTeamVioletDark: '--color-team-violet-dark',

  // Sky - "Landscape with Snow"
  colorTeamSky: '--color-team-sky',
  colorTeamSkyLight: '--color-team-sky-light',
  colorTeamSkyDark: '--color-team-sky-dark',

  // Gray - "The Potato Eaters"
  colorTeamGray: '--color-team-gray',
  colorTeamGrayLight: '--color-team-gray-light',
  colorTeamGrayDark: '--color-team-gray-dark',

  // Slate - "Peasant Woman"
  colorTeamSlate: '--color-team-slate',
  colorTeamSlateLight: '--color-team-slate-light',
  colorTeamSlateDark: '--color-team-slate-dark',

  // Emerald - "The Garden of Saint-Paul Hospital"
  colorTeamEmerald: '--color-team-emerald',
  colorTeamEmeraldLight: '--color-team-emerald-light',
  colorTeamEmeraldDark: '--color-team-emerald-dark',

  // Teal - "Seascape near Les Saintes-Maries-de-la-Mer"
  colorTeamTeal: '--color-team-teal',
  colorTeamTealLight: '--color-team-teal-light',
  colorTeamTealDark: '--color-team-teal-dark',

  // Amber - "Still Life with Twelve Sunflowers"
  colorTeamAmber: '--color-team-amber',
  colorTeamAmberLight: '--color-team-amber-light',
  colorTeamAmberDark: '--color-team-amber-dark',

  // Rose - "Roses"
  colorTeamRose: '--color-team-rose',
  colorTeamRoseLight: '--color-team-rose-light',
  colorTeamRoseDark: '--color-team-rose-dark',

  // Semantic Colors - Van Gogh Inspired
  colorSemanticActive: '--color-semantic-active',
  colorSemanticActiveSecondary: '--color-semantic-active-secondary',
  colorSemanticSuccess: '--color-semantic-success',
  colorSemanticSuccessSecondary: '--color-semantic-success-secondary',
  colorSemanticWarning: '--color-semantic-warning',
  colorSemanticWarningSecondary: '--color-semantic-warning-secondary',
  colorSemanticError: '--color-semantic-error',
  colorSemanticErrorSecondary: '--color-semantic-error-secondary',

  // Base Theme Colors
  boxShadowColor: '--box-shadow-color',
  colorMain: '--color-main',
  colorSec: '--color-sec',
  colorSecTrans: '--color-sec-trans',
  colorNeg: '--color-neg',
  colorNegTrans: '--color-neg-trans',

  // Background Colors
  colorBgMain: '--color-bg-main',
  colorBgSec: '--color-bg-sec',
  colorBgSecTrans: '--color-bg-sec-trans',
  colorBgSec2: '--color-bg-sec-2',
  colorBgSec2Trans: '--color-bg-sec-2-trans',

  // Border Colors
  colorBorderMain: '--color-border-main',
  colorBorderMainTrans: '--color-border-main-trans',
  colorBorderDarkenTrans: '--color-border-darken-trans',

  // Text Colors
  colorTextMain: '--color-text-main',
  colorTextSec: '--color-text-sec',

  // Accent Color
  colorAccent: '--color-accent',

  // Font Families
  ffSans: '--ff-sans',
  ffSerif: '--ff-serif',
  ffMono: '--ff-mono',

  // Spacing
  spacingNavItemSize: '--spacing-nav-item-size',
  spacingNavPadding: '--spacing-nav-padding',
  spacingNavSize: '--spacing-nav-size',
  contentPadding: '--content-padding',

  // Z-Index
  zIndexNav: '--z-index-nav',
  zIndexPopupSec: '--z-index-popup-sec',
  zIndexPopupMain: '--z-index-popup-main',

  // Shadows
  popShaodw: '--pop-shaodw', // Note: keeping original typo in CSS variable name
} as const;

// Type for CSS variable names
export type CssVariable = typeof cssVariables[keyof typeof cssVariables];

// Helper function to get CSS variable value
export function getCssVar(variableName: CssVariable): string {
  return `var(${variableName})`;
}

// Helper function to get CSS variable value with fallback
export function getCssVarWithFallback(variableName: CssVariable, fallback: string): string {
  return `var(${variableName}, ${fallback})`;
}

// Team colors grouped by color family for easier access
export const teamColors = {
  red: {
    base: cssVariables.colorTeamRed,
    light: cssVariables.colorTeamRedLight,
    dark: cssVariables.colorTeamRedDark,
  },
  blue: {
    base: cssVariables.colorTeamBlue,
    light: cssVariables.colorTeamBlueLight,
    dark: cssVariables.colorTeamBlueDark,
  },
  green: {
    base: cssVariables.colorTeamGreen,
    light: cssVariables.colorTeamGreenLight,
    dark: cssVariables.colorTeamGreenDark,
  },
  yellow: {
    base: cssVariables.colorTeamYellow,
    light: cssVariables.colorTeamYellowLight,
    dark: cssVariables.colorTeamYellowDark,
  },
  purple: {
    base: cssVariables.colorTeamPurple,
    light: cssVariables.colorTeamPurpleLight,
    dark: cssVariables.colorTeamPurpleDark,
  },
  pink: {
    base: cssVariables.colorTeamPink,
    light: cssVariables.colorTeamPinkLight,
    dark: cssVariables.colorTeamPinkDark,
  },
  indigo: {
    base: cssVariables.colorTeamIndigo,
    light: cssVariables.colorTeamIndigoLight,
    dark: cssVariables.colorTeamIndigoDark,
  },
  cyan: {
    base: cssVariables.colorTeamCyan,
    light: cssVariables.colorTeamCyanLight,
    dark: cssVariables.colorTeamCyanDark,
  },
  orange: {
    base: cssVariables.colorTeamOrange,
    light: cssVariables.colorTeamOrangeLight,
    dark: cssVariables.colorTeamOrangeDark,
  },
  lime: {
    base: cssVariables.colorTeamLime,
    light: cssVariables.colorTeamLimeLight,
    dark: cssVariables.colorTeamLimeDark,
  },
  violet: {
    base: cssVariables.colorTeamViolet,
    light: cssVariables.colorTeamVioletLight,
    dark: cssVariables.colorTeamVioletDark,
  },
  sky: {
    base: cssVariables.colorTeamSky,
    light: cssVariables.colorTeamSkyLight,
    dark: cssVariables.colorTeamSkyDark,
  },
  gray: {
    base: cssVariables.colorTeamGray,
    light: cssVariables.colorTeamGrayLight,
    dark: cssVariables.colorTeamGrayDark,
  },
  slate: {
    base: cssVariables.colorTeamSlate,
    light: cssVariables.colorTeamSlateLight,
    dark: cssVariables.colorTeamSlateDark,
  },
  emerald: {
    base: cssVariables.colorTeamEmerald,
    light: cssVariables.colorTeamEmeraldLight,
    dark: cssVariables.colorTeamEmeraldDark,
  },
  teal: {
    base: cssVariables.colorTeamTeal,
    light: cssVariables.colorTeamTealLight,
    dark: cssVariables.colorTeamTealDark,
  },
  amber: {
    base: cssVariables.colorTeamAmber,
    light: cssVariables.colorTeamAmberLight,
    dark: cssVariables.colorTeamAmberDark,
  },
  rose: {
    base: cssVariables.colorTeamRose,
    light: cssVariables.colorTeamRoseLight,
    dark: cssVariables.colorTeamRoseDark,
  },
} as const;

// Semantic colors grouped for easier access
export const semanticColors = {
  active: {
    primary: cssVariables.colorSemanticActive,
    secondary: cssVariables.colorSemanticActiveSecondary,
  },
  success: {
    primary: cssVariables.colorSemanticSuccess,
    secondary: cssVariables.colorSemanticSuccessSecondary,
  },
  warning: {
    primary: cssVariables.colorSemanticWarning,
    secondary: cssVariables.colorSemanticWarningSecondary,
  },
  error: {
    primary: cssVariables.colorSemanticError,
    secondary: cssVariables.colorSemanticErrorSecondary,
  },
} as const; 