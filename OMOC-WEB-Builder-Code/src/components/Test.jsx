import React, { useState } from "react";
import RoundedDropdown from "../commonComponents/RoundedDropdown";
import Pagination from "../commonComponents/Pagination";
import Dropdown from "../commonComponents/Dropdown";
import { Icon } from "@iconify/react/dist/iconify.js";
import SimpleDropdown from "../commonComponents/SimpleDropdown";
import Size from "../commonComponents/sidebarComponents/Size";

export default function () {
  

  return (
    <>
      {/* <Pagination/> */}
      <div className="p-4 bg-white w-[280px]">
       <Size/>
      </div>
    </>
  );
}
