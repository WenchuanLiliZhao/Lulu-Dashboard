import { useRef, useEffect } from 'react';

/**
 * 自定义Hook：实现基于中心点的缩放功能
 * 
 * 这个Hook提供了类似GarageBand的缩放体验，当缩放级别改变时，
 * 视图会以当前可见区域的中心点为基准进行缩放，而不是从左侧开始。
 * 
 * @param zoomLevel - 当前的缩放级别（例如：dayWidth）
 * @returns {
 *   containerRef: React.RefObject<HTMLDivElement> - 需要绑定到可滚动容器的ref
 *   handleZoomChange: (newZoomLevel: number) => void - 处理缩放变化的函数
 * }
 * 
 * 使用示例：
 * ```tsx
 * const { containerRef, handleZoomChange } = useCenterBasedZoom(dayWidth);
 * 
 * // 在JSX中：
 * <div ref={containerRef} className="scrollable-container">
 *   // 内容
 * </div>
 * 
 * // 处理缩放：
 * <Slider onChange={handleZoomChange} value={dayWidth} />
 * ```
 */
export const useCenterBasedZoom = (zoomLevel: number) => {
  // 可滚动容器的引用
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 存储上一次的缩放级别，用于计算缩放因子
  const prevZoomLevelRef = useRef(zoomLevel);

  // 当缩放级别改变时执行居中缩放逻辑
  useEffect(() => {
    const container = containerRef.current;
    
    // 如果容器不存在或缩放级别没有变化，则跳过
    if (!container || prevZoomLevelRef.current === zoomLevel) {
      prevZoomLevelRef.current = zoomLevel;
      return;
    }

    // 计算缩放因子（新缩放级别 / 旧缩放级别）
    const zoomFactor = zoomLevel / prevZoomLevelRef.current;
    
    // 获取当前滚动状态和容器尺寸
    const currentScrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    
    // 计算当前视图中心点的像素位置
    const viewCenterX = currentScrollLeft + containerWidth / 2;
    
    // 根据缩放因子计算新的中心点位置
    const newViewCenterX = viewCenterX * zoomFactor;
    
    // 计算新的滚动位置，确保中心点保持在视图中心
    const newScrollLeft = newViewCenterX - containerWidth / 2;
    
    // 获取最大可滚动距离，防止滚动超出边界
    const maxScrollLeft = container.scrollWidth - containerWidth;
    
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
 * 2. **中心点定位**：计算当前视图中心在内容中的位置
 * 3. **位置重计算**：根据缩放因子调整中心点的新位置
 * 4. **滚动调整**：移动滚动条使新的中心点保持在视图中心
 * 5. **边界处理**：确保滚动位置不超出容器的有效范围
 * 
 * 这种方式确保了用户在任何位置进行缩放时，都能保持当前关注的内容
 * 在视图中心，提供了直观自然的缩放体验。
 */ 