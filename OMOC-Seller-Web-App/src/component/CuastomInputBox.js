import React, { FC } from "react";

const CuastomInputBox = ({
  placeholder,
  isEmail,
  isPassword,
  userEmail,
  setUserEmail,
  userPassword,
  setUserPassword,
  setErrorHandle,
}) => {
  return (
    <div className="">
      <input
        className="w-full h-14 bg-[#F5F5F5] px-4 rounded-3xl text-sm font-normal"
        placeholder={placeholder}
        // type={isEmail ? "email" : "password"}
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
    </div>
  );
};

export default CuastomInputBox;
