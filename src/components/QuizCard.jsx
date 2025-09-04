import React from "react";
import "./QuestionCard.css"; // optional if you want separate styling, but styles are included in Quiz.css too

export default function QuestionCard({
  question,
  options = [],
  selected,
  onSelect,
  questionIndex,
  total,
}) {
  return (
    <div className="qb-card">
      <div className="qb-top">
        <div className="qb-index">Question {questionIndex + 1} / {total}</div>
      </div>

      <h3
        className="qb-question"
        // use innerHTML so API HTML entities render correctly later
        dangerouslySetInnerHTML={{ __html: question }}
      />

      <div className="qb-options">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`qb-option ${selected === opt ? "selected" : ""}`}
            onClick={() => onSelect(opt)}
            // allow <em>, &quot; etc. from API to render
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
    </div>
  );
}
