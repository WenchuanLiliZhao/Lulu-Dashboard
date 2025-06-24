/**
 * 🔘 Button按钮组件
 * 
 * 通用的按钮组件，支持多种样式、尺寸和状态。
 * 这是用户界面中最常用的交互元素之一。
 * 
 * 🎨 样式变体：
 * - primary：主要按钮，用于主要操作
 * - secondary：次要按钮，用于辅助操作  
 * - outline：边框按钮，用于不太重要的操作
 * 
 * 📏 尺寸选项：
 * - small：小按钮，适用于紧凑空间
 * - medium：中等按钮（默认）
 * - large：大按钮，适用于重要操作
 * 
 * 🎯 状态类型：
 * - normal：正常状态（默认）
 * - active：激活状态
 * - success：成功状态（绿色）
 * - warning：警告状态（黄色）
 * - error：错误状态（红色）
 * 
 * 💡 使用示例：
 * <Button variant="primary" size="medium" onClick={() => console.log('点击')}>
 *   保存
 * </Button>
 * 
 * <Button variant="outline" icon="add" iconPosition="left">
 *   添加项目
 * </Button>
 */

import React from 'react';
import styles from './Button.module.scss';
import HoverBox from '../Boxes/HoverBox';
import Icon from '../Icon/Icon';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  status?: "normal" | "active" | "success" | "warning" | "error";
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  status = 'normal',
  disabled = false,
  size = 'medium',
  variant = 'primary',
  type = 'button',
  icon,
  iconPosition = 'left'
}) => {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  // Generate status-specific class name
  const statusClass = status !== 'normal' ? styles[status] || '' : '';

  // Map button size to icon size
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'medium':
        return 18;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  return (
    <button
      type={type}
      className={`${styles.button} ${styles[size]} ${styles[variant]} ${className} ${disabled ? styles.disabled : ''} ${statusClass}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && (
        <span className={styles.buttonIcon}>
          <Icon name={icon} size={getIconSize()} />
        </span>
      )}
      <span className={styles.buttonText}>
        {children}
      </span>
      {icon && iconPosition === 'right' && (
        <span className={styles.buttonIcon}>
          <Icon name={icon} size={getIconSize()} />
        </span>
      )}
      <HoverBox className={styles["hover-box"]} />
    </button>
  );
};

export default Button; 