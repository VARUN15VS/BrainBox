import React from "react";
import "./QuizCard.css";

export default function QuizCard({ question, options, selected, onSelect }) {
  return (
    <div className="quizcard">
      <h2
        className="quiz-question"
        dangerouslySetInnerHTML={{ __html: question }}
      />

      <div className="quiz-options">
        {options.map((opt, idx) => (
          <button
            key={idx}
            className={`quiz-option ${selected === opt ? "selected" : ""}`}
            onClick={() => onSelect(opt)}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
    </div>
  );
}
