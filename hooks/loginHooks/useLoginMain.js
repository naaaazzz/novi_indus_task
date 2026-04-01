"use client";
import { createProfile, sentOtp, verifyOtp } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    try {
      setLoading(true);

      if (step === "phone") {
        if (phone.length !== 10) {
          toast.error("Enter valid mobile number");
          return;
        }

        const res = await sentOtp(`+91${phone}`);

        if (res.success) {
          toast.success("OTP sent");
          setStep("otp");
        } else {
          toast.error(res.message);
        }
      } else if (step === "otp") {
        if (otp.length !== 6) {
          toast.error("Enter valid OTP");
          return;
        }

        const res = await verifyOtp(`+91${phone}`, otp);

        if (res.success) {
          toast.success("OTP verified");

          if (res.login) {
            sessionStorage.setItem("token", res.access_token);
            router.push("/dashboard");
          } else {
            setStep("profile");
          }
        } else {
          toast.error(res.message);
        }
      } else {
        if (!name || !qualification || !file) {
          toast.error("Fill required fields");
          return;
        }

        const res = await createProfile({
          mobile: `+91${phone}`,
          name,
          email,
          qualification,
          profile_image: file,
        });

        if (res.success) {
          toast.success("Profile created");
          sessionStorage.setItem("token", res.access_token);
          router.push("/dashboard");
        } else {
          toast.error(res.message);
        }
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    phone,
    setPhone,
    otp,
    setOtp,
    profileImage,
    setProfileImage,
    setFile,
    name,
    setName,
    email,
    setEmail,
    qualification,
    setQualification,
    loading,
    error,
    handleContinue,
    router
  };
};
