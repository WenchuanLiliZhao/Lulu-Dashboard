// 基础数据适配器接口

import type { IssueShape, SortedIssueShape, GroupableFieldValue } from '../types/timeline';

/**
 * 数据适配器基础接口
 * 所有数据适配器都应该实现这个接口
 */
export interface DataAdapterInterface {
  /**
   * 获取原始数据
   */
  getRawData(): Promise<IssueShape[]> | IssueShape[];

  /**
   * 按指定字段分组数据
   */
  getGroupedData(groupBy: GroupableFieldValue): Promise<SortedIssueShape> | SortedIssueShape;

  /**
   * 更新数据
   */
  updateData(newData: IssueShape[]): Promise<void> | void;

  /**
   * 添加单个 Issue
   */
  addIssue(issue: IssueShape): Promise<void> | void;

  /**
   * 删除 Issue（根据ID）
   */
  removeIssue(issueId: string): Promise<boolean> | boolean;

  /**
   * 更新单个 Issue
   */
  updateIssue(issueId: string, updates: Partial<IssueShape>): Promise<boolean> | boolean;

  /**
   * 根据ID查找 Issue
   */
  findIssueById(issueId: string): Promise<IssueShape | undefined> | IssueShape | undefined;
}

/**
 * API配置接口
 */
export interface ApiConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * 抽象基础适配器类
 * 提供一些通用的方法实现
 */
export abstract class BaseAdapter implements DataAdapterInterface {
  protected config?: ApiConfig;

  constructor(config?: ApiConfig) {
    this.config = config;
  }

  abstract getRawData(): Promise<IssueShape[]> | IssueShape[];
  abstract getGroupedData(groupBy: GroupableFieldValue): Promise<SortedIssueShape> | SortedIssueShape;
  abstract updateData(newData: IssueShape[]): Promise<void> | void;
  abstract addIssue(issue: IssueShape): Promise<void> | void;
  abstract removeIssue(issueId: string): Promise<boolean> | boolean;
  abstract updateIssue(issueId: string, updates: Partial<IssueShape>): Promise<boolean> | boolean;
  abstract findIssueById(issueId: string): Promise<IssueShape | undefined> | IssueShape | undefined;

  /**
   * 通用的网络请求方法
   */
  protected async fetchData<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    if (!this.config?.baseUrl) {
      throw new Error('Base URL is required for API calls');
    }

    const url = `${this.config.baseUrl}${endpoint}`;
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.config.headers,
    };

    if (this.config.apiKey) {
      defaultHeaders['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    // Note: timeout is not part of standard fetch API in browsers
    // For real implementation, consider using AbortController for timeout
    const response = await fetch(url, {
      headers: defaultHeaders,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
} 