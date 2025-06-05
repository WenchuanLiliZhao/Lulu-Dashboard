import React, { useState, useRef, useEffect } from "react";
import styles from "./GroupBySelector.module.scss";
import HoverBox from "../../../Boxes/HoverBox";
import Icon from "../../../Icon/Icon";

export interface GroupOption {
  value: "status" | "category" | "team" | "priority";
  label: string;
}

interface GroupBySelectorProps {
  options: GroupOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  size?: "small" | "medium" | "large";
}

const GroupBySelector: React.FC<GroupBySelectorProps> = ({
  options,
  defaultValue,
  onChange,
  className = "",
  size = "small",
}) => {
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0]?.value || ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 获取当前选中选项的标签
  const selectedLabel =
    options.find((option) => option.value === selectedValue)?.label || "";

  // 处理选项点击
  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  // 处理下拉菜单切换
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`${styles.groupSelector} ${styles[size]} ${className} ${
        isOpen ? styles.open : ""
      }`}
    >
      {/* 下拉触发器 */}
      <button
        className={styles.selectorTrigger}
        onClick={handleToggle}
        type="button"
      >
        <span className={styles.selectorTriggerContent}>
          <span className={styles.selectorLabel}>Group by:{" "}</span>
          <span className={styles.selectorValue}>{selectedLabel}</span>
        </span>
        <span className={styles.selectorIcon}>
          <Icon
            name={isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            size={size === "small" ? 14 : size === "medium" ? 16 : 18}
          />
        </span>
        <HoverBox className={styles["hover-box"]} />
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className={styles.selectorDropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              className={`${styles.selectorOption} ${
                selectedValue === option.value ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
              type="button"
            >
              <span className={styles.optionText}>{option.label}</span>
              {selectedValue === option.value && (
                <span className={styles.optionCheck}>
                  <Icon name="check" size={14} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupBySelector;
