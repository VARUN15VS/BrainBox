import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import ProgressBar from "../components/ProgressBar";
import "./QuizGame.css";

export default function QuizGame({ onQuizComplete }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quizData"));
    if (data && data.length > 0) {
      setQuestions(data);
      setSelectedAnswers(Array(data.length).fill(null));
    } else {
      navigate("/quiz"); // if no quiz data, go back to setup
    }
  }, [navigate]);

  // Timer logic
  useEffect(() => {
    if (questions.length === 0) return;

    if (timer === 0) {
      handleNext(); // auto-move when time ends
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, questions]);

  const handleSelect = (option) => {
    const copy = [...selectedAnswers];
    copy[current] = option;
    setSelectedAnswers(copy);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTimer(30); // reset timer for next question
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
  let score = 0;
  let answers = [];

  for (let i = 0; i < questions.length; i++) {
    const isCorrect = selectedAnswers[i] === questions[i].correctAnswer;
    if (isCorrect) score++;

    answers.push({
      question: questions[i].question,
      selected: selectedAnswers[i],
      correct: questions[i].correctAnswer,
      isCorrect,
    });
  }

  if (onQuizComplete) {
    onQuizComplete(score, questions.length, answers);
  }
  navigate("/result");
};



  if (questions.length === 0) {
    return <p className="loading">Loading questions...</p>;
  }

  return (
    <div className="quizgame-page">
      <div className="quizgame-layout">
        {/* Progress Bar */}
        <ProgressBar
          current={current + 1}
          total={questions.length}
          timer={timer}
        />

        {/* Question Card */}
        <QuizCard
          question={questions[current].question}
          options={questions[current].options}
          selected={selectedAnswers[current]}
          onSelect={handleSelect}
        />

        {/* Footer Navigation */}
        <div className="quizgame-footer">
          <button
            className="next-btn"
            onClick={handleNext}
            disabled={selectedAnswers[current] == null}
          >
            {current < questions.length - 1 ? "Next →" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
