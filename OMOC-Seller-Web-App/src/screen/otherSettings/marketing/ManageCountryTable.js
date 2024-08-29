import React, { useState } from "react";
import { strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";

const Manage = () => {
  return (
    <div className="rounded-2xl flex justify-end items-end absolute top-12 right-0 bg-white shadow-lg p-2 my-3">
      <div className="bg-white  rounded-2xl z-10">
        <div className=" w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer">
          <p className="text-sm">{strings.ACTIVE}</p>
        </div>
        <div className="w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer">
          <p className="text-sm">{strings.DELETE_COUNTRY}</p>
        </div>
      </div>
    </div>
  );
};
const arr = [
  { id: 1, country: "United State", status: "Active" },
  { id: 2, country: "United State", status: "Deactive" },
  { id: 3, country: "United State", status: "Active" },
];
const ManageCountryTable = () => {
  const [showMange, setShowMange] = useState(false);
  const [openModalIndex, setOpenModalIndex] = useState(null);

  return (
    <div>
      <table className="w-full">
        <tr className="w-full">
          <th className="flex items-center gap-3 bg-white  p-4 rounded-l-xl">
            {strings.COUNTRY}{" "}
            <Icon icon="fluent:ios-arrow-24-filled" rotate={3} />
          </th>
          <th className="bg-white p-4 text-left ">
            <div className="flex items-center gap-5">
              {strings.STATUS}
              <Icon icon="fluent:ios-arrow-24-filled" rotate={3} />
            </div>
          </th>
          <th className="bg-white p-4 rounded-r-xl"></th>
        </tr>
        {arr.map((val, index) => {
          return (
            <tr className="border-b-2">
              <td className="">
                <p className="  ml-5 text-sm  py-5">{val.country}</p>
              </td>
              <td className="">
                <p className="ml-8 text-sm  py-5">{val.status}</p>
              </td>
              <td style={{ position: "relative" }}>
                <Icon
                  icon="bi:three-dots-vertical"
                  color="black"
                  width="24"
                  height="24"
                  style={{ float: "right" }}
                  onClick={() => {
                    setShowMange(!showMange);
                    setOpenModalIndex(val.id);
                  }}
                />
                {showMange && openModalIndex === val.id && <Manage />}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ManageCountryTable;
