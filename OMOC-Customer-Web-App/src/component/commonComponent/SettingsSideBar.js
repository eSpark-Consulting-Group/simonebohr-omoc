import { Icon } from "@iconify/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { strings } from "../../utils/strings";

const data = [
  { title: "Personal Information", path: "/Setting/Personal-Information" },
  { title: "Payment Method", path: "/Setting/Payment-Method" },
  { title: "Your Interest", path: "/Setting/Your-Interest" },
  { title: "Your Ratings", path: "/Setting/Your-Ratings" },
  { title: "Your Newsletter", path: "/Setting/Your-News-Letter" },
  {
    title: "Manage Delivery Address",
    path: "/Setting/Manage-Delivery-Address",
  },
  { title: "Manage Your Account", path: "/Setting/Manage-Your-Account" },
];
const generalData = [
  { title: "Notification Settings", path: "/Setting/Notification-Setting" },
  { title: "Languages & Country", path: "/Setting/Language-Country" },
  { title: "Social Settings", path: "/Setting/Social-Settings" },
  { title: "Customer Support", path: "/Setting/Customer-Support" },
  { title: "Privacy & Security", path: "/Setting/Privacy-Policy" },
];

const SettingsSideBar = () => {
  return (
    <div className="bg-white rounded-xl settingClass">
      <div>
        {data.map((val) => {
          return (
            <div className="flex items-center justify-between p-3 border-b-[1px] cursor-pointer">
              <NavLink
                to={val.path}
                className={`flex items-center justify-between  w-full  cursor-pointer text-[#242424]`}
                style={{ textDecoration: "none", borderBottom: "none" }}
              >
                <p className="text-lg">{val.title}</p>
                <Icon icon="ep:arrow-up" rotate={1} />
              </NavLink>
            </div>
          );
        })}
        <p className="text-sm text-[#9E9E9E] font-medium ml-3 mt-3">
          {strings.GENERAL}
        </p>
        {generalData.map((val) => {
          return (
            <div className="flex items-center justify-between p-3 border-b-[1px] cursor-pointer">
              <NavLink
                to={val.path}
                className={`flex items-center justify-between  w-full  cursor-pointer text-[#242424] `}
                style={{ textDecoration: "none", borderBottom: "none" }}
              >
                <p className="text-lg">{val.title}</p>
                <Icon icon="ep:arrow-up" rotate={1} />
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsSideBar;
