import React from "react";

function Logo({ className, inline = false, mobile = false }) {
  return (
    <div
      className={`font-bold text-xl flex items-center justify-center w-full ${className} text-[#FFFFFF] `}
    >
     {/* Logo img to be inserted here */}
      <div
        className={`flex ${inline ? "flex-row" : " flex-col"} ${
          mobile && "hidden md:block"
        }`}
      >
        <div className=" text-2xl">Streamify</div>
      </div>
    </div>
  );
}

export default Logo;