"use client";

import Image from "next/image";
import React, { useState } from "react";
import nexLearnImage from "@/public/NexLearn.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LoginProfile from "./profilePage";
import OtpLogin from "./loginOtp";
import { createProfile, sentOtp, verifyOtp } from "@/lib/api";
import { toast } from "sonner";

const LoginMain = () => {
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

  return (
    <div
      className="flex min-h-screen items-center justify-center overflow-y-auto bg-cover bg-center bg-no-repeat px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
      style={{ backgroundImage: "url('/background_final.png')" }}
    >
      <div className="mx-auto flex w-full max-w-[1120px] flex-col overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#1c3142_0%,#243f52_35%,#2b4860_70%,#2b4b63_100%)] p-2 sm:p-3 lg:flex-row">
        <div className="flex items-center justify-center rounded-xl px-4 py-6 sm:px-6 sm:py-8 lg:flex-1 lg:px-8 lg:py-10">
          <Image
            src={nexLearnImage}
            width={462}
            height={501}
            alt="NextLearn"
            className="h-auto w-full max-w-[220px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[420px]"
            priority
          />
        </div>

        <div className="m-0 flex w-full flex-col justify-between rounded-xl bg-white p-4 sm:p-6 lg:m-1 lg:w-[400px] lg:min-w-[400px] lg:p-5">
          <div className="relative min-h-[470px] sm:min-h-[490px] lg:min-h-[470px]">
            <div
              className={`absolute w-full transition-all duration-500 ${
                step === "phone"
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <h1 className="text-[22px] font-semibold text-[#243746] sm:text-[24px]">
                    Enter your phone number
                  </h1>
                  <p className="mt-2 text-sm text-[#4b5d6b] sm:text-[16px]">
                    We use your mobile number to identify your account
                  </p>
                </div>

                <div className="relative mt-4">
                  <Label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
                    Phone number
                  </Label>

                  <div className="flex min-h-[56px] items-center rounded-xl border border-gray-300 px-4 py-3 text-lg sm:min-h-[60px] sm:py-3.5">
                    <Image
                      src="/india.png"
                      alt="India"
                      width={20}
                      height={14}
                      className="mr-2 rounded-sm"
                    />
                    <span className="text-[16px] text-gray-500">+91</span>

                    <Input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setPhone(val);
                      }}
                      placeholder="1234 567891"
                      className={`flex-1 border-0 bg-transparent text-sm text-gray-500 shadow-none ring-0 sm:text-[16px] ${
                        error ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 sm:text-[11.8px]">
                  By tapping Get started, you agree to the{" "}
                  <span className="font-medium text-[#243746]">
                    Terms & Conditions
                  </span>
                </p>
              </div>
            </div>

            <OtpLogin step={step} phone={phone} otp={otp} setOtp={setOtp} />

            <LoginProfile
              step={step}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              setFile={setFile}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              qualification={qualification}
              setQualification={setQualification}
            />
          </div>

          <Button
            size="xl"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#1c3141] py-3 text-base font-medium text-white hover:bg-[#1c3141] sm:mt-8 sm:text-lg"
            onClick={handleContinue}
          >
            {loading
              ? "Please wait..."
              : step === "phone"
                ? "Get Started"
                : step === "otp"
                  ? "Verify Code"
                  : "Get Started"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
