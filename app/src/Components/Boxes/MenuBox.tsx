import React from "react";
import styles from "./MenuBox.module.scss";

export interface MenuBoxProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  size?: "small" | "medium" | "large";
  withAnimation?: boolean;
  tooltipStyle?: boolean;
}

const MenuBox: React.FC<MenuBoxProps> = ({
  children,
  className = "",
  style,
  size = "medium",
  withAnimation = true,
  tooltipStyle = false,
}) => {
  const classNames = [
    styles["menu-box"],
    styles[size],
    withAnimation ? styles["with-animation"] : "",
    tooltipStyle ? styles["tooltip-style"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};

export default MenuBox; 