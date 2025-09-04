import React from "react";
import "./QuizCard.css";

export default function QuizCard({ question, options, selected, onSelect }) {
  return (
    <div className="quiz-card">
      <h2 dangerouslySetInnerHTML={{ __html: question }} />

      <div className="options">
        {options.map((option, idx) => (
          <label
            key={idx}
            className={`option ${selected === option ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="quiz-option"
              value={option}
              checked={selected === option}
              onChange={() => onSelect(option)}
            />
            <span dangerouslySetInnerHTML={{ __html: option }} />
          </label>
        ))}
      </div>
    </div>
  );
}
