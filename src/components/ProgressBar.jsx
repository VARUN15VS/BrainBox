import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({ current, total, timer }) {
  const percent = (current / total) * 100;

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span>
          Question {current} / {total}
        </span>
        <span className="timer">⏱ {timer}s</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
