"use client";

import React, { useEffect, useState } from "react";
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
import ComprehensivePara from "./comprehensivePara";
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
import AlertContentPage from "./alertContent";
import { submitAnswers } from "@/lib/api";
import { toast } from "sonner";

const Questions = () => {
  const [open, setOpen] = useState(false);
  const [examData, setExamData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // LOAD DATA
  useEffect(() => {
    const data = sessionStorage.getItem("examData");
    console.log("examdata", data);
    if (data) {
      const parsed = JSON.parse(data);

      // 🔥 handle different structures safely
      const questions = parsed?.questions || parsed?.data?.questions || [];

      setExamData({
        ...parsed,
        questions,
      });

      setTimeLeft((parsed?.total_time || 0) * 60);
    }
  }, []);

  // TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ✅ SAFE GUARD
  if (!examData || !examData.questions?.length) {
    return <div className="p-4">No questions available</div>;
  }

  const questions = examData.questions;
  const currentQuestion = questions[currentIndex] || {};

  // TIMER FORMAT
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // ANSWER SELECT
  const handleSelect = (val) => {
    if (!currentQuestion?.question_id) return;

    setAnswers((prev) => {
      const exists = prev.find(
        (a) => a.question_id === currentQuestion.question_id,
      );

      if (exists) {
        return prev.map((a) =>
          a.question_id === currentQuestion.question_id
            ? { ...a, selected_option_id: val }
            : a,
        );
      }

      return [
        ...prev,
        {
          question_id: currentQuestion.question_id,
          selected_option_id: val,
        },
      ];
    });
  };

  // /NEXT BUTTON
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // SUMMARY
  const totalQuestions = questions.length;
  const answeredCount = answers.length;
  const notAnsweredCount = totalQuestions - answeredCount;

  // SUBMIT

  const handleSubmit = async () => {
    try {
      const res = await submitAnswers(answers);
      console.log("result", res);
      if (res.success) {
        toast.success("Result Submitted Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 bg-[#f3f6f9] min-h-screen">
      {/* LEFT SIDE */}
      <div className="flex-1 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm md:text-base font-semibold">
            Ancient Indian History MCQ
          </h2>
          <span className="text-xs bg-gray-200 px-3 py-1 rounded">
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
                  className="bg-[#1c3141] text-white flex items-center gap-2 h-[44px] px-4 rounded-md text-sm"
                >
                  <Image src="/icons/file.png" alt="" width={16} height={16} />
                  Read Comprehensive Paragraph
                  <Image src="/icons/right.png" alt="" width={6} height={6} />
                </DialogTrigger>

                <DialogContent
                  showCloseButton={false}
                  className="max-w-[95vw] md:max-w-[900px] p-0"
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
            <p className="text-sm max-w-[900px]">{currentQuestion?.question}</p>

            {/* IMAGE */}
            {currentQuestion?.image && (
              <div className="w-full max-w-[300px] h-[160px] relative">
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
          <p className="text-sm font-medium">Choose the answer:</p>
        </div>

        <RadioGroup
          value={
            answers.find((a) => a.question_id === currentQuestion?.question_id)
              ?.selected_option_id || ""
          }
          onValueChange={handleSelect}
          className="flex flex-col gap-3 mt-4"
        >
          {currentQuestion?.options?.map((opt) => (
            <label
              key={opt?.id}
              className={`flex items-center justify-between px-4 h-[48px] rounded-md border cursor-pointer
              ${
                answers.find(
                  (a) =>
                    a.question_id === currentQuestion?.question_id &&
                    a.selected_option_id === opt?.id,
                )
                  ? "border-[#1c3141] bg-[#e6eef5]"
                  : "border-gray-300 bg-white"
              }`}
            >
              <span className="text-sm">{opt?.option}</span>
              <RadioGroupItem value={opt?.id} />
            </label>
          ))}
        </RadioGroup>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button className="w-full sm:flex-1 h-[46px] bg-purple-700 hover:bg-purple-800">
            Mark for review
          </Button>

          <Button
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            className="w-full sm:flex-1 h-[46px] bg-gray-300 text-black hover:bg-gray-400"
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

              <AlertDialogContent className="w-[381px]">
                <AlertDialogHeader>
                  <div className="flex justify-between items-center">
                    <AlertDialogTitle className="text-[14px]">
                      Are you sure you want to submit the test?
                    </AlertDialogTitle>
                    <AlertDialogCancel>
                      <X />
                    </AlertDialogCancel>
                  </div>

                  <AlertContentPage
                    answered={answeredCount}
                    notAnswered={notAnsweredCount}
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
            <Button onClick={handleNext} className="bg-[#1c3141] text-white">
              Next
            </Button>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[320px] xl:w-[400px]">
        <Card className="p-4 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Question No. Sheet:</span>
            <div className="bg-[#1c3141] flex items-center gap-1 text-white px-2 py-1 rounded text-xs">
              <Image src="/icons/timer.png" alt="" width={14} height={14} />
              <span>
                {minutes}:{seconds.toString().padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-10 lg:grid-cols-8 gap-1 sm:gap-2 mt-3">
            {questions.map((q, index) => {
              const isAnswered = answers[q?.question_id];

              return (
                <div
                  key={q?.question_id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full aspect-square flex items-center justify-center rounded-md border text-xs cursor-pointer
                  ${
                    index === currentIndex
                      ? "bg-blue-500 text-white"
                      : isAnswered
                        ? "bg-green-500 text-white"
                        : "bg-gray-100"
                  }`}
                >
                  {q?.number || index + 1}
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-3  text-xs ">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded"></span> Answered
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded"></span> Not Answered
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-purple-700 rounded"></span> Marked
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-400 rounded"></span> Answered and
              Marked For Review
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Questions;
