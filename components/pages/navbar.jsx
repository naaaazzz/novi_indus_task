"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api"; // adjust path

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await logoutUser();

      // Remove token/session
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      // Redirect to login
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[90px] border-b shadow-sm flex items-center bg-white z-50 px-4">
        {/* Logo */}
        <div className="flex items-center md:absolute md:left-1/2 md:-translate-x-1/2">
          <Image
            src="/NexLearn_logo.png"
            alt="NexLearn"
            width={160}
            height={50}
            className="rounded-sm w-[120px] sm:w-[140px] md:w-[180px] h-auto"
            priority
          />
        </div>

        {/* Spacer */}
        <div className="flex-1 md:hidden" />

        {/* Logout Button */}
        <Button
          onClick={() => setOpen(true)}
          className="h-[38px] sm:h-[42px] md:h-[45px] px-3 sm:px-4 text-[12px] sm:text-[13px] md:text-[14px] font-medium bg-[#177a9c] hover:bg-[#177a9c]/90 ml-auto"
        >
          Logout
        </Button>
      </div>

      {/* ALERT DIALOG */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-[320px] sm:max-w-[380px] rounded-2xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-[18px] font-semibold">
              Are you sure?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <p className="text-center text-sm text-gray-500 mt-2">
            You will be logged out of your account.
          </p>

          {/* BUTTONS */}
          <AlertDialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
            <AlertDialogCancel className=" h-[42px] rounded-md">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleLogout}
              disabled={loading}
              className=" h-[42px] bg-[#177a9c] hover:bg-[#177a9c]/90 text-white rounded-md"
            >
              {loading ? "Logging out..." : "Yes, Logout"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Navbar;
