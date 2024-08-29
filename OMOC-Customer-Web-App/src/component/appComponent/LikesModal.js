import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../utils/strings";
import proflie from "../../assets/images/profile_pic.png";
import AuthSublyApi from "../../helper/AuthApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { auto } from "@popperjs/core";

const customStyles = {
  content: {
    left: auto,
    right: "45%",
    width: "22%",
  },
};

const data = [1, 2, 3, 4, 5, 6];

const LikesModal = ({ isOpen, closeModal, data }) => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [userId, setUserId] = useState();
  async function follow() {
    const followId = { userId: userId };
    await AuthSublyApi.followUser(token, followId).then((response) => {
      if (response.statusCode == 200) {
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    });
  }
  async function unFollow() {
    const unFollowId = { userId: userId };

    await AuthSublyApi.unFollowUser(token, unFollowId).then((response) => {
      if (response.statusCode == 200) {
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    });
  }
  return (
    <div className="z-50">
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex items-center w-[425px] z-50">
          <p className="text-2xl font-semibold mx-auto">{strings.LIKES}</p>
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
        <div className="flex relative mt-4">
          <div className="absolute left-2 top-3">
            <Icon className="" icon="carbon:search" />
          </div>
          <input
            className="bg-[#F5F5F5] pl-8 rounded-[14px] w-full py-2"
            placeholder={placeholder.SEARCH}
          />
        </div>
        {data?.likes?.map((item) => {
          return (
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1 items-center">
                <img className="w-8 h-8 rounded-full" src={item?.profileImg} />
                <Icon icon="bitcoin-icons:verify-filled" color="#3d9ffb" />
                <p className="text-sm font-medium">{item?.name}</p>
              </div>
              <button
                className={`${
                  data.isFollowing === true
                    ? "bg-[#F5F5F5] text-[#9E9E9E]"
                    : "bg-[#0094FF] text-white "
                } rounded-3xl px-3 py-2`}
                onClick={() => {
                  setUserId(item._id);
                  if (data?.isFollowing === true) {
                    unFollow();
                  } else {
                    follow();
                  }
                }}
              >
                <p className="text-[10px]">
                  {data.isFollowing === true ? "Following" : "Follow"}
                </p>
              </button>
            </div>
          );
        })}
      </Modal>
    </div>
  );
};

export default LikesModal;
