/**
 * 🎨 UI组件库入口文件
 * 
 * 这里导出了所有基础UI组件，这些组件是构建用户界面的基本元素。
 * 所有组件都经过精心设计，支持主题定制和响应式布局。
 * 
 * 📦 包含的组件：
 * - Button：按钮组件，支持多种样式和状态
 * - Switch：开关选择器，用于选项切换
 * - CircularProgress：圆形进度条，显示任务进度
 * - Icon：图标组件，显示各种图标
 * - BrowserCompatibility：浏览器兼容性检查组件
 * - Boxes：容器组件集合（HoverBox、MenuBox、TransBgBox）
 * 
 * 💡 使用方式：
 * import { Button, Switch, CircularProgress } from './ui';
 * 
 * 🔧 组件特性：
 * - TypeScript支持：完整的类型定义
 * - 主题支持：使用CSS变量进行主题定制
 * - 无障碍访问：符合WCAG标准
 * - 响应式设计：适配各种屏幕尺寸
 */

export { default as Button, type ButtonProps } from './Button';
export { default as Switch, type SwitchOption } from './Switch';
export { default as Icon } from './Icon/Icon';
export { default as CircularProgress } from './CircularProgress/CircularProgress';
export { BrowserCompatibility } from './BrowserCompatibility/BrowserCompatibility';

// Boxes 组件
export { default as HoverBox } from './Boxes/HoverBox';
export { default as MenuBox } from './Boxes/MenuBox';
export { default as TransBgBox } from './Boxes/TransBgBox'; 