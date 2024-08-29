import React from "react";
import { strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const MarketsTable = () => {
  return (
    <div className="overflow-auto">
      <div className="w-max">
        <table className="w-[860px]">
          <tr className="w-full">
            <th className="flex items-center gap-3 bg-white  p-4 rounded-l-xl">
              {strings.RANK}{" "}
              <Icon icon="fluent:ios-arrow-24-filled" rotate={3} />
            </th>
            <th className="bg-white p-4 text-left">{strings.PRODUCT_NAME}</th>
            <th className="flex items-center gap-3 bg-white  p-4">
              {strings.PRICE}{" "}
              <Icon icon="fluent:ios-arrow-24-filled" rotate={3} />
            </th>
            <th className="bg-white p-4 rounded-r-xl">{strings.COUNTRY}</th>
          </tr>
          {arr.map(() => {
            return (
              <tr className="border-b-2">
                <td className="ml-5">
                  <p className="ml-10 py-5 font-medium">1</p>
                </td>
                <td>
                  <p className=" py-5 font-medium">Gundam HG Barbatos</p>
                </td>
                <td className="ml-5">
                  <p className="ml-5 text-sm  py-5">$220</p>
                </td>
                <td className="ml-5">
                  <p className="text-center text-sm  py-5">United State</p>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default MarketsTable;
