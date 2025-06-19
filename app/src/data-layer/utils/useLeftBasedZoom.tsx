import { useRef, useEffect } from 'react';

/**
 * 自定义Hook：实现基于左侧的缩放功能
 * 
 * 这个Hook提供了从屏幕最左侧开始的缩放体验，当缩放级别改变时，
 * 视图会以当前可见区域的最左侧为基准进行缩放。
 * 
 * @param zoomLevel - 当前的缩放级别（例如：dayWidth）
 * @returns {
 *   containerRef: React.RefObject<HTMLDivElement> - 需要绑定到可滚动容器的ref
 * }
 * 
 * 使用示例：
 * ```tsx
 * const { containerRef } = useLeftBasedZoom(dayWidth);
 * 
 * // 在JSX中：
 * <div ref={containerRef} className="scrollable-container">
 *   // 内容
 * </div>
 * ```
 */
export const useLeftBasedZoom = (zoomLevel: number) => {
  // 可滚动容器的引用
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 存储上一次的缩放级别，用于计算缩放因子
  const prevZoomLevelRef = useRef(zoomLevel);

  // 当缩放级别改变时执行左侧缩放逻辑
  useEffect(() => {
    const container = containerRef.current;
    
    // 如果容器不存在或缩放级别没有变化，则跳过
    if (!container || prevZoomLevelRef.current === zoomLevel) {
      prevZoomLevelRef.current = zoomLevel;
      return;
    }

    // 计算缩放因子（新缩放级别 / 旧缩放级别）
    const zoomFactor = zoomLevel / prevZoomLevelRef.current;
    
    // 获取当前滚动状态
    const currentScrollLeft = container.scrollLeft;
    
    // 计算当前视图左侧边缘在内容中的位置
    const viewLeftX = currentScrollLeft;
    
    // 根据缩放因子计算新的左侧边缘位置
    const newViewLeftX = viewLeftX * zoomFactor;
    
    // 新的滚动位置就是新的左侧边缘位置（保持左侧对齐）
    const newScrollLeft = newViewLeftX;
    
    // 获取最大可滚动距离，防止滚动超出边界
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    
    // 应用新的滚动位置（确保在有效范围内）
    container.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
    
    // 更新上一次的缩放级别
    prevZoomLevelRef.current = zoomLevel;
  }, [zoomLevel]);

  return {
    containerRef,
  };
};

/**
 * Hook的工作原理：
 * 
 * 1. **缩放因子计算**：通过新旧缩放级别的比值确定内容的缩放程度
 * 2. **左侧边缘定位**：获取当前视图左侧边缘在内容中的位置
 * 3. **位置重计算**：根据缩放因子调整左侧边缘的新位置
 * 4. **滚动调整**：移动滚动条使新的左侧边缘保持在视图左侧
 * 5. **边界处理**：确保滚动位置不超出容器的有效范围
 * 
 * 这种方式确保了用户在任何位置进行缩放时，都能保持当前视图的
 * 左侧边缘位置不变，从而实现从左侧开始的缩放效果。
 */ 