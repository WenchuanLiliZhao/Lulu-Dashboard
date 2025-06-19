// Lulu Dashboard Data Layer
//
// 数据层提供了数据类型定义、处理器和适配器
// 支持多种数据源：静态数据、Notion API、Jira API等

// 主要入口 - 分别从子模块导入
export { 
  // 类型定义
  type IssueShape,
  type SortedIssueShape, 
  type GroupableFieldValue,
  GroupableFields,
  IssueShapeKeys
} from './types/timeline';

export {
  // 数据处理器
  groupIssuesByField,
  mapStringToGroupableField,
  sortTimelineItemsByStartDate
} from './processors/groupingProcessor';

export {
  // 适配器
  StaticDataAdapter,
  createAdapter,
  type AdapterFactoryConfig,
  type AdapterType
} from './adapters';

// 版本信息
export const DATA_LAYER_VERSION = '1.0.0'; 