import React from "react";
import { useNavigate } from "react-router-dom";

const CustomButton = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="w-full bg-[#0094FF] h-12 rounded-3xl "
        onClick={() => {
          // navigate(`${props.isLogin ? "/Home" : props.isSignup ? "#" : "#"}`);
          props.isSignup ? props.handleSignup() : props.handleLogin();
        }}
      >
        <p className="text-[#FFFFFF] text-base">{props.title}</p>
      </button>
    </div>
  );
};

export default CustomButton;
