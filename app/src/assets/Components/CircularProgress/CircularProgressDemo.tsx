import React, { useState } from 'react';
import CircularProgress from './CircularProgress';
import { CircularProgressConst } from './constant';

const CircularProgressDemo: React.FC = () => {
  const [progress, setProgress] = useState(50);
  const [enableAnimation, setEnableAnimation] = useState(CircularProgressConst.animationEnable);
  const [animationDuration, setAnimationDuration] = useState(CircularProgressConst.animationDuration);
  const [animationDelay, setAnimationDelay] = useState(CircularProgressConst.animationDelay);
  const [animationKey, setAnimationKey] = useState(0); // 用于重置动画

  const containerStyle: React.CSSProperties = {
    padding: '32px',
    maxWidth: '500px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: '24px',
    border: '1px solid #e9ecef',
  };

  const controlPanelStyle: React.CSSProperties = {
    backgroundColor: 'white',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  };

  const progressItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '4px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    marginRight: '8px',
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 16px',
    fontSize: '14px',
  };

  const getButtonVariant = (value: number) => ({
    ...buttonStyle,
    backgroundColor: progress === value ? '#007bff' : '#f8f9fa',
    color: progress === value ? 'white' : '#333',
  });

  const resetAnimation = () => {
    setAnimationKey(prev => prev + 1);
  };

  const handleProgressChange = (newProgress: number) => {
    setProgress(newProgress);
    // 如果启用动画，重置动画
    if (enableAnimation) {
      setAnimationKey(prev => prev + 1);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>
        圆形进度条组件演示
      </h2>
      
      {/* 进度条展示区域 */}
      <div style={cardStyle}>
        <div style={{ textAlign: 'center' }}>
          <div style={progressItemStyle}>
            <CircularProgress 
              key={`small-${animationKey}`}
              progress={progress} 
              enableAnimation={enableAnimation}
              animationDuration={animationDuration}
              animationDelay={animationDelay}
            />
            <span style={{ fontSize: '14px', color: '#666' }}>24px (默认)</span>
          </div>
          
          <div style={progressItemStyle}>
            <CircularProgress 
              key={`medium-${animationKey}`}
              progress={progress} 
              size={48} 
              strokeWidth={4} 
              enableAnimation={enableAnimation}
              animationDuration={animationDuration}
              animationDelay={animationDelay + 200} // 延迟200ms
            />
            <span style={{ fontSize: '14px', color: '#666' }}>48px (+200ms延迟)</span>
          </div>
          
          <div style={progressItemStyle}>
            <CircularProgress 
              key={`large-${animationKey}`}
              progress={progress} 
              size={80} 
              strokeWidth={6}
              progressColor="#10b981"
              backgroundColor="#f3f4f6"
              enableAnimation={enableAnimation}
              animationDuration={animationDuration}
              animationDelay={animationDelay + 400} // 延迟400ms
            />
            <span style={{ fontSize: '14px', color: '#666' }}>80px (+400ms延迟)</span>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <span style={{ fontSize: '18px', fontWeight: '600' }}>{progress}%</span>
        </div>
      </div>
      
      {/* 动画控制面板 */}
      <div style={controlPanelStyle}>
        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '16px' }}>动画设置</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={enableAnimation}
              onChange={(e) => setEnableAnimation(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            启用加载动画
          </label>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            动画时长: {animationDuration}ms
          </label>
          <input
            type="range"
            min="500"
            max="3000"
            step="100"
            value={animationDuration}
            onChange={(e) => setAnimationDuration(parseInt(e.target.value))}
            style={{ width: '100%' }}
            aria-label="动画时长滑块"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
            <span>500ms</span>
            <span>1750ms</span>
            <span>3000ms</span>
          </div>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            动画延迟: {animationDelay}ms
          </label>
          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            value={animationDelay}
            onChange={(e) => setAnimationDelay(parseInt(e.target.value))}
            style={{ width: '100%' }}
            aria-label="动画延迟滑块"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
            <span>0ms</span>
            <span>1000ms</span>
            <span>2000ms</span>
          </div>
        </div>
        
        <button
          onClick={resetAnimation}
          style={primaryButtonStyle}
        >
          重新播放动画
        </button>
        
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
          💡 提示：上方三个进度条会依次延迟播放动画，展示瀑布流效果
        </div>
      </div>
      
      {/* 进度控制面板 */}
      <div style={controlPanelStyle}>
        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '16px' }}>进度控制</h3>
        
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
          调整进度 (0-100):
        </label>
        
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => handleProgressChange(parseInt(e.target.value))}
          style={{ width: '100%', marginBottom: '8px' }}
          aria-label="进度值滑块"
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '16px' }}>
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            或输入具体数值:
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              handleProgressChange(Math.max(0, Math.min(100, value)));
            }}
            style={inputStyle}
            placeholder="输入 0-100"
          />
        </div>
        
        {/* 预设值按钮 */}
        <div>
          <span style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            快速设置:
          </span>
          <div>
            {[0, 25, 50, 75, 100].map(value => (
              <button
                key={value}
                onClick={() => handleProgressChange(value)}
                style={getButtonVariant(value)}
              >
                {value}%
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressDemo; 