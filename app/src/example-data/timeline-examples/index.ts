// Timeline 示例数据入口

export { Example_Issues_1 } from './example1';
export { Example_Issues_2 } from './example2';
export { Example_Issues_3 } from './example3';

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