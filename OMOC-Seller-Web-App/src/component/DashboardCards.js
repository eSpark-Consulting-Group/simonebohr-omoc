import React from "react";
import { strings } from "../utils/strings";
import { Icon } from "@iconify/react";

const DashboardCards = ({ data }) => {
  return (
    <div className="w-[17em] bg-[#fff] px-4 rounded-xl py-4 !pb-3">
      <p className="mb-5">{data.text}</p>
      <h1 className="text-6xl">{data.number}</h1>
      <button className="flex justify-end w-full text-[#0094FF] font-medium text-sm gap-2 mt-2">
        {strings.SEE_DETAILS}
        <Icon
          icon="iconamoon:arrow-right-2"
          color="#0094ff"
          width="24"
          height="24"
        />
      </button>
    </div>
  );
};

export default DashboardCards;
