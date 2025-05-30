import React from "react";
import styles from "./DayWidthSlider.module.scss";

interface DayWidthSliderProps {
  dayWidth: number;
  onDayWidthChange: (newWidth: number) => void;
  minWidth?: number;
  maxWidth?: number;
}

export const DayWidthSlider: React.FC<DayWidthSliderProps> = ({
  dayWidth,
  onDayWidthChange,
  minWidth = 12,
  maxWidth = 60,
}) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(event.target.value, 10);
    onDayWidthChange(newWidth);
  };

  return (
    <div className={styles["day-width-slider"]}>
      <div className={styles["slider-container"]}>
        <label className={styles["slider-label"]} htmlFor="day-width-range">
          天宽度: <span className={styles["value-display"]}>{dayWidth}px</span>
        </label>
        <input
          id="day-width-range"
          type="range"
          min={minWidth}
          max={maxWidth}
          value={dayWidth}
          onChange={handleSliderChange}
          className={styles["slider"]}
          aria-label={`调节天宽度，当前值: ${dayWidth}px`}
        />
        <div className={styles["range-labels"]}>
          <span>{minWidth}px</span>
          <span>{maxWidth}px</span>
        </div>
      </div>
    </div>
  );
}; 