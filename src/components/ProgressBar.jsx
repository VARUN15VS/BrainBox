import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({ current, total, timer }) {
  const percent = (current / total) * 100;

  return (
    <div className="progress-container">
      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      {/* Header row with question count + timer */}
      <div className="progress-info">
        <span className="progress-text">
          Question {current} of {total}
        </span>
        <span className={`timer ${timer <= 5 ? "danger" : ""}`}>
          ⏱ {timer}s
        </span>
      </div>
    </div>
  );
}
