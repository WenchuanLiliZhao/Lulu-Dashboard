/**
 * 🎨 设计系统静态资源入口文件
 * 
 * 这里管理和导出设计系统使用的所有静态资源，包括图片、图标、CSS变量等。
 * 统一管理资源可以确保设计的一致性和易于维护。
 * 
 * 📦 包含的资源类型：
 * - Logo：品牌标志和变体（黑色、彩色、带文字、不带文字等）
 * - Placeholder：占位符图片（用户头像等）
 * - CSS变量：颜色、间距、阴影、字体等设计token
 * 
 * 🎨 全局样式文件：
 * - _app.scss：主样式文件，包含全局重置和基础样式
 * - color.scss：颜色系统定义
 * - font.scss：字体系统定义
 * - spacing.scss：间距系统定义
 * - shadow.scss：阴影系统定义
 * - z-index.scss：层级系统定义
 * 
 * 💡 使用方式：
 * import { FullColorLogo, UserAvatarPlaceholder } from './assets';
 * 
 * 🔧 样式引入方式：
 * 在主应用中引入：
 * import './design-system/assets/global-style/_app.scss';
 * 
 * 🎯 设计token使用：
 * 使用CSS变量：var(--color-primary), var(--spacing-md)
 */

// 图标和图片
export * from './Img/Logo';
export * from './Img/Placeholder';

// 全局样式 - 样式文件不能直接导出，但可以在这里说明
// 全局样式在 global-style/ 目录下，需要在主应用中引入：
// import './design-system/assets/global-style/_app.scss'; 