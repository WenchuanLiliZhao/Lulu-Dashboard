/**
 * ⚡ 交互组件库入口文件
 * 
 * 这里导出了所有具有复杂交互逻辑的高级组件。
 * 这些组件通常包含状态管理、用户交互处理和复杂的业务逻辑。
 * 
 * 🎯 主要组件：
 * - Timeline：时间线组件，支持项目管理和进度跟踪
 * - FullscreenButton：全屏切换按钮
 * - Nav：导航栏组件集合
 * 
 * 📊 Timeline组件特性：
 * - 智能布局：自动计算项目位置，避免重叠
 * - 分组管理：支持按团队、状态等字段分组
 * - 时间缩放：年/月/日三种时间视图
 * - 响应式设计：适配桌面和移动端
 * 
 * 🧭 导航组件特性：
 * - Nav：主导航栏组件
 * - LogoBar：Logo显示栏
 * 
 * 💡 使用示例：
 * import { Timeline, FullscreenButton, Nav } from './interactive';
 * 
 * <Timeline inputData={timelineData} />
 * <FullscreenButton />
 * <Nav />
 */

// Timeline 组件 - 现在默认就是通用版本
export { Timeline } from './Timeline/Timeline';
export { default as FullscreenButton } from './FullscreenButton';

// Nav 组件
export { Nav } from './Nav/Nav';
export { LogoBar } from './Nav/LogoBar'; 