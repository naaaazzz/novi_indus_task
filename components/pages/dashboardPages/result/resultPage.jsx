"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formatCount = (value) => String(value ?? 0).padStart(3, "0");

const formatSubmittedAt = (value) => {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ResultPage = () => {
  const router = useRouter();
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("resultData");

    if (storedResult) {
      setResultData(JSON.parse(storedResult));
    }
  }, []);

  const score = resultData?.score ?? 0;
  const totalMarks = resultData?.total_marks ?? resultData?.total_questions ?? 0;
  const remainingTime = resultData?.remaining_time || "--:--";
  const correctAnswers = resultData?.correct ?? 0;
  const wrongAnswers = resultData?.wrong ?? 0;
  const notAttended = resultData?.not_attended ?? 0;
  const submittedAt = formatSubmittedAt(resultData?.submitted_at);

  const handleDone = () => {
    sessionStorage.removeItem("examData");
    router.push("/dashboard/instructions");
  };

  return (
    <div className="flex min-h-[85dvh] items-start justify-center bg-gray-200 px-3 pt-4 sm:px-4 sm:pt-6 md:px-6">
      {/* Card */}
      <div className="w-full max-w-[430px]">
        {/* Top Gradient Card */}
        <div
          className="rounded-[18px] px-4 py-5 text-center text-white sm:px-5 sm:py-6"
          style={{
            background:
              "linear-gradient(307.95deg, #1C3141 2.54%, #177A9C 79.7%)",
          }}
        >
          <p className="text-xs opacity-80 sm:text-sm">Marks Obtained:</p>
          <h1 className="mt-1 text-2xl font-semibold sm:text-4xl">
            {score} <span className="opacity-70">/</span> {totalMarks}
          </h1>
        </div>

        {/* Stats Section */}
        <div className="mt-3 space-y-3 p-3 text-sm sm:p-4">
          {/* Total */}
          <div className="flex items-start justify-between gap-3 py-1">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#dda428]">
                <Image
                  src="/icons/timer.png"
                  alt="total"
                  width={14}
                  height={14}
                />
              </div>
              <p className="text-sm sm:text-[16px]">Remaining Time:</p>
            </div>
            <p className="shrink-0 text-sm font-medium sm:text-[16px]">{remainingTime}</p>
          </div>

          {/* Correct */}
          <div className="flex items-start justify-between gap-3 py-1">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#4caf50]">
                <Image
                  src="/icons/question.png"
                  alt="correct"
                  width={14}
                  height={14}
                />
              </div>
              <p className="text-sm sm:text-[16px]">Correct Answers:</p>
            </div>
            <p className="shrink-0 text-sm font-medium sm:text-[16px]">
              {formatCount(correctAnswers)}
            </p>
          </div>

          {/* Incorrect */}
          <div className="flex items-start justify-between gap-3 py-1">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#ee3535]">
                <Image
                  src="/icons/question.png"
                  alt="incorrect"
                  width={14}
                  height={14}
                />
              </div>
              <p className="text-sm sm:text-[16px]">Incorrect Answers:</p>
            </div>
            <p className="shrink-0 text-sm font-medium sm:text-[16px]">
              {formatCount(wrongAnswers)}
            </p>
          </div>

          {/* Not Attended */}
          <div className="flex items-start justify-between gap-3 py-1">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#5c5c5c]">
                <Image
                  src="/icons/question.png"
                  alt="not attended"
                  width={14}
                  height={14}
                />
              </div>
              <p className="text-sm sm:text-[16px]">Not Attended Questions:</p>
            </div>
            <p className="shrink-0 text-sm font-medium sm:text-[16px]">
              {formatCount(notAttended)}
            </p>
          </div>

          <div className="flex items-start justify-between gap-3 py-1">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#1c3141]">
                <Image
                  src="/icons/timer.png"
                  alt="submitted at"
                  width={14}
                  height={14}
                />
              </div>
              <p className="text-sm sm:text-[16px]">Submitted At:</p>
            </div>
            <p className="max-w-[150px] text-right text-xs font-medium sm:max-w-[180px] sm:text-[14px]">{submittedAt}</p>
          </div>
        </div>

        {/* Button */}
        <Button
          onClick={handleDone}
          className="mt-4 h-[48px] w-full rounded-[10px] bg-[#1C3141] text-white transition hover:bg-[#162733]"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
