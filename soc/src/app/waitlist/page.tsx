"use client";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { questions } from "./questions.config";
import { z } from "zod";

// Schema for validation
const AnswerSchema = z
  .object({
    1: z.string().min(1, "This field is required"),
    10: z.string().min(1, "This field is required"),
    11: z.string().min(1, "This field is required"),
    12: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "This field is required"),
    13: z.string().min(1, "This field is required"),
    14: z.string().min(1, "This field is required"),
  })
  .passthrough();

export default function Waitlist() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateField = (id: number, value: string) => {
    try {
      AnswerSchema.shape[id as keyof typeof AnswerSchema.shape]?.parse(value);
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [id]: error.issues[0].message,
        }));
      }
    }
  };

  const handleAnswer = (value: string | string[], questionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    if (typeof value === "string") {
      validateField(questionId, value);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting:", error);
      setError(error instanceof Error ? error.message : "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastQuestion = () => {
    let nextIndex = currentQuestion + 1;
    while (nextIndex < questions.length) {
      if (
        !questions[nextIndex].showIf ||
        questions[nextIndex].showIf?.(answers as Record<number, string>)
      ) {
        return false;
      }
      nextIndex++;
    }
    return true;
  };

  const handleNext = () => {
    let nextIndex = currentQuestion + 1;
    while (nextIndex < questions.length) {
      if (
        !questions[nextIndex].showIf ||
        questions[nextIndex].showIf?.(answers as Record<number, string>)
      ) {
        setCurrentQuestion(nextIndex);
        return;
      }
      nextIndex++;
    }
  };

  const handlePrevious = () => {
    const visibleQuestions = questions.filter(
      (q) => !q.showIf || q.showIf(answers as Record<number, string>)
    );
    const currentIndex = visibleQuestions.findIndex(
      (q) => q.id === questions[currentQuestion].id
    );

    if (currentIndex > 0) {
      const prevQuestion = visibleQuestions[currentIndex - 1];
      setCurrentQuestion(questions.findIndex((q) => q.id === prevQuestion.id));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto p-6 text-center space-y-6">
          <h2 className="text-4xl font-bold">Thank You!</h2>
          <p className="text-gray-400">
            Your submission has been received. We'll be in touch soon!
          </p>
          <div className="mt-8">
            <a
              href="https://quok.it"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold">
            {questions[currentQuestion].question}
            <span className="text-red-500 ml-1">*</span>{" "}
            {/* Add asterisk here */}
          </h2>

          {questions[currentQuestion].subtext && (
            <p className="mt-4 text-gray-400">
              {questions[currentQuestion].subtext}
            </p>
          )}

          {questions[currentQuestion].type === "intro" && (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-red-500 rounded-lg 
                        hover:bg-red-600 hover:shadow-[0_0_30px_rgba(204,0,0,0.8)] 
                        shadow-[0_0_15px_rgba(204,0,0,0.5)]
                        transition-all duration-300 text-center font-semibold"
            >
              Get Started
              <FiArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          )}

          {(questions[currentQuestion].type === "text" ||
            questions[currentQuestion].type === "email") && (
            <div>
              <input
                type={questions[currentQuestion].type} // Use the type from the question
                placeholder={questions[currentQuestion].placeholder}
                value={(answers[questions[currentQuestion].id] as string) || ""}
                onChange={(e) =>
                  handleAnswer(e.target.value, questions[currentQuestion].id)
                }
                className={`w-full p-4 bg-transparent rounded-lg border 
                  ${
                    errors[questions[currentQuestion].id]
                      ? "border-red-500"
                      : "border-white/10"
                  } 
                  focus:outline-none focus:ring-2 
                  ${
                    errors[questions[currentQuestion].id]
                      ? "focus:ring-red-500/20"
                      : "focus:ring-white/20"
                  }
                  transition-all duration-300`}
              />
              {errors[questions[currentQuestion].id] && (
                <p className="mt-2 text-red-500 text-sm">
                  {errors[questions[currentQuestion].id]}
                </p>
              )}
            </div>
          )}

          {questions[currentQuestion].type === "choice" && (
            <div className="space-y-3">
              {questions[currentQuestion].options?.map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    handleAnswer(option, questions[currentQuestion].id)
                  }
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-300
                    ${
                      Array.isArray(answers[questions[currentQuestion].id])
                        ? answers[questions[currentQuestion].id].includes(
                            option
                          )
                          ? "border-red-500 bg-red-500/10"
                          : "border-white/10 hover:border-red-500 hover:bg-red-500/10"
                        : answers[questions[currentQuestion].id] === option
                        ? "border-red-500 bg-red-500/10"
                        : "border-white/10 hover:border-red-500 hover:bg-red-500/10"
                    }`}
                >
                  {option}
                </button>
              ))}
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

              {isLastQuestion() ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  className={`px-8 py-3 bg-red-500 rounded-lg 
                            transition-all duration-300 text-center font-semibold
                            ${
                              isSubmitting || Object.keys(errors).length > 0
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-red-600 hover:shadow-[0_0_30px_rgba(204,0,0,0.8)] shadow-[0_0_15px_rgba(204,0,0,0.5)]"
                            }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={
                    errors[questions[currentQuestion].id] !== undefined ||
                    !answers[questions[currentQuestion].id]
                  }
                  className={`flex items-center gap-2 px-6 py-3 transition-colors font-semibold
                            ${
                              errors[questions[currentQuestion].id] ||
                              !answers[questions[currentQuestion].id]
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-white hover:text-red-500"
                            }`}
                >
                  Next <FiArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-500 text-center">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}
