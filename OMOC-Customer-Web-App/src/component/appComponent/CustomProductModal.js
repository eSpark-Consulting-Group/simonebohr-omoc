import React, { useState } from "react";
import Modal from "react-modal";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const CustomProductModal = ({ openModal, closeModal, addToCartHandle }) => {
  const [radioValue, setRadioValue] = useState(1);

  const handleRadio = () => {
    if (radioValue < 3) setRadioValue(radioValue + 1);
  };
  return (
    <div>
      <Modal isOpen={openModal} style={customStyles}>
        <div className="w-[425px]">
          <div className="flex items-center w-full justify-between">
            <div className=" w-full">
              <p className="text-center text-2xl	">{strings.CUSTOM_PRODUCT}</p>
            </div>
            <Icon
              width={20}
              height={20}
              icon="radix-icons:cross-2"
              onClick={() => {
                closeModal();
              }}
            />
          </div>
          <div className="flex w-1/2 mt-4 items-center mx-auto">
            <input checked={true} type="radio" className="" value={1} />
            <div
              className={`w-full ${
                radioValue < 2 ? "border-[#9E9E9E]" : "border-[#0094FF]"
              } border-dashed border-[1px]  h-0`}
            />
            <input
              checked={radioValue < 2 ? false : true}
              type="radio"
              className=""
              value={2}
            />
            <div
              className={`w-full ${
                radioValue < 3 ? "border-[#9E9E9E]" : "border-[#0094FF]"
              } border-dashed border-[1px]  h-0`}
            />
            <input
              checked={radioValue < 3 ? false : true}
              type="radio"
              className=""
              value={3}
            />
          </div>
          <div className="flex  justify-between w-1/2 mt-4 items-center mx-auto">
            <p className="w-">{strings.COLOUR}</p>
            <p className="w-">{strings.SIZE}</p>
            <p>{strings.NOTE}</p>
          </div>

          {radioValue === 1 && (
            <>
              <p className="text-lg font-semibold mt-5">
                {strings.WHAT_COLOUR_WANT_TO_CHOOSE}
              </p>
              <p className="text-sm text-[#C80000] font-medium">
                {strings.YOU_CAN_SELECT_ONE}
              </p>
              <div className="border-1 flex p-3 flex items-center gap-2 rounded-xl mt-2">
                <input type="checkbox" />
                <p>{strings.WHITE}</p>
              </div>
              <div className="border-1 flex p-3 flex items-center gap-2 rounded-xl mt-2">
                <input type="checkbox" />
                <p>{strings.RED}</p>
              </div>
              <div className="border-1 flex p-3 flex items-center gap-2 rounded-xl mt-2">
                <input type="checkbox" />
                <p>{strings.BLUE}</p>
              </div>
              <button
                className="bg-[#E0E0E0] w-full rounded-3xl p-3 mt-5"
                onClick={handleRadio}
              >
                <p className="text-[#C2C2C2]">{strings.NEXT_STEP}</p>
              </button>
            </>
          )}
          {radioValue === 2 && (
            <>
              <p className="text-lg font-semibold mt-5">
                {strings.CHOOSE_SIZE_ACCORDING_YOUR_SIZE}
              </p>
              <p className="text-sm text-[#C80000] font-medium">
                {strings.YOU_CAN_SELECT_MORE_THAN_ONE}
              </p>
              <div className="border-1 flex p-3 flex items-center gap-2 rounded-xl mt-2">
                <input type="checkbox" />
                <p>42</p>
              </div>
              <div className="border-1 flex p-3 flex items-center gap-2 rounded-xl mt-2">
                <input type="checkbox" />
                <p>32</p>
              </div>
              <div className="border-1 flex p-3 flex items-center gap-2 rounded-xl mt-2">
                <input type="checkbox" />
                <p>22</p>
              </div>
              <button
                className="bg-[#E0E0E0] w-full rounded-3xl p-3 mt-5"
                onClick={handleRadio}
              >
                <p className="text-[#C2C2C2]">{strings.NEXT_STEP}</p>
              </button>
            </>
          )}
          {radioValue === 3 && (
            <>
              <p className="text-lg font-semibold mt-5">
                {strings.CHOOSE_SIZE_ACCORDING_YOUR_SIZE}
              </p>
              <p className="text-sm text-[#C80000] font-medium">
                {strings.YOU_CAN_SELECT_MORE_THAN_ONE}
              </p>
              <textarea className="border-[1px] w-full mt-3 h-28 rounded-3xl	p-2" />
              <button
                className="bg-[#E0E0E0] w-full rounded-3xl p-3 mt-5"
                onClick={() => {
                  addToCartHandle();
                }}
              >
                <p className="text-[#C2C2C2]">{strings.ADD_TO_CHART}</p>
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CustomProductModal;
