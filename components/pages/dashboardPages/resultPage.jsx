"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";

const ResultPage = () => {
  return (
    <div className="min-h-[85dvh] flex items-start justify-center bg-gray-200 px-4 pt-6">
      {/* Card */}
      <div className="w-full max-w-[430px]">
        {/* Top Gradient Card */}
        <div
          className="rounded-[18px] text-white text-center py-6 px-4"
          style={{
            background:
              "linear-gradient(307.95deg, #1C3141 2.54%, #177A9C 79.7%)",
          }}
        >
          <p className="text-sm opacity-80">Marks Obtained:</p>
          <h1 className="text-3xl sm:text-4xl font-semibold mt-1">
            100 <span className="opacity-70">/</span> 100
          </h1>
        </div>

        {/* Stats Section */}
        <div className=" mt-3  p-4 space-y-3 text-sm">
          {/* Total */}
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#dda428] rounded-md flex items-center justify-center">
                <Image
                  src="/icons/timer.png"
                  alt="total"
                  width={14}
                  height={14}
                />
              </div>
              <p className="text-[16px]">Remaining Time:</p>
            </div>
            <p className="font-medium text-[16px]">87:13</p>
          </div>

          {/* Correct */}
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#4caf50] rounded-md flex items-center justify-center">
                <Image
                  src="/icons/question.png"
                  alt="correct"
                  width={14}
                  height={14}
                />
              </div>
              <p className="text-[16px]">Correct Answers:</p>
            </div>
            <p className="font-medium text-[16px]">003</p>
          </div>

          {/* Incorrect */}
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ee3535] rounded-md flex items-center justify-center">
                <Image
                  src="/icons/question.png"
                  alt="incorrect"
                  width={14}
                  height={14}
                />
              </div>
              <p className="text-[16px] ">Incorrect Answers:</p>
            </div>
            <p className="font-medium text-[16px]">001</p>
          </div>

          {/* Not Attended */}
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#5c5c5c] rounded-md flex items-center justify-center">
                <Image
                  src="/icons/question.png"
                  alt="not attended"
                  width={14}
                  height={14}
                />
              </div>
              <p className="text-[16px]">Not Attended Questions:</p>
            </div>
            <p className="font-medium text-[16px]">096</p>
          </div>
        </div>

        {/* Button */}
        <Button className="w-full mt-4 h-[48px] bg-[#1C3141] text-white rounded-[10px] hover:bg-[#162733] transition">
          Done
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
