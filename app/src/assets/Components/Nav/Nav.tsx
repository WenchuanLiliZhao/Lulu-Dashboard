import type React from "react";
import styles from "./Nav.module.scss";

export interface NavProps {
  className?: string;
  left: React.ReactNode[];
  right: React.ReactNode[];
}

export const Nav: React.FC<NavProps> = ({ left, right }) => {
  return <div className={styles["nav"]}>
    <div className={styles["nav-left"]}>
      {left.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
    <div className={styles["nav-right"]}>
      {right.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  </div>;
};