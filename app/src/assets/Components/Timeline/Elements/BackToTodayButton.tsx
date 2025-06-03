import React from 'react';
import Button, { type ButtonProps } from '../../Button/Button';
import { useScrollToToday } from '../Utils/useScrollToToday';

interface BackToTodayButtonProps extends Omit<ButtonProps, 'onClick' | 'children' | 'icon'> {
  containerRef: React.RefObject<HTMLDivElement | null>;
  dayWidth: number;
  yearList: number[];
  startMonth: number;
  buttonText?: string;
  showIcon?: boolean;
}

/**
 * BackToTodayButton 组件
 * 
 * 一个预配置的按钮组件，专门用于Timeline中的"回到今天"功能
 * 内置了滚动逻辑，使用简单
 */
export const BackToTodayButton: React.FC<BackToTodayButtonProps> = ({
  containerRef,
  dayWidth,
  yearList,
  startMonth,
  buttonText = "回到今天",
  showIcon = true,
  variant = "secondary",
  size = "medium",
  ...buttonProps
}) => {
  // 使用滚动到今天的hook
  const { scrollToToday } = useScrollToToday(
    containerRef,
    dayWidth,
    yearList,
    startMonth
  );

  // 今天图标组件
  const TodayIcon = () => (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <circle cx="12" cy="15" r="2"/>
    </svg>
  );

  return (
    <Button
      variant={variant}
      size={size}
      onClick={scrollToToday}
      icon={showIcon ? <TodayIcon /> : undefined}
      iconPosition="left"
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
};

export default BackToTodayButton; 