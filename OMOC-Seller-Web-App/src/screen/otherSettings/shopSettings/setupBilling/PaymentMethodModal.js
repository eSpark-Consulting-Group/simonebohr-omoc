import { Icon } from "@iconify/react";
import React from "react";
import Modal from "react-modal";
import { strings } from "../../../../utils/strings";

function PaymentMethodModal({
  openPaymentMethod,
  setOpenPaymentMethod,
  setAddCard,
}) {
  return (
    <Modal
      isOpen={openPaymentMethod}
      onRequestClose={() => {
        setOpenPaymentMethod(false);
      }}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          borderRadius: "15px",
        },
      }}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-xl font-semibold">{strings.PAYMENT_METHOD}</h3>
        <Icon
          icon="ep:close"
          width="24"
          height="24"
          cursor={"pointer"}
          onClick={() => setOpenPaymentMethod(false)}
        />
      </div>
      <div className="my-4">
        <div className="flex items-center justify-between gap-4 px-8 py-4 max-md:px-2">
          <div className="flex items-center gap-5">
            <input type="radio" className="w-6 h-6" />
            <div>
              <p className="text-base font-medium leading-7">
                Paypal Mastercard
              </p>
              <p className="text-sm text-[#979797] font-normal leading-7">
                Credit *****1246
              </p>
            </div>
          </div>
          <Icon icon="logos:paypal" color="#0094ff" width="24" height="24" />
        </div>
        <div className="flex items-center justify-between gap-4 px-8 py-4 max-md:px-2">
          <div className="flex items-center gap-5">
            <input type="radio" className="w-6 h-6" />
            <div>
              <p className="text-base font-medium leading-7">
                Paypal Mastercard
              </p>
              <p className="text-sm text-[#979797] font-normal leading-7">
                Credit *****1246
              </p>
            </div>
          </div>
          <Icon icon="logos:paypal" color="#0094ff" width="24" height="24" />
        </div>
        <div
          onClick={() => setAddCard(true)}
          className="flex items-center gap-2 px-8 py-2 max-md:px-2 cursor-pointer"
        >
          <Icon
            icon="majesticons:plus-line"
            color="#0094ff"
            width="24"
            height="24"
          />
          <p className="text-[#0094FF] text-base font-medium">
            {strings.ADD_DEBIT_OR_CREDIT_CARD}
          </p>
        </div>
      </div>
      <div className="flex justify-end items-center pr-2">
        <button className="text-white bg-[#0094FF] text-base font-semibold py-3 px-10 rounded-3xl">
          {strings.CONTINUE}
        </button>
      </div>
    </Modal>
  );
}

export default PaymentMethodModal;
