/**
 * Timeline utility functions for time formatting and calculations
 */

import { type IssueShape } from "./Shapes";

/**
 * Represents the result of placing a timeline item in a specific column
 * @property column - The vertical position (0-based) where the item should be placed
 * @property item - The timeline item being placed
 * @property startDate - Cached start date to avoid repeated Date object creation
 * @property endDate - Cached end date to avoid repeated Date object creation
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
 * @param year - The year to check
 * @param month - The month to check (0-based)
 * @returns The number of days in the specified month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Calculate the duration between two dates, inclusive of both start and end dates
 * Example: 2023-12-30 to 2024-01-01 = 3 days (30th, 31st, 1st)
 * 
 * @param startDate - The start date of the period
 * @param endDate - The end date of the period
 * @returns The number of days between the dates, including both start and end dates
 */
export const calculateDurationInDays = (startDate: Date, endDate: Date): number => {
  // Reset the time part to avoid time zone issues
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  
  // Add 1 to include both start and end dates
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
};

/**
 * Format a date to display format
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

/**
 * Check if two date ranges overlap
 * @param start1 - Start date of first range
 * @param end1 - End date of first range
 * @param start2 - Start date of second range
 * @param end2 - End date of second range
 * @returns True if the ranges overlap
 */
export const doDateRangesOverlap = (
  start1: Date, 
  end1: Date, 
  start2: Date, 
  end2: Date
): boolean => {
  // Items overlap if one starts before the other ends
  // Note: Using strict inequality (<, >) to treat same-day items as overlapping
  return !(end1 < start2 || start1 > end2);
};

/**
 * Find the appropriate column (vertical position) for a new timeline item
 * Implementation of the placement algorithm:
 * - First item (k=0) goes in first column (p=0)
 * - For each subsequent item (k+1), find minimum column p where there's no overlap
 * 
 * @param placements - List of all previous item placements
 * @param _currentItem - The item being placed (unused, prefixed with _ to indicate)
 * @param currentStartDate - Start date of the item being placed
 * @param currentEndDate - End date of the item being placed
 * @returns The column number where the item should be placed
 */
export const findPlacement = (
  placements: PlacementResult[],
  _currentItem: IssueShape,
  currentStartDate: Date,
  currentEndDate: Date
): number => {
  // First item always goes in column 0
  if (placements.length === 0) return 0;

  // Find the highest column number currently in use
  const maxColumn = Math.max(...placements.map(p => p.column));
  
  // Try each column from 0 up to maxColumn + 1
  for (let col = 0; col <= maxColumn + 1; col++) {
    // Get all items already placed in this column
    const itemsInColumn = placements.filter(p => p.column === col);
    
    // Check if current item can fit in this column (no overlaps)
    const isColumnAvailable = itemsInColumn.every(placement => {
      // Items overlap if one starts before the other ends
      // Using strict inequality to treat same-day items as overlapping
      return currentEndDate < placement.startDate || currentStartDate > placement.endDate;
    });

    // If we found a column with no overlaps, use it
    if (isColumnAvailable) {
      return col;
    }
  }

  // If no existing column works, create a new one
  return maxColumn + 1;
};

/**
 * Event type for the sweep line algorithm
 * @property time - The timestamp of the event
 * @property type - 'start' for item beginning, 'end' for item ending
 * @property itemIndex - Index of the item for debugging purposes
 */
interface TimelineEvent {
  time: Date;
  type: 'start' | 'end';
  itemIndex: number;
}

/**
 * Calculate the maximum cardinality (number) of overlapping timeline items
 * Uses a sweep line algorithm for optimal O(n log n) performance
 * 
 * @param items - Array of timeline items with start and end dates
 * @returns The maximum number of items that overlap at any point in time
 * 
 * @example
 * const items = [
 *   { startDate: new Date("2024-01-01"), endDate: new Date("2024-01-03") },
 *   { startDate: new Date("2024-01-02"), endDate: new Date("2024-01-04") },
 *   { startDate: new Date("2024-01-03"), endDate: new Date("2024-01-05") }
 * ];
 * const maxOverlap = calculateMaxOverlapCardinality(items);
 * // Returns 3 (all three items overlap on 2024-01-03)
 */
export const calculateMaxOverlapCardinality = (items: IssueShape[]): number => {
  if (items.length === 0) return 0;
  if (items.length === 1) return 1;

  // Create events for sweep line algorithm
  const events: TimelineEvent[] = [];
  
  items.forEach((item, index) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    
    // Add start event
    events.push({
      time: startDate,
      type: 'start',
      itemIndex: index
    });
    
    // Add end event (use next day to make it exclusive)
    // This ensures that items ending on the same day don't count as overlapping on the end day
    const exclusiveEndDate = new Date(endDate);
    exclusiveEndDate.setDate(exclusiveEndDate.getDate() + 1);
    
    events.push({
      time: exclusiveEndDate,
      type: 'end',
      itemIndex: index
    });
  });

  // Sort events by time, with 'end' events processed before 'start' events at the same time
  events.sort((a, b) => {
    const timeDiff = a.time.getTime() - b.time.getTime();
    if (timeDiff !== 0) return timeDiff;
    
    // If times are equal, process 'end' events before 'start' events
    // This prevents counting items that end and start on the same day as overlapping
    if (a.type === 'end' && b.type === 'start') return -1;
    if (a.type === 'start' && b.type === 'end') return 1;
    return 0;
  });

  // Sweep through events and track maximum overlap
  let currentOverlap = 0;
  let maxOverlap = 0;

  for (const event of events) {
    if (event.type === 'start') {
      currentOverlap++;
      maxOverlap = Math.max(maxOverlap, currentOverlap);
    } else {
      currentOverlap--;
    }
  }

  return maxOverlap;
}; 