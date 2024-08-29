import React, { useState } from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";

function ReportTestimonialModal({
  setOpenReportModal,
  openReportModal,
  productData,
  setIsLoader,
}) {
  // console.log("--------DATA",data);
  const [reportRadioValue, setReportRadioValue] = useState(null);
  const [reportMsg, setReportMsg] = useState("");
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);

  async function postReport() {
    setIsLoader(true);
    const responseData = {
      reviewId: productData?.ratingId,
      response: reportMsg,
    };
    await ProductSublyApi.reportTestimonial(_id, token, responseData).then(
      (response) => {
        setIsLoader(false)
        if (response.statusCode == 200) {
          toast.success(response.message);
          setOpenReportModal(false);
        } else {
          toast.error(response.message);
        }
      }
    );
  }
  return (
    <>
      <Modal
        isOpen={openReportModal}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setOpenReportModal(false);
          setReportRadioValue(null);
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
            zIndex: "20px",
          },
        }}
      >
        <div>
          <div className="flex justify-between pb-3">
            <p className="font-bold text-2xl">{strings.REPORT_TESTIMONAIL}</p>
            <button
              onClick={() => {
                setOpenReportModal(false);
                setReportRadioValue(null);
              }}
            >
              <Icon icon="ep:close" width="28" height="28" />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-4 py-2 px-4">
              <div className="w-6 h-6">
                <input
                  type="radio"
                  className="w-full h-full"
                  name="scam"
                  value={
                    "Content contains racism, discrimination, vulgarity, threats, and violations of social values/norms"
                  }
                  onChange={(e) => {
                    setReportMsg(e.target.value);
                  }}
                />
              </div>
              <p className="text-base font-medium p-1 w-[90%]">
                {strings.SCAM_CONTENT_CONTAINS}
              </p>
            </div>
            <div className="flex items-center gap-4 py-2 px-4">
              <div className="w-6 h-6">
                <input
                  type="radio"
                  className="w-full h-full"
                  name="scam"
                  value={"scam"}
                  onChange={(e) => {
                    setReportMsg(e.target.value);
                  }}
                />
              </div>
              <p className="text-base font-medium p-1 w-[90%]">
                {strings.SCAM}
              </p>
            </div>
            <div className="flex items-center gap-4 py-2 px-4">
              <div className="w-6 h-6">
                <input
                  type="radio"
                  className="w-full h-full"
                  name="scam"
                  value={3}
                  onChange={(e) => {
                    setReportRadioValue(e.target.value);
                  }}
                />
              </div>
              <p className="text-base font-medium p-1 w-[90%]">
                {strings.OTHER}
              </p>
            </div>
            {reportRadioValue == 3 && (
              <div className="text-center pb-6">
                <input
                  type="text"
                  placeholder={placeholder.TELL_YOUR_REASON_REPORT}
                  className="rounded-xl border-2 w-[85%] py-4 px-3"
                  value={reportMsg}
                  onChange={(e) => {
                    setReportMsg(e.target.value);
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-end items-center pt-2">
            <button
              className="rounded-3xl text-white font-sm font-medium py-2.5 px-4 border-2 bg-[#0094FF] border-[#0094FF] flex items-center justify-center gap-2"
              onClick={() => {
                postReport();
              }}
            >
              {strings.REPORT_NOW}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ReportTestimonialModal;
