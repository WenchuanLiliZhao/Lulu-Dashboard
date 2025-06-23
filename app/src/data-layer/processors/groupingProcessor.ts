// 数据分组处理器 - 通用化重构

import type { 
  IssueShape, 
  IssueGroup, 
  SortedIssueShape, 
  GroupableFieldValue,
  // 新的通用类型
  TimelineItem,
  TimelineGroup,
  SortedTimelineData,
  BaseTimelineItem
} from '../types/timeline';

// ====== 新的通用分组功能 ======

/**
 * 通用的按字段分组函数
 * @param items - 时间线项目数组
 * @param groupBy - 分组字段
 * @returns 分组后的数据结构
 */
export function groupTimelineItemsByField<T = Record<string, unknown>>(
  items: TimelineItem<T>[],
  groupBy: keyof (BaseTimelineItem & T)
): SortedTimelineData<T> {
  // 使用 Map 来收集每个分组的项目
  const groupMap = new Map<string, TimelineItem<T>[]>();

  // 遍历所有项目，按照指定字段进行分组
  items.forEach(item => {
    const groupKey = String(item[groupBy]);

    if (!groupMap.has(groupKey)) {
      groupMap.set(groupKey, []);
    }

    groupMap.get(groupKey)!.push(item);
  });

  // 将 Map 转换为 TimelineGroup 数组，并按组标题排序
  const data: TimelineGroup<T>[] = Array.from(groupMap.entries())
    .sort(([a], [b]) => a.localeCompare(b)) // 按组标题字母顺序排序
    .map(([title, items]) => ({
      groupTitle: title,
      groupItems: sortTimelineItemsByStartDate(items) // 组内按开始时间排序
    }));

  return {
    meta: {
      sortBy: groupBy
    },
    data
  };
}

/**
 * 通用的按开始日期排序函数
 */
export const sortTimelineItemsByStartDate = <T = Record<string, unknown>>(
  items: TimelineItem<T>[]
): TimelineItem<T>[] => {
  return [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

// ====== 向后兼容的旧函数 ======

// 字符串映射到 GroupableFieldValue 的兼容函数
export const mapStringToGroupableField = (value: string): GroupableFieldValue => {
  // 向后兼容的映射
  const legacyMapping: Record<string, GroupableFieldValue> = {
    'name': 'name', // 新增对name的支持
    'status': 'status',
    'category': 'category',
    'team': 'team',
    'priority': 'priority',
  };

  // 首先检查是否已经是有效的 GroupableFieldValue
  const validValues = ['name', 'status', 'category', 'team', 'priority'] as const;
  if (validValues.includes(value as GroupableFieldValue)) {
    return value as GroupableFieldValue;
  }

  // 如果是旧的字符串格式，进行映射
  if (legacyMapping[value]) {
    return legacyMapping[value];
  }

  // 默认返回 NAME（而不是CATEGORY）
  return 'name';
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
      groupItems: items.sort((a, b) => a.startDate.getTime() - b.startDate.getTime()) // 组内按开始时间排序
    }));

  return {
    meta: {
      sortBy
    },
    data
  };
} 