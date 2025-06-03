export interface IssueShape {
  id: string;
  name: string;
  status: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  children?: IssueShape[];
  // vision: string;
}

export const sortTimelineItemsByStartDate = (items: IssueShape[]): IssueShape[] => {
  return [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

export interface IssueSortShape {
  meta: {
    sortBy: string;
  };

  data: IssueGroup[];
}

export interface IssueGroup {
  groupTitle: string;
  groupItems: IssueShape[];
}


// Example goes here
export const Example_Issues: IssueShape[] = [
  {
    id: "1",
    name: "Interactive Calculus Workshop",
    status: "In Progress",
    description: "Develop and implement an interactive workshop series for advanced calculus concepts using real-world applications",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    progress: 50,
    // vision: "To provide a comprehensive and engaging learning experience."
  }
]