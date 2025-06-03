import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ResizableSidebar.module.scss';

interface ResizableSidebarProps {
  children: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  position?: 'left' | 'right';
  storageKey?: string;
  className?: string;
}

export const ResizableSidebar: React.FC<ResizableSidebarProps> = ({
  children,
  minWidth = 150,
  maxWidth = 400,
  defaultWidth = 200,
  position = 'left',
  storageKey = 'resizable-sidebar-width',
  className = '',
}) => {
  // 从localStorage读取保存的宽度，如果没有则使用默认值
  const getInitialWidth = (): number => {
    try {
      const savedWidth = localStorage.getItem(storageKey);
      if (savedWidth) {
        const width = parseInt(savedWidth, 10);
        if (width >= minWidth && width <= maxWidth) {
          return width;
        }
      }
    } catch (error) {
      console.warn('Failed to read width from localStorage:', error);
    }
    return defaultWidth;
  };

  const [width, setWidth] = useState<number>(getInitialWidth);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  // 保存宽度到localStorage
  const saveWidth = useCallback((newWidth: number) => {
    try {
      localStorage.setItem(storageKey, newWidth.toString());
    } catch (error) {
      console.warn('Failed to save width to localStorage:', error);
    }
  }, [storageKey]);

  // 开始调整大小
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    
    // 添加全局样式防止文本选择
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ew-resize';
  }, [width]);

  // 处理鼠标移动
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = position === 'left' 
      ? e.clientX - startXRef.current 
      : startXRef.current - e.clientX;
    
    const newWidth = startWidthRef.current + deltaX;
    const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
    
    setWidth(clampedWidth);
  }, [isResizing, position, minWidth, maxWidth]);

  // 结束调整大小
  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      saveWidth(width);
      
      // 恢复默认样式
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
  }, [isResizing, width, saveWidth]);

  // 添加全局事件监听器
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // 清理函数
  useEffect(() => {
    return () => {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, []);

  const resizerClass = position === 'left' 
    ? styles['resizer-right'] 
    : styles['resizer-left'];

  return (
    <div
      ref={sidebarRef}
      className={`${styles['resizable-sidebar']} ${className}`}
      style={{ width: `${width}px` }}
    >
      <div className={styles['sidebar-content']}>
        {children}
      </div>
      <div
        className={`${styles['resizer']} ${resizerClass} ${isResizing ? styles['resizing'] : ''}`}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}; 