import React, { useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import { strings } from "../../utils/strings";
import { useNavigate } from "react-router-dom";
import CreatePost from "../../screen/account/CreatePost";

function CreatePostModal({
  createPostModal,
  onClose,
  setCreatePost,
  setCreateStory,
}) {
  const navigate = useNavigate();
  const [createType, setCreateType] = useState("");

  const handleCreatePost = () => {
    setCreatePost();
    onClose();
  };
  const handleCreateStory = () => {
    setCreateStory(true);
    onClose();
  };
  return (
    <>
      <Modal
        isOpen={createPostModal}
        onRequestClose={onClose}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            borderRadius: "15px",
          },
        }}
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <div className="text-end">
            <button
              onClick={() => {
                onClose();
              }}
            >
              <Icon
                icon="system-uicons:cross"
                style={{ width: 24, height: 24 }}
              />
            </button>
          </div>
          <div className="flex items-center gap-4 px-4 pb-4">
            <input
              type="radio"
              onChange={(e) => {
                setCreateType(e.target.value);
              }}
              value={1}
              className="w-5 h-5"
              name="postType"
            />
            <div className="w-[90%]">
              <p className="text-base font-semibold">{strings.CREATE_POST}</p>
              <p className="text-[#979797] text-sm font-normal">
                {strings.CREATE_YOUR_POST}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4 pb-4">
            <input
              type="radio"
              onChange={(e) => {
                setCreateType(e.target.value);
              }}
              value={2}
              className="w-5 h-5"
              name="postType"
            />
            <div className="w-[90%]">
              <p className="text-base font-semibold">{strings.CREATE_STORY}</p>
              <p className="text-[#979797] text-sm font-normal">
                {strings.CREATE_STORY_FOR_24HOURS}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button
              disabled={createType ? false : true}
              onClick={() => {
                createType == 1 ? handleCreatePost() : handleCreateStory();
              }}
              className="bg-[#0094FF] rounded-3xl cursor-pointer !gap-1 w-32 flex items-center text-white justify-center py-2"
            >
              <Icon icon="bi:plus" color="white" width="32" height="32" />
              <p className="text-base">{strings.CREATE}</p>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreatePostModal;
