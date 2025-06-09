import React, { useState, useEffect } from 'react';
import styles from './BrowserCompatibility.module.scss';

interface BrowserInfo {
  isIE: boolean;
  isSafari: boolean;
  isUnsupported: boolean;
}

const detectBrowser = (): BrowserInfo => {
  const userAgent = navigator.userAgent;
  
  // 检测 IE 浏览器
  const isIE = /MSIE|Trident/.test(userAgent);
  
  // 检测 Safari 浏览器（但排除 Chrome，因为 Chrome 的 userAgent 也包含 Safari）
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  
  return {
    isIE,
    isSafari,
    isUnsupported: isIE || isSafari,
  };
};

export const BrowserCompatibility: React.FC = () => {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);

  useEffect(() => {
    const info = detectBrowser();
    setBrowserInfo(info);
  }, []);

  if (!browserInfo?.isUnsupported) {
    return null;
  }

  const getBrowserName = () => {
    if (browserInfo.isIE) return 'Internet Explorer';
    if (browserInfo.isSafari) return 'Safari';
    return 'your current browser';
  };

  return (
    <div className={styles['browser-compatibility-overlay']}>
      <div className={styles['browser-compatibility-modal']}>
        <div className={styles['browser-compatibility-header']}>
          <h2>Browser Compatibility Notice</h2>
        </div>
        
        <div className={styles['browser-compatibility-content']}>
          <div className={styles['warning-icon']}>⚠️</div>
          <p className={styles['main-message']}>
            You are currently using <strong>{getBrowserName()}</strong>.
          </p>
          <p className={styles['recommendation']}>
            For the best experience with this Timeline application, please use one of the following browsers:
          </p>
          
          <div className={styles['supported-browsers']}>
            <div className={styles['browser-item']}>
              <span className={styles['browser-icon']}>🌐</span>
              <span>Google Chrome</span>
            </div>
            <div className={styles['browser-item']}>
              <span className={styles['browser-icon']}>🌐</span>
              <span>Microsoft Edge</span>
            </div>
            <div className={styles['browser-item']}>
              <span className={styles['browser-icon']}>🔥</span>
              <span>Mozilla Firefox</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 