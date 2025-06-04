import { useCallback } from 'react';

/**
 * 自定义Hook：实现滚动到今天的功能
 * 
 * 这个Hook提供了一个函数，可以将Timeline滚动到今天的位置
 * 
 * @param containerRef - Timeline容器的ref
 * @param dayWidth - 每天的宽度（像素）
 * @param yearList - 年份列表
 * @param startMonth - 开始月份（0-based）
 * @returns {
 *   scrollToToday: () => void - 滚动到今天的函数
 * }
 */
export const useScrollToToday = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  dayWidth: number,
  yearList: number[],
  startMonth: number
) => {
  
  /**
   * 计算从Timeline开始到今天的总天数
   */
  const calculateDaysToToday = useCallback(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-based
    const currentDay = today.getDate(); // 1-based
    
    // Timeline的开始日期
    const timelineStartYear = yearList[0];
    const timelineStartMonth = startMonth; // 0-based
    
    let totalDays = 0;
    
    // 如果今天在Timeline开始日期之前，返回0
    if (currentYear < timelineStartYear || 
        (currentYear === timelineStartYear && currentMonth < timelineStartMonth)) {
      return 0;
    }
    
    // 计算从Timeline开始到今天的天数
    for (let year = timelineStartYear; year <= currentYear; year++) {
      const startMonthForYear = year === timelineStartYear ? timelineStartMonth : 0;
      const endMonthForYear = year === currentYear ? currentMonth : 11;
      
      for (let month = startMonthForYear; month <= endMonthForYear; month++) {
        const daysInMonth = getDaysInMonth(year, month);
        
        if (year === currentYear && month === currentMonth) {
          // 当前月份，只计算到今天
          totalDays += currentDay - 1; // -1 因为day是1-based，但我们需要0-based的天数
        } else {
          // 完整的月份
          totalDays += daysInMonth;
        }
      }
    }
    
    return totalDays;
  }, [yearList, startMonth]);
  
  /**
   * 滚动到今天的位置
   */
  const scrollToToday = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const daysToToday = calculateDaysToToday();
    
    // 计算今天在Timeline中的像素位置
    const todayPosition = daysToToday * dayWidth;
    
    // 计算容器中心位置
    const containerWidth = container.clientWidth;
    const centerOffset = containerWidth / 2;
    
    // 计算滚动位置，使今天居中显示
    const scrollPosition = todayPosition - centerOffset;
    
    // 获取最大可滚动距离
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    
    // 确保滚动位置在有效范围内
    const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScrollLeft));
    
    // 平滑滚动到目标位置
    container.scrollTo({
      left: finalScrollPosition,
      behavior: 'smooth'
    });
  }, [containerRef, dayWidth, calculateDaysToToday]);
  
  return {
    scrollToToday
  };
};

/**
 * 获取指定年月的天数
 */
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
}; 