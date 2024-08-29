import React, { useState } from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import shirt from "../../assets/image/shirt_pic.png";
import ProductSublyApi from "../../helper/ProductApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ResponseTestimonialModal({
  setOpenResponseModal,
  openResponseModal,
  productData,
  setIsLoader,
}) {
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [responseMsg, setResponseMsg] = useState("");
  async function postResponse() {
    setIsLoader(true);
    const responseData = {
      reviewId: productData?.ratingId,
      response: responseMsg,
    };
    await ProductSublyApi.responseTestimonial(_id, token, responseData).then(
      (response) => {
        setIsLoader(false);
        if (response.statusCode == 200) {
          toast.success(response.message);
          setOpenResponseModal(false);
        } else {
          toast.error(response.message);
        }
      }
    );
  }
  return (
    <>
      <Modal
        isOpen={openResponseModal}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setOpenResponseModal(false);
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
        <div>
          <div className="flex justify-between pb-3">
            <p className="font-bold text-2xl">{strings.RESPONSE_TESTIMONIAL}</p>
            <button
              onClick={() => {
                setOpenResponseModal(false);
              }}
            >
              <Icon icon="ep:close" width="28" height="28" />
            </button>
          </div>
          <div className="flex items-center gap-4 py-3">
            <img
              src={shirt}
              alt="product"
              className="rounded-xl w-16 h-16 bg-[#EDEDED] p-2"
            />
            <div>
              <h3 className="text-base font-semibold text-[#2E2E2E] leading-8">
                {productData?.productDetails?.productName}
              </h3>
              <p className="text-xs font-normal">
                {productData?.productDetails?.productId}
              </p>
            </div>
          </div>
          <p className="text-sm font-medium text-[#7A7A7A] py-2">
            {strings.REVIEW_FROM}{" "}
            <span className="text-sm font-semibold text-[#404040]">
              {productData?.userDetails?.name}
            </span>
          </p>
          <div className="flex items-center gap-8">
            <div className="flex gap-2 items-center">
              <Icon icon="ion:star" color="#ffc225" width="22" height="22" />
              <p className="text-2xl font-semibold text-[#2A2A2A]">
                {productData?.rating}
              </p>
            </div>
            <div className="py-4">
              <p className="text-xs font-semibold">
                {strings.REVIEW} :{" "}
                <span className="text-xs font-normal">
                  {productData?.comment}
                </span>
              </p>
            </div>
          </div>
          <div className="pb-5 pt-3">
            <textarea
              name="response"
              placeholder="Lorem ipsum dolor sit|"
              className="resize-none h-40 border border-[#E0E0E0] w-full rounded-xl p-4"
              value={responseMsg}
              onChange={(e) => {
                setResponseMsg(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-end items-center">
            <button
              className="rounded-3xl text-white font-sm font-medium
             py-2.5 px-4 border-2 bg-[#0094FF] border-[#0094FF] flex items-center justify-center gap-2"
              onClick={() => {
                postResponse();
              }}
            >
              {strings.SEND_RESPONSE}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ResponseTestimonialModal;
