import React, { useState, useEffect, useRef } from 'react';
import Icon from '../Icon/Icon';
import styles from './FullscreenButton.module.scss';

interface FullscreenButtonProps {
  /**
   * 需要全屏显示的内容
   */
  children: React.ReactNode;
  /**
   * 悬浮按钮的图标名称（Material Icons）
   */
  iconName?: string;
  /**
   * 悬浮按钮的大小
   */
  buttonSize?: number;
  /**
   * 悬浮按钮的位置
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /**
   * 距离边缘的偏移量
   */
  offset?: number;
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  children,
  iconName = 'fullscreen',
  buttonSize = 56,
  position = 'bottom-right',
  offset = 24,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // 获取悬浮按钮的位置样式
  const getPositionStyle = () => {
    const style: React.CSSProperties = {};
    
    switch (position) {
      case 'bottom-right':
        style.bottom = offset;
        style.right = offset;
        break;
      case 'bottom-left':
        style.bottom = offset;
        style.left = offset;
        break;
      case 'top-right':
        style.top = offset;
        style.right = offset;
        break;
      case 'top-left':
        style.top = offset;
        style.left = offset;
        break;
    }
    
    return style;
  };

  const handleFullscreenToggle = async () => {
    try {
      if (!isFullscreen) {
        // 进入全屏
        if (containerRef.current) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        // 退出全屏
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn('全屏操作失败:', error);
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {children}
      
      {/* 悬浮全屏按钮 */}
      <button
        className={styles.floatingButton}
        style={{
          ...getPositionStyle(),
          width: buttonSize,
          height: buttonSize,
        }}
        onClick={handleFullscreenToggle}
        title={isFullscreen ? "退出全屏 (ESC)" : "全屏显示"}
        aria-label={isFullscreen ? "退出全屏模式" : "进入全屏模式"}
        type="button"
      >
        <Icon name={isFullscreen ? "fullscreen_exit" : iconName} size={24} />
      </button>
    </div>
  );
};

export default FullscreenButton; 