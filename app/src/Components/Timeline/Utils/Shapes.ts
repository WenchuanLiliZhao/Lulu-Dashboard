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

export const sortTimelineItemsByStartDate = (items: IssueShape[]): IssueShape[] => {
  return [...items].sort((a, b) => a[IssueShapeKeys.START_DATE].getTime() - b[IssueShapeKeys.START_DATE].getTime());
};

export interface IssueGroup {
  groupTitle: string;
  groupItems: IssueShape[];
}


export interface SortedIssueShape {
  meta: {
    sortBy: string;
  };

  data: IssueGroup[];
}

/**
 * 将 IssueShape 数组按指定字段分组，转换为 SortedIssueShape 格式
 * @param issues - 原始的 IssueShape 数组
 * @param sortBy - 分组字段，必须是 GroupableFieldValue 类型中的一个值
 * @returns 分组后的 SortedIssueShape 对象
 */
export function groupIssuesByField(
  issues: IssueShape[],
  sortBy: GroupableFieldValue
): SortedIssueShape {
  const actualKey = sortBy;

  // 使用 Map 来收集每个分组的项目
  const groupMap = new Map<string, IssueShape[]>();

  // 遍历所有项目，按照指定字段进行分组
  issues.forEach(issue => {
    const groupKey = issue[actualKey];

    if (!groupMap.has(groupKey)) {
      groupMap.set(groupKey, []);
    }

    groupMap.get(groupKey)!.push(issue);
  });

  // 将 Map 转换为 IssueGroup 数组，并按组标题排序
  const data: IssueGroup[] = Array.from(groupMap.entries())
    .sort(([a], [b]) => a.localeCompare(b)) // 按组标题字母顺序排序
    .map(([title, items]) => ({
      groupTitle: title,
      groupItems: sortTimelineItemsByStartDate(items) // 组内按开始时间排序
    }));

  return {
    meta: {
      sortBy
    },
    data
  };
}

