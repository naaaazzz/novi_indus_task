"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInstruction } from "@/hooks/dashboardHooks/useInstruction";

const McqInstructions = () => {
  const { question, router } = useInstruction();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-3 py-6 sm:px-4 md:px-6">
      <div className="flex w-full max-w-5xl flex-col items-center">
        {/* Title */}
        <h1 className="mb-4 text-center text-lg font-semibold text-gray-700 sm:text-xl md:text-2xl">
          Ancient Indian History MCQ
        </h1>

        {/* ✅ ShadCN Stats Card */}
        <Card className="mx-auto w-full max-w-[682px] rounded-[8px] bg-[#1c3141] text-white shadow-md">
          <CardContent className="grid min-h-[136px] grid-cols-1 gap-4 px-4 py-5 sm:grid-cols-3 sm:gap-0 sm:px-5 sm:py-6 md:px-7">
            {/* MCQ */}
            <div className="flex flex-col items-center justify-center sm:border-r sm:border-white/40">
              <p className="text-sm font-medium opacity-80 sm:text-[15px]">
                Total MCQs
              </p>
              <p className="mt-1 text-[32px] leading-none sm:text-[38px] md:text-[42px]">
                {question.questions_count}
              </p>
            </div>

            {/* Marks */}
            <div className="flex flex-col items-center justify-center sm:border-r sm:border-white/40">
              <p className="text-sm font-medium opacity-80 sm:text-[15px]">
                Total marks
              </p>
              <p className="mt-1 text-[32px] leading-none sm:text-[38px] md:text-[42px]">
                {question.total_marks}
              </p>
            </div>

            {/* Time */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm font-medium opacity-80 sm:text-[15px]">
                Total time
              </p>
              <p className="mt-1 text-[32px] leading-none sm:text-[38px] md:text-[42px]">
                {question.total_time}:00
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="mt-6 w-full">
          <h2 className="mb-3 text-center text-sm font-semibold text-gray-700 sm:text-base">
            Instructions
          </h2>

          {/* ✅ Clean ShadCN-style list */}
          {question?.instruction ? (
            <div
              className="mx-auto max-w-3xl px-1 text-sm leading-relaxed text-gray-600 sm:px-2 sm:text-[15px] [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: question.instruction }}
            />
          ) : (
            <p className="text-center text-sm text-gray-500 sm:text-base">
              Loading instructions...
            </p>
          )}

          {/* Button */}
          <div className="mb-3 mt-6 flex justify-center">
            <Button
              onClick={() => {
                sessionStorage.setItem("examData", JSON.stringify(question));
                router.push("/dashboard/questions");
              }}
              className="h-[48px] w-full max-w-[361px] bg-[#1c3141] text-white hover:bg-[#1c3141]"
            >
              Start Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McqInstructions;
