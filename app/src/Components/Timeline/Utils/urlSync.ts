/**
 * URL 同步工具函数
 * 用于在 Timeline 组件中同步 zoom-level 和日期位置到 URL 参数
 */

export type TimeViewType = 'year' | 'month' | 'day';

/**
 * 从 URL 参数中获取 timeView，如果无效则返回默认值
 * @param defaultView 默认视图类型，默认为 'month'
 * @returns 有效的 TimeViewType
 */
export const getTimeViewFromUrl = (defaultView: TimeViewType = 'month'): TimeViewType => {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    return defaultView;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const viewParam = urlParams.get('view');
  
  // 验证参数是否为有效的 TimeViewType
  if (viewParam && (viewParam === 'year' || viewParam === 'month' || viewParam === 'day')) {
    return viewParam as TimeViewType;
  }
  
  return defaultView;
};

/**
 * 将 timeView 同步到 URL 参数
 * @param timeView 当前的时间视图类型
 * @param defaultView 默认视图类型，当为默认值时会移除 URL 参数
 */
export const syncTimeViewToUrl = (timeView: TimeViewType, defaultView: TimeViewType = 'month'): void => {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const currentViewParam = urlParams.get('view');
  
  // 只有当 URL 参数与当前状态不同时才更新
  if (currentViewParam !== timeView) {
    if (timeView === defaultView) {
      // 默认视图，移除参数
      urlParams.delete('view');
    } else {
      // 非默认视图，设置参数
      urlParams.set('view', timeView);
    }
    
    // 构建新的 URL
    const newUrl = urlParams.toString() 
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;
    
    // 更新 URL 但不触发页面刷新
    window.history.replaceState({}, '', newUrl);
  }
};

/**
 * 从 URL 参数中获取日期位置（YYYY-MM-DD格式）
 * @returns 日期字符串或 null
 */
export const getDateFromUrl = (): string | null => {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    return null;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const dateParam = urlParams.get('date');
  
  // 验证日期格式 YYYY-MM-DD
  if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    const date = new Date(dateParam);
    // 验证日期是否有效
    if (!isNaN(date.getTime())) {
      return dateParam;
    }
  }
  
  return null;
};

/**
 * 将日期位置同步到 URL 参数
 * @param date 日期字符串（YYYY-MM-DD格式）或 null（移除参数）
 */
export const syncDateToUrl = (date: string | null): void => {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const currentDateParam = urlParams.get('date');
  
  // 只有当 URL 参数与当前状态不同时才更新
  if (currentDateParam !== date) {
    if (date === null) {
      // 移除日期参数
      urlParams.delete('date');
    } else {
      // 设置日期参数
      urlParams.set('date', date);
    }
    
    // 构建新的 URL
    const newUrl = urlParams.toString() 
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;
    
    // 更新 URL 但不触发页面刷新
    window.history.replaceState({}, '', newUrl);
  }
};

/**
 * 创建可分享的 URL
 * @param timeView 时间视图类型
 * @param date 日期字符串（可选）
 * @param baseUrl 基础 URL，默认使用当前页面的 origin + pathname
 * @returns 完整的可分享 URL
 */
export const createShareableUrl = (timeView: TimeViewType, date?: string | null, baseUrl?: string): string => {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    return baseUrl || '';
  }

  const base = baseUrl || `${window.location.origin}${window.location.pathname}`;
  const params = new URLSearchParams();
  
  // 添加视图参数（非默认值）
  if (timeView !== 'month') {
    params.set('view', timeView);
  }
  
  // 添加日期参数
  if (date) {
    params.set('date', date);
  }
  
  if (params.toString()) {
    return `${base}?${params.toString()}`;
  } else {
    return base;
  }
};

/**
 * 监听浏览器历史变化的 hook 辅助函数
 * @param callback 当历史变化时的回调函数
 * @returns 清理函数
 */
export const listenToHistoryChanges = (callback: () => void): (() => void) => {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener('popstate', callback);
  
  return () => {
    window.removeEventListener('popstate', callback);
  };
}; 