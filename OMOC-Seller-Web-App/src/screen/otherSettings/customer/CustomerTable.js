import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { strings } from "../../../utils/strings";

const tableData = [
  {
    id: 1,
    ProductName: "Black Hoodie RazorSI",
    Frequency: "Monthly ",
    NextBillingDate: "30/05/2023",
    Price: "$120",
    Status: "Inactive",
    CustomerName: "James Cordoba",
  },
  {
    id: 2,
    ProductName: "Black Hoodie RazorSI",
    Frequency: "Weekly ",
    NextBillingDate: "30/05/2023",
    Price: "$120",
    Status: "Inactive",
    CustomerName: "James Cordoba",
  },
  {
    id: 3,
    ProductName: "Black Hoodie RazorSI",
    Frequency: "Monthly ",
    NextBillingDate: "30/05/2023",
    Price: "$120",
    Status: "Active",
    CustomerName: "James Cordoba",
  },
  {
    id: 4,
    ProductName: "Black Hoodie RazorSI",
    Frequency: "Monthly ",
    NextBillingDate: "30/05/2023",
    Price: "$120",
    Status: "Active",
    CustomerName: "James Cordoba",
  },
];
const Manage = ({ handleDetails }) => {
  return (
    <section className=" w-full flex justify-end items-end absolute top-[70px] right-8 ">
      <div className="bg-white w-48  rounded-2xl px-2 z-10	  ">
        <div
          className="hover:bg-[#E8F5FF] hover:text-[#0094FF] w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 cursor-pointer"
          onClick={handleDetails}
        >
          <p className="text-sm ">{strings.VIEW}</p>
        </div>
        <div className="hover:bg-[#E8F5FF] hover:text-[#0094FF] w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 cursor-pointer">
          <p className="text-sm">{strings.EDIT_SUBSCRIPTION}</p>
        </div>
        <div className="hover:bg-[#E8F5FF] hover:text-[#0094FF] w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 cursor-pointer">
          <p className="text-sm">{strings.DELETE_SUBSCRIPTION}</p>
        </div>
      </div>
    </section>
  );
};

const CustomerTable = ({ handleDetails, certain }) => {
  const [showManage, setShowManage] = useState(false);
  const [manage, setManage] = useState(null);

  return (
    <div>
      <table className="w-[860px] mt-5">
        <tr className="h-14 mt-5 rounded-lg">
          <th className="	bg-white rounded-l-lg">ID</th>
          {certain && <th className="bg-white">Customer Name</th>}
          <th className="bg-white">Product Name</th>
          <th className="bg-white">Frequency</th>
          <th className="bg-white">Next Billing Date</th>
          <th className="bg-white">Price</th>
          <th className="bg-white">Status</th>
          <th className="bg-white rounded-r-lg"></th>
        </tr>
        {tableData.map((val, index) => {
          return (
            <tr className="border-b-2 h-20 relative">
              <td>
                <p className="text-center text-sm text-[#242424]">{val.id}</p>
              </td>
              {certain && (
                <td>
                  <p className="text-center text-sm text-[#242424]">
                    {val.CustomerName}
                  </p>
                </td>
              )}
              <td>
                <p className="text-center text-sm text-[#242424]">
                  {val.ProductName}
                </p>
              </td>
              <td>
                <p className="text-center text-sm text-[#242424]">
                  {val.Frequency}
                </p>
              </td>
              <td>
                <p className="text-center text-sm text-[#242424]">
                  {val.NextBillingDate}
                </p>
              </td>
              <td>
                <p className="text-center text-sm text-[#242424]">
                  {val.Price}
                </p>
              </td>
              <td>
                <div
                  className={`${
                    val.Status === "Inactive"
                      ? "bg-[#C800001A]  text-[#C80000]"
                      : "bg-[#22C55E1A] text-[#22C55E]"
                  } w-16 h-7 rounded-[22px] flex justify-center items-center mx-auto`}
                >
                  <p className="text-center text-xs font-medium ">
                    {val.Status}
                  </p>
                </div>
              </td>
              <td className="relative">
                <div
                  className="bg-white h-12 w-28 mx-auto flex justify-around items-center rounded-2xl cursor-pointer"
                  onClick={() => {
                    setShowManage(!showManage);
                    setManage(val.id);
                  }}
                >
                  <p className="text-center text-sm">Manage</p>
                  <Icon icon="ep:arrow-up-bold" rotate={2} />
                </div>
              </td>
              {showManage && manage === val.id && (
                <Manage handleDetails={handleDetails} />
              )}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default CustomerTable;
