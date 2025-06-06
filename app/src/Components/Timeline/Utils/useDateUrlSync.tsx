import { useEffect } from 'react';
import { getTimeViewFromUrl, listenToHistoryChanges, getDateFromUrl, syncDateToUrl } from './urlSync';
import { useScrollToDate } from './useScrollToDate';

type TimeViewType = 'year' | 'month' | 'day';

/**
 * 自定义Hook：处理日期位置与URL的双向同步
 * 
 * 功能包括：
 * 1. 监听浏览器历史变化（前进/后退按钮）
 * 2. 监听滚动事件并同步中心日期到URL
 * 3. 初始化时从URL恢复日期位置
 * 
 * @param mainScrollRef - 主滚动容器的ref
 * @param dayWidth - 每天的宽度（像素）
 * @param yearList - 年份列表
 * @param startMonth - 开始月份（0-based）
 * @param setCurrentTimeView - 设置当前时间视图的函数
 * @returns 日期滚动相关的工具函数
 */
export const useDateUrlSync = (
  mainScrollRef: React.RefObject<HTMLDivElement | null>,
  dayWidth: number,
  yearList: number[],
  startMonth: number,
  setCurrentTimeView: (view: TimeViewType) => void
) => {
  // 使用日期滚动功能
  const { getCenterDateString, scrollToDate } = useScrollToDate(
    mainScrollRef,
    dayWidth,
    yearList,
    startMonth
  );

  // 监听浏览器前进后退按钮
  useEffect(() => {
    const cleanup = listenToHistoryChanges(() => {
      const newTimeView = getTimeViewFromUrl() as TimeViewType;
      setCurrentTimeView(newTimeView);
      
      // 同时检查日期参数
      const dateFromUrl = getDateFromUrl();
      if (dateFromUrl) {
        // 如果URL包含日期参数，滚动到该日期
        scrollToDate(dateFromUrl, 'instant');
      }
    });

    return cleanup;
  }, [scrollToDate, setCurrentTimeView]);

  // 监听滚动事件，同步中心日期到URL
  useEffect(() => {
    const container = mainScrollRef.current;
    if (!container) return;

    let scrollTimeout: number;
    
    const handleScroll = () => {
      // 使用防抖，避免频繁更新URL
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        const centerDateString = getCenterDateString();
        if (centerDateString) {
          syncDateToUrl(centerDateString);
        }
      }, 300); // 300ms 防抖
    };

    container.addEventListener('scroll', handleScroll);
    
    // 清理函数
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [getCenterDateString]);

  // 初始化时从URL恢复日期位置
  useEffect(() => {
    const dateFromUrl = getDateFromUrl();
    if (dateFromUrl) {
      // 延迟执行，确保组件完全渲染后再滚动
      setTimeout(() => {
        scrollToDate(dateFromUrl, 'instant');
      }, 100);
    }
  }, [scrollToDate]);

  return {
    getCenterDateString,
    scrollToDate
  };
}; 