import { Icon } from "@iconify/react/dist/iconify.js";
import React, { FC, useState } from "react";

const CustomInputBox = ({
  placeholder,
  isEmail,
  isPassword,
  userEmail,
  setUserEmail,
  userPassword,
  setUserPassword,
  setErrorHandle,
}) => {
  const [hide, setHide] = useState(false);
  return (
    <div className="flex items-center relative">
      <input
        className="w-full h-14 bg-[#F5F5F5] px-4 rounded-3xl text-sm font-normal"
        placeholder={placeholder}
        type={isEmail ? "email" : isPassword && hide ? "password" : "text"}
        value={isEmail ? userEmail : isPassword ? userPassword : ""}
        onChange={(e) => {
          if (isEmail) {
            setUserEmail(e.target.value);
            setErrorHandle("");
          } else {
            setUserPassword(e.target.value);
            setErrorHandle("");
          }
        }}
      />
      {!isEmail && (
        <Icon
          className="absolute right-5"
          icon={hide ? "mdi-light:eye-off" : "lets-icons:eye-light"}
          onClick={() => {
            setHide(!hide, isEmail);
          }}
        />
      )}
    </div>
  );
};

export default CustomInputBox;
