import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
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

  return (
    <button
      type={type}
      className={`${styles.button} ${styles[size]} ${styles[variant]} ${className} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && (
        <span className={styles.buttonIcon}>
          {icon}
        </span>
      )}
      <span className={styles.buttonText}>
        {children}
      </span>
      {icon && iconPosition === 'right' && (
        <span className={styles.buttonIcon}>
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button; 