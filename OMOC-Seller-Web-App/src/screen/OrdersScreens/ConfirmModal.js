import { Icon } from "@iconify/react"
import react, { useState } from "react"
import { strings } from "../../utils/strings"

function ConfirmModal({ closeModal, submission, returnFunds }) {
  return (
    <div>
      <div className="flex justify-center">
        <p className="font-bold text-2xl">
          {strings.CONFIRM_RECEIP_OF_THE_SOLUTION}
        </p>
      </div>
      {returnFunds ? (
        <p className="text-sm text-[#7A7A7A] text-center my-5">
          {strings.CONFIRM_RECEIP_DEC}
        </p>
      ) : (
        <p className="text-sm text-[#7A7A7A] text-center my-5">
          {strings.RETURN_FUND_DEC}
        </p>
      )}
      <button className="h-14 w-full bg-[#0094FF] rounded-[30px]">
        <p className="text-white" onClick={submission}>
          {strings.YES_ACCEPT_THE_SOLUTION}
        </p>
      </button>
      <button className="h-14 w-full bg-[] border-[1px] border-[#0094FF] rounded-[30px] my-2">
        <p className="text-[#0094FF]" onClick={closeModal}>
          {strings.CANCEL}
        </p>
      </button>
    </div>
  );
}
export default ConfirmModal ;