// Lulu Dashboard Data Layer
//
// 数据层提供了数据类型定义、处理器和适配器
// 支持多种数据源：静态数据、Notion API、Jira API等

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

export {
  // 适配器
  StaticDataAdapter,
  createAdapter,
  type AdapterFactoryConfig,
  type AdapterType
} from './adapters';

// 版本信息
export const DATA_LAYER_VERSION = '2.0.0'; // 升级版本号以反映通用化重构 