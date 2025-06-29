'use client';

import Link from 'next/link';
import './dashboard.css';
import { useEffect, useState } from 'react';
import QuizBuilder from '../components/quiz/builder/page'; // adjust path if needed


export default function DashboardPage() {
  const [user, setUser] = useState('Shubham');
  const [progress, setProgress] = useState(75);
  const [activeFeature, setActiveFeature] = useState('dashboard');
  const [goals, setGoals] = useState([
    'Finish 3 Science chapters',
    'Practice 5 Spanish conversations',
  ]);
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, newGoal]);
      setNewGoal('');
    }
  };


  useEffect(() => {
    const removeExistingWidget = () => {
      const scripts = document.querySelectorAll('script#omnidimension-web-widget');
      scripts.forEach(s => s.remove());

      const frames = document.querySelectorAll('iframe[src*="omnidim.io"]');
      frames.forEach(f => f.remove());
    };

    removeExistingWidget();

    let scriptSrc = '';
    if (activeFeature === 'language') {
      scriptSrc = 'https://backend.omnidim.io/web_widget.js?secret_key=ec38639c8ae105f983832ebcb58d4872';
    } else if (activeFeature === 'exam') {
      scriptSrc = 'https://backend.omnidim.io/web_widget.js?secret_key=8fe443a508dbe27f6c63821b566639d5';
    } else if (activeFeature === 'parent-call') {
      scriptSrc = 'https://backend.omnidim.io/web_widget.js?secret_key=5c3ecd556d9410fa34f21e538f929875';
    }

    if (scriptSrc) {
      const script = document.createElement('script');
      script.id = 'omnidimension-web-widget';
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [activeFeature]);

  const renderFeature = () => {
    switch (activeFeature) {
      case 'exam':
        return (
          <section>
            <h2>🧠 Exam Whisperer</h2>
            <p>AI answers your academic doubts in real-time. Use the chat at bottom right.</p>
            <div className="feature-boxes">
              <div className="card">
                <h3>📚 Recently Asked</h3>
                <ul>
                  <li>Explain Newton's third law</li>
                  <li>What is the Pythagorean theorem?</li>
                  <li>Define photosynthesis</li>
                </ul>
              </div>
              <div className="card">
                <h3>🎯 Suggested Topics</h3>
                <p>• Trigonometry Basics<br />• World War II Summary<br />• Chemical Bonding</p>
              </div>
            </div>
          </section>
        );

      case 'language':
        return (
          <section>
            <h2>🗣️ Language Buddy</h2>
            <p>Practice real-time language conversation with AI. Try saying “How do I say 'Good Morning' in Spanish?”</p>
            <div className="feature-boxes">
              <div className="card">
                <h3>🌍 Select Language</h3>
                <ul>
                  <li>🇫🇷 French</li>
                  <li>🇪🇸 Spanish</li>
                  <li>🇩🇪 German</li>
                </ul>
              </div>
              <div className="card">
                <h3>💬 Phrase of the Day</h3>
                <p><strong>Spanish:</strong> ¿Cómo estás? — “How are you?”</p>
              </div>
            </div>
          </section>
        );

      case 'quiz':
        return (
          <section>
            <h2>📝 Quiz Engine</h2>
            <p>Practice daily with AI-generated quizzes or create your own quizzes.</p>
            <div className="feature-boxes">
              <div className="card">
                <h3>✅ Last Quiz Taken</h3>
                <p>Math - Fractions<br />Score: 8/10</p>
              </div>
              <div className="card">
                <h3>📌 Suggested Quiz Topics</h3>
                <ul>
                  <li>Algebra Basics</li>
                  <li>Periodic Table</li>
                  <li>Geography Capitals</li>
                </ul>
              </div>
            </div>

            {/* ✅ Quiz Builder Component */}
            <div style={{ marginTop: '30px' }}>
              <QuizBuilder />
            </div>
          </section>
        );


      case 'goal':
        return (
          <section>
            <h2>🎯 Goal Setter</h2>
            <p>Set your weekly learning goals and let us remind you.</p>

            <div className="feature-boxes">
              <div className="card">
                <h3>📅 Current Goals</h3>
                {goals.length === 0 ? (
                  <p>No goals yet. Add one!</p>
                ) : (
                  <ul>
                    {goals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="card">
                <h3>➕ Add New Goal</h3>
                <input
                  type="text"
                  placeholder="e.g., Complete 10 quizzes"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                />
                <button onClick={handleAddGoal}>Add Goal</button>
              </div>
            </div>
          </section>
        );


      case 'parent-call':
        return (
          <section>
            <h2>📞 Parent Call</h2>
            <p>AI assistant available to help parents understand student progress.</p>
            <div className="feature-boxes">
              <div className="card">
                <h3>📈 Recent Reports</h3>
                <p>Math: 80%<br />Science: 70%<br />English: 85%</p>
              </div>
              <div className="card">
                <h3>🧠 Suggested Discussion</h3>
                <p>Talk about improving consistency and setting small daily goals.</p>
              </div>
            </div>
          </section>
        );

      default:
        return (
          <section className="dashboard-overview">
            <h2>📈 Dashboard Overview</h2>
            <p>Hello, {user}! Welcome to your learning hub.</p>
            <div className="overview-grid">
              <div className="card progress-card">
                <h3>📊 Your Progress</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}>{progress}%</div>
                </div>
              </div>
              <div className="card activity-card">
                <h3>📝 Recent Activities</h3>
                <ul>
                  <li>Completed Quiz: Algebra Basics ✅</li>
                  <li>Set Goal: Learn 20 French Verbs 📘</li>
                  <li>Practiced: Conversation with AI 👨‍🏫</li>
                </ul>
              </div>
              <div className="card tips-card">
                <h3>🧠 AI Tip of the Day</h3>
                <p>“Revise your weak areas using flashcards before bed—it helps retain better!”</p>
              </div>
              <div className="card quick-access">
                <h3>🚀 Quick Access</h3>
                <div className="quick-links">
                  <button onClick={() => setActiveFeature('exam')}>Exam Whisperer</button>
                  <button onClick={() => setActiveFeature('language')}>Language Buddy</button>
                  <Link href='/quiz/builder'><button onClick={() => setActiveFeature('quiz')}>Quiz Engine</button></Link>
                  <button onClick={() => setActiveFeature('goal')}>Goal Setter</button>
                </div>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Edcno</h2>
        <nav>
          <ul>
            <li onClick={() => setActiveFeature('exam')}>Exam Whisperer</li>
            <li onClick={() => setActiveFeature('language')}>Language Buddy</li>
            <li onClick={() => setActiveFeature('quiz')}>Quiz Engine</li>
            <li onClick={() => setActiveFeature('goal')}>Goal Setter</li>
            <li onClick={() => setActiveFeature('parent-call')}>Parent Call</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Hello, {user} 👋</h1>
          <p>Your personalized learning space</p>
        </header>

        <section className="dashboard-section">
          {renderFeature()}
        </section>
      </main>
    </div>
  );
}
