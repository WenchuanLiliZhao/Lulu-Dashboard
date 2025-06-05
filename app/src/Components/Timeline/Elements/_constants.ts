export const TimelineConst = {
  cellHeight: 84,
  groupGap: 0,
  yearZoom: 4.5,
  monthZoom: 24,

  yearLabelHight: 32,
  monthLabelHight: 48,
  dayLabelHight: 20,

  itemVPadding: 2,
  itemHPadding: 2,
};

export const TimelineConstCalc = {
  groupMinHeight: TimelineConst.cellHeight * 2,

  rulerHeight: TimelineConst.yearLabelHight + TimelineConst.monthLabelHight + TimelineConst.dayLabelHight,
};