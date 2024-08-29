import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { strings } from "../../utils/strings";

const data = [
  {
    heading: strings.RETURN_AND_FUNDS,
    description: strings.RETURN_FUND_DEC,
  },
];

const ChangeSolutionModal = ({ closeModal, onClickNext }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-bold text-2xl">{strings.CHANGE_SOLUTION}</p>
        <button onClick={closeModal}>
          <Icon icon="system-uicons:cross" style={{ width: 24, height: 24 }} />
        </button>
      </div>

      <div className="border-[1px] h-28 rounded-xl flex items-center gap-7 py-6 px-4 my-5">
        <input
          value={1}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          name="change solution"
          type="radio"
          className="h-6 w-6"
        />
        <div className="w-[90%]">
          <h2 className="text-base font-semibold text-[#404040]">
            {strings.RETURN_AND_FUNDS}
          </h2>
          <p className="text-sm text-[#7A7A7A]">{strings.RETURN_FUND_DEC}</p>
        </div>
      </div>
      <div className="border-[1px] h-28 rounded-xl flex items-center gap-7 py-6 px-4 my-5">
        <input
          value={2}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          name="change solution"
          type="radio"
          className="h-6 w-6"
        />
        <div className="w-[90%]">
          <h2 className="text-base font-semibold text-[#404040]">
            {strings.RETURN_FUNDS}
          </h2>
          <p className="text-sm text-[#7A7A7A]">{strings.RETURN_FUNDS_DEC}</p>
        </div>
      </div>
      <div className="border-[1px] h-28 rounded-xl flex items-center gap-7 py-6 px-4 my-5">
        <input
          value={3}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          name="change solution"
          type="radio"
          className="h-6 w-6"
        />
        <div className="w-[90%]">
          <h2 className="text-base font-semibold text-[#404040]">
            {strings.REFUSE_SUBMISSION}
          </h2>
          <p className="text-sm text-[#7A7A7A]">
            {strings.REFUSE_SUBMISSION_DEC}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="w-52 h-14 bg-[#0094FF] rounded-[30px] text-white"
          onClick={() => onClickNext(value)}
        >
          <p>{strings.NEXT}</p>
        </button>
      </div>
    </div>
  );
};

export default ChangeSolutionModal;
