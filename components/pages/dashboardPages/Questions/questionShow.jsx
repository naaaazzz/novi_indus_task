"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import ComprehensivePara from "./comprehensivePara";
import AlertContentPage from "./alertContent";

const QuestionShow = ({
  open,
  setOpen,
  currentQuestion,
  questions,
  currentIndex,
  handleSelect,
  handleMarkForReview,
  handleNext,
  handlePrevious,
  selectedAnswer,
  isCurrentQuestionMarked,
  formattedTimeLeft,
  totalQuestions,
  answeredCount,
  markedCount,
  handleSubmit,
}) => {
  return (
    <div className="w-full lg:w-[60%]">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold sm:text-base md:text-lg">
          Frontend Basics Assessment
        </h2>
        <span className="rounded bg-gray-200 px-3 py-1 text-xs sm:text-sm">
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      {/* Question Card */}
      <Card className="w-full rounded-lg shadow-sm py-0">
        <CardContent className="p-4 space-y-4">
          {/* COMPREHENSION */}
          {currentQuestion?.comprehension && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger
                onClick={() => setOpen(true)}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#177a9c] px-4 py-2 text-center text-xs text-white sm:w-fit sm:text-sm cursor-pointer"
              >
                <Image src="/icons/file.png" alt="" width={16} height={16} />
                Read Comprehensive Paragraph
                <Image src="/icons/right.png" alt="" width={6} height={6} />
              </DialogTrigger>

              <DialogContent
                showCloseButton={false}
                className="w-[calc(100vw-24px)] max-w-[95vw] p-0 sm:w-full md:max-w-[900px]"
              >
                <DialogTitle className="hidden">
                  Comprehensive Paragraph
                </DialogTitle>

                <ComprehensivePara
                  closeDialog={() => setOpen(false)}
                  content={currentQuestion?.comprehension}
                />
              </DialogContent>
            </Dialog>
          )}

          {/* QUESTION */}
          <p className="max-w-[900px] text-sm font-medium leading-6 sm:text-[15px]">
            {currentQuestion?.question}
          </p>

          {/* IMAGE */}
          {currentQuestion?.image && (
            <div className="relative h-[180px] w-full overflow-hidden rounded-md sm:h-[220px] md:max-w-[420px]">
              <Image
                src={currentQuestion.image}
                alt="question"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* OPTIONS */}
      <div className="mt-6">
        <p className="text-sm font-medium sm:text-[15px]">Choose the answer:</p>
      </div>

      <RadioGroup
        value={selectedAnswer ? String(selectedAnswer.selected_option_id) : ""}
        onValueChange={handleSelect}
        className="flex flex-col gap-3 mt-4"
      >
        {currentQuestion?.options?.map((opt) => (
          <label
            key={opt?.id}
            className={`flex min-h-[48px] items-center justify-between gap-3 font-medium rounded-md border px-4 py-3 cursor-pointer
              ${
                String(selectedAnswer?.selected_option_id) === String(opt?.id)
                  ? "border-[#1c3141] bg-[#e6eef5]"
                  : "border-gray-300 bg-white"
              }`}
          >
            <span className="text-sm leading-5 sm:text-[15px]">
              {opt?.option}
            </span>
            <RadioGroupItem value={String(opt?.id)} />
          </label>
        ))}
      </RadioGroup>

      {/* BUTTONS */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button
          onClick={handleMarkForReview}
          className="w-full sm:flex-1 h-[46px] bg-purple-700 hover:bg-purple-800"
        >
          {isCurrentQuestionMarked ? "Unmark review" : "Mark for review"}
        </Button>

        <Button
          onClick={handlePrevious}
          className="w-full sm:flex-1 h-[46px] bg-[#cecece] text-black hover:bg-[#cecece]"
        >
          Previous
        </Button>
        {currentIndex === questions.length - 1 ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full sm:flex-1 h-[46px] bg-[#1c3141]">
                Submit
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="w-[calc(100vw-24px)] max-w-[381px]">
              <AlertDialogHeader>
                <div className="flex justify-between w-full items-center">
                  <AlertDialogTitle className="pr-4 text-[13px] sm:text-[14px]">
                    Are you sure you want to submit the test?
                  </AlertDialogTitle>
                  <AlertDialogCancel>
                    <X />
                  </AlertDialogCancel>
                </div>

                <AlertContentPage
                  remainingTime={formattedTimeLeft}
                  totalQuestions={totalQuestions}
                  answered={answeredCount}
                  marked={markedCount}
                />
              </AlertDialogHeader>

              <AlertDialogFooter>
                <Button
                  onClick={handleSubmit}
                  className="w-full h-[45px] bg-[#1c3141] text-white"
                >
                  Submit Test
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            onClick={handleNext}
            className="w-full sm:flex-1 h-[46px] bg-[#1c3141] text-white"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionShow;
