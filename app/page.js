import Navbar from './components/Navbar/Navbar';
import './home.css';

export default function Home() {
  return (
    <main className="page">
      <Navbar/>
      <section className="hero">
        <h1 className="title">Welcome to Edcno</h1>
        <p className="subtitle">
          The all-in-one EdTech platform. From AI tutors to adaptive quizzes – everything a student needs to excel.
        </p>
        <a href="/register" className="button">Get Started</a>
      </section>

      <section className="section" id="features">
        <h2 className="section-title">Why Choose Edcno?</h2>
        <ul className="feature-list">
          <li>🧠 <strong>Exam Whisperer:</strong> AI-powered doubt solving</li>
          <li>🗣 <strong>Language Buddy:</strong> Speak, learn new languages with Language buddy.</li>
          <li>📞 <strong>Parent Voice Assistant:</strong> Voice Assistant for parents gives full report of child.</li>
          <li>📊 <strong>Progress Tracker:</strong> Visualize growth across subjects and topics.</li>
          <li>📝 <strong>Quiz Engine:</strong> Auto-generated quizzes tailored to your learning level.</li>
          <li>🎯 <strong>Goal Setter:</strong> Set study targets and stay consistent with reminders.</li>
        </ul>
      </section>

      <section className="section alt-section">
        <h2 className="section-title">How Edcno Works</h2>
        <div className="grid">
          <div className="card">
            <h3>1. Ask</h3>
            <p>Type or speak your doubts. Get instant, accurate answers from AI.</p>
          </div>
          <div className="card">
            <h3>2. Practice</h3>
            <p>Quizzes and flashcards designed just for you — based on your progress.</p>
          </div>
          <div className="card">
            <h3>3. Succeed</h3>
            <p>Track your learning journey and grow with daily improvement reports.</p>
          </div>
        </div>
      </section>
      <section className="section cta-section">
        <h2 className="section-title">Start Your Journey with Edcno</h2>
        <p className="subtitle">Sign up now and experience AI-powered learning like never before.</p>
        <a href="#" className="button">Join Now</a>
      </section>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Edcno · All rights reserved</p>
      </footer>
    </main>
  );
}
