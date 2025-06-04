import React from "react";
import Switch, { type SwitchOption } from "../../Switch/Switch";
import BackToTodayButton from "./BackToTodayButton";
import styles from "./Nav.module.scss";

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
    <div
      className={styles["timeline-nav"]}
      style={{
        marginBottom: "16px",
        padding: "16px 20px",
        background: "var(--color-bg-sec)",
        border: "1px solid var(--color-border-main)",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
        }}
      >
        <div>
          <div
            style={{
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--color-text-main)",
            }}
          >
            时间视图: 当前 dayWidth = {dayWidth}px
          </div>
          <Switch
            options={switchOptions}
            defaultValue={currentTimeView}
            onChange={onTimeViewChange}
          />
        </div>
        
        <BackToTodayButton
          containerRef={containerRef}
          dayWidth={dayWidth}
          yearList={yearList}
          startMonth={startMonth}
        />
      </div>
    </div>
  );
};