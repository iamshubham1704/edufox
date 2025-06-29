"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRandomEmojiAvatar } from "@/utils/generateRandomAvatar";

export default function QuizPage({ params }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch(`/api/quiz/${params.id}`);
      const data = await res.json();
      setQuiz(data);
      setAnswers(Array(data.questions.length).fill(-1));
      setLoading(false);
    };
    fetchQuiz();
  }, [params.id]);

  const submitQuiz = async () => {
    let score = 0;
    quiz.questions.forEach((q, i) => {
      const correctAnswer = q.answer;
      if (answers[i] === correctAnswer) score += 1;
    });

    const studentName = prompt("Enter your name:") || "Anonymous";
    await fetch("/api/leaderboard", {
      method: "POST",
      body: JSON.stringify({
        name: studentName,
        avatar: getRandomEmojiAvatar(),
        score,
      }),
    });

    alert(`You scored ${score}/${quiz.questions.length}`);
    router.push("/leaderboard");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>

      {quiz.questions.map((q, index) => {
        const options = JSON.parse(q.options);
        return (
          <div key={q.id} className="mb-4">
            <p className="font-semibold">{q.text}</p>
            {options.map((opt, optIndex) => (
              <div key={optIndex}>
                <label>
                  <input
                    type="radio"
                    name={`q-${index}`}
                    value={optIndex}
                    checked={answers[index] === optIndex}
                    onChange={() => {
                      const newAnswers = [...answers];
                      newAnswers[index] = optIndex;
                      setAnswers(newAnswers);
                    }}
                  />
                  {opt}
                </label>
              </div>
            ))}
          </div>
        );
      })}

      <button onClick={submitQuiz} className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit Quiz
      </button>
    </div>
  );
}
