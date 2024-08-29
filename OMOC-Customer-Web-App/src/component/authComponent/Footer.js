import React from "react";
import { strings } from "../../utils/strings";

const Footer = () => {
  return (
    <div className="flex justify-between items-center py-6">
      <p className="text-[#757575] font-medium">{strings.PRIVACY_POLICY}</p>
      <p className="text-[#757575] font-medium">{strings.COPYRIGHT} 2024</p>
    </div>
  );
};

export default Footer;
