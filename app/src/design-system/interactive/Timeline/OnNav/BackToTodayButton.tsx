import React from 'react';
import { Button, type ButtonProps } from '../../../ui';
import { useScrollToToday } from '../../../../data-layer/utils/useScrollToToday';
import { useIsTodayVisible } from '../../../../data-layer/utils/useIsTodayVisible';

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
  buttonText = "Today",
  showIcon = true,
  variant = "primary",
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

  // 检测今天是否在可视区域内
  const isTodayVisible = useIsTodayVisible(containerRef, dayWidth, yearList, startMonth);

  // 根据今天是否可见来设置按钮状态
  const buttonStatus = isTodayVisible ? "success" : "normal";

  return (
    <Button
      variant={variant}
      size={size}
      onClick={scrollToToday}
      icon={showIcon ? "today" : undefined}
      iconPosition="left"
      status={buttonStatus}
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
};

export default BackToTodayButton; 