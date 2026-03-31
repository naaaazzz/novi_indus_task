"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const ComprehensivePara = ({ closeDialog, content }) => {
  return (
    <div className="w-full max-w-[900px] mx-auto">
      <div className="rounded-lg overflow-hidden bg-white">
        <div className="bg-[#fff] px-4 py-3 border-b">
          <h2 className="text-sm md:text-base font-semibold text-[#1c3141]">
            Comprehensive Paragraph
          </h2>
        </div>

        <div className="p-4 md:p-6 max-h-[60vh] overflow-y-auto text-sm text-gray-700">
          {content}
        </div>

        <div className="flex justify-end p-4 bg-[#fff]">
          <Button
            onClick={closeDialog}
            className="bg-[#1c3141] text-white px-6"
          >
            Minimize
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComprehensivePara;
