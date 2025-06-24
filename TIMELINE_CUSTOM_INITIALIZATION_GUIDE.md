# Timeline 组件自定义数据结构指南

## 核心设计理念

🎯 **Timeline 组件的设计哲学：最少约束，最大自由**

Timeline 组件采用了"**最小核心 + 完全扩展**"的设计理念：

- **只要求 4 个基础字段** - Timeline 能正常工作的最少要求
- **其他字段完全自定义** - 您可以添加任意数据结构，组件会智能适配
- **类型安全保障** - 完整的 TypeScript 支持，确保编译时安全

## 基础要求：只需要 4 个字段

### BaseTimelineItem - 唯一的硬性要求

Timeline 组件**只强制要求**以下 4 个字段：

```typescript
interface BaseTimelineItem {
  id: string;        // 唯一标识符 - 用于区分不同的时间线项目
  name: string;      // 显示名称 - 在时间线上显示的标题
  startDate: Date;   // 开始日期 - 时间线条的起点
  endDate: Date;     // 结束日期 - 时间线条的终点
}
```

### 为什么只需要这 4 个字段？

1. **`id`** - 组件内部需要唯一标识来管理项目
2. **`name`** - 用户需要看到项目的名称
3. **`startDate` & `endDate`** - 时间线的核心就是时间范围

**就这些！** 其他一切都是可选的、可自定义的。

## 自定义扩展：添加任意字段

### 原则：想加什么就加什么

除了上述 4 个基础字段，您可以添加：
- ✅ 任意数量的字段
- ✅ 任意类型的数据（字符串、数字、布尔值、对象、数组等）
- ✅ 任意复杂的嵌套结构
- ✅ 任意的业务逻辑字段

### 示例 1：简单扩展

```typescript
// 基础字段 + 简单扩展
interface ProjectData {
  // 🔴 必需的基础字段
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 🟢 您的自定义字段 - 随意添加
  priority: 'High' | 'Medium' | 'Low';
  department: string;
  budget: number;
  status: 'Planning' | 'InProgress' | 'Completed';
  assignee: string;
}
```

### 示例 2：复杂扩展

```typescript
// 基础字段 + 复杂业务数据
interface ComplexProjectData {
  // 🔴 必需的基础字段
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 🟢 复杂的自定义数据结构
  teamInfo: {
    manager: string;
    members: string[];
    department: string;
    location: 'Remote' | 'Office' | 'Hybrid';
  };
  
  financials: {
    budget: {
      allocated: number;
      spent: number;
      currency: 'USD' | 'EUR' | 'CNY';
    };
    billing: {
      hourlyRate: number;
      billingCycle: 'Weekly' | 'Monthly';
    };
  };
  
  technical: {
    technologies: string[];
    platforms: string[];
    complexity: 1 | 2 | 3 | 4 | 5;
  };
  
  risks: {
    technical: 'Low' | 'Medium' | 'High';
    business: 'Low' | 'Medium' | 'High';
    timeline: 'Low' | 'Medium' | 'High';
  };
  
  milestones: {
    planning: Date;
    development: Date;
    testing: Date;
    launch: Date;
  };
  
  metadata: {
    createdBy: string;
    lastModified: Date;
    version: string;
    tags: string[];
  };
}
```

## 如何自定义：详细步骤指南

### 步骤 1：定义您的数据结构

首先，定义包含基础字段 + 您的自定义字段的接口：

```typescript
// 第一步：定义您的数据接口
interface MyProjectData {
  // 🔴 必需：基础字段（不能省略）
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 🟢 自定义：添加您需要的业务字段
  priority: 'High' | 'Medium' | 'Low';
  team: string;
  budget: number;
  status: 'Active' | 'Paused' | 'Completed';
}
```

### 步骤 2：创建数据

创建符合您接口的数据数组：

```typescript
// 第二步：创建数据
const myProjects: MyProjectData[] = [
  {
    // 基础字段
    id: "proj-001",
    name: "网站重构项目",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-31"),
    
    // 您的自定义字段
    priority: 'High',
    team: '前端团队',
    budget: 50000,
    status: 'Active'
  },
  {
    id: "proj-002", 
    name: "移动应用开发",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-06-30"),
    priority: 'Medium',
    team: '移动团队',
    budget: 80000,
    status: 'Active'
  }
];
```

### 步骤 3：分组处理

使用通用分组函数处理您的数据：

```typescript
// 第三步：分组数据
import { groupTimelineItemsByField } from './data-layer';

// 可以按任意字段分组（基础字段或自定义字段）
const groupedByTeam = groupTimelineItemsByField(myProjects, 'team');
const groupedByPriority = groupTimelineItemsByField(myProjects, 'priority');
const groupedByStatus = groupTimelineItemsByField(myProjects, 'status');
```

### 步骤 4：使用 Timeline 组件

将泛型类型传递给 Timeline 组件：

```typescript
// 第四步：使用组件
import { Timeline } from './design-system';

function MyCustomTimeline() {
  const [groupBy, setGroupBy] = useState<keyof MyProjectData>('team');
  const groupedData = groupTimelineItemsByField(myProjects, groupBy);
  
  return (
    <Timeline<MyProjectData>
      init={{
        dataType: {
          // 为您的自定义字段提供默认值
          priority: 'Medium',
          team: '',
          budget: 0,
          status: 'Active'
        },
        groupBy: 'team'  // 默认分组方式
      }}
      inputData={groupedData}
      onGroupByChange={setGroupBy}
    />
  );
}
```

## 真实项目示例

### 示例 1：软件开发项目管理

```typescript
interface SoftwareProject {
  // 基础字段
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 开发相关字段
  technology: 'React' | 'Vue' | 'Angular' | 'Node.js' | 'Python';
  complexity: 'Simple' | 'Medium' | 'Complex';
  teamSize: number;
  githubRepo: string;
  
  // 项目管理字段
  projectManager: string;
  client: string;
  phase: 'Planning' | 'Development' | 'Testing' | 'Deployment' | 'Maintenance';
  
  // 业务字段
  revenue: number;
  profitMargin: number;
  priority: 1 | 2 | 3 | 4 | 5;
}

// 使用示例
const devProjects: SoftwareProject[] = [
  {
    id: "sw-001",
    name: "电商平台重构",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-04-30"),
    technology: 'React',
    complexity: 'Complex',
    teamSize: 8,
    githubRepo: 'github.com/company/ecommerce-platform',
    projectManager: '张三',
    client: 'ABC电商',
    phase: 'Development',
    revenue: 500000,
    profitMargin: 0.25,
    priority: 1
  }
];
```

### 示例 2：活动营销管理

```typescript
interface MarketingCampaign {
  // 基础字段
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 营销特定字段
  channel: 'Social Media' | 'Email' | 'TV' | 'Online Ads' | 'Print';
  targetAudience: 'Youth' | 'Adults' | 'Seniors' | 'Professionals';
  budget: {
    allocated: number;
    spent: number;
    currency: 'USD' | 'EUR' | 'CNY';
  };
  
  // 绩效追踪
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    roi: number;  // Return on Investment
  };
  
  // 团队信息
  manager: string;
  creativeTeam: string[];
  approvalStatus: 'Draft' | 'Review' | 'Approved' | 'Live' | 'Completed';
}
```

### 示例 3：制造业生产计划

```typescript
interface ProductionSchedule {
  // 基础字段
  id: string;
  name: string;  // 产品名称
  startDate: Date;
  endDate: Date;
  
  // 生产相关
  productLine: 'Electronics' | 'Automotive' | 'Textiles' | 'Food';
  facility: string;
  shift: 'Day' | 'Night' | 'Both';
  
  // 资源管理
  resources: {
    workers: number;
    machines: string[];
    rawMaterials: {
      name: string;
      quantity: number;
      unit: string;
    }[];
  };
  
  // 质量控制
  quality: {
    defectRate: number;  // 百分比
    inspector: string;
    standards: string[];
  };
  
  // 物流
  shipping: {
    destination: string;
    carrier: string;
    trackingNumber?: string;
  };
}
```

## 分组功能：按任意字段分组

### 核心概念

Timeline 的一个强大特性是可以按**任意字段**进行分组显示，无论是基础字段还是您的自定义字段。

### 基础字段分组

可以按 4 个基础字段中的任意一个分组：

```typescript
// 按项目名称分组 - 每个项目一个组
const groupedByName = groupTimelineItemsByField(data, 'name');

// 按项目ID分组 - 通常用于测试
const groupedById = groupTimelineItemsByField(data, 'id');

// 按开始日期分组 - 相同开始日期的项目一组
const groupedByStartDate = groupTimelineItemsByField(data, 'startDate');
```

### 自定义字段分组

这是 Timeline 最强大的功能 - 按您的业务字段分组：

```typescript
interface ProjectData {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  // 自定义字段
  department: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Paused' | 'Completed';
  manager: string;
}

// 按部门分组 - 显示各部门的项目
const byDepartment = groupTimelineItemsByField(data, 'department');

// 按优先级分组 - 高/中/低优先级项目分组显示
const byPriority = groupTimelineItemsByField(data, 'priority');

// 按状态分组 - 活跃/暂停/完成项目分组
const byStatus = groupTimelineItemsByField(data, 'status');

// 按负责人分组 - 显示每个经理负责的项目
const byManager = groupTimelineItemsByField(data, 'manager');
```

### 动态分组切换

用户可以实时切换分组方式：

```typescript
function DynamicGroupingTimeline() {
  const [groupBy, setGroupBy] = useState<keyof ProjectData>('department');
  
  const groupedData = useMemo(() => {
    return groupTimelineItemsByField(projects, groupBy);
  }, [projects, groupBy]);
  
  return (
    <div>
      {/* 分组切换按钮 */}
      <div>
        <button onClick={() => setGroupBy('department')}>按部门</button>
        <button onClick={() => setGroupBy('priority')}>按优先级</button>
        <button onClick={() => setGroupBy('status')}>按状态</button>
        <button onClick={() => setGroupBy('manager')}>按负责人</button>
      </div>
      
      {/* Timeline 组件 */}
      <Timeline<ProjectData>
        inputData={groupedData}
        onGroupByChange={setGroupBy}
      />
    </div>
  );
}
```

### 处理复杂对象字段分组

对于嵌套对象，需要先提取具体值：

```typescript
interface ComplexProject {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 嵌套对象
  client: {
    company: string;
    industry: string;
    region: 'NA' | 'EU' | 'APAC';
  };
  
  team: {
    lead: string;
    size: number;
    department: string;
  };
}

// 方案1：扁平化处理
const flattenedData = complexProjects.map(project => ({
  ...project,
  clientRegion: project.client.region,        // 提取客户地区
  clientIndustry: project.client.industry,    // 提取客户行业
  teamLead: project.team.lead,                // 提取团队负责人
  teamDepartment: project.team.department     // 提取团队部门
}));

// 现在可以按提取的字段分组
const byRegion = groupTimelineItemsByField(flattenedData, 'clientRegion');
const byIndustry = groupTimelineItemsByField(flattenedData, 'clientIndustry');
const byTeamLead = groupTimelineItemsByField(flattenedData, 'teamLead');

// 方案2：动态提取函数
const getGroupedData = (groupField: string) => {
  switch (groupField) {
    case 'clientRegion':
      return groupTimelineItemsByField(
        complexProjects.map(p => ({ ...p, clientRegion: p.client.region })),
        'clientRegion'
      );
      
    case 'clientIndustry': 
      return groupTimelineItemsByField(
        complexProjects.map(p => ({ ...p, clientIndustry: p.client.industry })),
        'clientIndustry'
      );
      
    case 'teamLead':
      return groupTimelineItemsByField(
        complexProjects.map(p => ({ ...p, teamLead: p.team.lead })),
        'teamLead'
      );
      
    default:
      return groupTimelineItemsByField(complexProjects, groupField);
  }
};
```

## 核心优势与使用技巧

### 💡 为什么选择这种设计？

1. **极简入门** - 只需 4 个字段就能开始使用
2. **无限扩展** - 支持任意复杂的业务数据结构
3. **类型安全** - TypeScript 全程保护，避免运行时错误
4. **智能分组** - 自动适配您的任意字段进行分组
5. **向后兼容** - 新增字段不会破坏现有功能

### 🔧 实用技巧

#### 1. 渐进式扩展

从最简单开始，逐步添加字段：

```typescript
// 第一版：最简单版本
interface ProjectV1 {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

// 第二版：添加基础业务字段
interface ProjectV2 extends ProjectV1 {
  status: 'Active' | 'Completed';
  priority: 'High' | 'Low';
}

// 第三版：添加复杂业务逻辑
interface ProjectV3 extends ProjectV2 {
  team: {
    lead: string;
    members: string[];
  };
  budget: {
    allocated: number;
    spent: number;
  };
}
```

#### 2. 字段命名策略

```typescript
// ✅ 推荐：清晰的字段命名
interface WellNamedProject {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 业务含义清晰
  projectManager: string;        // 而不是 pm
  estimatedBudget: number;       // 而不是 budget
  currentStatus: 'Active' | 'Paused';  // 而不是 status
  teamDepartment: string;        // 而不是 dept
}
```

#### 3. 类型安全最佳实践

```typescript
// ✅ 推荐：使用联合类型和枚举
interface TypeSafeProject {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 使用联合类型限定可选值
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Planning' | 'InProgress' | 'Testing' | 'Deployed' | 'Cancelled';
  
  // 使用数字字面量类型
  complexityLevel: 1 | 2 | 3 | 4 | 5;
  
  // 使用 const 断言确保类型推断
  region: 'US' | 'EU' | 'APAC';
}

// ❌ 避免：使用 any 或过于宽泛的类型
interface UnsafeProject {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  priority: string;  // 太宽泛
  metadata: any;     // 避免使用 any
  config: object;    // 避免使用 object
}
```

#### 4. 处理可选字段

```typescript
interface FlexibleProject {
  // 必需的基础字段
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  
  // 可选的自定义字段
  description?: string;
  tags?: string[];
  assignee?: string;
  
  // 带默认值的字段在 init.dataType 中提供默认值
  priority: 'High' | 'Medium' | 'Low';  // 在 init 中默认为 'Medium'
  status: 'Active' | 'Paused';          // 在 init 中默认为 'Active'
}
```

#### 5. 性能优化技巧

```typescript
// ✅ 推荐：使用 useMemo 缓存分组结果
function OptimizedTimeline() {
  const [groupBy, setGroupBy] = useState<keyof ProjectData>('department');
  
  // 缓存分组结果，避免重复计算
  const groupedData = useMemo(() => {
    return groupTimelineItemsByField(projects, groupBy);
  }, [projects, groupBy]);
  
  // 缓存初始化配置
  const initConfig = useMemo(() => ({
    dataType: {
      priority: 'Medium' as const,
      status: 'Active' as const,
      department: '',
    },
    groupBy: 'department' as const
  }), []);
  
  return (
    <Timeline<ProjectData>
      init={initConfig}
      inputData={groupedData}
      onGroupByChange={setGroupBy}
    />
  );
}
```

### 🚨 常见陷阱与解决方案

#### 陷阱 1：忘记包含基础字段

```typescript
// ❌ 错误：缺少基础字段
interface IncompleteProject {
  // 缺少 id
  name: string;
  startDate: Date;
  // 缺少 endDate
  customField: string;
}

// ✅ 正确：包含所有基础字段
interface CompleteProject {
  id: string;        // ✓
  name: string;      // ✓
  startDate: Date;   // ✓
  endDate: Date;     // ✓
  customField: string;
}
```

#### 陷阱 2：日期类型错误

```typescript
// ❌ 错误：使用字符串日期
const badProject = {
  id: "1",
  name: "Project",
  startDate: "2024-01-01",  // 错误！应该是 Date 对象
  endDate: "2024-12-31",    // 错误！应该是 Date 对象
};

// ✅ 正确：使用 Date 对象
const goodProject = {
  id: "1", 
  name: "Project",
  startDate: new Date("2024-01-01"),  // ✓
  endDate: new Date("2024-12-31"),    // ✓
};
```

#### 陷阱 3：分组字段不存在

```typescript
// ❌ 问题：尝试按不存在的字段分组
const data = [
  { id: "1", name: "A", startDate: new Date(), endDate: new Date(), team: "Dev" }
];

// 错误：department 字段不存在
groupTimelineItemsByField(data, 'department');  // 运行时错误！

// ✅ 解决方案：确保分组字段存在
groupTimelineItemsByField(data, 'team');  // ✓ 正确
```

### 📚 快速参考

#### 必需字段检查清单

- [ ] `id: string` - 唯一标识符
- [ ] `name: string` - 显示名称
- [ ] `startDate: Date` - 开始日期（必须是 Date 对象）
- [ ] `endDate: Date` - 结束日期（必须是 Date 对象）

#### 自定义字段建议

- [ ] 使用 TypeScript 联合类型限定取值范围
- [ ] 为复杂对象提供清晰的嵌套结构
- [ ] 使用有意义的字段名称
- [ ] 在 `init.dataType` 中提供合理默认值
- [ ] 考虑字段的分组需求

#### 组件使用检查清单

- [ ] 传递正确的泛型类型参数 `<YourDataType>`
- [ ] 在 `init.dataType` 中定义自定义字段的默认值
- [ ] 使用 `groupTimelineItemsByField` 对数据进行分组
- [ ] 处理分组切换的用户交互
- [ ] 使用 `useMemo` 优化性能

## 总结

🎉 **Timeline 组件的核心优势：**

- **简单** - 只需 4 个基础字段即可开始
- **强大** - 支持无限复杂的自定义数据结构  
- **灵活** - 按任意字段进行智能分组
- **安全** - 完整的 TypeScript 类型保护
- **高效** - 内置性能优化和缓存机制

通过这种"**最小约束 + 最大自由**"的设计，Timeline 组件能够适应任何业务场景，从简单的项目管理到复杂的企业级数据可视化，都能轻松胜任。 