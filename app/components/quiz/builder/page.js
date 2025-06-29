'use client';

import { useState, useEffect } from 'react';
import './builder.css';

export default function QuizBuilder() {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', ''] }
  ]);
  const [createdQuiz, setCreatedQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage with loading delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      const storedQuiz = localStorage.getItem('student-quiz');
      if (storedQuiz) {
        setCreatedQuiz(JSON.parse(storedQuiz));
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Add new question
  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', ''] }]);
  };

  // Update question
  const handleQuestionChange = (qIdx, value) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].question = value;
    setQuestions(newQuestions);
  };

  // Update option
  const handleOptionChange = (qIdx, optIdx, value) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options[optIdx] = value;
    setQuestions(newQuestions);
  };

  // Add option to a question
  const addOption = (qIdx) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options.push('');
    setQuestions(newQuestions);
  };

  // Create quiz and store in localStorage
  const handleCreateQuiz = () => {
    if (!quizTitle.trim()) {
      alert('Please enter a quiz title');
      return;
    }

    const cleaned = {
      title: quizTitle,
      questions: questions.map((q) => ({
        question: q.question,
        options: q.options.filter((opt) => opt.trim() !== '')
      }))
    };

    localStorage.setItem('student-quiz', JSON.stringify(cleaned));
    setCreatedQuiz(cleaned);
  };

  // Dummy send quiz
  const handleSendQuiz = () => {
    alert('Quiz sent to students (mock).');
  };

  // Loading spinner
  if (loading) {
    return (
      <div className="quiz-bg">
        <div className="quiz-container" style={{ textAlign: 'center' }}>
          <div className="spinner"></div>
          <p>Loading your quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-bg">
      <div className="quiz-container">
        <h1>Create a Quiz</h1>

        <div className="quiz-title">
          <label>Quiz Title</label>
          <input
            type="text"
            placeholder="Enter quiz title..."
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </div>

        {questions.map((q, qIdx) => (
          <div className="question-card" key={qIdx}>
            <label>Question {qIdx + 1}</label>
            <input
              type="text"
              placeholder="Enter question..."
              value={q.question}
              onChange={(e) => handleQuestionChange(qIdx, e.target.value)}
            />
            <div className="options">
              {q.options.map((opt, optIdx) => (
                <input
                  key={optIdx}
                  type="text"
                  placeholder={`Option ${optIdx + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                />
              ))}
            </div>
            <button className="btn secondary" onClick={() => addOption(qIdx)}>
              ➕ Add Option
            </button>
          </div>
        ))}

        <div className="actions">
          <button className="btn primary" onClick={handleAddQuestion}>
            ➕ Add Question
          </button>
          <button className="btn success" onClick={handleCreateQuiz}>
            ✅ Create Quiz
          </button>
        </div>

        {createdQuiz && (
          <div className="quiz-preview">
            <h2>📋 Preview: {createdQuiz.title}</h2>
            {createdQuiz.questions.map((q, i) => (
              <div key={i} className="preview-question">
                <strong>Q{i + 1}: {q.question}</strong>
                <ul>
                  {q.options.map((opt, idx) => (
                    <li key={idx}>🔹 {opt}</li>
                  ))}
                </ul>
              </div>
            ))}
            <button className="btn send" onClick={handleSendQuiz}>
              🚀 Send Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
