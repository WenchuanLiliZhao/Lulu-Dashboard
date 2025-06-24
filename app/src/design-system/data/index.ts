/**
 * 📊 设计系统数据层入口文件
 * 
 * 这个文件导出了Timeline组件和其他组件所需的基本数据类型、工具函数和React Hooks。
 * 数据层是设计系统的核心，提供了类型安全和数据处理能力。
 * 
 * 🔧 主要功能：
 * - 类型定义：BaseTimelineItem、TimelineProps等核心接口
 * - 工具函数：数据排序、布局计算、时间处理
 * - React Hooks：缩放控制、状态管理
 * 
 * 💡 使用示例：
 * import { BaseTimelineItem, sortTimelineItemsByStartDate } from './data';
 * 
 * const items: BaseTimelineItem[] = [...];
 * const sortedItems = sortTimelineItemsByStartDate(items);
 */

export * from './types';
export * from './utils';
export * from './hooks'; 