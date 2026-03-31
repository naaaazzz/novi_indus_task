"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { getQuestions } from "@/lib/api";
import { toast } from "sonner";

const McqInstructions = () => {
  const router = useRouter();
  const [question, setQuestion] = useState([]);
  console.log("quest", question);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQuestions();
        if (res.success) {
          setQuestion(res);
        }
      } catch (error) {
        console.error("failed to fetch data, Please try again!", error);
        toast.error("Server Down Please try again");
      }
    };
    fetchData();
  }, []);

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
              <p className="text-[42px] leading-none mt-1">
                {question.questions_count}
              </p>
            </div>

            <Separator
              orientation="vertical"
              className="h-full w-[2px] bg-white/40"
            />

            {/* Marks */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-[15px] opacity-80 font-medium">Total marks</p>
              <p className="text-[42px] leading-none mt-1">
                {question.total_marks}
              </p>
            </div>

            <Separator
              orientation="vertical"
              className="h-full w-[2px] bg-white/40"
            />

            {/* Time */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-[15px] opacity-80 font-medium">Total time</p>
              <p className="text-[42px] leading-none mt-1">
                {question.total_time}:00
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="mt-6 w-full">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 text-center">
            Instructions
          </h2>

          {/* ✅ Clean ShadCN-style list */}
          {question?.instruction ? (
            <div
              className="text-[15px] text-gray-600 max-w-xl mx-auto leading-relaxed [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: question.instruction }}
            />
          ) : (
            <p className="text-center text-gray-500">Loading instructions...</p>
          )}

          {/* Button */}
          <div className="flex justify-center mt-6 mb-3">
            <Button
              onClick={() => {
                sessionStorage.setItem("examData", JSON.stringify(question));
                router.push("/dashboard/questions");
              }}
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
