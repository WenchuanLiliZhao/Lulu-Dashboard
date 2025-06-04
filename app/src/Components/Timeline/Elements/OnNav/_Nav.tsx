import React from "react";
import Switch, { type SwitchOption } from "../../../Switch/Switch";
import BackToTodayButton from "./BackToTodayButton";
import { LogoBar, Nav } from "../../../Nav";
import { Logo } from "../../../../assets/Img/Logo";

interface TimelineNavProps {
  switchOptions: SwitchOption[];
  currentTimeView: string;
  onTimeViewChange: (value: string) => void;
  dayWidth: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  yearList: number[];
  startMonth: number;
}

export const TimelineNav: React.FC<TimelineNavProps> = ({
  switchOptions,
  currentTimeView,
  onTimeViewChange,
  dayWidth,
  containerRef,
  yearList,
  startMonth,
}) => {
  return (
    <Nav
      left={[
        <LogoBar logo={<Logo mode="FullColorNoText" />} title="FY25 China Tech Delivery Timeline" />,
      ]}
      right={[
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
