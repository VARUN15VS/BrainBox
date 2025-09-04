import React from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";

export default function Result({ stats, answers }) {
  const navigate = useNavigate();

  return (
    <div className="result-page">
      {/* Dashboard */}
      <div className="result-dashboard">
        <h1>Quiz Results</h1>
        <p>Quizzes Attempted: {stats.quizzesAttempted}</p>
        <p>Accuracy: {stats.accuracy}%</p>
        <button className="retake-btn" onClick={() => navigate("/quiz")}>
          Retake Quiz
        </button>
      </div>

      {/* Answers Review */}
      <div className="answers-review">
        <h2>Review Your Answers</h2>
        {answers && answers.length > 0 ? (
          answers.map((ans, i) => (
            <div
              key={i}
              className={`answer-card ${ans.isCorrect ? "correct" : "wrong"}`}
            >
              <h3>
                Q{i + 1}: {ans.question}
              </h3>
              <p>
                <strong>Your Answer:</strong>{" "}
                <span>{ans.selected || "Not Answered"}</span>
              </p>
              <p>
                <strong>Correct Answer:</strong> <span>{ans.correct}</span>
              </p>
            </div>
          ))
        ) : (
          <p>No answers to display.</p>
        )}
      </div>
    </div>
  );
}
