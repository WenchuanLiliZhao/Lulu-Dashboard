// Lulu Dashboard Design System
// 
// 这个设计系统包含了所有可重用的UI组件和交互组件
// 可以独立使用或与数据层配合使用

/**
 * 🎨 设计系统主入口文件
 * 
 * 这是整个设计系统的主要入口点，包含了所有可用的组件和工具。
 * 当你想要在项目中使用设计系统时，从这里导入所需的组件。
 * 
 * 📦 包含的模块：
 * - UI组件：Button、Switch、Progress等基础组件
 * - 交互组件：Timeline时间线组件
 * - 静态资源：Logo、图标、样式变量
 * - 数据工具：类型定义、工具函数、React Hooks
 * 
 * 💡 使用示例：
 * import { Timeline, Button, Switch } from './design-system';
 * import type { TimelineProps } from './design-system';
 * 
 * 🔗 更多信息请查看 README.md 文件
 */

// UI Components
export * from './ui';

// Interactive Components 
export * from './interactive';

// Assets
export * from './assets';

// Data Layer
export * from './data';

// 版本信息
export const DESIGN_SYSTEM_VERSION = '1.0.0'; 