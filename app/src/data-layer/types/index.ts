// 数据层类型定义入口 - 精简版
// 只保留Timeline基本布局相关的类型定义

export * from './timeline';

// 通用类型
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
}

export interface ErrorResponse {
  error: string;
  code?: string;
  details?: unknown;
} 