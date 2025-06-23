// Timeline 数据类型定义 - 通用化重构

// 基础时间线项目接口 - 只包含四个必需字段
export interface BaseTimelineItem {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

// 基础字段键
export const BaseTimelineItemKeys = {
  ID: 'id',
  NAME: 'name',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
} as const;

// 通用时间线项目类型 - 支持泛型扩展
export type TimelineItem<T = Record<string, unknown>> = BaseTimelineItem & T;

// Timeline 配置接口
export interface TimelineConfig<TExtended = Record<string, unknown>> {
  dataType?: TExtended;
  groupBy?: keyof (BaseTimelineItem & TExtended);
}

// 分组数据结构 - 通用化
export interface TimelineGroup<T = Record<string, unknown>> {
  groupTitle: string;
  groupItems: TimelineItem<T>[];
}

// 排序后的时间线数据结构 - 通用化
export interface SortedTimelineData<T = Record<string, unknown>> {
  meta: {
    sortBy: keyof (BaseTimelineItem & T);
  };
  data: TimelineGroup<T>[];
}

// Timeline 组件 Props 接口
export interface TimelineProps<T = Record<string, unknown>> {
  init?: TimelineConfig<T>;
  inputData: SortedTimelineData<T>;
  onGroupByChange?: (groupBy: keyof (BaseTimelineItem & T)) => void;
}

// ====== 以下是为了向后兼容而保留的旧类型定义 ======

export const Team = {
  "Function": "Function",
  "Retail": "Retail",
  "E-com": "E-com",
  "Brand Marketing": "Brand Marketing",
  "Product": "Product",
  "Fulfillment": "Fulfillment",
  "Corporate": "Corporate",
  "Tech": "Tech",
} as const;

export const Priority = {
  "High": "High",
  "Medium": "Medium",
  "Low": "Low",
} as const;

export const Status = {
  "High Risks": "High Risks",
  "Manageable Risk": "Manageable Risk", 
  "On Track": "On Track",
  "Not Yet Started": "Not Yet Started",
} as const;

// 类型定义
export type TeamType = keyof typeof Team;
export type PriorityType = keyof typeof Priority;
export type StatusType = keyof typeof Status;

// 旧的字段键 - 为了向后兼容
export const IssueShapeKeys = {
  ID: 'id',
  NAME: 'name',
  STATUS: 'status',
  DESCRIPTION: 'description',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  PROGRESS: 'progress',
  CHILDREN: 'children',
  CATEGORY: 'category',
  TEAM: 'team',
  PRIORITY: 'priority',
} as const;

export type IssueShapeKey = typeof IssueShapeKeys[keyof typeof IssueShapeKeys];

// 定义可用于分组的字段 - 现在基于name
export const GroupableFields = {
  NAME: BaseTimelineItemKeys.NAME,
  // 为了向后兼容，保留旧的字段
  STATUS: IssueShapeKeys.STATUS,
  CATEGORY: IssueShapeKeys.CATEGORY,
  TEAM: IssueShapeKeys.TEAM,
  PRIORITY: IssueShapeKeys.PRIORITY,
} as const;

// 分组字段的键类型
export type GroupableFieldKey = keyof typeof GroupableFields;

// 分组字段的值类型（实际的字段名）
export type GroupableFieldValue = typeof GroupableFields[GroupableFieldKey];

// 扩展数据类型 - 示例项目使用的完整数据结构
export interface ExampleExtendedData {
  status: StatusType;
  description: string;
  progress: number; // 0-100
  children?: TimelineItem<ExampleExtendedData>[];
  category: string;
  team: keyof typeof Team;
  priority: keyof typeof Priority;
}

// Issue 基本数据结构 - 保持向后兼容
export interface IssueShape {
  [IssueShapeKeys.ID]: string;
  [IssueShapeKeys.NAME]: string;
  [IssueShapeKeys.STATUS]: StatusType;
  [IssueShapeKeys.DESCRIPTION]: string;
  [IssueShapeKeys.START_DATE]: Date;
  [IssueShapeKeys.END_DATE]: Date;
  [IssueShapeKeys.PROGRESS]: number; // 0-100
  [IssueShapeKeys.CHILDREN]?: IssueShape[];
  [IssueShapeKeys.CATEGORY]: string;
  [IssueShapeKeys.TEAM]: keyof typeof Team;
  [IssueShapeKeys.PRIORITY]: keyof typeof Priority;
}

// Issue 分组数据结构 - 保持向后兼容
export interface IssueGroup {
  groupTitle: string;
  groupItems: IssueShape[];
}

// 排序后的 Issue 数据结构 - 保持向后兼容
export interface SortedIssueShape {
  meta: {
    sortBy: GroupableFieldValue | string; // 支持向后兼容
  };
  data: IssueGroup[];
} 