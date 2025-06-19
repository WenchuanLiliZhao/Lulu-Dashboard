import { useState, useCallback, useEffect } from 'react';
import { SIDEBAR_WIDTH } from '../../design-system/interactive/Timeline/Sidebar/TimelineSidebar';

/**
 * 自定义Hook：检测今天的日期是否在可视区域内
 * 
 * @param containerRef - Timeline容器的ref
 * @param dayWidth - 每天的宽度（像素）
 * @param yearList - 年份列表
 * @param startMonth - 开始月份（0-based）
 * @returns boolean - 今天是否在可视区域内
 */
export const useIsTodayVisible = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  dayWidth: number,
  yearList: number[],
  startMonth: number
): boolean => {
  const [isTodayVisible, setIsTodayVisible] = useState(false);

  /**
   * 计算从Timeline开始到今天的总天数
   * 复用 useScrollToToday 中的逻辑
   */
  const calculateDaysToToday = useCallback(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    const timelineStartYear = yearList[0];
    const timelineStartMonth = startMonth;
    
    let totalDays = 0;
    
    if (currentYear < timelineStartYear || 
        (currentYear === timelineStartYear && currentMonth < timelineStartMonth)) {
      return 0;
    }
    
    for (let year = timelineStartYear; year <= currentYear; year++) {
      const startMonthForYear = year === timelineStartYear ? timelineStartMonth : 0;
      const endMonthForYear = year === currentYear ? currentMonth : 11;
      
      for (let month = startMonthForYear; month <= endMonthForYear; month++) {
        const daysInMonth = getDaysInMonth(year, month);
        
        if (year === currentYear && month === currentMonth) {
          totalDays += currentDay - 1;
        } else {
          totalDays += daysInMonth;
        }
      }
    }
    
    return totalDays;
  }, [yearList, startMonth]);

  /**
   * 检查今天是否在可视区域内
   */
  const checkTodayVisibility = useCallback(() => {
    const container = containerRef.current;
    if (!container) return false;

    const daysToToday = calculateDaysToToday();
    const todayPosition = daysToToday * dayWidth;
    
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    
    // 考虑左侧 sidebar 的宽度，实际内容的可视区域应该从 sidebar 之后开始
    const visibleStart = scrollLeft + SIDEBAR_WIDTH;
    const visibleEnd = scrollLeft + containerWidth;
    
    // 今天的格子范围（相对于时间线内容区域）
    const todayStart = todayPosition + SIDEBAR_WIDTH;
    const todayEnd = todayPosition + dayWidth + SIDEBAR_WIDTH;
    
    // 检查今天的格子是否完全在可视区域内（完全进入画面才亮起）
    return todayStart >= visibleStart && todayEnd <= visibleEnd;
  }, [containerRef, dayWidth, calculateDaysToToday]);

  /**
   * 监听滚动事件，实时更新今天的可见性状态
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsTodayVisible(checkTodayVisibility());
    };

    // 初始检查
    handleScroll();
    
    // 添加滚动事件监听器
    container.addEventListener('scroll', handleScroll);
    
    // 清理函数
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [checkTodayVisibility]);

  // 当dayWidth或yearList变化时重新检查
  useEffect(() => {
    setIsTodayVisible(checkTodayVisibility());
  }, [checkTodayVisibility]);

  return isTodayVisible;
};

/**
 * 获取指定年月的天数
 */
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
}; 