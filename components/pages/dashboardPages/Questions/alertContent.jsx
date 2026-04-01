import Image from "next/image";
import React from "react";

const formatCount = (value) => String(value).padStart(3, "0");

const AlertContentPage = ({
  remainingTime,
  totalQuestions,
  answered,
  marked,
}) => {
  return (
    <div className="w-full space-y-3 px-1 py-2 sm:space-y-4 sm:p-4">
      {/* Remaining Time */}
      <div className="flex items-start justify-between gap-3 py-1">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#1c3141] text-background">
            <Image src="/icons/timer.png" alt="total" width={14} height={14} />
          </div>
          <span className="text-xs text-gray-600 sm:text-sm">Remaining Time:</span>
        </div>
        <span className="shrink-0 text-xs font-semibold sm:text-sm">{remainingTime}</span>
      </div>

      {/* Total Questions */}
      <div className="flex items-start justify-between gap-3 py-1">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#dda428] text-xs text-white">
            <Image src="/icons/question.png" alt="total" width={14} height={14} />
          </div>
          <span className="text-xs text-gray-700 sm:text-sm">Total Questions:</span>
        </div>
        <span className="shrink-0 text-xs font-semibold sm:text-sm">{formatCount(totalQuestions)}</span>
      </div>

      {/* Answered */}
      <div className="flex items-start justify-between gap-3 py-1">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#4caf50] text-xs text-white">
            <Image src="/icons/question.png" alt="total" width={14} height={14} />
          </div>
          <span className="text-xs text-gray-700 sm:text-sm">Questions Answered:</span>
        </div>
        <span className="shrink-0 text-xs font-semibold sm:text-sm">{formatCount(answered)}</span>
      </div>

      {/* Marked */}
      <div className="flex items-start justify-between gap-3 py-1">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#800080] text-xs text-white">
            <Image src="/icons/question.png" alt="total" width={14} height={14} />
          </div>
          <span className="text-xs text-gray-700 sm:text-sm">Marked for review:</span>
        </div>
        <span className="shrink-0 text-xs font-semibold sm:text-sm">{formatCount(marked)}</span>
      </div>
    </div>
  );
};

export default AlertContentPage;
