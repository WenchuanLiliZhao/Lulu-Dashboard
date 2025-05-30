export interface IssueType {
  id: string;
  name: string;
  status: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  children?: IssueType[];
}

export const sortTimelineItemsByStartDate = (items: IssueType[]): IssueType[] => {
  return [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

export interface IssueGroup {
  groupTitle: string;
  groupItems: IssueType[];
}
