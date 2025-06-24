/**
 * 🎨 Icon图标组件
 * 
 * 简单易用的图标组件，基于Material Icons图标库。
 * 提供了统一的图标显示方式，支持尺寸和样式自定义。
 * 
 * 🎯 主要特性：
 * - 基于Material Icons：使用Google的Material Design图标
 * - 尺寸可调：通过size属性调整图标大小
 * - 样式灵活：支持自定义CSS样式
 * - 轻量简洁：代码简单，性能优秀
 * 
 * 📦 依赖要求：
 * 需要在项目中引入Material Icons字体：
 * <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 * 
 * 💡 使用示例：
 * <Icon name="home" size={24} />
 * <Icon name="favorite" size={16} style={{ color: 'red' }} />
 * <Icon name="settings" size={32} />
 * 
 * 🔍 常用图标名称：
 * - home, favorite, settings, search, menu
 * - add, delete, edit, save, close
 * - arrow_back, arrow_forward, expand_more
 * - check, warning, error, info
 * 
 * 📏 推荐尺寸：
 * - 小图标：16px （用于文本内）
 * - 标准图标：24px （默认尺寸）
 * - 大图标：32px+ （用于醒目展示）
 */

interface IconProps {
  name: string;
  size?: number;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, style }) => {
  return <i className={`material-icons`} style={{ fontSize: size, ...style }}>{name}</i>;
};

export default Icon;