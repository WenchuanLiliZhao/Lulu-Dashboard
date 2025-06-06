import { useCallback } from 'react';

/**
 * 自定义Hook：处理滚动位置与日期的转换
 * 
 * @param containerRef - Timeline容器的ref
 * @param dayWidth - 每天的宽度（像素）
 * @param yearList - 年份列表
 * @param startMonth - 开始月份（0-based）
 * @returns 滚动和日期相关的工具函数
 */
export const useScrollToDate = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  dayWidth: number,
  yearList: number[],
  startMonth: number
) => {
  
  /**
   * 计算从Timeline开始到指定日期的总天数
   */
  const calculateDaysToDate = useCallback((targetDate: Date) => {
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth(); // 0-based
    const targetDay = targetDate.getDate(); // 1-based
    
    // Timeline的开始日期
    const timelineStartYear = yearList[0];
    const timelineStartMonth = startMonth; // 0-based
    
    let totalDays = 0;
    
    // 如果目标日期在Timeline开始日期之前，返回0
    if (targetYear < timelineStartYear || 
        (targetYear === timelineStartYear && targetMonth < timelineStartMonth)) {
      return 0;
    }
    
    // 计算从Timeline开始到目标日期的天数
    for (let year = timelineStartYear; year <= targetYear; year++) {
      const startMonthForYear = year === timelineStartYear ? timelineStartMonth : 0;
      const endMonthForYear = year === targetYear ? targetMonth : 11;
      
      for (let month = startMonthForYear; month <= endMonthForYear; month++) {
        const daysInMonth = getDaysInMonth(year, month);
        
        if (year === targetYear && month === targetMonth) {
          // 目标月份，只计算到目标日期
          totalDays += targetDay - 1; // -1 因为day是1-based，但我们需要0-based的天数
        } else {
          // 完整的月份
          totalDays += daysInMonth;
        }
      }
    }
    
    return totalDays;
  }, [yearList, startMonth]);
  
  /**
   * 根据天数偏移量计算对应的日期
   */
  const calculateDateFromDays = useCallback((daysFromStart: number): Date => {
    const timelineStartYear = yearList[0];
    const timelineStartMonth = startMonth;
    
    let remainingDays = Math.floor(daysFromStart);
    let currentYear = timelineStartYear;
    let currentMonth = timelineStartMonth;
    
    // 从Timeline开始日期向前计算
    while (remainingDays > 0) {
      const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
      
      if (remainingDays >= daysInCurrentMonth) {
        // 跳过整个月
        remainingDays -= daysInCurrentMonth;
        currentMonth++;
        
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
      } else {
        // 在当前月内
        break;
      }
    }
    
    // 计算具体日期（+1 因为Date构造函数中的day是1-based）
    const targetDay = Math.max(1, remainingDays + 1);
    
    return new Date(currentYear, currentMonth, targetDay);
  }, [yearList, startMonth]);
  
  /**
   * 获取当前视口中心位置对应的日期
   */
  const getCenterDate = useCallback((): Date | null => {
    const container = containerRef.current;
    if (!container) return null;
    
    // 计算视口中心的滚动位置
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const centerScrollPosition = scrollLeft + containerWidth / 2;
    
    // 转换为天数偏移
    const daysFromStart = centerScrollPosition / dayWidth;
    
    // 计算对应的日期
    return calculateDateFromDays(daysFromStart);
  }, [containerRef, dayWidth, calculateDateFromDays]);
  
  /**
   * 获取当前视口中心位置对应的日期字符串（YYYY-MM-DD格式）
   */
  const getCenterDateString = useCallback((): string | null => {
    const centerDate = getCenterDate();
    if (!centerDate) return null;
    
    // 格式化为 YYYY-MM-DD
    const year = centerDate.getFullYear();
    const month = String(centerDate.getMonth() + 1).padStart(2, '0');
    const day = String(centerDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }, [getCenterDate]);
  
  /**
   * 滚动到指定日期，使其位于视口中心
   */
  const scrollToDate = useCallback((dateString: string, behavior: 'smooth' | 'instant' = 'smooth') => {
    const container = containerRef.current;
    if (!container) return;
    
    const targetDate = new Date(dateString);
    if (isNaN(targetDate.getTime())) return;
    
    const daysToTarget = calculateDaysToDate(targetDate);
    
    // 计算目标日期在Timeline中的像素位置
    const targetPosition = daysToTarget * dayWidth;
    
    // 计算容器中心位置
    const containerWidth = container.clientWidth;
    const centerOffset = containerWidth / 2;
    
    // 计算滚动位置，使目标日期居中显示
    const scrollPosition = targetPosition - centerOffset;
    
    // 获取最大可滚动距离
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    
    // 确保滚动位置在有效范围内
    const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScrollLeft));
    
    // 滚动到目标位置
    container.scrollTo({
      left: finalScrollPosition,
      behavior: behavior
    });
    
    // 查找所有需要同步滚动的容器（通过父级查找尺子容器）
    const timelineContainer = container.closest('[class*="timeline-container"]');
    if (timelineContainer) {
      const rulerContainer = timelineContainer.querySelector('[class*="timeline-ruler-content"]');
      if (rulerContainer) {
        // 同步滚动尺子容器，但不使用平滑滚动避免冲突
        rulerContainer.scrollLeft = finalScrollPosition;
      }
    }
  }, [containerRef, dayWidth, calculateDaysToDate]);
  
  /**
   * 滚动到今天的位置
   */
  const scrollToToday = useCallback((behavior: 'smooth' | 'instant' = 'smooth') => {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    scrollToDate(todayString, behavior);
  }, [scrollToDate]);
  
  return {
    getCenterDate,
    getCenterDateString,
    scrollToDate,
    scrollToToday,
    calculateDaysToDate,
    calculateDateFromDays
  };
};

/**
 * 获取指定年月的天数
 */
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
}; 