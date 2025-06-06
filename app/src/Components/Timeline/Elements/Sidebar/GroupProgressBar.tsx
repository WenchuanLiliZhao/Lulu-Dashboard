import React from "react";
import styles from "./GroupProgressBar.module.scss";

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
export const GroupProgressBar: React.FC<GroupProgressBarProps> = ({ title, data }) => {

  return (
    <div className={styles["group-progress-bar"]}>
      <div className={styles["group-progress-bar-title"]}>
        {title}
      </div>
      <div className={styles["group-progress-bar-display"]}>
        {data.terms.map((term, index) => (
          <div key={index} className={styles["group-progress-bar-display-item"]}>
            <div className={styles["group-progress-bar-display-item-color"]} style={{ backgroundColor: term.color }} />
            <div className={styles["group-progress-bar-display-item-name"]}>{term.name}</div>
            <div className={styles["group-progress-bar-display-item-count"]}>{term.count}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {data.terms.map((term, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div 
              style={{ 
                width: '8px', 
                height: '8px', 
                backgroundColor: term.color,
                borderRadius: '2px'
              }}
            />
            <span style={{ color: '#666', minWidth: '100px' }}>
              {term.name}
            </span>
            <span style={{ color: '#333', fontWeight: 'bold' }}>
              {term.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};





