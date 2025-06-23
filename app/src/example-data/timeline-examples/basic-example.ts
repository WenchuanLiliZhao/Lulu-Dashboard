import { type TimelineItem, type BaseTimelineItem } from "../../data-layer/types/timeline";

// 基础Timeline示例数据 - 只包含四个必需字段
export const BasicTimelineExample: BaseTimelineItem[] = [
  {
    id: "basic-1",
    name: "Project Alpha",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
  },
  {
    id: "basic-2", 
    name: "Project Beta",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-15"),
  },
  {
    id: "basic-3",
    name: "Project Gamma", 
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-04-30"),
  },
  {
    id: "basic-4",
    name: "Project Delta",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-05-15"),
  },
  {
    id: "basic-5",
    name: "Project Epsilon",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-06-30"),
  }
];

// 扩展示例 - 添加自定义字段
interface CustomExtension {
  priority: 'High' | 'Medium' | 'Low';
  department: string;
  status: 'Planning' | 'InProgress' | 'Completed';
}

export const ExtendedTimelineExample: TimelineItem<CustomExtension>[] = [
  {
    id: "ext-1",
    name: "Marketing Campaign Q1",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-31"),
    priority: 'High',
    department: 'Marketing',
    status: 'InProgress'
  },
  {
    id: "ext-2",
    name: "Product Launch",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-04-15"),
    priority: 'High',
    department: 'Product',
    status: 'Planning'
  },
  {
    id: "ext-3",
    name: "Security Audit",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    priority: 'Medium',
    department: 'IT',
    status: 'Completed'
  },
  {
    id: "ext-4",
    name: "Team Training",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-05-31"),
    priority: 'Low',
    department: 'HR',
    status: 'Planning'
  }
]; 