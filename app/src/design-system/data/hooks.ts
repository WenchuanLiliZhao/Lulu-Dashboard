/**
 * ⚡ Timeline组件的React Hooks
 * 
 * 这个文件包含了Timeline组件使用的自定义React Hooks。
 * Hooks是React中重用状态逻辑的方式，可以在不同组件间共享功能。
 * 
 * 🎯 当前包含的Hooks：
 * - useCenterBasedZoom：为Timeline提供容器引用，用于缩放功能
 * 
 * 💡 什么是Hook：
 * Hook是以"use"开头的特殊函数，只能在React组件或其他Hook中调用。
 * 它们让你可以在函数组件中使用state和其他React特性。
 * 
 * 📝 使用示例：
 * const { containerRef } = useCenterBasedZoom(dayWidth);
 * <div ref={containerRef}>Timeline内容</div>
 */

import { useRef } from 'react';

/**
 * 为Timeline提供容器引用的缩放Hook
 * 简化版本，主要提供DOM元素引用
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useCenterBasedZoom = (_zoomLevel: number) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return {
    containerRef
  };
}; 