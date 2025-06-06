import { IssueShapeKeys, type IssueShape } from "../../Utils";
import type { OutPutTermsType, TermType } from "./GroupProgressBar";
import { getStatusColor, getTeamColor } from "../../Utils/VisualConfigs";
import type { StatusType, TeamType } from "../../Utils/Shapes";
import { cssVariables, getCssVar, semanticColors } from "../../../../assets/global-style/css-variables";
// 统计组中 items 的属性分布

export const getPropertyStats = (groupItems: IssueShape[], property: 'status' | 'team'): OutPutTermsType => {
  const propertyCounts: Record<string, number> = {};

  // 统计每个属性值的数量
  groupItems.forEach(item => {
    const propertyValue = property === 'status' 
      ? item[IssueShapeKeys.STATUS] 
      : item[IssueShapeKeys.TEAM];
    propertyCounts[propertyValue] = (propertyCounts[propertyValue] || 0) + 1;
  });

  // 转换为 TermType 数组
  const terms: TermType[] = Object.entries(propertyCounts).map(([propertyName, count]) => ({
    name: propertyName,
    color: property === 'status' 
      ? getStatusColor(propertyName as StatusType)
      : getTeamColor(propertyName as TeamType),
    count: count
  }));

  return {
    key: property,
    terms: terms
  };
};

// 统计组中 items 的进度分布
export const getProgressStats = (groupItems: IssueShape[]): OutPutTermsType => {
  const progressCounts = {
    'To Do': 0,
    'In Progress': 0,
    'Done': 0
  };

  // 统计每个进度状态的数量
  groupItems.forEach(item => {
    const progress = item[IssueShapeKeys.PROGRESS];
    if (progress === 0) {
      progressCounts['To Do']++;
    } else if (progress === 100) {
      progressCounts['Done']++;
    } else {
      progressCounts['In Progress']++;
    }
  });

  // 转换为 TermType 数组
  const terms: TermType[] = Object.entries(progressCounts).map(([progressName, count]) => ({
    name: progressName,
    color: progressName === 'To Do' 
      ? getCssVar(cssVariables.colorSec)
      : progressName === 'In Progress'
      ? getCssVar(semanticColors.active.primary)
      : getCssVar(semanticColors.success.primary),
    count: count
  }));

  return {
    key: 'progress',
    terms: terms
  };
};
