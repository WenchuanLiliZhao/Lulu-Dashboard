# 通用Timeline组件使用指南

## 概述

Timeline组件现已重构为通用化的设计系统组件，支持任意数据类型的时间线展示。只需要四个基础字段：`id`、`name`、`startDate`、`endDate`，其余字段可由用户自定义。

## 基础用法

### 1. 最简单的使用方式

```tsx
import { GenericTimeline, groupTimelineItemsByField } from '@/design-system';
import type { BaseTimelineItem } from '@/data-layer';

// 基础数据 - 只需要四个字段
const basicData: BaseTimelineItem[] = [
  {
    id: "1",
    name: "Project Alpha",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
  },
  {
    id: "2",
    name: "Project Beta", 
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-15"),
  }
];

// 按name分组（默认分组方式）
const groupedData = groupTimelineItemsByField(basicData, 'name');

function MyTimeline() {
  return (
    <GenericTimeline
      inputData={groupedData}
    />
  );
}
```

### 2. 自定义数据类型

```tsx
import { GenericTimeline, groupTimelineItemsByField } from '@/design-system';
import type { TimelineItem } from '@/data-layer';

// 定义自定义数据类型
interface ProjectData {
  status: 'Planning' | 'InProgress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  department: string;
  budget: number;
}

// 创建带自定义字段的数据
const projectData: TimelineItem<ProjectData>[] = [
  {
    id: "proj-1",
    name: "Marketing Campaign",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-31"),
    // 自定义字段
    status: 'InProgress',
    priority: 'High',
    department: 'Marketing',
    budget: 50000
  },
  {
    id: "proj-2", 
    name: "Product Launch",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-04-15"),
    status: 'Planning',
    priority: 'High',
    department: 'Product',
    budget: 100000
  }
];

function CustomTimeline() {
  const [groupBy, setGroupBy] = useState<keyof TimelineItem<ProjectData>>('department');
  
  const groupedData = groupTimelineItemsByField(projectData, groupBy);
  
  return (
    <GenericTimeline<ProjectData>
      init={{
        dataType: {
          status: 'Planning' as const,
          priority: 'Medium' as const,
          department: '',
          budget: 0
        },
        groupBy: 'department'
      }}
      inputData={groupedData}
      onGroupByChange={(newGroupBy) => setGroupBy(newGroupBy)}
    />
  );
}
```

## 高级用法

### 3. 用户示例中的用法

根据用户需求，可以这样使用：

```tsx
// 定义团队数据类型
interface TeamData {
  status: string;
  progress: number;
  category: string;
  team: {
    name: string;
    color: string;
  };
  priority: 'High' | 'Medium' | 'Low';
}

// 示例数据
const teamProjects: TimelineItem<TeamData>[] = [
  {
    id: "team-1",
    name: "Interactive Calculus Workshop",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    status: "High Risks",
    progress: 50,
    category: "Advance Solutions",
    team: {
      name: "Function",
      color: "#4CAF50"
    },
    priority: "High"
  }
];

function TeamTimeline() {
  const [groupBy, setGroupBy] = useState<keyof TimelineItem<TeamData>>('category');
  
  const groupedData = groupTimelineItemsByField(teamProjects, groupBy);
  
  return (
    <GenericTimeline<TeamData>
      init={{
        dataType: {
          status: "On Track",
          progress: 0,
          category: "",
          team: {
            name: "",
            color: "#666666"
          },
          priority: "Medium"
        },
        groupBy: "category"
      }}
      inputData={groupedData}
      onGroupByChange={(newGroupBy) => setGroupBy(newGroupBy)}
    />
  );
}
```

## API参考

### GenericTimeline Props

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `init` | `TimelineConfig<T>` | 可选 | 初始化配置，包含数据类型定义和默认分组 |
| `inputData` | `SortedTimelineData<T>` | 必需 | 已分组的时间线数据 |
| `onGroupByChange` | `(groupBy: keyof T) => void` | 可选 | 分组方式改变时的回调 |

### TimelineConfig

```tsx
interface TimelineConfig<TExtended = Record<string, unknown>> {
  dataType?: TExtended;  // 自定义数据类型示例
  groupBy?: keyof (BaseTimelineItem & TExtended);  // 默认分组字段
}
```

### BaseTimelineItem

```tsx
interface BaseTimelineItem {
  id: string;        // 唯一标识符
  name: string;      // 显示名称
  startDate: Date;   // 开始日期
  endDate: Date;     // 结束日期
}
```

## 向后兼容

原有的Timeline组件保持不变，仍可正常使用：

```tsx
import { Timeline } from '@/design-system';

// 传统用法仍然有效
<Timeline 
  inputData={groupIssuesByField(issues, 'category')} 
  onGroupByChange={handleGroupByChange}
/>
```

## 数据处理工具

### groupTimelineItemsByField

通用分组函数，支持任意数据类型：

```tsx
function groupTimelineItemsByField<T>(
  items: TimelineItem<T>[],
  groupBy: keyof (BaseTimelineItem & T)
): SortedTimelineData<T>
```

### 示例

```tsx
// 按部门分组
const byDepartment = groupTimelineItemsByField(data, 'department');

// 按优先级分组
const byPriority = groupTimelineItemsByField(data, 'priority');

// 按名称分组（默认）
const byName = groupTimelineItemsByField(data, 'name');
```

## 最佳实践

1. **类型定义**：为自定义数据定义明确的TypeScript接口
2. **分组字段**：确保分组字段在所有数据项中都存在
3. **日期格式**：始终使用Date对象，不要使用字符串
4. **默认值**：在`init.dataType`中提供合理的默认值
5. **性能考虑**：对于大量数据，考虑分页或虚拟滚动

## 迁移指南

### 从传统Timeline迁移

1. 保持现有数据结构不变，或者：
2. 创建数据转换函数：

```tsx
function convertLegacyData(legacyData: IssueShape[]): TimelineItem<MyExtendedType>[] {
  return legacyData.map(item => ({
    id: item.id,
    name: item.name,
    startDate: item.startDate,
    endDate: item.endDate,
    // 添加自定义字段
    ...myCustomFields
  }));
}
```

3. 使用GenericTimeline替换原组件
4. 更新分组逻辑使用新的工具函数 