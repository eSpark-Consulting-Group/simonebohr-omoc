import React from "react";
import google_icon from "../assets/icon/google_icon.svg";

function LoginGoogleButton({ title, clickBtn }) {
  return (
    <div onClick={clickBtn}>
      <button className="w-full border rounded-2xl py-6 px-4 flex justify-center items-center">
        <img src={google_icon} className="h-6 w-6 mr-2" />
        <p className="text-base font-medium"> {title}</p>
      </button>
    </div>
  );
}

export default LoginGoogleButton;
