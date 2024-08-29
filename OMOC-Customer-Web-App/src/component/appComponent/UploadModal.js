import React from "react";
import Modal from "react-modal";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import storyIcon from "../../assets/icon/story.svg";
import videoIcon from "../../assets/icon/video-add.svg";
import postIcon from "../../assets/icon/post_Icon.svg";
import { useNavigate } from "react-router-dom";

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
const UploadModal = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex items-center w-[425px]">
          <p className="text-2xl font-semibold mx-auto">{strings.UPLOAD}</p>
          <div className="absolute right-5">
            <Icon
              className="cursor-pointer"
              width={24}
              height={24}
              style={{ float: "right" }}
              icon="radix-icons:cross-2"
              onClick={() => {
                closeModal();
              }}
            />
          </div>
        </div>
        <div className="my-10">
          <div className="flex gap-2 items-center border-[1px] rounded-lg my-3 p-3">
            <img src={storyIcon} />
            <p>{strings.UPLOAD_STORY}</p>
          </div>
          <div
            className="flex gap-2 items-center border-[1px] rounded-lg my-3 p-3"
            onClick={() => {
              navigate("/Upload-Video");
            }}
          >
            <img src={videoIcon} />
            <p>{strings.UPLOAD_VIDEO}</p>
          </div>
          <div className="flex gap-2 items-center border-[1px] rounded-lg my-3 p-3">
            <img src={postIcon} />
            <p>{strings.UPLOAD_POST}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UploadModal;
