import React from "react";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const SearchHistory = ({ data, searchQuery }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute bg-white mt-3 w-[58%] z-10 rounded-lg mx-auto">
      <div className="p-3">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">{strings.LAST_SEARCHED}</p>
          <p className="text-[#0094FF]">{strings.SEE_ALL}</p>
        </div>
        {data?.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between my-2 border-b-[1px] pb-3"
            onClick={() => {
              navigate("/Trending");
            }}
          >
            <div className="flex items-center gap-2">
              <Icon color="#757575" icon="bi:clock" rotate={2} />
              <p>{item.name}</p>
            </div>
            <Icon icon="radix-icons:cross-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
