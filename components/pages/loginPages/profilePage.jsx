import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";

const LoginProfile = ({
  step,
  profileImage,
  setProfileImage,
  setFile,
  name,
  setName,
  email,
  setEmail,
  qualification,
  setQualification,
}) => {
  return (
    <div
      className={`absolute w-full transition-all duration-500 ${
        step === "profile"
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="space-y-4 sm:space-y-5">
        <div>
          <h1 className="text-[22px] font-semibold text-[#243746] sm:text-[24px]">
            Add Your Details
          </h1>
        </div>

        <div className="flex justify-center">
          <Label className="cursor-pointer">
            <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-400 transition hover:border-gray-400 sm:h-[140px] sm:w-[140px]">
              {profileImage ? (
                <Image
                  src={profileImage}
                  width={24}
                  height={24}
                  alt="Profile preview"
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                <>
                  <Image
                    src="/icons/camera.png"
                    alt="upload"
                    width={24}
                    height={24}
                  />
                  <p className="mt-2 text-center text-[9px]">
                    Add Your Profile picture
                  </p>
                </>
              )}
            </div>

            <Input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProfileImage(URL.createObjectURL(file));
                  setFile(file);
                }
              }}
            />
          </Label>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
              Name *
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Full Name"
              className="h-[56px] rounded-xl border border-gray-300 px-4 text-sm sm:h-[60px] sm:text-[16px]"
            />
          </div>

          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
              Email
            </Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email Address"
              className="h-[56px] rounded-xl border border-gray-300 px-4 text-sm sm:h-[60px] sm:text-[16px]"
            />
          </div>

          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
              Your qualification *
            </Label>
            <Input
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              placeholder="Enter your qualification"
              className="h-[56px] rounded-xl border border-gray-300 px-4 text-sm sm:h-[60px] sm:text-[16px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginProfile;
