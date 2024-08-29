import React from "react";
import { twMerge } from "tailwind-merge";

// only give style for xl
export default function BlueBorderButton({ text = "Click Me", className }) {
  return (
    <div>
      <button
        className={twMerge(
          "rounded-full text-[#0094FF] text-sm border border-[#0094FF] font-semibold xl:py-2 xl:px-4 hover:text-white hover:bg-[#0094FF] md:px-4 md:py-2 px-2 py-1",
          className
        )}
      >
        {text}
      </button>
    </div>
  );
}
