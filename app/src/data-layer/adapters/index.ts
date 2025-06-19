// 数据适配器入口

export * from './baseAdapter';
export * from './staticDataAdapter';
export * from './notionAdapter';
export * from './jiraAdapter';

// 适配器工厂函数
import { StaticDataAdapter } from './staticDataAdapter';
import { NotionAdapter, type NotionConfig } from './notionAdapter';
import { JiraAdapter, type JiraConfig } from './jiraAdapter';
import type { IssueShape } from '../types/timeline';

export type AdapterType = 'static' | 'notion' | 'jira';

export interface AdapterFactoryConfig {
  type: AdapterType;
  data?: IssueShape[]; // 用于静态数据适配器
  notionConfig?: NotionConfig;
  jiraConfig?: JiraConfig;
}

/**
 * 适配器工厂函数
 * 根据配置创建相应的数据适配器
 */
export function createAdapter(config: AdapterFactoryConfig) {
  switch (config.type) {
    case 'static':
      if (!config.data) {
        throw new Error('Static adapter requires data');
      }
      return new StaticDataAdapter(config.data);
      
    case 'notion':
      if (!config.notionConfig) {
        throw new Error('Notion adapter requires notionConfig');
      }
      return new NotionAdapter(config.notionConfig);
      
    case 'jira':
      if (!config.jiraConfig) {
        throw new Error('Jira adapter requires jiraConfig');
      }
      return new JiraAdapter(config.jiraConfig);
      
    default:
      throw new Error(`Unsupported adapter type: ${config.type}`);
  }
} 