import Image from "next/image";
import React from "react";

const AlertContentPage = () => {
  return (
    <div className="p-4 space-y-4 w-full">
      {/* Remaining Time */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-[#1c3141] text-background rounded">
            <Image src="/icons/timer.png" alt="total" width={14} height={14} />
          </div>
          <span className="text-sm text-gray-600">Remaining Time:</span>
        </div>
        <span className="text-sm font-semibold">87:13</span>
      </div>

      {/* Total Questions */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-[#dda428] text-white rounded text-xs">
             <Image src="/icons/question.png" alt="total" width={14} height={14} />
          </div>
          <span className="text-sm text-gray-700">Total Questions:</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">100</span>
        </div>
      </div>

      {/* Answered */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-[#4caf50] text-white rounded text-xs">
             <Image src="/icons/question.png" alt="total" width={14} height={14} />
          </div>
          <span className="text-sm text-gray-700">Questions Answered:</span>
        </div>
        <span className="font-semibold text-sm">003</span>
      </div>

      {/* Marked */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-[#800080] text-white rounded text-xs">
            <Image src="/icons/question.png" alt="total" width={14} height={14} />
          </div>
          <span className="text-sm text-gray-700">Marked for review:</span>
        </div>
        <span className="font-semibold text-sm">001</span>
      </div>
    </div>
  );
};

export default AlertContentPage;
