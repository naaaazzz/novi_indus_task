import Image from "next/image";
import React from "react";
import nexLearnImage from "@/public/NexLearn.png";

const LoginMain = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background_final.png')" }}
    >
      <div className="bg-[linear-gradient(180deg,#1c3142_0%,#243f52_35%,#2b4860_70%,#2b4b63_100%)] flex">
        <Image
          src={nexLearnImage}
          width={462}
          height={501}
          alt="NextLearn Image"
        />
        <div className="bg-background">
          <h3>Enter your Phone Number</h3>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
