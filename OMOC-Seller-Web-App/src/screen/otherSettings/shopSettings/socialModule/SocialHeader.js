import React from "react";
import { strings } from "../../../../utils/strings";
import { NavLink } from "react-router-dom";
import "../../../../assets/CommonStyling/CommonStyling.css";

function SocialHeader() {
  return (
    <section className="rounded-xl bg-white mb-4 mt-6 p-4 w-max">
      <div className="flex justify-around items-center invoiceHeader-class w-max">
        <p className="!w-[200px] text-center">
          <NavLink
            to="/Other-settings/Shop-settings/Social/Request"
            defaultChecked={true}
          >
            {strings.REQUEST}
          </NavLink>
        </p>
        <p className="!w-[180px] text-center">
          <NavLink to="/Other-settings/Shop-settings/Social/Manage-partnerships">
            {strings.MANAGE_PARTNERSHIP}
          </NavLink>
        </p>
        <p className="!w-[200px] text-center">
          <NavLink to="/Other-settings/Shop-settings/Social/Comment-settings">
            {strings.COMMENT_SETTINGS}
          </NavLink>
        </p>
        <p className="!w-[180px] text-center">
          <NavLink to="/Other-settings/Shop-settings/Social/Banned-user">
            {strings.BANNED_USER}
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default SocialHeader;
