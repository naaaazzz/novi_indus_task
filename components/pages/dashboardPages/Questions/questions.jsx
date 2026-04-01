"use client";
import React from "react";
import { useQuestions } from "@/hooks/dashboardHooks/useQuestions";
import QuestionShow from "./questionShow";
import NoContainer from "./noContainer";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Questions = () => {
  const {
    open,
    setOpen,
    timeOverAlertOpen,
    isLoaded,
    currentIndex,
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
    questions,
    currentQuestion,
    hasQuestions,
  } = useQuestions();

  if (!isLoaded) {
    return <div className="p-4">Loading questions...</div>;
  }

  if (!hasQuestions) {
    return <div className="p-4">No questions available</div>;
  }

  return (
    <>
      <div className="flex min-h-full flex-col gap-4 bg-[#f3f6f9] p-3 sm:gap-5 sm:p-4 md:p-6 lg:flex-row lg:items-start lg:gap-6">
        {/* LEFT SIDE */}

        <QuestionShow
          open={open}
          setOpen={setOpen}
          currentQuestion={currentQuestion}
          questions={questions}
          currentIndex={currentIndex}
          handleSelect={handleSelect}
          handleMarkForReview={handleMarkForReview}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          selectedAnswer={selectedAnswer}
          isCurrentQuestionMarked={isCurrentQuestionMarked}
          formattedTimeLeft={formattedTimeLeft}
          totalQuestions={totalQuestions}
          answeredCount={answeredCount}
          markedCount={markedCount}
          handleSubmit={handleSubmit}
        />
        {/* RIGHT SIDE */}

        <NoContainer
          formattedTimeLeft={formattedTimeLeft}
          questions={questions}
          getQuestionStatus={getQuestionStatus}
          handleQuestionChange={handleQuestionChange}
          currentIndex={currentIndex}
        />
      </div>

      <AlertDialog open={timeOverAlertOpen}>
        <AlertDialogContent className="w-[calc(100vw-24px)] max-w-[360px]">
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="text-[16px] font-semibold text-[#243746] sm:text-[18px]">
              Time is over
            </AlertDialogTitle>
            <p className="text-sm text-[#4b5d6b]">
              Your test has been submitted. Redirecting to the result page in 5
              seconds.
            </p>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Questions;
