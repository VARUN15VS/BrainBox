import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import QuizGame from "./pages/QuizGame";
import Result from "./pages/Result";
import "./NavBar.css";

function App() {
  const [stats, setStats] = useState({
    quizzesAttempted: 0,
    accuracy: 0,
  });

  const [answers, setAnswers] = useState([]);

  return (
    <Router>
      <div>
        {/* Modern Button Navigation */}
        <nav className="navbar">
          <Link to="/" className="nav-btn">
            Home
          </Link>
          <Link to="/quiz" className="nav-btn">
            Quiz
          </Link>
          <Link to="/result" className="nav-btn">
            Result
          </Link>
        </nav>

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <Home
                stats={stats}
                onStartQuiz={() => {
                  window.location.href = "/quiz";
                }}
              />
            }
          />

          {/* Quiz Setup Page */}
          <Route path="/quiz" element={<Quiz />} />

          {/* Quiz Gameplay Page */}
          <Route
            path="/quizgame"
            element={
              <QuizGame
                onQuizComplete={(score, total, userAnswers) => {
                  // update stats
                  setStats((prev) => {
                    const newAttempted = prev.quizzesAttempted + 1;
                    const newAccuracy = Math.round((score / total) * 100);
                    return {
                      quizzesAttempted: newAttempted,
                      accuracy: newAccuracy,
                    };
                  });

                  // save answers for result page
                  setAnswers(userAnswers);
                }}
              />
            }
          />

          {/* Result Page */}
          <Route path="/result" element={<Result stats={stats} answers={answers} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
