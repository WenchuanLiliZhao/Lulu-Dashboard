import React from "react";
import Switch, { type SwitchOption } from "../../../Switch/Switch";
import BackToTodayButton from "./BackToTodayButton";
import { LogoBar, Nav } from "../../../Nav";
import { Logo } from "../../../../assets/Img/Logo";
import GroupBySelector, { type GroupOption } from "./GroupBySelector";

interface TimelineNavProps {
  switchOptions: SwitchOption[];
  currentTimeView: string;
  onTimeViewChange: (value: string) => void;
  dayWidth: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  yearList: number[];
  startMonth: number;
  groupOptions: GroupOption[];
  currentGroupBy: string;
  onGroupByChange: (value: string) => void;
}

export const TimelineNav: React.FC<TimelineNavProps> = ({
  switchOptions,
  currentTimeView,
  onTimeViewChange,
  dayWidth,
  containerRef,
  yearList,
  startMonth,
  groupOptions,
  currentGroupBy,
  onGroupByChange,
}) => {
  return (
    <Nav
      left={[
        <LogoBar logo={<Logo mode="FullColorNoText" />} title="FY25 China Tech Delivery Timeline" />,
      ]}
      right={[
        <GroupBySelector
          options={groupOptions}
          defaultValue={currentGroupBy}
          onChange={onGroupByChange}
          size="small"
        />,
        <BackToTodayButton
          containerRef={containerRef}
          dayWidth={dayWidth}
          yearList={yearList}
          startMonth={startMonth}
          size="small"
        />,
        <Switch
          options={switchOptions}
          defaultValue={currentTimeView}
          onChange={onTimeViewChange}
          size="small"
        />,
      ]}
    />
  );
};
