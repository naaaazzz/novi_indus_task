"use client";
import { logoutUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useNavbar = () => {
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

  return {
    open,
    setOpen,
    loading,
    handleLogout,
  };
};
