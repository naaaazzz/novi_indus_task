"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const McqInstructions = () => {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Title */}
        <h1 className="text-center text-xl font-semibold text-gray-700 mb-4">
          Ancient Indian History MCQ
        </h1>

        {/* ✅ ShadCN Stats Card */}
        <Card className="w-[682px] h-[136px] bg-[#1c3141] text-white rounded-[8px] shadow-md mx-auto">
          <CardContent className="h-full flex items-center justify-center px-[10.55px] py-[22.42px] gap-[57px]">
            {/* MCQ */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-[15px] opacity-80 font-medium">Total MCQs</p>
              <p className="text-[42px] leading-none mt-1">100</p>
            </div>

            <Separator
              orientation="vertical"
              className="h-full w-[2px] bg-white/40"
            />

            {/* Marks */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-[15px] opacity-80 font-medium">Total marks</p>
              <p className="text-[42px] leading-none mt-1">100</p>
            </div>

            <Separator
              orientation="vertical"
              className="h-full w-[2px] bg-white/40"
            />

            {/* Time */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-[15px] opacity-80 font-medium">Total time</p>
              <p className="text-[42px] leading-none mt-1">90:00</p>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="mt-6 w-full">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 text-center">
            Instructions
          </h2>

          {/* ✅ Clean ShadCN-style list */}
          <ol className="list-decimal space-y-2 text-[15px] text-gray-600 max-w-xl mx-auto pl-5 leading-relaxed">
            <li>You have 100 minutes to complete the test.</li>
            <li>Test consists of 100 multiple-choice questions.</li>
            <li>
              You are allowed 2 retest attempts if you do not pass on the first
              try.
            </li>
            <li>Each incorrect answer will incur a negative mark of -1/4.</li>
            <li>
              Ensure you are in a quiet environment and have a stable internet
              connection.
            </li>
            <li>Keep an eye on the timer and answer within the given time.</li>
            <li>Do not use external resources like websites or assistance.</li>
            <li>Complete the test honestly to assess your proficiency.</li>
            <li>Results will be shown immediately after submission.</li>
          </ol>

          {/* Button */}
          <div className="flex justify-center mt-6 mb-3">
            <Button
              onClick={() => router.push("/dashboard/questions")}
              className="w-[361px] h-[48px] bg-[#1c3141] hover:bg-[#1c3141] text-white"
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
