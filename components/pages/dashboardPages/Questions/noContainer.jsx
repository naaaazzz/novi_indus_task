import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const NoContainer = ({
  formattedTimeLeft,
  questions,
  getQuestionStatus,
  handleQuestionChange,
  currentIndex,
}) => {
  return (
    <div className="w-full lg:w-[40%]">
      <Card className="rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-sm font-medium">Question No. Sheet:</span>
          <div className="flex items-center gap-1 rounded bg-[#1c3141] px-2 py-1 text-[11px] text-white sm:text-xs">
            <Image src="/icons/timer.png" alt="" width={14} height={14} />
            <span>{formattedTimeLeft}</span>
          </div>
        </div>

        {/* GRID */}
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-10">
          {questions.map((q, index) => {
            const status = getQuestionStatus(q?.question_id);
            const statusClasses =
              status === "answered-marked"
                ? "bg-[#4caf50] text-white ring-3 ring-[#800080] border-[#4caf50] hover:bg-[#4caf50]"
                : status === "marked"
                  ? "bg-[#800080] text-white border-[#800080] hover:bg-[#800080]"
                  : status === "answered"
                    ? "bg-[#4caf50] text-white border-[#4caf50] hover:bg-[#4caf50]"
                    : status === "not-answered"
                      ? "bg-[#ee3535] text-white border-[#ee3535] hover:bg-[#ee3535]"
                      : "bg-white text-[#1c3141] border-[#d5dde5]";

            return (
              <Button
                type="button"
                key={q?.question_id}
                onClick={() => handleQuestionChange(index)}
                className={`flex aspect-square w-full hover:bg-transparent items-center justify-center rounded-md border text-[11px] transition-all sm:text-xs ${statusClasses} ${
                  index === currentIndex
                    ? "ring-2 ring-[#1c3141] ring-offset-1"
                    : ""
                }`}
              >
                {q?.number || index + 1}
              </Button>
            );
          })}
        </div>
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1 ">
            <span className="w-3 h-3 bg-[#4caf50] rounded"></span>{" "}
            <span className="text-[10px]"> Answered</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#ee3535] rounded"></span>{" "}
            <span className="text-[10px]"> Not Answered</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#800080] rounded"></span>{" "}
            <span className="text-[10px]"> Marked for Review</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#4caf50] ring-2 ring-[#800080]  rounded"></span>
            <span className="text-[10px]">Answered and Marked For Review</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NoContainer;
