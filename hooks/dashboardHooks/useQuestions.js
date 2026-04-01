import { submitAnswers } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useQuestions = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [examData, setExamData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // LOAD DATA
  useEffect(() => {
    const data = sessionStorage.getItem("examData");

    if (data) {
      try {
        const parsed = JSON.parse(data);
        const questions = parsed?.questions || parsed?.data?.questions || [];

        setExamData({
          ...parsed,
          questions,
        });

        setTimeLeft((parsed?.total_time || 0) * 60);
      } catch (error) {
        console.error("Invalid examData in sessionStorage:", error);
        sessionStorage.removeItem("examData");
        setExamData(null);
        setTimeLeft(0);
        toast.error("Invalid exam data. Please start the test again.");
      }
    }

    setIsLoaded(true);
  }, []);

  // TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const questions = examData?.questions || [];
  const currentQuestion = questions[currentIndex] || {};
  const selectedAnswer = answers.find(
    (answer) => answer.question_id === currentQuestion?.question_id,
  );

  // TIMER FORMAT
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTimeLeft = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const answeredQuestionIds = new Set(
    answers
      .filter(
        (answer) =>
          answer.selected_option_id !== undefined &&
          answer.selected_option_id !== null &&
          answer.selected_option_id !== "",
      )
      .map((answer) => answer.question_id),
  );
  const markedQuestionIds = new Set(markedForReview);
  const visitedQuestionIds = new Set(visitedQuestions);
  const isCurrentQuestionMarked = markedQuestionIds.has(
    currentQuestion?.question_id,
  );

  const markCurrentQuestionAsVisited = () => {
    if (!currentQuestion?.question_id) return;

    setVisitedQuestions((prev) =>
      prev.includes(currentQuestion.question_id)
        ? prev
        : [...prev, currentQuestion.question_id],
    );
  };

  const getQuestionStatus = (questionId) => {
    const isAnswered = answeredQuestionIds.has(questionId);
    const isMarked = markedQuestionIds.has(questionId);
    const isVisited = visitedQuestionIds.has(questionId);

    if (isAnswered && isMarked) return "answered-marked";
    if (isMarked) return "marked";
    if (isAnswered) return "answered";
    if (isVisited) return "not-answered";

    return "default";
  };

  // ANSWER SELECT
  const handleSelect = (val) => {
    if (!currentQuestion?.question_id) return;
    const selectedOption = currentQuestion?.options?.find(
      (option) => String(option?.id) === String(val),
    );
    const selectedOptionId = selectedOption?.id ?? val;

    setAnswers((prev) => {
      const exists = prev.find(
        (a) => a.question_id === currentQuestion.question_id,
      );

      if (exists) {
        return prev.map((a) =>
          a.question_id === currentQuestion.question_id
            ? { ...a, selected_option_id: selectedOptionId }
            : a,
        );
      }

      return [
        ...prev,
        {
          question_id: currentQuestion.question_id,
          selected_option_id: selectedOptionId,
        },
      ];
    });
  };

  const handleMarkForReview = () => {
    if (!currentQuestion?.question_id) return;

    setMarkedForReview((prev) =>
      prev.includes(currentQuestion.question_id)
        ? prev.filter(
            (questionId) => questionId !== currentQuestion.question_id,
          )
        : [...prev, currentQuestion.question_id],
    );
  };

  // /NEXT BUTTON
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      markCurrentQuestionAsVisited();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      markCurrentQuestionAsVisited();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleQuestionChange = (index) => {
    if (index === currentIndex) return;

    markCurrentQuestionAsVisited();
    setCurrentIndex(index);
  };

  // SUMMARY
  const totalQuestions = questions.length;
  const answeredCount = answeredQuestionIds.size;
  const markedCount = markedQuestionIds.size;
  const hasQuestions = totalQuestions > 0;

  // SUBMIT
  const handleSubmit = async () => {
    try {
      const res = await submitAnswers(answers, questions);
      if (res.success) {
        sessionStorage.setItem(
          "resultData",
          JSON.stringify({
            ...res,
            remaining_time: formattedTimeLeft,
            total_questions: totalQuestions,
            total_marks: examData?.total_marks ?? totalQuestions,
          }),
        );
        toast.success("Result Submitted Successfully");
        router.push("/dashboard/result");
      } else {
        toast.error(res?.message || "Failed to submit answers");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to submit answers");
    }
  };

  return {
    open,
    setOpen,
    examData,
    setExamData,
    currentIndex,
    setCurrentIndex,
    answers,
    setAnswers,
    markedForReview,
    setMarkedForReview,
    visitedQuestions,
    setVisitedQuestions,
    timeLeft,
    setTimeLeft,
    isLoaded,
    selectedAnswer,
    handleSelect,
    handleMarkForReview,
    handleNext,
    handlePrevious,
    handleQuestionChange,
    handleSubmit,
    getQuestionStatus,
    isCurrentQuestionMarked,
    formattedTimeLeft,
    totalQuestions,
    answeredCount,
    markedCount,
    router,
    questions,
    currentQuestion,
    hasQuestions,
  };
};
