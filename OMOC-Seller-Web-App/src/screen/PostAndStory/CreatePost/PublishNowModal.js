import React, { useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import { strings } from "../../../utils/strings";

function PublishNowModal({
  openPublishModal,
  setOpenPublishModal,
  setOpenEditClip,
  setStoryClipBtn,
  clickBtn,
}) {
  const [privacySwitch, setPrivacySwitch] = useState(false);
  return (
    <>
      <Modal
        isOpen={openPublishModal}
        onRequestClose={() => {
          setOpenPublishModal(false);
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
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <div className="flex justify-end">
            <Icon
              icon="ep:close"
              width="26"
              height="26"
              cursor={"pointer"}
              onClick={() => setOpenPublishModal(false)}
            />
          </div>
          <div className="flex justify-between items-center my-8">
            <div>
              <p className="text-base font-medium">{strings.SCHEDULED}</p>
              <p className="text-[#979797] text-sm font-normal">
                {strings.CHOOSE_WHEN_TO_PUBLISH}
              </p>
            </div>
            <div className="flex gap-8 items-center">
              <p className="text-[#0094FF] text-base font-semibold">
                {strings.NOW}
              </p>
              <button className="!text-[#0094FF] font-medium text-sm rounded-3xl border border-[#0094FF] px-6 py-2.5">
                {strings.CHANGE}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center my-8">
            <div>
              <p className="text-base font-medium">{strings.PRIVACY}</p>
              <p className="text-[#979797] text-sm font-normal">
                {strings.CHOOSE_WHO_CAN_SEE_STROY}
              </p>
            </div>
            <div className="flex items-center bg-[#F5F5F5] p-1 rounded-3xl">
              <p
                onClick={() => setPrivacySwitch(false)}
                className={`${
                  privacySwitch ? "text-[#757575]" : "bg-[#9039FF] text-white"
                } rounded-3xl w-24 text-center p-2.5 text-sm font-medium cursor-pointer`}
              >
                {strings.FOLLOWERS}
              </p>
              <p
                onClick={() => setPrivacySwitch(true)}
                className={`${
                  !privacySwitch ? "text-[#757575]" : "bg-[#9039FF] text-white"
                } rounded-3xl w-24 text-center p-2.5 text-sm font-medium cursor-pointer`}
              >
                {strings.PUBLIC}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center my-8">
            <div>
              <p className="text-base font-medium">{strings.TAG_PEOPLE}</p>
              <p className="text-[#979797] text-sm font-normal">
                {strings.YOU_CAN_TAG_YOUR_FRIENDS}
              </p>
            </div>
            <div className="flex gap-8 items-center">
              <button
                disabled={!setOpenEditClip && true}
                onClick={() => {
                  setOpenEditClip(true);
                  setStoryClipBtn(3);
                  setOpenPublishModal(false);
                }}
                className="!text-[#0094FF] font-medium text-sm rounded-3xl border border-[#0094FF] px-6 py-2.5"
              >
                {strings.TAG_PEOPLE}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => clickBtn(true)}
              className="rounded-3xl py-3 w-44 px-10 bg-[#0094FF] text-white text-base font-semibold"
            >
              {strings.PUBLISH_NOW}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PublishNowModal;
