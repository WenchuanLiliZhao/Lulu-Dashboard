import React from "react";
import styles from "./GroupProgressBar.module.scss";
import MenuBox from "../../../Boxes/MenuBox";

export interface TermType {
  name: string; // eg., retail, marketing, etc.
  color: string;
  count: number;
}

export interface OutPutTermsType {
  key: string; // eg., team, progress, etc.
  terms: TermType[];
}

interface GroupProgressBarProps {
  title: string;
  data: OutPutTermsType;
}

// 组件用于展示 OutPutTermsType 数据
export const GroupProgressBar: React.FC<GroupProgressBarProps> = ({
  title,
  data,
}) => {
  // 计算总数
  const totalCount = data.terms.reduce((sum, term) => sum + term.count, 0);


  return (
    <div className={styles["group-progress-bar"]}>
      <div className={styles["group-progress-bar-title"]}>{title}</div>
      <div
        className={styles["group-progress-bar-display"]}
      >
        {data.terms.map((term, index) => (
          <div
            key={index}
            className={styles["group-progress-bar-display-item"]}
            style={{
              backgroundColor: term.color,
              width: `${(term.count / totalCount) * 100}%`,
            }}
          />
        ))}
      </div>
      <MenuBox
        className={styles["group-progress-bar-display-item-list"]}
        size="small"
        tooltipStyle={true}
        withAnimation={false}
      >
        {data.terms.map((term, index) => (
          <div
            key={index}
            className={styles["group-progress-bar-display-item-list-item"]}
          >
            <div className={styles["group-progress-bar-display-item-list-item-left"]}>
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: term.color,
                borderRadius: "2px",
              }}
            />
            <div className={styles["group-progress-bar-display-item-list-item-name"]}>
              {term.name}
            </div>
            </div>
            <div className={styles["group-progress-bar-display-item-list-item-right"]}>
              {term.count}
            </div>
          </div>
        ))}
      </MenuBox>
    </div>
  );
};
