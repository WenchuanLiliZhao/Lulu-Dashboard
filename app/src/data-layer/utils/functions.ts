import type { IssueShape } from "./Shapes";
import { IssueShapeKeys } from "./Shapes";

interface TimelineItemIntervalProps {
  inputData: IssueShape[];
}

export interface TimelineInterval {
  years: number[];
  startMonth: number;
}

export function TimelineItemInterval({ inputData }: TimelineItemIntervalProps): TimelineInterval {
  const earliestStartDate = inputData.reduce((earliest, item) => {
    return item[IssueShapeKeys.START_DATE] < earliest ? item[IssueShapeKeys.START_DATE] : earliest;
  }, inputData[0][IssueShapeKeys.START_DATE]);

  const latestEndDate = inputData.reduce((latest, item) => {
    return item[IssueShapeKeys.END_DATE] > latest ? item[IssueShapeKeys.END_DATE] : latest;
  }, inputData[0][IssueShapeKeys.END_DATE]);

  const earliestYear = earliestStartDate.getFullYear();
  const startMonth = earliestStartDate.getMonth();
  const lastYear = latestEndDate.getFullYear();

  const years = [];
  for (let year = earliestYear; year <= lastYear; year++) {
    years.push(year);
  }

  return {
    years,
    startMonth
  };
}
