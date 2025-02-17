"use client";
import { useState, useEffect } from "react";
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
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [previousRole, setPreviousRole] = useState<string | null>(null);

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

  const handleMultiSelect = (option: string, questionId: number) => {
    setAnswers((prev) => {
      const currentAnswers = (prev[questionId] as string[]) || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((answer) => answer !== option)
        : [...currentAnswers, option];
      return {
        ...prev,
        [questionId]: newAnswers,
      };
    });
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isNextEnabled) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNextEnabled]);

  useEffect(() => {
    const validateCurrentAnswer = () => {
      const currentQuestionId = questions[currentQuestion].id;
      const currentAnswer = answers[currentQuestionId];
      const schema =
        AnswerSchema.shape[
          currentQuestionId as keyof typeof AnswerSchema.shape
        ];
      if (schema) {
        try {
          schema.parse(currentAnswer);
          setIsNextEnabled(true);
        } catch (e) {
          setIsNextEnabled(false);
        }
      } else {
        setIsNextEnabled(true);
      }
    };
    validateCurrentAnswer();
  }, [currentQuestion, answers]);

  useEffect(() => {
    const roleAnswer = answers[1];
    if (roleAnswer && roleAnswer !== previousRole) {
      setPreviousRole(roleAnswer as string);
      setCurrentQuestion(1); // Set to the role question instead of the intro
      setAnswers((prev) => ({ 1: prev[1] })); // Keep the role answer, reset others
      setErrors({});
    }
  }, [answers[1], previousRole]);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[var(--background)] pt-24">
        <div className="container-fluid mx-auto p-6 text-center space-y-6">
          <h2 className="text-[var(--foreground)] text-4xl font-bold">
            Thank You!
          </h2>
          <p className="text-[var(--text-secondary)]">
            Your submission has been received. We'll be in touch soon!
          </p>
          <div className="mt-8">
            <a
              href="https://quok.it"
              className="text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24">
      <div className="container-fluid mx-auto p-6">
        <div className="space-y-8">
          <h2 className="text-[var(--foreground)] text-4xl font-bold">
            {questions[currentQuestion].question}
            {questions[currentQuestion].type !== "intro" && (
              <span className="text-[var(--primary)] ml-1">*</span>
            )}
          </h2>

          {questions[currentQuestion].subtext && (
            <p className="mt-4 text-[var(--text-secondary)]">
              {questions[currentQuestion].subtext}
            </p>
          )}

          {questions[currentQuestion].type === "intro" && (
            <button
              onClick={handleNext}
              className="btn-primary bg-[var(--primary)] hover:bg-[var(--primary-dark)]"
            >
              Get Started
            </button>
          )}

          {(questions[currentQuestion].type === "text" ||
            questions[currentQuestion].type === "email") && (
            <div>
              <input
                type={questions[currentQuestion].type}
                placeholder={questions[currentQuestion].placeholder}
                value={(answers[questions[currentQuestion].id] as string) || ""}
                onChange={(e) =>
                  handleAnswer(e.target.value, questions[currentQuestion].id)
                }
                className={`w-full p-4 bg-[var(--surface)] rounded-lg border 
                  ${
                    errors[questions[currentQuestion].id]
                      ? "border-[var(--primary)]"
                      : "border-[var(--border-light)]"
                  } 
                  focus:outline-none focus:ring-2 
                  ${
                    errors[questions[currentQuestion].id]
                      ? "focus:ring-[var(--primary)]"
                      : "focus:ring-[var(--border-light)]"
                  }
                  text-[var(--foreground)]
                  transition-all duration-300`}
              />
              {errors[questions[currentQuestion].id] && (
                <p className="mt-2 text-[var(--primary)] text-sm">
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
                      answers[questions[currentQuestion].id] === option
                        ? "border-[var(--primary)] bg-[var(--primary-dark)] bg-opacity-10"
                        : "border-[var(--border-light)] hover:border-[var(--primary)] hover:bg-[var(--primary-dark)] hover:bg-opacity-10"
                    }
                    text-[var(--foreground)]`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {questions[currentQuestion].type === "multiselect" && (
            <div className="space-y-3">
              {questions[currentQuestion].options?.map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    handleMultiSelect(option, questions[currentQuestion].id)
                  }
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-300
                    ${
                      Array.isArray(answers[questions[currentQuestion].id]) &&
                      answers[questions[currentQuestion].id].includes(option)
                        ? "border-[var(--primary)] bg-[var(--primary-dark)] bg-opacity-10"
                        : "border-[var(--border-light)] hover:border-[var(--primary)] hover:bg-[var(--primary-dark)] hover:bg-opacity-10"
                    }
                    text-[var(--foreground)]`}
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
                className={`flex items-center gap-2 px-6 py-3 text-[var(--foreground)] hover:text-[var(--primary)] 
                          transition-colors font-semibold
                          ${currentQuestion === 0 ? "invisible" : ""}`}
              >
                <FiArrowLeft className="w-5 h-5" /> Previous
              </button>

              {isLastQuestion() ? (
                <button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting ||
                    Object.keys(errors).length > 0 ||
                    !answers[questions[currentQuestion].id]
                  }
                  className={`btn-primary bg-[var(--primary)]
                    ${
                      isSubmitting ||
                      Object.keys(errors).length > 0 ||
                      !answers[questions[currentQuestion].id]
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[var(--primary-dark)]"
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isNextEnabled}
                  className={`flex items-center gap-2 px-6 py-3 transition-colors font-semibold
                    ${
                      !isNextEnabled
                        ? "text-[var(--text-secondary)] cursor-not-allowed"
                        : "text-[var(--foreground)] hover:text-[var(--primary)]"
                    }`}
                >
                  Next <FiArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 text-[var(--primary)] text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
