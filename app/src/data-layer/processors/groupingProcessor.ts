// 数据分组处理器

import type { 
  IssueShape, 
  IssueGroup, 
  SortedIssueShape, 
  GroupableFieldValue
} from '../types/timeline';

// 字符串映射到 GroupableFieldValue 的兼容函数
export const mapStringToGroupableField = (value: string): GroupableFieldValue => {
  // 向后兼容的映射
  const legacyMapping: Record<string, GroupableFieldValue> = {
    'status': 'status',
    'category': 'category',
    'team': 'team',
    'priority': 'priority',
  };

  // 首先检查是否已经是有效的 GroupableFieldValue
  const validValues = ['status', 'category', 'team', 'priority'] as const;
  if (validValues.includes(value as GroupableFieldValue)) {
    return value as GroupableFieldValue;
  }

  // 如果是旧的字符串格式，进行映射
  if (legacyMapping[value]) {
    return legacyMapping[value];
  }

  // 默认返回 CATEGORY
  return 'category';
};

// 按开始日期排序
export const sortTimelineItemsByStartDate = (items: IssueShape[]): IssueShape[] => {
  return [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

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
    const groupKey = issue[actualKey as keyof IssueShape];

    if (!groupMap.has(groupKey as string)) {
      groupMap.set(groupKey as string, []);
    }

    groupMap.get(groupKey as string)!.push(issue);
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