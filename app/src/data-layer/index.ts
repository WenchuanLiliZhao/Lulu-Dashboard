// Lulu Dashboard Data Layer - 精简版
//
// 数据层提供了基本的数据类型定义和处理器
// 专注于Timeline基本布局功能

// 通用Timeline类型定义
export { 
  // 新的通用类型
  type BaseTimelineItem,
  type TimelineItem,
  type TimelineConfig,
  type TimelineGroup,
  type SortedTimelineData,
  type TimelineProps,
  BaseTimelineItemKeys,
  
  // 示例扩展数据类型
  type ExampleExtendedData,
  
  // 向后兼容的旧类型
  type IssueShape,
  type SortedIssueShape, 
  type GroupableFieldValue,
  GroupableFields,
  IssueShapeKeys
} from './types/timeline';

export {
  // 新的通用数据处理器
  groupTimelineItemsByField,
  sortTimelineItemsByStartDate,
  
  // 向后兼容的旧处理器
  groupIssuesByField,
  mapStringToGroupableField
} from './processors/groupingProcessor';

// 工具函数
export * from './utils';

// 版本信息
export const DATA_LAYER_VERSION = '2.1.0'; // 精简版本，移除适配器 