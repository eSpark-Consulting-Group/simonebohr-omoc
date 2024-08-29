import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { strings } from "../../utils/strings";
import cardIcon from "../../assets/icon/card_icon.svg";
import AddCardModal from "../appComponent/AddCardModal";
const Info = ({ modal }) => {
  return (
    <div className="bg-white rounded-xl p-3">
      <p className="text-sm font-medium" cursor-pointer>
        {strings.SET_AS_DEFAULT}
      </p>
      <p className="text-sm font-medium mt-2 cursor-pointer" onClick={modal}>
        {strings.EDIT_CARD}
      </p>
      <p className="text-sm font-medium text-[#C80000] mt-2 cursor-pointer">
        {strings.DELETE}
      </p>
    </div>
  );
};
const PaymentCard = ({ cardData }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div>
        <div className="w-[360px] h-[124px] rounded-t-[18px] bg-[#0f9aff] p-3">
          <div className="flex justify-end  pt-2 relative">
            <Icon
              className="cursor-pointer"
              icon="ph:dots-three-vertical-bold"
              width={20}
              height={30}
              color="#fff"
              onClick={() => {
                setShowInfo(!showInfo);
              }}
            />
            {showInfo && (
              <div className="absolute top-8">
                <Info
                  modal={() => {
                    setShowModal(true);
                  }}
                />
              </div>
            )}
          </div>
          <div className="-mt-2 flex gap-3">
            <img src={cardIcon} />
            <div className="bg-[#E8F5FF] rounded-[24px] px-2 flex items-center justify-center">
              <p className="text-[#0094FF] text-[10px]">
                {strings.DEFAULT_CARD}
              </p>
            </div>
          </div>
          <div>
            <p className="text-white mt-3">
              *** *** **** {cardData?.last4Digit ?? "3090"}{" "}
            </p>
          </div>
        </div>
        <div className="bg-[#097bd1] h-[86px] w-[360px] rounded-b-[18px]  p-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-white">
                {cardData?.holderName ?? "James Momon"}
              </p>
              <p className="text-xs text-white mt-1">
                EXP {(cardData?.expireMonth + "").padStart(2, "0")}/
                {cardData?.expireYear ?? "24"}
              </p>
            </div>
            <p className="text-5xl font-bold text-white">
              {(cardData?.brand ?? "VISA").toUpperCase()}
            </p>
          </div>
        </div>
        {showModal && <AddCardModal heading={strings.MASTER_CARD} />}
      </div>
    </div>
  );
};

export default PaymentCard;
