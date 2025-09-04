import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

export default function Quiz() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 18, name: "Computers" },
    { id: 21, name: "Sports" },
    { id: 23, name: "History" },
    { id: 17, name: "Science & Nature" },
  ];

  const difficulties = ["easy", "medium", "hard"];

  const handleStart = async () => {
    setLoading(true);

    try {
      const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();

      // normalize questions
      const formatted = data.results.map((q) => ({
        question: q.question,
        options: shuffleOptions([...q.incorrect_answers, q.correct_answer]),
        correctAnswer: q.correct_answer,
      }));

      // store in localStorage to use in QuizGame page
      localStorage.setItem("quizData", JSON.stringify(formatted));

      navigate("/QuizGame");
    } catch (err) {
      console.error("Error fetching quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz-setup">
      <h1 className="title">Setup Your Quiz</h1>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select Difficulty</option>
          {difficulties.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        className="start-btn"
        onClick={handleStart}
        disabled={!category || !difficulty || loading}
      >
        {loading ? "Loading..." : "Start Quiz"}
      </button>
    </div>
  );
}
