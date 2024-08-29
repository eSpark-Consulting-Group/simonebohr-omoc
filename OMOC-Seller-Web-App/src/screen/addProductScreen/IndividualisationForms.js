import React from "react";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";

function IndividualisationForms() {
  return (
    <div className="w-3/5 max-md:w-3/4 max-sm:w-full">
      <div>
        <p className="text-2xl font-semibold my-6">
          {strings.SETUP_INDIVIDUALISATION_FORMS}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <input type="radio" name="numberProduct" className="w-6 h-6" />
          <p className="text-base font-medium w-[90%]">
            {strings.DESPLAYS_A_MESSAGE_NOTE}
          </p>
        </div>
        <div className="flex items-center gap-3 my-5">
          <input type="radio" name="numberProduct" className="w-6 h-6" />
          <p className="text-base font-medium w-[90%]">
            {strings.DESPLAYS_SEVERAL_OPTIONS_FROM_WHICH}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input type="radio" name="numberProduct" className="w-6 h-6" />
          <p className="text-base font-medium w-[90%]">
            {strings.DISPLAYS_SEVERAL_OPTIONS_BUT_ONLY_ONE}
          </p>
        </div>
      </div>
      <div className="mt-8 mb-6">
        <p className="text-[#757575] font-medium text-sm">
          {strings.CONFIGURE_THE_FORM_THAT_WILL}
        </p>
        <input
          type="text"
          placeholder={placeholder.WRITE_QUESTION}
          className="p-3 border rounded-xl w-full my-1.5"
        />
      </div>
      {[1, 2, 3].map(() => (
        <div className="flex justify-between items-center gap-4 my-6">
          <div className="flex items-center gap-3">
            <input type="radio" name="numberProduct" className="w-6 h-6" />
            <p className="text-base font-medium">Option 1</p>
          </div>
          <Icon icon="clarity:close-line" width="24" height="24" />
        </div>
      ))}
      <div className="flex items-center gap-3 border-b pb-6">
        <input type="radio" name="numberProduct" className="w-6 h-6" />
        <p className="text-[#0094FF] text-base font-medium">
          {strings.ADD_NEW_OPTIONS}
        </p>
      </div>
      <p className="flex gap-2 items-center my-3 text-[#0094ff] text-base font-semibold cursor-pointer">
        <span>
          <Icon icon="uil:plus" color="#0094ff" width="25" height="25" />
        </span>
        {strings.ADD_NEW_OPTIONS}
      </p>
    </div>
  );
}

export default IndividualisationForms;
