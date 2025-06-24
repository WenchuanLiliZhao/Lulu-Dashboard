/**
 * 🔄 Switch开关组件
 * 
 * 用于在多个选项之间切换的组件，类似于标签页或选项卡。
 * 适用于筛选、视图切换、设置选项等场景。
 * 
 * 🎯 主要特性：
 * - 多选项支持：可以配置任意数量的选项
 * - 响应式尺寸：支持small、medium、large三种尺寸
 * - 状态管理：内置状态管理和外部控制支持
 * - 禁用状态：支持整体禁用
 * 
 * 📊 数据结构：
 * 每个选项包含：value（值）、label（显示文本）
 * 
 * 💡 使用示例：
 * const viewOptions = [
 *   { value: 'list', label: '列表视图' },
 *   { value: 'grid', label: '网格视图' },
 *   { value: 'timeline', label: '时间线视图' }
 * ];
 * 
 * <Switch 
 *   options={viewOptions}
 *   defaultValue="list"
 *   onChange={(value) => console.log('切换到:', value)}
 * />
 */

import React, { useState } from 'react';
import styles from './Switch.module.scss';
import { HoverBox } from '../Boxes';


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