import { TimelineItemInterval } from "./TimelineFunctions";
import {
  sortTimelineItemsByStartDate,
  type IssueGroup,
} from "./TimelineItemShape";
import {
  monthNames,
  getDaysInMonth,
  findPlacement,
  type PlacementResult,
} from "./TimelineUtils";
import { TimelineGroup } from "./TimelineGroup";
import styles from "./TimelineRuler.module.scss";

interface TimelineProps {
  inputData: IssueGroup[];
}

export const TimelineRuler: React.FC<TimelineProps> = ({ inputData }) => {
  // Flatten all items from all groups for timeline calculations
  const allItems = inputData.flatMap(group => group.groupItems);
  
  // Early return if no items to display
  if (allItems.length === 0) {
    return (
      <div className={styles["timeline-ruler-container"]}>
        <div>No timeline items to display</div>
      </div>
    );
  }
  
  // Sort items by start date to ensure consistent placement
  const sortedItems = sortTimelineItemsByStartDate(allItems);
  // Get list of years and start month that need to be displayed
  const { years: yearList, startMonth } = TimelineItemInterval({
    inputData: sortedItems,
  });

  // Constants for layout calculations
  const dayWidth = 24; // Width of each day cell in pixels
  const cellHeight = 48; // Height of each item row in pixels
  const groupGapForTesting = 8;

  // Reusable column component for consistent styling
  const Column = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles["timeline-ruler-column"]}>{children}</div>;
  };

  // Pre-calculate placements for each group separately
  const groupPlacements = inputData.map(group => {
    const sortedGroupItems = sortTimelineItemsByStartDate(group.groupItems);
    const placements: PlacementResult[] = [];
    
    sortedGroupItems.forEach((item) => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);

      const column = findPlacement(placements, item, startDate, endDate);

      placements.push({
        column,
        item,
        startDate,
        endDate,
      });
    });
    
    return {
      groupTitle: group.groupTitle,
      groupItems: group.groupItems,
      placements
    };
  });

  return (
    <div className={styles["timeline-ruler-container"]}>
      <Column>
        {yearList.map((year, yearIndex) => (
          <div key={year} className={styles["timeline-ruler-year"]}>
            <Column>
              {Array.from(
                { length: yearIndex === 0 ? 12 - startMonth : 12 },
                (_, i) => (yearIndex === 0 ? i + startMonth : i)
              ).map((monthIndex) => (
                <div
                  key={monthIndex}
                  className={styles["timeline-ruler-month"]}
                >
                  <div className={styles["timeline-ruler-month-label"]}>
                    <div className={styles["timeline-ruler-month-label-month"]}>
                      {monthNames[monthIndex]}
                    </div>
                    <div className={styles["timeline-ruler-month-label-year"]}>
                      {year}
                    </div>
                  </div>
                  <Column>
                    {Array.from(
                      { length: getDaysInMonth(year, monthIndex) },
                      (_, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={styles["timeline-ruler-day"]}
                          style={{ width: `${dayWidth}px` }}
                        >
                          <div className={styles["timeline-ruler-day-label"]}>
                            {dayIndex + 1}
                          </div>

                          <div className={styles["timeline-groups"]}>
                            {groupPlacements.map((groupData, groupIndex) => (
                              <TimelineGroup
                                key={groupIndex}
                                groupData={groupData}
                                year={year}
                                monthIndex={monthIndex}
                                dayIndex={dayIndex}
                                dayWidth={dayWidth}
                                cellHeight={cellHeight}
                                groupGapForTesting={groupGapForTesting}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </Column>
                </div>
              ))}
            </Column>
          </div>
        ))}
      </Column>
    </div>
  );
};
