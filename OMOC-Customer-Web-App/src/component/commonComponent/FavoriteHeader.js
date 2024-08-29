import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { strings } from "../../utils/strings";

const data = [
  { tagName: "Trending", path: "/Trending" },
  { tagName: "Videos", path: "" },
  { tagName: "Post", path: "" },
  { tagName: "Users", path: "" },
  { tagName: "Product", path: "/Product" },
  { tagName: "Hastags", path: "" },
  { tagName: "Returns", path: "" },
];
const FavoriteHeader = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-wrap items-center    gap-5 justify-center mt-5">
        {data.map((val) => {
          return (
            <div>
              <NavLink
                to={val.path}
                className={`flex items-center justify-between w-full cursor-pointer text-[#242424] ${
                  window.location.pathname === val.path
                    ? "text-[#3D9FFB] border-b-2 border-[#3D9FFB]"
                    : "text-[#AEAEAE]"
                }`}
                style={{ textDecoration: "none" }}
              >
                <p className="text-lg font-medium">{val.tagName}</p>
              </NavLink>
            </div>
          );
        })}
        <div
          className="bg-white rounded-[14px] py-[12px] px-[24px]"
          onClick={() => {
            navigate("/Filters");
          }}
        >
          <p>{strings.FILTERS}</p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteHeader;
