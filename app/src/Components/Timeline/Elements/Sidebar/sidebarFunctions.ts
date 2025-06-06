import { type IssueShape, IssueShapeKeys } from "../../Utils";
import type { OutPutTermsType, TermType } from "./GroupProgressBar";
import { getStatusColor } from "../../Utils/VisualConfigs";
import type { StatusType } from "../../Utils/Shapes";
// 统计组中 items 的状态分布

export const getStatusStats = (groupItems: IssueShape[]): OutPutTermsType => {
  const statusCounts: Record<string, number> = {};

  // 统计每个状态的数量
  groupItems.forEach(item => {
    const status = item[IssueShapeKeys.STATUS];
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  // 转换为 TermType 数组
  const terms: TermType[] = Object.entries(statusCounts).map(([statusName, count]) => ({
    name: statusName,
    color: getStatusColor(statusName as StatusType),
    count: count
  }));

  return {
    key: "status",
    terms: terms
  };
};
