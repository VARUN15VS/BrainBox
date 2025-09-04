import "./Home.css";

export default function Home({ stats, onStartQuiz }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">BrainBox 🧠</h1>
        <p className="home-subtitle">Sharpen your mind with fun quizzes</p>
      </header>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <h2>{stats.quizzesAttempted}</h2>
          <p>Quizzes Attempted</p>
        </div>
        <div className="stat-card">
          <h2>{stats.accuracy}%</h2>
          <p>Accuracy</p>
        </div>
      </section>

      {/* CTA Button */}
      <div className="cta-section">
        <button className="start-btn" onClick={onStartQuiz}>
          🚀 Start New Quiz
        </button>
      </div>
    </div>
  );
}
