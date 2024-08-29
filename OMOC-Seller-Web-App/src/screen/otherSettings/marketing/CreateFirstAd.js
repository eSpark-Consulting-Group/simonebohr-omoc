import React, { useState } from "react";
import Header from "../../../component/Header";
import { strings } from "../../../utils/strings";
import paypal from "../../../assets/icon/paypal logo.svg";
import card from "../../../assets/icon/card logo.svg";
import { Icon } from "@iconify/react";
import AddCardModal from "./AddCardModal";
import OtherSettngSublyApi from "../../../helper/OtherSettingsApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CreateFirstAd = () => {
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const { state } = useLocation();
  const [addCard, setAddCard] = useState(false);
  const handleAddCard = () => {
    setAddCard(true);
  };

  // ===============CALLING API FOR CREATINGG ADD=================
  async function createAddHandle() {
    const requesData = {};
    await OtherSettngSublyApi.createAdds(token, _id, requesData).then(
      (response) => {
        if (response.statusCode == 200) {
          toast.success(response.message);
        } else {
          toast.error(response.data.message);
        }
      }
    );
  }

  console.log(state);

  return (
    <div className={`!bg-[#f2f2f2] h-full`}>
      <div className=" w-full bg-[#fff] fixed top-0 z-20">
        <Header state={state} finalForm={true} />
      </div>
      <div className="w-4/5	mx-auto mt-5 pt-28">
        <p className="text-[32px] font-bold">Create your first ad now (3/3)</p>
      </div>

      <div className="bg-white w-1/2 max-md:w-5/6	 mt-10 mx-auto p-7 rounded-2xl	">
        <div className="flex justify-between">
          <p className="text-[#757575] text-xl	">{strings.AD_NAME}</p>
          <p className="text-xl font-semibold w-1/2">{strings.AD_NAME_DESC}</p>
        </div>
        <div className="flex justify-between my-5 ">
          <p className="text-[#757575] text-xl	">{strings.TAX}</p>
          <p className="text-xl font-semibold w-1/2">$25</p>
        </div>
        <div className="flex justify-between border-t-2 pt-5">
          <p className="text-[#757575] text-xl w-1/2">{strings.SUB_TOTAL}</p>
          <p className="text-xl font-semibold w-1/2 ">$120</p>
        </div>
      </div>
      <div className="bg-white w-1/2 max-md:w-5/6 mt-10 mx-auto p-7 rounded-2xl	">
        <h2 className="text-2xl	font-semibold">{strings.PAYMENT_METHOD}</h2>
        <div className="flex justify-between items-center my-10">
          <div className="flex gap-5 items-center">
            <input className="w-[24px] h-[24px]" type="radio" name="payment" />
            <div>
              <p className="font-medium mb-2">Paypal Mastercard</p>
              <p className="text-sm text-[#979797]">Credit *****1246</p>
            </div>
          </div>
          <img width="24" height="24" src={paypal} />
        </div>
        <div className="flex justify-between items-center my-10">
          <div className="flex gap-5 items-center">
            <input
              className="w-[24px] h-[24px]"
              width="24px"
              height="24px"
              type="radio"
              name="payment"
            />
            <div>
              <p>The Bank Card</p>
              <p>Credit *****1246</p>
            </div>
          </div>
          <img width="24" height="24" src={card} />
        </div>
        <div
          className="flex items-center gap-3 text-[#0094FF] ml-5 cursor-pointer"
          onClick={handleAddCard}
        >
          <Icon width="14px" height="14px" icon="ion:add" />
          <p className="font-medium">{strings.ADD_DEBIT_OR_CREDIT_CARD}</p>
        </div>
      </div>
      <div className="bg-white w-1/2 mt-10 mx-auto p-7 rounded-2xl	max-md:w-5/6">
        <div className="flex items-center justify-between max-sm:flex-wrap">
          <div>
            <p className="text-[#757575] text-xl">{strings.TOTAL_BILL}</p>
            <p className="text-[28px]">$120</p>
          </div>
          <button
            onClick={() => {
              createAddHandle();
            }}
            className="bg-[#0094FF] px-8 py-4 rounded-[30px]"
          >
            <p className="text-white font-semibold">
              {strings.PAYMENT_CONFIRMAITION}
            </p>
          </button>
        </div>
      </div>
      {addCard && <AddCardModal addCard={addCard} setAddCard={setAddCard} />}
    </div>
  );
};

export default CreateFirstAd;
