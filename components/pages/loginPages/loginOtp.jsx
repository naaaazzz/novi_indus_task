import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const OtpLogin = ({ step, phone, otp, setOtp }) => {
  return (
    <div
      className={`w-full transition-all duration-500 ${
        step === "otp"
          ? "relative translate-x-0 opacity-100 sm:absolute sm:inset-0"
          : "hidden translate-x-full opacity-0 pointer-events-none sm:absolute sm:inset-0 sm:block"
      }`}
    >
      <div className="space-y-4 sm:space-y-5">
        <div>
          <h1 className="text-[22px] font-semibold text-[#243746] sm:text-[24px]">
            Enter the code we texted you
          </h1>
          <p className="mt-2 text-sm text-[#4b5d6b] sm:text-[16px]">
            We&apos;ve sent an SMS to +91 {phone}
          </p>
        </div>

        <div className="relative mt-4">
          <Label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
            SMS code
          </Label>

          <Input
            type="tel"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            maxLength={6}
            placeholder="123 456"
            className="h-[56px] rounded-xl border border-gray-300 px-4 text-base tracking-[0.22em] sm:h-[60px] sm:text-lg sm:tracking-[5px]"
          />
        </div>

        <p className="text-[12px] text-gray-500 sm:text-[13px]">
          Your 6 digit code is on its way. This can sometimes take a few moments
          to arrive.
        </p>

        <Button className="h-auto justify-start bg-transparent px-0 py-0 text-sm font-medium text-[#243746] underline hover:bg-transparent">
          Resend code
        </Button>
      </div>
    </div>
  );
};

export default OtpLogin;
