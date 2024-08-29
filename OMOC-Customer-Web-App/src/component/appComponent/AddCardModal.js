import React, { useState } from "react";
import ReactModal from "react-modal";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import PaymentCard from "../commonComponent/PaymentCard";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import PaymentApi from "../../helper/PaymentApi";
import { toast } from "react-toastify";

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
const stripe = loadStripe(
  "pk_test_51OPuhoIJNESoePRF9K25pTwynyuszjbA8aGPb13iyuJK8kudLCpvdzyvyoo2qO5s30icFJ7vdY3cuZdfd78Yx38100BeYgc8sC"
);
const AddCardModal = ({ openModal, closeModal, heading }) => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [cardPrimary, setCardPrimary] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  console.log("PRIMARY", cardPrimary);
  async function addCard() {
    try {
      const { error, token: stripeToken } = await stripe.createToken(
        elements.getElement(CardNumberElement)
      );
      if (error) {
        toast.error(error?.message || "");
      } else {
        const { data, status, message } = await PaymentApi.addPayment(token, {
          token: stripeToken,
          isDefault: cardPrimary,
        });
        if (status) {
          toast.success(message);
          closeModal();
        } else {
          toast.error(message || "");
        }
      }
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <div>
      <ReactModal isOpen={openModal} style={customStyles}>
        <div className="flex items-center">
          <p className="text-2xl font-semibold mx-auto">{heading}</p>
          <div className="absolute right-5">
            <Icon
              width={20}
              height={20}
              icon="radix-icons:cross-2"
              onClick={() => {
                closeModal();
              }}
            />
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <PaymentCard />
        </div>
        <p className="text-xs text-[#9E9E9E] mt-3">
          {strings.HERE_DETAIL_ABOUT_CARD}
        </p>
        {/* <input
          placeholder={placeholder.SHARE_YOUR_FEEDBACK}
          className="w-full px-3 py-3 my-2 border-[1px] rounded-[14px] text-sm"
        /> */}
        <CardNumberElement className="w-full px-3 py-3 my-2 border-[1px] rounded-[14px] text-sm" />
        <div className="flex justify-between gap-2">
          <CardCvcElement className="w-full px-3 py-3 my-2 border-[1px] rounded-[14px] text-sm" />
          <CardExpiryElement className="w-full px-3 py-3 my-2 border-[1px] rounded-[14px] text-sm" />
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            value={cardPrimary}
            onClick={() => {
              setCardPrimary(!cardPrimary);
            }}
          />
          <p className="text-xs text-[#0094FF] font-medium">
            {strings.SET_AS_DEFAULT_CARD}
          </p>
        </div>
        <button className="w-full rounded-[24px] py-3 bg-[#0094FF] mt-4">
          <p className="text-white font-medium" onClick={addCard}>
            {strings.SUBMIT}
          </p>
        </button>
      </ReactModal>
    </div>
  );
};

export default ({ openModal, closeModal, heading }) => {
  return (
    <Elements stripe={stripe}>
      <AddCardModal
        openModal={openModal}
        closeModal={closeModal}
        heading={heading}
      />
    </Elements>
  );
};
