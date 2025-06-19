# 🔧 连接你自己的Jira实例 - 配置指南

本指南将帮你将时间线组件连接到你自己的Jira实例，而不是使用演示数据。

## 📋 准备工作

### 1. 获取Jira实例信息
- **Jira实例URL**：
  - Atlassian Cloud: `https://your-company.atlassian.net`
  - Jira Server/Data Center: `https://jira.your-company.com`

### 2. 获取项目信息
- **项目键 (Project Key)**：在Jira中查看项目设置，例如 `DEV`, `MARKETING`, `PROJ` 等

### 3. 设置认证信息

#### 选项A: Atlassian Cloud (推荐)
1. 前往 [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. 点击 "Create API token"
3. 给token命名并复制生成的token
4. 你需要：
   - 你的邮箱地址
   - 刚创建的API Token

#### 选项B: Jira Server/Data Center
1. 创建Personal Access Token (如果支持):
   - 前往 `个人设置 > Personal Access Tokens`
   - 创建新token
2. 或使用用户名和密码（不推荐）

## 🛠️ 代码配置

### 步骤1: 修改页面组件

在 `app/src/demo/pages/Page_Timeline_Jira.tsx` 中：

```typescript
// 1. 取消注释这行
import { createCustomJiraAdapter } from "../../data-layer/adapters/jiraAdapter";

// 2. 注释掉测试实例配置，使用你自己的配置
const jiraAdapter = createCustomJiraAdapter({
  // 必需配置
  baseUrl: 'https://your-company.atlassian.net',  // 你的Jira实例URL
  projectKey: 'YOUR_PROJECT_KEY',                 // 你的项目键
  
  // Atlassian Cloud 认证（推荐）
  email: 'your-email@company.com',                // 你的邮箱
  apiToken: 'your-api-token',                     // API Token

  // 或者 Jira Server 认证
  // username: 'your-username',
  // password: 'your-password',
  
  // 可选配置
  jqlQuery: 'project = YOUR_PROJECT_KEY AND status != Done ORDER BY created DESC',
  maxResults: 50
});
```

### 步骤2: 自定义JQL查询（可选）

你可以自定义JQL查询来筛选想要显示的issues：

```typescript
// 示例JQL查询
jqlQuery: 'project = DEV AND assignee = currentUser() ORDER BY priority DESC'
jqlQuery: 'project = MARKETING AND status in ("In Progress", "To Do") ORDER BY duedate'
jqlQuery: 'project = PROJ AND created >= -30d ORDER BY created DESC'
```

## 🚨 可能遇到的问题

### CORS跨域问题
浏览器直连Jira API会遇到CORS限制。解决方案：

#### 选项1: 使用开发代理（推荐）
在 `vite.config.ts` 中添加代理配置：

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api/jira': {
        target: 'https://your-company.atlassian.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/jira/, ''),
        headers: {
          'Authorization': 'Basic ' + btoa('your-email:your-api-token')
        }
      }
    }
  }
})
```

然后修改适配器配置：
```typescript
baseUrl: '/api/jira'  // 使用代理路径
```

#### 选项2: 使用服务端中间层
创建一个后端服务来代理Jira API请求。

#### 选项3: 配置Jira CORS（企业环境）
如果你有Jira管理权限，可以在Jira中配置CORS白名单。

### 认证问题
- 确保API Token正确无误
- 确保用户有访问项目的权限
- 检查Jira实例URL是否正确

### 数据映射问题
不同Jira配置可能有不同的字段值，你可能需要调整：
- 状态映射 (`mapJiraStatusToStatus`)
- 优先级映射 (`mapJiraPriorityToPriority`)
- 团队映射 (`mapJiraTeamToTeam`)

## 🔍 测试连接

1. 修改配置后，刷新页面
2. 打开浏览器开发者工具查看网络请求
3. 如果成功，你应该看到你的Jira数据在时间线中显示
4. 如果失败，检查控制台错误信息

## 📝 配置示例

### Atlassian Cloud完整示例
```typescript
const jiraAdapter = createCustomJiraAdapter({
  baseUrl: 'https://mycompany.atlassian.net',
  projectKey: 'DEV',
  email: 'john.doe@mycompany.com',
  apiToken: 'ATATT3xFfGF0T...your-token...abc123',
  jqlQuery: 'project = DEV AND status != Done ORDER BY priority DESC, created DESC',
  maxResults: 100
});
```

### Jira Server示例
```typescript
const jiraAdapter = createCustomJiraAdapter({
  baseUrl: 'https://jira.mycompany.com',
  projectKey: 'PROJ',
  username: 'john.doe',
  password: 'your-password',
  jqlQuery: 'project = PROJ ORDER BY created DESC',
  maxResults: 50
});
```

## 📞 需要帮助？

如果遇到问题：
1. 检查控制台错误信息
2. 验证Jira实例URL和项目键
3. 确认认证信息正确
4. 测试JQL查询在Jira界面中是否正常工作

---

配置完成后，你的时间线将显示真实的Jira数据！🎉 