import React from "react";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";

const DeclineSubmissionModal = ({ closeModal }) => {
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-bold text-2xl">{strings.DECLINE_SUBMISSION}</p>
        <button onClick={closeModal}>
          <Icon icon="system-uicons:cross" style={{ width: 24, height: 24 }} />
        </button>
      </div>
      <textarea
        className="h-52 border-[1px] w-full rounded-xl p-3 my-5"
        placeholder="Enter a reason"
      />
      <p className="text-xs text-[#9E9E9E]">
        {strings.DECLINE_SUBMISSION_DESC}
      </p>
      <p className="my-5">{strings.PROOF}</p>
      <p className="text-xs text-[#9E9E9E]">
        {strings.DECLINE_SUBMISSION_DESC_UPLOAD_PHOTO}
      </p>
      <div className="flex items-center gap-5 my-5">
        <div className="h-20 w-20 border-dashed border-[1px] rounded-xl flex justify-center items-center">
          <Icon icon="ion:add" />
        </div>
        <div>
          <li className="text-[#C80000] text-xs">{strings.PHOTO_FORMAT}</li>
          <li className="text-[#C80000] text-xs">{strings.VIDEO_FORMAT}</li>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="w-52 h-14 bg-[#0094FF] rounded-[30px] text-white">
          <p>{strings.SAVE}</p>
        </button>
      </div>
    </div>
  );
};

export default DeclineSubmissionModal;
