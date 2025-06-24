/**
 * ✨ HoverBox悬停效果容器组件
 * 
 * 用于为其他组件添加悬停时的视觉效果，通常作为背景层使用。
 * 这是一个装饰性组件，为用户交互提供视觉反馈。
 * 
 * 🎯 主要用途：
 * - 按钮悬停效果：在Button组件中提供悬停背景
 * - 卡片悬停效果：为卡片组件添加悬停状态
 * - 链接悬停效果：为可点击元素添加视觉反馈
 * 
 * 🎨 效果特性：
 * - 透明到有色的渐变过渡
 * - 平滑的动画效果
 * - 可自定义样式和类名
 * 
 * 💡 使用示例：
 * <button className="my-button">
 *   <span>按钮文字</span>
 *   <HoverBox className="button-hover" />
 * </button>
 * 
 * 📝 注意事项：
 * - 通常需要父元素设置 position: relative
 * - HoverBox会绝对定位覆盖整个父元素
 * - 配合CSS的:hover伪类使用效果最佳
 */

import styles from "./HoverBox.module.scss";

const HoverBox = ({className, style}: {className?: string, style?: React.CSSProperties}) => {
  return <div className={`${styles["hover-box"]} ${className}`} style={style}></div>;
};

export default HoverBox;
