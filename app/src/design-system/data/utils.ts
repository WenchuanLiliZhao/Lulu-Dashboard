/**
 * Timeline utility functions for time formatting and calculations
 */

import { type IssueShape, IssueShapeKeys, type TimelineItem, BaseTimelineItemKeys } from "./types";

/**
 * Represents the result of placing a timeline item in a specific column
 */
export interface PlacementResult {
  column: number;
  item: IssueShape;
  startDate: Date;
  endDate: Date;
}

/**
 * Month names mapping for timeline display
 */
export const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Calculate the number of days in a specific month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Check if two date ranges overlap
 */
export const doDateRangesOverlap = (
  start1: Date, 
  end1: Date, 
  start2: Date, 
  end2: Date
): boolean => {
  return !(end1 < start2 || start1 > end2);
};

/**
 * Find the appropriate column (vertical position) for a new timeline item
 */
export const findPlacement = (
  placements: PlacementResult[],
  _currentItem: IssueShape,
  currentStartDate: Date,
  currentEndDate: Date
): number => {
  if (placements.length === 0) return 0;

  const maxColumn = Math.max(...placements.map(p => p.column));
  
  for (let col = 0; col <= maxColumn + 1; col++) {
    const itemsInColumn = placements.filter(p => p.column === col);
    
    const isColumnAvailable = itemsInColumn.every(placement => {
      return currentEndDate < placement.startDate || currentStartDate > placement.endDate;
    });

    if (isColumnAvailable) {
      return col;
    }
  }

  return maxColumn + 1;
};

/**
 * Sort timeline items by start date
 */
export const sortTimelineItemsByStartDate = <T = Record<string, unknown>>(
  items: TimelineItem<T>[]
): TimelineItem<T>[] => {
  return [...items].sort((a, b) => {
    const dateA = a.startDate || a[BaseTimelineItemKeys.START_DATE as keyof typeof a];
    const dateB = b.startDate || b[BaseTimelineItemKeys.START_DATE as keyof typeof b];
    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });
};

/**
 * Timeline interval calculation
 */
interface TimelineItemIntervalProps {
  inputData: IssueShape[];
}

export interface TimelineInterval {
  years: number[];
  startMonth: number;
}

export function TimelineItemInterval({ inputData }: TimelineItemIntervalProps): TimelineInterval {
  if (inputData.length === 0) {
    const currentYear = new Date().getFullYear();
    return {
      years: [currentYear],
      startMonth: 0
    };
  }

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