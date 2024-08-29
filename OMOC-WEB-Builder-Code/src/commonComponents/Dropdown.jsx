import { Icon } from "@iconify/react";
import React, { useState } from "react";
import arrowup from "../assets/icons/rightsidebar/arrow-up.svg";

export default function Dropdown({
  width = "w-[248px]",
  height = "auto",
  children,
  dropdownName = "Title",
  className,
  titleStyle = "text-sm font-medium",
}) {
  const [showMenu, setshowMenu] = useState("");

  const toggleHandler = (string) => {
    if (showMenu === "") {
      setshowMenu(string);
    } else if (showMenu === string) {
      setshowMenu("");
    } else {
      setshowMenu(string);
    }
  };
  return (
    <>
      <div
        className={`${width} ${height}] bg-white  text-center  ${className}`}
      >
        <div
          onClick={() => toggleHandler(`${dropdownName}`)}
          className="gap-[10px] flex justify-between items-center  h-8 "
        >
          <div className={` ${titleStyle}`}>{dropdownName}</div>
          <div>
            <img src={arrowup} alt="" />
          </div>
        </div>

        <div
          className={` ${
            showMenu === dropdownName ? "mt-3 h-auto" : "p-0 h-0"
          }  overflow-hidden flex flex-col gap-3`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
