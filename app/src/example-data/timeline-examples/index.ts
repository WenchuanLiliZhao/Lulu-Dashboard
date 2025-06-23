// Timeline 示例数据入口

export { Example_Issues_1 } from './example1';
export { Example_Issues_2 } from './example2';
export { Example_Issues_3 } from './example3';

// 新的基础和扩展示例
export { BasicTimelineExample, ExtendedTimelineExample } from './basic-example';

// 自定义项目数据结构示例 - 完全不同的字段结构
export { CustomProjectTimelineExample, CustomProjectExamples } from './custom-project-example';

// 合并所有示例数据
import { Example_Issues_1 } from './example1';
import { Example_Issues_2 } from './example2';
import { Example_Issues_3 } from './example3';

export const AllExampleIssues = [
  ...Example_Issues_1,
  ...Example_Issues_2,
  ...Example_Issues_3,
];

// 按类别分组的示例数据
export const ExampleDatasets = {
  dataset1: Example_Issues_1,
  dataset2: Example_Issues_2,
  dataset3: Example_Issues_3,
  combined: AllExampleIssues,
}; 