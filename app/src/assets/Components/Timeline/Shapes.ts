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


export interface IssueShape {
  id: string;
  name: string;
  status: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  children?: IssueShape[];
  vision: string;
  team: keyof typeof Team;
}

export const sortTimelineItemsByStartDate = (items: IssueShape[]): IssueShape[] => {
  return [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
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
 * @param sortBy - 分组字段，可以是 "status"、"vision" 或 "name"
 * @returns 分组后的 SortedIssueShape 对象
 */
export function groupIssuesByField(
  issues: IssueShape[],
  sortBy: "status" | "vision" | "name"
): SortedIssueShape {
  // 使用 Map 来收集每个分组的项目
  const groupMap = new Map<string, IssueShape[]>();

  // 遍历所有项目，按照指定字段进行分组
  issues.forEach(issue => {
    const groupKey = issue[sortBy];

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

