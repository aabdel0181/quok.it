"use client";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { questions, type Question } from "./questions.config";

export default function Waitlist() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  // Add this handler near your other state declarations
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Don't trigger on multiselect
      if (questions[currentQuestion].type !== "multiselect") {
        handleNext();
      }
    }
  };
  // Get all questions that should be shown based on current answers
  const getVisibleQuestions = () => {
    return questions.filter(
      (q) => !q.showIf || q.showIf(answers as Record<number, string>)
    );
  };
  const handleNext = () => {
    // If we're on a choice question, let the onClick handler handle navigation
    if (questions[currentQuestion].type === "choice") {
      return;
    }

    let nextIndex = currentQuestion + 1;
    const visibleQuestions = getVisibleQuestions();

    // Find the next visible question after the current one
    while (nextIndex < questions.length) {
      // Check if this question should be shown
      if (
        !questions[nextIndex].showIf ||
        questions[nextIndex].showIf?.(answers as Record<number, string>)
      ) {
        setCurrentQuestion(nextIndex);
        return;
      }
      nextIndex++;
    }

    // If we reach here, we're at the end
    console.log("Survey completed!", answers);
  };
  const handlePrevious = () => {
    const visibleQuestions = getVisibleQuestions();
    const currentIndex = visibleQuestions.findIndex(
      (q) => q.id === questions[currentQuestion].id
    );

    if (currentIndex > 0) {
      const prevQuestion = visibleQuestions[currentIndex - 1];
      setCurrentQuestion(questions.findIndex((q) => q.id === prevQuestion.id));
    }
  };

  const handleAnswer = (answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }));
  };

  return (
    <div
      className="min-h-screen bg-black text-white flex items-center justify-center"
      onKeyDown={handleKeyPress}
      tabIndex={0} // Makes the div focusable
    >
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold">
            {questions[currentQuestion].question}
          </h2>
          {questions[currentQuestion].subtext && (
            <p className="mt-4 text-gray-400">
              {questions[currentQuestion].subtext}
            </p>
          )}

          {questions[currentQuestion].type === "intro" && (
            <button
              onClick={handleNext}
              className="w-full mt-8 p-4 bg-red-500 rounded-lg 
                      hover:bg-red-600 hover:shadow-[0_0_30px_rgba(204,0,0,0.8)]
                      shadow-[0_0_15px_rgba(204,0,0,0.5)]
                      transition-all duration-300 text-center font-semibold"
            >
              Get Started
            </button>
          )}

          {questions[currentQuestion].type === "choice" && (
            <div className="space-y-3">
              {questions[currentQuestion].options?.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    handleAnswer(option);
                    // Find next visible question after setting the answer
                    let nextIndex = currentQuestion + 1;
                    while (nextIndex < questions.length) {
                      if (
                        !questions[nextIndex].showIf ||
                        questions[nextIndex].showIf?.({
                          ...answers,
                          [questions[currentQuestion].id]: option,
                        } as Record<number, string>)
                      ) {
                        setCurrentQuestion(nextIndex);
                        return;
                      }
                      nextIndex++;
                    }
                  }}
                  className="w-full p-4 text-left rounded-lg border border-white/10 
                  hover:border-red-500 hover:bg-red-500/10 transition-all duration-300"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {questions[currentQuestion].type === "text" && (
            <input
              type="text"
              placeholder={questions[currentQuestion].placeholder}
              value={(answers[questions[currentQuestion].id] as string) || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full p-4 bg-transparent rounded-lg border border-white/10 
             focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20
             transition-all duration-300"
            />
          )}

          {questions[currentQuestion].type === "multiselect" && (
            <div className="space-y-3">
              {questions[currentQuestion].options?.map((option) => {
                const currentAnswers =
                  (answers[questions[currentQuestion].id] as string[]) || [];
                const isSelected = currentAnswers.includes(option);

                return (
                  <button
                    key={option}
                    onClick={() => {
                      const newAnswers = isSelected
                        ? currentAnswers.filter((item) => item !== option)
                        : [...currentAnswers, option];
                      handleAnswer(newAnswers);
                    }}
                    className={`w-full p-4 text-left rounded-lg border 
                              transition-all duration-300 flex items-center justify-between
                              ${
                                isSelected
                                  ? "border-red-500 bg-red-500/10"
                                  : "border-white/10 hover:border-red-500 hover:bg-red-500/10"
                              }`}
                  >
                    <span>{option}</span>
                    {isSelected && <span className="text-red-500">✓</span>}
                  </button>
                );
              })}

              {(answers[questions[currentQuestion].id] as string[])?.length >
                0 && (
                <button
                  onClick={handleNext}
                  className="w-full p-4 bg-red-500 rounded-lg hover:bg-red-600 
                            transition-all duration-300 text-center font-semibold"
                >
                  Continue
                </button>
              )}
            </div>
          )}

          {questions[currentQuestion].type !== "intro" && (
            <div className="flex justify-between mt-12">
              <button
                onClick={handlePrevious}
                className={`flex items-center gap-2 px-6 py-3 text-white hover:text-red-500 
                transition-colors font-semibold
                ${currentQuestion === 0 ? "invisible" : ""}`}
              >
                <FiArrowLeft className="w-5 h-5" /> Previous
              </button>

              {currentQuestion === getVisibleQuestions().length - 1 ? (
                <button
                  onClick={() => console.log("Submit:", answers)}
                  className="px-8 py-3 bg-red-500 rounded-lg 
                hover:bg-red-600 hover:shadow-[0_0_30px_rgba(204,0,0,0.8)]
                shadow-[0_0_15px_rgba(204,0,0,0.5)]
                transition-all duration-300 text-center font-semibold"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 text-white hover:text-red-500 
                  transition-colors font-semibold"
                >
                  Next <FiArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
