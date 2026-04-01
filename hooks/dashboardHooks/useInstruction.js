"use client";
import { getQuestions } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useInstruction = () => {
  const router = useRouter();
  const [question, setQuestion] = useState([]);

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

  return {
    question,
    router,
  };
};
