"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import waitlistQuestions from "./questions.config";

export default function Waitlist() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  console.log("Current Question:", currentQuestion);
  console.log("Current Answers:", answers);
  console.log("Questions Config:", waitlistQuestions);

  // Filter questions based on previous answers
  const activeQuestions = waitlistQuestions.filter(
    (q) => !q.showIf || q.showIf(answers)
  );

  const currentQuestionIndex = activeQuestions.findIndex(
    (q) => q.id === waitlistQuestions[currentQuestion].id
  );
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const currentQ = waitlistQuestions[currentQuestion];
      if (
        currentQ.type === "intro" ||
        (currentQ.type === "text" && answers[currentQuestion]) ||
        (currentQ.type === "email" && answers[currentQuestion])
      ) {
        handleNext();
      }
    }
  };

  const handleAnswer = (answer: any) => {
    // Store answer with question ID instead of index
    const questionId = waitlistQuestions[currentQuestion].id;
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    let nextIndex = currentQuestion + 1;
    while (
      nextIndex < waitlistQuestions.length &&
      waitlistQuestions[nextIndex].showIf &&
      !waitlistQuestions[nextIndex]?.showIf?.(answers)
    ) {
      nextIndex++;
    }
    if (nextIndex < waitlistQuestions.length) {
      setCurrentQuestion(nextIndex);
    }
  };
  const handlePrevious = () => {
    let prevIndex = currentQuestion - 1;
    while (
      prevIndex >= 0 &&
      waitlistQuestions[prevIndex].showIf &&
      !waitlistQuestions[prevIndex].showIf?.(answers)
    ) {
      prevIndex--;
    }
    if (prevIndex >= 0) {
      setCurrentQuestion(prevIndex);
    }
  };

  const handleSubmit = async () => {
    try {
      // Add your submission logic here
      console.log("Form submitted:", answers);
      // Example API call:
      // await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(answers),
      // });
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-white flex items-center justify-center"
      onKeyDown={handleKeyPress}
      tabIndex={0} // Make div focusable
    >
      <div className="w-full max-w-2xl mx-auto p-6">
        {/* Progress bar */}
        <div className="w-full bg-gray-800 h-1 mb-12">
          <motion.div
            className="h-full bg-red-500"
            initial={{ width: 0 }}
            animate={{
              width: `${
                ((currentQuestionIndex + 1) / activeQuestions.length) * 100
              }%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Question */}
            <div>
              <h2 className="text-4xl font-bold">
                {waitlistQuestions[currentQuestion].question}
              </h2>
              {waitlistQuestions[currentQuestion].subtext && (
                <p className="mt-4 text-gray-400">
                  {waitlistQuestions[currentQuestion].subtext}
                </p>
              )}
            </div>

            {/* Answer input */}
            <div className="space-y-4">
              {/* Intro screen */}
              {waitlistQuestions[currentQuestion].type === "intro" && (
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
              {waitlistQuestions[currentQuestion].type === "choice" && (
                <div className="space-y-3">
                  {waitlistQuestions[currentQuestion].options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        handleAnswer(option);
                        handleNext();
                      }}
                      className={`w-full p-4 text-left rounded-lg border border-white/10 
                  hover:border-red-500 hover:bg-red-500/10 transition-all duration-300
                  ${
                    answers[waitlistQuestions[currentQuestion].id] === option
                      ? "border-red-500 bg-red-500/10"
                      : ""
                  }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              {/* Other input types */}
              {(waitlistQuestions[currentQuestion].type === "text" ||
                waitlistQuestions[currentQuestion].type === "email") && (
                <input
                  type={waitlistQuestions[currentQuestion].type}
                  placeholder={waitlistQuestions[currentQuestion].placeholder}
                  className="w-full p-4 bg-transparent rounded-lg border border-white/10 
               focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20
               transition-all duration-300"
                  value={answers[waitlistQuestions[currentQuestion].id] || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              )}
              {waitlistQuestions[currentQuestion].type === "multiselect" && (
                <div className="space-y-3">
                  {waitlistQuestions[currentQuestion].options?.map((option) => {
                    const selectedOptions =
                      answers[waitlistQuestions[currentQuestion].id] || [];
                    const isSelected = selectedOptions.includes(option);

                    return (
                      <button
                        key={option}
                        onClick={() => {
                          handleAnswer(
                            isSelected
                              ? selectedOptions.filter(
                                  (item: string) => item !== option
                                )
                              : [...selectedOptions, option]
                          );
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

                  {answers[waitlistQuestions[currentQuestion].id]?.length >
                    0 && (
                    <button
                      onClick={handleNext}
                      className="w-full mt-4 p-4 bg-red-500 rounded-lg hover:bg-red-600 
                    transition-all duration-300 text-center font-semibold"
                    >
                      Continue
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {waitlistQuestions[currentQuestion].type !== "intro" && (
          <div className="flex justify-between mt-12">
            <button
              onClick={handlePrevious}
              className={`flex items-center gap-2 text-white/50 hover:text-white transition-colors
                        ${currentQuestion === 0 ? "invisible" : ""}`}
            >
              <FiArrowLeft /> Previous
            </button>

            {currentQuestion === waitlistQuestions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="w-48 p-4 bg-red-500 rounded-lg 
                        hover:bg-red-600 hover:shadow-[0_0_30px_rgba(204,0,0,0.8)]
                        shadow-[0_0_15px_rgba(204,0,0,0.5)]
                        transition-all duration-300 text-center font-semibold"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`flex items-center gap-2 text-white hover:text-red-500 transition-colors
                          ${
                            currentQuestion === waitlistQuestions.length - 1
                              ? "invisible"
                              : ""
                          }`}
              >
                Next <FiArrowRight />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
