"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

const questions = [
  {
    id: 1,
    question: "What brings you to Quok.it?",
    type: "choice",
    options: [
      "I want to rent GPUs",
      "I want to provide GPUs",
      "I'm an enterprise customer",
      "Just exploring",
    ],
  },
  {
    id: 2,
    question: "What's your expected monthly compute budget?",
    type: "choice",
    options: ["< $1,000", "$1,000 - $10,000", "$10,000 - $50,000", "> $50,000"],
  },
  {
    id: 3,
    question: "What type of GPUs are you interested in?",
    type: "multiselect",
    options: ["NVIDIA H100", "NVIDIA A100", "NVIDIA A6000", "Other"],
  },
  {
    id: 4,
    question: "What's your email?",
    type: "email",
    placeholder: "name@company.com",
  },
  {
    id: 5,
    question: "Any specific features you're looking for?",
    type: "text",
    placeholder: "Tell us more...",
  },
];

export default function Waitlist() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((curr) => curr + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((curr) => curr - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-6">
        {/* Progress bar */}
        <div className="w-full bg-gray-800 h-1 mb-12">
          <motion.div
            className="h-full bg-red-500"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
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
            <h2 className="text-4xl font-bold">
              {questions[currentQuestion].question}
            </h2>

            {/* Answer input */}
            <div className="space-y-4">
              {questions[currentQuestion].type === "choice" &&
                questions[currentQuestion].options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion]: option,
                      }));
                      handleNext();
                    }}
                    className={`w-full p-4 text-left rounded-lg border border-white/10 
                              hover:border-red-500 hover:bg-red-500/10 transition-all duration-300
                              ${
                                answers[currentQuestion] === option
                                  ? "border-red-500 bg-red-500/10"
                                  : ""
                              }`}
                  >
                    {option}
                  </button>
                ))}
              {questions[currentQuestion].type === "multiselect" && (
                <div className="space-y-3">
                  {questions[currentQuestion].options?.map((option) => {
                    const selectedOptions = answers[currentQuestion] || [];
                    const isSelected = selectedOptions.includes(option);

                    return (
                      <button
                        key={option}
                        onClick={() => {
                          setAnswers((prev) => ({
                            ...prev,
                            [currentQuestion]: isSelected
                              ? selectedOptions.filter(
                                  (item) => item !== option
                                )
                              : [...(prev[currentQuestion] || []), option],
                          }));
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

                  {answers[currentQuestion]?.length > 0 && (
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
              {questions[currentQuestion].type === "email" && (
                <input
                  type="email"
                  placeholder={questions[currentQuestion].placeholder}
                  className="w-full p-4 bg-transparent rounded-lg border border-white/10 
                           focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20
                           transition-all duration-300"
                  value={answers[currentQuestion] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion]: e.target.value,
                    }))
                  }
                />
              )}

              {questions[currentQuestion].type === "text" && (
                <textarea
                  placeholder={questions[currentQuestion].placeholder}
                  className="w-full p-4 bg-transparent rounded-lg border border-white/10 
                           focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20
                           transition-all duration-300 min-h-[120px]"
                  value={answers[currentQuestion] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion]: e.target.value,
                    }))
                  }
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <button
            onClick={handlePrevious}
            className={`flex items-center gap-2 text-white/50 hover:text-white transition-colors
                      ${currentQuestion === 0 ? "invisible" : ""}`}
          >
            <FiArrowLeft /> Previous
          </button>

          <button
            onClick={handleNext}
            className={`flex items-center gap-2 text-white hover:text-red-500 transition-colors
                      ${
                        currentQuestion === questions.length - 1
                          ? "invisible"
                          : ""
                      }`}
          >
            Next <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
