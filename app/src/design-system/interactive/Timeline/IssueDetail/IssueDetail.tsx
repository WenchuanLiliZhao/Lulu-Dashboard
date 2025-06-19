import React from "react";
import { type IssueShape, IssueShapeKeys, Status } from "../../../../data-layer/types/timeline";
import { CircularProgress } from "../../../ui";
import { Icon } from "../../../ui";
import {
  getTeamEmoji,
  getTeamDisplayName,
  getTeamColorName,
} from "../../../../data-layer/utils/VisualConfigs";
import { TransBgBox } from "../../../ui";
import styles from "./IssueDetail.module.scss";

interface IssueDetailProps {
  selectedIssue: IssueShape | null;
  onClose?: () => void;
}

function getPriorityIcon(priority: string) {
  switch (priority) {
    case "High":
      return {
        icon: "keyboard_double_arrow_up",
        color: "var(--color-semantic-warning)",
      };
    case "Medium":
      return {
        icon: "keyboard_capslock",
        color: "var(--color-semantic-active)",
      };
    case "Low":
      return {
        icon: "keyboard_double_arrow_down",
        color: "var(--color-neg)",
      };
    default:
      return {
        icon: "remove",
        color: "var(--color-text-secondary)",
      };
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case Status["High Risks"]:
      return "var(--color-semantic-error)";
    case Status["Manageable Risk"]:
      return "var(--color-semantic-warning)";
    case Status["On Track"]:
      return "var(--color-semantic-active)";
    case Status["Not Yet Started"]:
      return "var(--color-text-secondary)";
    default:
      return "var(--color-text-secondary)";
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export const IssueDetail: React.FC<IssueDetailProps> = ({
  selectedIssue,
  onClose,
}) => {
  if (!selectedIssue) {
    return (
      <div className={styles["issue-detail-container"]}>
        <div className={styles["issue-detail-empty"]}>
          <Icon name="info" size={48} style={{ color: "var(--color-text-tertiary)" }} />
          <p className={styles["empty-text"]}>Select an issue to view details</p>
        </div>
      </div>
    );
  }

  const priorityConfig = getPriorityIcon(selectedIssue[IssueShapeKeys.PRIORITY]);
  const statusColor = getStatusColor(selectedIssue[IssueShapeKeys.STATUS]);
  const duration = Math.ceil(
    (selectedIssue[IssueShapeKeys.END_DATE].getTime() - 
     selectedIssue[IssueShapeKeys.START_DATE].getTime()) / 
    (1000 * 60 * 60 * 24)
  );

  return (
    <div className={styles["issue-detail-container"]}>
      {/* Header */}
      <div className={styles["issue-detail-header"]}>
        <div className={styles["header-title"]}>Issue Details</div>
        {onClose && (
          <button 
            className={styles["close-button"]} 
            onClick={onClose}
            aria-label="Close issue details"
          >
            <Icon name="close" size={20} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className={styles["issue-detail-content"]}>
        {/* Title */}
        <div className={styles["issue-title"]}>
          {selectedIssue[IssueShapeKeys.NAME]}
        </div>

        {/* Status and Progress */}
        <div className={styles["status-section"]}>
          <div className={styles["status-item"]}>
            <span className={styles["label"]}>Status:</span>
            <div className={styles["status-badge"]} style={{ color: statusColor }}>
              {selectedIssue[IssueShapeKeys.STATUS]}
            </div>
          </div>
          
          <div className={styles["progress-item"]}>
            <span className={styles["label"]}>Progress:</span>
            <div className={styles["progress-container"]}>
              <CircularProgress 
                progress={selectedIssue[IssueShapeKeys.PROGRESS]} 
                size={24}
                style={{ stroke: statusColor }}
              />
              <span className={styles["progress-text"]}>
                {selectedIssue[IssueShapeKeys.PROGRESS]}%
              </span>
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className={styles["detail-row"]}>
          <span className={styles["label"]}>Priority:</span>
          <div className={styles["priority-container"]}>
            <Icon 
              name={priorityConfig.icon} 
              size={16} 
              style={{ color: priorityConfig.color }} 
            />
            <span className={styles["priority-text"]}>
              {selectedIssue[IssueShapeKeys.PRIORITY]}
            </span>
          </div>
        </div>

        {/* Team */}
        <div className={styles["detail-row"]}>
          <span className={styles["label"]}>Team:</span>
          <div className={styles["team-container"]}>
            <span className={styles["team-emoji"]}>
              {getTeamEmoji(selectedIssue[IssueShapeKeys.TEAM])}
            </span>
            <span className={styles["team-name"]}>
              {getTeamDisplayName(selectedIssue[IssueShapeKeys.TEAM])}
            </span>
            <TransBgBox color={getTeamColorName(selectedIssue[IssueShapeKeys.TEAM])} />
          </div>
        </div>

        {/* Category */}
        <div className={styles["detail-row"]}>
          <span className={styles["label"]}>Category:</span>
          <span className={styles["value"]}>
            {selectedIssue[IssueShapeKeys.CATEGORY]}
          </span>
        </div>

        {/* Dates */}
        <div className={styles["dates-section"]}>
          <div className={styles["date-row"]}>
            <span className={styles["label"]}>Start Date:</span>
            <span className={styles["date-value"]}>
              {formatDate(selectedIssue[IssueShapeKeys.START_DATE])}
            </span>
          </div>
          
          <div className={styles["date-row"]}>
            <span className={styles["label"]}>End Date:</span>
            <span className={styles["date-value"]}>
              {formatDate(selectedIssue[IssueShapeKeys.END_DATE])}
            </span>
          </div>
          
          <div className={styles["date-row"]}>
            <span className={styles["label"]}>Duration:</span>
            <span className={styles["duration-value"]}>
              {duration} day{duration !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className={styles["description-section"]}>
          <div className={styles["description-label"]}>Description:</div>
          <div className={styles["description-content"]}>
            {selectedIssue[IssueShapeKeys.DESCRIPTION] || "No description available"}
          </div>
        </div>

        {/* Children if any */}
        {selectedIssue[IssueShapeKeys.CHILDREN] && selectedIssue[IssueShapeKeys.CHILDREN]!.length > 0 && (
          <div className={styles["children-section"]}>
            <div className={styles["children-label"]}>
              Sub-tasks ({selectedIssue[IssueShapeKeys.CHILDREN]!.length}):
            </div>
            <div className={styles["children-list"]}>
              {selectedIssue[IssueShapeKeys.CHILDREN]!.map((child) => (
                <div key={child[IssueShapeKeys.ID]} className={styles["child-item"]}>
                  <Icon name="subdirectory_arrow_right" size={16} />
                  <span className={styles["child-name"]}>
                    {child[IssueShapeKeys.NAME]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 