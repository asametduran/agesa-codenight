// src/components/QuizModal.jsx
// Abdullah'ın Faz 2 görevi: quiz_questions.csv entegrasyonu,
// doğru/yanlış feedback ve bilgi statı güncelleme

import { useState } from "react";
import { quizQuestions } from "../data/quizQuestions";
import "../styles/QuizModal.css";

export default function QuizModal({ quizId, onComplete }) {
  const quiz = quizQuestions.find((q) => q.id === quizId);
  const [selected, setSelected] = useState(null); // seçilen şık index
  const [answered, setAnswered] = useState(false);

  if (!quiz) return null;

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
  };

  const isCorrect = selected === quiz.correctIndex;

  const handleNext = () => {
    onComplete(isCorrect);
  };

  return (
    <div className="quiz-overlay">
      <div className="quiz-modal">
        {/* Başlık */}
        <div className="quiz-header">
          <span className="quiz-label">🧠 Bilgi Sorusu</span>
          <span className="quiz-category">{quiz.category}</span>
        </div>

        {/* Soru */}
        <h2 className="quiz-question">{quiz.question}</h2>

        {/* Şıklar */}
        <div className="quiz-options">
          {quiz.options.map((option, i) => {
            let cls = "quiz-option";
            if (answered) {
              if (i === quiz.correctIndex) cls += " quiz-option--correct";
              else if (i === selected) cls += " quiz-option--wrong";
            } else if (i === selected) {
              cls += " quiz-option--selected";
            }

            return (
              <button key={i} className={cls} onClick={() => handleSelect(i)}>
                <span className="option-letter">
                  {["A", "B", "C", "D"][i]}
                </span>
                <span className="option-text">{option}</span>
                {answered && i === quiz.correctIndex && (
                  <span className="option-icon">✓</span>
                )}
                {answered && i === selected && i !== quiz.correctIndex && (
                  <span className="option-icon">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div className={`quiz-feedback ${isCorrect ? "correct" : "wrong"}`}>
            <div className="feedback-icon">{isCorrect ? "🎉" : "💡"}</div>
            <div className="feedback-content">
              <strong>{isCorrect ? "Doğru!" : "Yanlış!"}</strong>
              <p>{quiz.explanation}</p>
              {isCorrect && (
                <span className="feedback-reward">+15 Bilgi  +20 XP</span>
              )}
            </div>
          </div>
        )}

        {/* Devam butonu */}
        {answered && (
          <button className="quiz-next-btn" onClick={handleNext}>
            Devam Et →
          </button>
        )}
      </div>
    </div>
  );
}
