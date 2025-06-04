import React, { useState } from 'react';
import styles from './Switch.module.scss';
import HoverBox from '../Button/HoverBox';

export interface SwitchOption {
  value: string;
  label: string;
}

export interface SwitchProps {
  options: SwitchOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Switch: React.FC<SwitchProps> = ({
  options,
  defaultValue,
  onChange,
  className = '',
  disabled = false,
  size = 'medium'
}) => {
  const [activeValue, setActiveValue] = useState(defaultValue || options[0]?.value || '');

  const handleOptionClick = (value: string) => {
    if (disabled) return;
    
    setActiveValue(value);
    onChange?.(value);
  };

  return (
    <div 
      className={`${styles.switch} ${styles[size]} ${className} ${disabled ? styles.disabled : ''}`}
    >
      <div className={styles.switchTrack}>
        {/* 选项按钮 */}
        {options.map((option) => (
          <button
            key={option.value}
            className={`${styles.switchOption} ${
              activeValue === option.value ? styles.active : ''
            }`}
            onClick={() => handleOptionClick(option.value)}
            disabled={disabled}
            type="button"
          >
            <span className={styles.switchOptionText}>
              {option.label}
            </span>
            <HoverBox className={styles["hover-box"]} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Switch; 