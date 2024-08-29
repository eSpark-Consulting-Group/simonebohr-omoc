import React from "react";
import { twMerge } from "tailwind-merge";

export default function Modal({
  children,
  showModal,
  setshowModal,
  modalstyle,
  overlayStyle,
}) {
  const preventpropogation = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {showModal && (
        <div
          onClick={() => setshowModal(false)}
          className={twMerge(
            "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
            overlayStyle
          )}
        >
          <div onClick={preventpropogation} className={twMerge("", modalstyle)}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
