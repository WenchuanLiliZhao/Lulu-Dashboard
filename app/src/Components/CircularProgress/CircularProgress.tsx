import React, { useState, useEffect } from 'react';
import { CircularProgressConst } from './_constant';
import styles from './CircularProgress.module.scss';

// 进度动画 Hook
const useProgressAnimation = (
  targetProgress: number, 
  duration: number = 1000, 
  enabled: boolean = true,
  delay: number = 0
) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCurrentProgress(targetProgress);
      return;
    }

    // 重置动画起始值
    setCurrentProgress(0);
    
    // 如果有延迟，先等待
    const startAnimation = () => {
      const startTime = Date.now();
      const startProgress = 0;
      const progressDiff = targetProgress - startProgress;

      // 缓动函数 (ease-out)
      const easeOut = (t: number): number => {
        return 1 - Math.pow(1 - t, 3);
      };

      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress < 1) {
          const easedProgress = easeOut(progress);
          setCurrentProgress(startProgress + progressDiff * easedProgress);
          requestAnimationFrame(animateProgress);
        } else {
          setCurrentProgress(targetProgress);
        }
      };

      requestAnimationFrame(animateProgress);
    };

    if (delay > 0) {
      const timeoutId = setTimeout(startAnimation, delay);
      return () => clearTimeout(timeoutId);
    } else {
      startAnimation();
    }
  }, [targetProgress, duration, enabled, delay]);

  return currentProgress;
};

interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  progressColor?: string;
  className?: string;
  animationDuration?: number; // 动画持续时间(毫秒)
  animationDelay?: number; // 动画延迟时间(毫秒)
  enableAnimation?: boolean; // 是否启用动画
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = CircularProgressConst.defaultSize,
  strokeWidth = CircularProgressConst.strokeWidth,
  className = '',
  animationDuration = CircularProgressConst.animationDuration,
  animationDelay = CircularProgressConst.animationDelay,
  enableAnimation = CircularProgressConst.animationEnable,
}) => {
  // 使用动画Hook
  const animatedProgress = useProgressAnimation(progress, animationDuration, enableAnimation, animationDelay);
  
  // 确保进度值在 0-100 范围内
  const clampedProgress = Math.max(0, Math.min(100, animatedProgress));
  
  // 计算半径
  const radius = (size - strokeWidth) / 2;
  
  // 计算圆的周长
  const circumference = 2 * Math.PI * radius;
  
  // 计算当前进度对应的偏移量
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;
  
  return (
    <div 
      className={className}
      style={{ display: 'inline-block' }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }} // 旋转-90度，让进度从顶部开始
      >
        {/* 背景圆环 */}
        <circle
          className={styles.background}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* 进度圆环 */}
        <circle
          className={`${styles.progress} ${progress === 100 ? styles.full : ''}`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
    </div>
  );
};

export default CircularProgress; 