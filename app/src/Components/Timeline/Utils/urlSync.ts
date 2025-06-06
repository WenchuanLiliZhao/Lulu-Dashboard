/**
 * URL 同步工具函数
 * 用于在 Timeline 组件中同步 zoom-level 到 URL 参数
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
 * 创建可分享的 URL
 * @param timeView 时间视图类型
 * @param baseUrl 基础 URL，默认使用当前页面的 origin + pathname
 * @returns 完整的可分享 URL
 */
export const createShareableUrl = (timeView: TimeViewType, baseUrl?: string): string => {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    return baseUrl || '';
  }

  const base = baseUrl || `${window.location.origin}${window.location.pathname}`;
  
  if (timeView === 'month') {
    // 默认视图，不需要参数
    return base;
  } else {
    // 非默认视图，添加参数
    return `${base}?view=${timeView}`;
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