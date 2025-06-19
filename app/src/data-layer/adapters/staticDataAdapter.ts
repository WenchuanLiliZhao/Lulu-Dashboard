// 静态数据适配器

import type { IssueShape, SortedIssueShape, GroupableFieldValue } from '../types/timeline';
import { groupIssuesByField } from '../processors/groupingProcessor';

/**
 * 静态数据适配器
 * 用于处理静态的 Issue 数据
 */
export class StaticDataAdapter {
  private rawData: IssueShape[];

  constructor(data: IssueShape[]) {
    this.rawData = data;
  }

  /**
   * 获取原始数据
   */
  getRawData(): IssueShape[] {
    return this.rawData;
  }

  /**
   * 按指定字段分组数据
   */
  getGroupedData(groupBy: GroupableFieldValue): SortedIssueShape {
    return groupIssuesByField(this.rawData, groupBy);
  }

  /**
   * 更新数据
   */
  updateData(newData: IssueShape[]): void {
    this.rawData = newData;
  }

  /**
   * 添加单个 Issue
   */
  addIssue(issue: IssueShape): void {
    this.rawData.push(issue);
  }

  /**
   * 删除 Issue（根据ID）
   */
  removeIssue(issueId: string): boolean {
    const initialLength = this.rawData.length;
    this.rawData = this.rawData.filter(issue => issue.id !== issueId);
    return this.rawData.length < initialLength;
  }

  /**
   * 更新单个 Issue
   */
  updateIssue(issueId: string, updates: Partial<IssueShape>): boolean {
    const issueIndex = this.rawData.findIndex(issue => issue.id === issueId);
    if (issueIndex !== -1) {
      this.rawData[issueIndex] = { ...this.rawData[issueIndex], ...updates };
      return true;
    }
    return false;
  }

  /**
   * 根据ID查找 Issue
   */
  findIssueById(issueId: string): IssueShape | undefined {
    return this.rawData.find(issue => issue.id === issueId);
  }

  /**
   * 获取数据统计信息
   */
  getStats() {
    return {
      totalCount: this.rawData.length,
      statusCount: this.getCountByField('status'),
      teamCount: this.getCountByField('team'),
      priorityCount: this.getCountByField('priority'),
      categoryCount: this.getCountByField('category'),
    };
  }

  private getCountByField(field: keyof IssueShape): Record<string, number> {
    const counts: Record<string, number> = {};
    this.rawData.forEach(issue => {
      const value = issue[field] as string;
      counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
  }
} 