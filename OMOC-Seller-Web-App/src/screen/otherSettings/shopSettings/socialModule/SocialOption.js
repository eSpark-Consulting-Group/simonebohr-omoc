import React from "react";
import { strings } from "../../../../utils/strings";

function SocialOption() {
  return (
    <section className="bg-white !z-10 rounded-xl w-52 text-start p-3 absolute !top-10 shadow-2xl invoice-option-box right-5">
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-xl">
        {strings.REMOVE_ACCESS}
      </p>
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-xl">
        {strings.BAN_USER}
      </p>
    </section>
  );
}

export default SocialOption;
