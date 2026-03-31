"use client";

import React, { useState } from "react";
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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import AlertContentPage from "./alertContent";

const Questions = () => {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const questions = Array.from({ length: 100 }, (_, i) => i + 1);

  const options = [
    "A. Pataliputra",
    "B. Harappa",
    "C. Mohenjo-Daro",
    "D. Lothal",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 bg-[#f3f6f9] min-h-screen">
      {/* LEFT SIDE */}
      <div className="flex-1 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm md:text-base font-semibold">
            Ancient Indian History MCQ
          </h2>
          <span className="text-xs bg-gray-200 px-3 py-1 rounded">01/100</span>
        </div>

        {/* Question Card */}
        <Card className="w-full rounded-lg shadow-sm py-0">
          <CardContent className="p-4 space-y-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger
                onClick={() => setOpen(true)}
                className="bg-[#1c3141] text-white h-[44px] px-4 rounded-md text-sm"
              >
                📘 Read Comprehensive Paragraph
              </DialogTrigger>

              <DialogContent
                showCloseButton={false} // ❌ remove default X
                className="max-w-[95vw] md:max-w-[900px] p-0"
              >
                <DialogTitle className="hidden">
                  Comprehensive Paragraph
                </DialogTitle>

                <ComprehensivePara closeDialog={() => setOpen(false)} />
              </DialogContent>
            </Dialog>

            <p className="text-sm max-w-[900px]">
              Identify the site shown in the image below, which is one of the
              major urban centers of the Indus Valley Civilization.
            </p>

            <div className="w-full max-w-[300px] h-[160px] relative">
              <Image
                src="/indus.jpg"
                alt="question"
                fill
                className="object-cover rounded-md"
              />
            </div>
          </CardContent>
        </Card>

        {/* Answer Heading */}
        <div className="mt-6 ">
          <p className="text-sm font-medium">Choose the answer:</p>
        </div>

        {/* ✅ OPTIONS (SHADCN RADIO) */}
        <RadioGroup
          value={selected}
          onValueChange={(val) => setSelected(val)}
          className="flex flex-col gap-3 mt-4"
        >
          {options.map((opt, i) => (
            <label
              key={i}
              className={`flex items-center justify-between px-4 h-[48px] rounded-md border cursor-pointer transition
              ${
                selected === opt
                  ? "border-[#1c3141] bg-[#e6eef5]"
                  : "border-gray-300 bg-white"
              }`}
            >
              {/* Text */}
              <span className="text-sm">{opt}</span>

              {/* Radio Button RIGHT SIDE */}
              <RadioGroupItem value={opt} />
            </label>
          ))}
        </RadioGroup>

        {/* Bottom Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button className="w-full sm:flex-1 h-[46px] bg-purple-700 hover:bg-purple-800">
            Mark for review
          </Button>

          <Button className="w-full sm:flex-1 h-[46px] bg-gray-300 text-black hover:bg-gray-400">
            Previous
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full sm:flex-1 h-[46px] bg-[#1c3141] hover:bg-[#162733]">
                Next
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[381px]">
              <AlertDialogHeader className="flex flex-col items-center justify-between ">
                <div className="flex items-center justify-between w-full">
                  <AlertDialogTitle className="text-[14px]">
                    Are you sure you want to submit the test?
                  </AlertDialogTitle>
                  <AlertDialogCancel>
                    <X />
                  </AlertDialogCancel>
                </div>

                {/* Body */}
                <AlertContentPage />
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button className="w-full h-[45px] bg-[#1c3141] hover:bg-[#162733] text-white rounded-md">
                  Submit Test
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[320px] xl:w-[400px]">
        <Card className="p-4 rounded-lg">
          {/* Top */}
          <div className="flex justify-between  text-sm">
            <span>Question No. Sheet:</span>
            <span className="bg-[#1c3141] text-white px-2 py-1 rounded text-xs">
              ⏱ 87:13
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-10 lg:grid-cols-8 gap-1 sm:gap-2">
            {questions.map((num) => (
              <div
                key={num}
                className={`w-full aspect-square flex items-center justify-center rounded-md border text-[10px] sm:text-xs md:text-sm cursor-pointer
                ${
                  num === 1
                    ? "bg-green-500 text-white"
                    : num === 2
                      ? "bg-red-500 text-white"
                      : num === 6
                        ? "bg-purple-700 text-white"
                        : num === 7
                          ? "bg-green-500 text-white"
                          : "bg-gray-100"
                }`}
              >
                {num}
              </div>
            ))}
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
              <span className="w-3 h-3 bg-gray-400 rounded"></span> Not Visited
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Questions;
