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