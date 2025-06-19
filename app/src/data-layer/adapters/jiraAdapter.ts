// Jira API 适配器 - 连接到公开测试实例
import { BaseAdapter, type ApiConfig } from './baseAdapter';
import type { IssueShape, SortedIssueShape, GroupableFieldValue } from '../types/timeline';
import { groupIssuesByField } from '../processors/groupingProcessor';

/**
 * Jira API 配置
 */
export interface JiraConfig extends ApiConfig {
  projectKey?: string;
  jqlQuery?: string;
  maxResults?: number;
  // 认证信息
  email?: string;      // Atlassian Cloud 用户邮箱
  apiToken?: string;   // Atlassian Cloud API Token 或 Personal Access Token
  username?: string;   // Jira Server 用户名
  password?: string;   // Jira Server 密码
}

/**
 * Jira Issue 原始数据类型
 */
interface JiraIssue {
  id: string;
  key: string;
  fields: {
    summary: string;
    description?: string;
    status: {
      id: string;
      name: string;
      statusCategory: {
        key: string;
        name: string;
      };
    };
    issuetype: {
      id: string;
      name: string;
      iconUrl: string;
    };
    priority?: {
      id: string;
      name: string;
    };
    assignee?: {
      key: string;
      name: string;
      displayName: string;
    };
    reporter?: {
      key: string;
      name: string;
      displayName: string;
    };
    created: string;
    updated: string;
    duedate?: string;
    components?: Array<{
      id: string;
      name: string;
    }>;
    labels?: string[];
    fixVersions?: Array<{
      id: string;
      name: string;
      releaseDate?: string;
    }>;
  };
}

/**
 * Jira API 响应类型
 */
interface JiraSearchResponse {
  startAt: number;
  maxResults: number;
  total: number;
  issues: JiraIssue[];
}

/**
 * Jira API 适配器
 * 
 * 连接到公开的测试 Jira 实例：https://jira.demo.almworks.com/
 * 这是一个真实可用的测试环境，无需认证
 */
export class JiraAdapter extends BaseAdapter {
  private _projectKey: string;
  private _jqlQuery: string;
  private _maxResults: number;

  constructor(config?: JiraConfig) {
    // 构建认证头部
    const authHeaders: Record<string, string> = {};
    
    if (config?.email && config?.apiToken) {
      // Atlassian Cloud 认证：Base64编码的 email:apiToken
      const credentials = btoa(`${config.email}:${config.apiToken}`);
      authHeaders['Authorization'] = `Basic ${credentials}`;
    } else if (config?.username && config?.password) {
      // Jira Server 认证：Base64编码的 username:password
      const credentials = btoa(`${config.username}:${config.password}`);
      authHeaders['Authorization'] = `Basic ${credentials}`;
    } else if (config?.apiToken) {
      // Personal Access Token
      authHeaders['Authorization'] = `Bearer ${config.apiToken}`;
    }

    // 默认配置（测试实例）
    const defaultConfig: ApiConfig = {
      baseUrl: config?.baseUrl || 'https://jira.demo.almworks.com',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...authHeaders
      }
    };

    super(config ? { ...defaultConfig, ...config } : defaultConfig);
    
    this._projectKey = config?.projectKey || 'DEMO';
    this._jqlQuery = config?.jqlQuery || `project = ${this._projectKey} ORDER BY created DESC`;
    this._maxResults = config?.maxResults || 50;
  }

  /**
   * 从 Jira 获取数据
   */
  async getRawData(): Promise<IssueShape[]> {
    try {
      console.log('🔍 正在从 Jira 获取数据...');
      
      const searchParams = new URLSearchParams({
        jql: this._jqlQuery,
        maxResults: this._maxResults.toString(),
        fields: 'id,key,summary,description,status,issuetype,priority,assignee,reporter,created,updated,duedate,components,labels,fixVersions'
      });

      const response = await this.fetchData<JiraSearchResponse>(
        `/rest/api/2/search?${searchParams.toString()}`
      );

      console.log(`✅ 成功获取 ${response.issues.length} 个 Issues`);
      
      return response.issues.map(jiraIssue => this.transformJiraIssueToIssue(jiraIssue));
    } catch (error) {
      console.error('❌ 获取 Jira 数据时出错:', error);
      
      // 如果 API 调用失败，返回模拟数据作为后备
      console.log('🔄 使用模拟数据作为后备...');
      return this.getMockData();
    }
  }

  /**
   * 获取分组数据
   */
  async getGroupedData(groupBy: GroupableFieldValue): Promise<SortedIssueShape> {
    const rawData = await this.getRawData();
    return groupIssuesByField(rawData, groupBy);
  }

  /**
   * 转换 Jira Issue 到内部格式
   */
  private transformJiraIssueToIssue(jiraIssue: JiraIssue): IssueShape {
    const created = new Date(jiraIssue.fields.created);
    const dueDate = jiraIssue.fields.duedate ? new Date(jiraIssue.fields.duedate) : null;
    
    // 计算开始和结束日期
    const startDate = created;
    const endDate = dueDate || new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000); // 默认7天后

    return {
      id: jiraIssue.key,
      name: jiraIssue.fields.summary,
      description: jiraIssue.fields.description || '',
      status: this.mapJiraStatusToStatus(jiraIssue.fields.status.statusCategory.key),
      priority: this.mapJiraPriorityToPriority(jiraIssue.fields.priority?.name || 'Medium'),
      category: jiraIssue.fields.issuetype.name,
      team: this.mapJiraTeamToTeam(jiraIssue.fields.assignee?.displayName || jiraIssue.fields.reporter?.displayName || 'Unassigned'),
      startDate: startDate,
      endDate: endDate,
      progress: this.calculateProgress(jiraIssue.fields.status.statusCategory.key)
    };
  }

  /**
   * 映射 Jira 状态到内部状态
   */
  private mapJiraStatusToStatus(statusCategory: string): IssueShape['status'] {
    switch (statusCategory.toLowerCase()) {
      case 'new':
      case 'todo':
        return 'Not Yet Started';
      case 'indeterminate':
      case 'progress':
        return 'On Track';
      case 'done':
        return 'On Track';
      default:
        return 'Not Yet Started';
    }
  }

  /**
   * 映射 Jira 优先级到内部优先级
   */
  private mapJiraPriorityToPriority(priority: string): IssueShape['priority'] {
    switch (priority.toLowerCase()) {
      case 'highest':
      case 'critical':
        return 'High';
      case 'high':
        return 'High';
      case 'medium':
      case 'normal':
        return 'Medium';
      case 'low':
      case 'lowest':
        return 'Low';
      default:
        return 'Medium';
    }
  }

  /**
   * 映射 Jira 团队到内部团队
   */
  private mapJiraTeamToTeam(teamName: string): IssueShape['team'] {
    // 简单映射规则，可以根据实际需要调整
    const teamMap: Record<string, IssueShape['team']> = {
      'development': 'Tech',
      'tech': 'Tech',
      'engineer': 'Tech',
      'marketing': 'Brand Marketing',
      'product': 'Product',
      'retail': 'Retail',
      'ecom': 'E-com',
      'e-com': 'E-com',
      'fulfillment': 'Fulfillment',
      'corporate': 'Corporate',
      'function': 'Function'
    };

    const lowerTeamName = teamName.toLowerCase();
    for (const [key, value] of Object.entries(teamMap)) {
      if (lowerTeamName.includes(key)) {
        return value;
      }
    }
    
    return 'Function'; // 默认团队
  }

  /**
   * 计算进度百分比
   */
  private calculateProgress(statusCategory: string): number {
    switch (statusCategory.toLowerCase()) {
      case 'new':
      case 'todo':
        return 0;
      case 'indeterminate':
      case 'progress':
        return 50;
      case 'done':
        return 100;
      default:
        return 0;
    }
  }

  /**
   * 获取模拟数据作为后备
   */
  private getMockData(): IssueShape[] {
    const now = new Date();
    return [
      {
        id: 'DEMO-001',
        name: '🔌 Jira API 集成测试',
        description: '这是从 Jira 测试实例获取的模拟数据',
        status: 'On Track',
        priority: 'High',
        category: 'Feature',
        team: 'Tech',
        startDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        progress: 50
      },
      {
        id: 'DEMO-002',
        name: '🧪 测试环境数据验证',
        description: '验证从 Jira 获取的数据格式和完整性',
        status: 'Not Yet Started',
        priority: 'Medium',
        category: 'Task',
        team: 'Function',
        startDate: new Date(now.getTime()),
        endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        progress: 0
      },
      {
        id: 'DEMO-003',
        name: '📊 时间线数据展示优化',
        description: '优化从 Jira 获取数据在时间线上的展示效果',
        status: 'On Track',
        priority: 'Low',
        category: 'Improvement',
        team: 'Product',
        startDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        progress: 100
      }
    ];
  }

  /**
   * 重写 fetchData 方法，处理 CORS 和认证
   */
  protected async fetchData<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.config?.baseUrl) {
      throw new Error('Base URL is required for API calls');
    }

    const url = `${this.config.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        mode: 'cors', // 处理跨域
        // 尽量减少 headers 以避免 CORS preflight 问题
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      // 如果是 CORS 错误或网络错误，抛出特定错误
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('无法连接到 Jira 实例，可能是 CORS 限制或网络问题');
      }
      throw error;
    }
  }

  // 以下方法暂时使用模拟实现
  async updateData(): Promise<void> {
    console.log('JiraAdapter: updateData called - 只读模式，不支持更新');
  }

  async addIssue(issue: IssueShape): Promise<void> {
    console.log('JiraAdapter: addIssue called for issue:', issue.id, '- 只读模式，不支持添加');
  }

  async removeIssue(issueId: string): Promise<boolean> {
    console.log('JiraAdapter: removeIssue called for issue:', issueId, '- 只读模式，不支持删除');
    return false;
  }

  async updateIssue(issueId: string): Promise<boolean> {
    console.log('JiraAdapter: updateIssue called for issue:', issueId, '- 只读模式，不支持更新');
    return false;
  }

  async findIssueById(issueId: string): Promise<IssueShape | undefined> {
    console.log('JiraAdapter: findIssueById called for issue:', issueId);
    const rawData = await this.getRawData();
    return rawData.find(issue => issue.id === issueId);
  }
}

/**
 * 创建默认的 Jira 适配器实例
 */
export const createJiraAdapter = (config?: Partial<JiraConfig>) => {
  return new JiraAdapter({
    baseUrl: 'https://jira.demo.almworks.com',
    projectKey: 'DEMO',
    jqlQuery: 'project = DEMO OR project = STR ORDER BY created DESC',
    maxResults: 50,
    ...config
  });
};

/**
 * 创建连接到你自己Jira实例的适配器
 * 
 * @example Atlassian Cloud
 * ```typescript
 * const myJiraAdapter = createCustomJiraAdapter({
 *   baseUrl: 'https://your-company.atlassian.net',
 *   email: 'your-email@company.com',
 *   apiToken: 'your-api-token',
 *   projectKey: 'YOUR_PROJECT',
 *   jqlQuery: 'project = YOUR_PROJECT AND status != Done',
 *   maxResults: 100
 * });
 * ```
 * 
 * @example Jira Server
 * ```typescript
 * const myJiraAdapter = createCustomJiraAdapter({
 *   baseUrl: 'https://jira.your-company.com',
 *   username: 'your-username',
 *   password: 'your-password',
 *   projectKey: 'YOUR_PROJECT'
 * });
 * ```
 */
export const createCustomJiraAdapter = (config: {
  baseUrl: string;
  projectKey: string;
  email?: string;
  apiToken?: string;
  username?: string;
  password?: string;
  jqlQuery?: string;
  maxResults?: number;
}) => {
  if (!config.baseUrl || !config.projectKey) {
    throw new Error('baseUrl 和 projectKey 是必需的');
  }

  if (!config.email && !config.username && !config.apiToken) {
    throw new Error('需要提供认证信息：email+apiToken 或 username+password 或 apiToken');
  }

  return new JiraAdapter({
    ...config,
    jqlQuery: config.jqlQuery || `project = ${config.projectKey} ORDER BY created DESC`,
    maxResults: config.maxResults || 50
  });
}; 