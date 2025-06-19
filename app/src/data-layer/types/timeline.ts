// Timeline 数据类型定义

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

// 定义可用于分组的字段
export const GroupableFields = {
  STATUS: IssueShapeKeys.STATUS,
  CATEGORY: IssueShapeKeys.CATEGORY,
  TEAM: IssueShapeKeys.TEAM,
  PRIORITY: IssueShapeKeys.PRIORITY,
} as const;

// 分组字段的键类型
export type GroupableFieldKey = keyof typeof GroupableFields;

// 分组字段的值类型（实际的字段名）
export type GroupableFieldValue = typeof GroupableFields[GroupableFieldKey];

// Issue 基本数据结构
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

// Issue 分组数据结构
export interface IssueGroup {
  groupTitle: string;
  groupItems: IssueShape[];
}

// 排序后的 Issue 数据结构
export interface SortedIssueShape {
  meta: {
    sortBy: GroupableFieldValue | string; // 支持向后兼容
  };
  data: IssueGroup[];
} 