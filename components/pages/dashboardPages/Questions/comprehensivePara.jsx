"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const ComprehensivePara = ({ closeDialog, content }) => {
  return (
    <div className="mx-auto w-full max-w-[900px]">
      <div className="rounded-lg overflow-hidden bg-white">
        <div className="border-b bg-[#fff] px-4 py-3 sm:px-5">
          <h2 className="text-sm font-semibold text-[#1c3141] sm:text-base">
            Comprehensive Paragraph
          </h2>
        </div>

        <div className="max-h-[65vh] font-medium overflow-y-auto p-4 text-sm leading-6 text-gray-700 sm:max-h-[70vh] sm:p-5 md:p-6">
          {content}
        </div>

        <div className="flex justify-stretch bg-[#fff] p-4 sm:justify-end">
          <Button
            onClick={closeDialog}
            className="h-[48px] w-full bg-[#1c3141] px-6 text-white sm:w-[140px] md:w-[160px]"
          >
            Minimize
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComprehensivePara;
