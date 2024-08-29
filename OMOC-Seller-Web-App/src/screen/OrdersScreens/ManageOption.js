import React from "react";
import "./OrdersScreen.css";
import { strings } from "../../utils/strings";
import { useNavigate } from "react-router-dom";
const ManageOption = () => {
  const naviagte = useNavigate();
  return (
    <section className=" flex justify-end items-end absolute top-16 right-10 ">
      <div className="bg-white w-48 h-64 rounded-2xl px-2">
        <div className="hover:bg-[#E8F5FF] hover:text-[#0094FF] w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3">
          <p className="text-sm ">{strings.EDIT_INVOICE}</p>
        </div>
        <div className="hover:bg-[#E8F5FF] hover:text-[#0094FF] w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3">
          <p className="text-sm">{strings.VIEW_INVOICE}</p>
        </div>
        <div className="hover:bg-[#E8F5FF] hover:text-[#0094FF] w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3">
          <p className="text-sm">{strings.SEND_REMINDER}</p>
        </div>
        <div
          className="hover:bg-[#E8F5FF] hover:text-[#0094FF] w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 cursor-pointer"
          onClick={() => {
            naviagte("/Shipping");
          }}
        >
          <p className="text-sm">{strings.PRINT_INVOICE}</p>
        </div>
        <div className="hover:bg-[#E8F5FF] hover:text-[#0094FF] w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3">
          <p className="text-sm text-[#C80000]">{strings.DELETE_INVOICE}</p>
        </div>
      </div>
    </section>
  );
};

export default ManageOption;
