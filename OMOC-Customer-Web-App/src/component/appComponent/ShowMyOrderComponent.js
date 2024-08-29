import React from "react";
import omocLogo from "../../assets/icon/omoc_black_logo.svg";
import { strings } from "../../utils/strings";
import { Icon } from "@mui/material";
import hoodie from "../../assets/images/hoodie.png";
import { useNavigate } from "react-router-dom";

const ShowMyOrderComponent = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl p-3">
      <div className="flex justify-between items-center border-b-[1px] border-[#EDEDED] pb-3">
        <div className="flex items-center gap-2">
          <img src={omocLogo} />
          <p>{item.shopName}</p>
          <Icon icon="simple-line-icons:arrow-down" />
        </div>
        <p
          className={` text-[10px] ${
            item.status === "Returned"
              ? "bg-[#C800001A] text-[#C80000]"
              : "bg-[#22C55E1A] text-[##22C55E]"
          } p-2 rounded-[31px]`}
        >
          {item.status}
        </p>
      </div>
      <div className="bg-[#F5F5F5] rounded-lg mt-3">
        <div className="flex gap-4 p-3 ">
          <Icon icon="mdi:truck-fast-outline" />
          <div>
            <p className="text-sm font-medium">{item.returnDate}</p>
            <p className="text-xs	text-[#616161] mt-2">
              Your package was returned to seller!
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-3 mt-3 border-b-[1px] border-[#EDEDED] pb-3">
          <div>
            <img
              width={77}
              height={77}
              src={hoodie}
              className="rounded-[8px]"
            />
          </div>
          <div>
            <p>{strings.HOODIE_HAVANA}</p>
            <div className="flex items-center gap-1">
              <div className="bg-[#F5F5F5]  items-center flex p-2 rounded-[30px] mt-1">
                <p className="text-sm	">Cream, Large</p>
              </div>
              <p>x1</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`flex justify-between mt-4 items-center  `}>
        <p
          className={` text-sm font-medium ${
            item.status !== "Returned" ? "text-[#000]" : "text-[#C80000]]"
          }`}
        >
          Refund Issued:
          <span className="text-[#0094FF] text-base"> $1799 </span>
        </p>
        <button
          className={`bg-[#0094FF] px-3 py-2 rounded-3xl ${
            item.status !== "Returned" ? "hidden" : ""
          }`}
          onClick={() => {
            navigate("My-Order-Details");
          }}
        >
          <p className="text-white text-[10px]">{strings.VIEW_DETAIL}</p>
        </button>
      </div>
    </div>
  );
};

export default ShowMyOrderComponent;
