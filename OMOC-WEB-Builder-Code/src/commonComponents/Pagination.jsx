import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Pagination() {
  const [pages, setPages] = useState([1, 2, 3, 4, 5, , "...", 8, 9, 10]);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="">
      <div className="w-[373px] h-[44px]   xl:flex justify-between items-center hidden ">
        <div className="font-medium text-xs ">
          Showing {currentPage} of {pages.length}
        </div>
        <div className="flex items-center  h-[44px] rounded-[12px] p-2 gap-3  bg-[#F8F8F8]">
          <div
              onClick={() => {
                if(currentPage >1)
                setCurrentPage((pre) => pre - 1);
              }}
            className="size-6 ctr cursor-pointer"
          >
            <Icon
              icon="fluent:ios-arrow-left-24-filled"
              width="16px"
              height="16px"
              color="#AEAEAE"
            />
          </div>
          {pages.map((item, index) => (
            <div
              className={`ctr  text-sm text-textcolor ${
                currentPage === item
                  ? "bg-blue text-white w-[17px] h-[28px]"
                  : " w-[8px] h-[20px]"
              } rounded-[12px] cursor-pointer`}
              key={index}
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </div>
          ))}
          <div className="size-6 ctr cursor-pointer">
            <Icon
              onClick={() => {
                if(currentPage < pages.length)
                setCurrentPage((pre) => pre + 1);
              }}
              icon="fluent:ios-arrow-right-24-filled"
              width="16px"
              height="16px"
              color="#AEAEAE"
            />
          </div>
        </div>
      </div>

      {/* On mobile version */}
      <div className="flex items-center justify-between text-sm text-gray-600 font-medium xl:hidden">
        <a
          
          className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
        >
          Previous
        </a>
        <div className="font-medium">
          Page {currentPage} of {pages.length}
        </div>
        <a
          
          className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
    </div>
  );
}
