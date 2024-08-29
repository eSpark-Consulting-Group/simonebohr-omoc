import React, { useState } from "react";
import omocLogo from "../../assets/icon/omoc_black_logo.svg";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import hoodie from "../../assets/images/hoodie.png";
import profile from "../../assets/images/profile_pic.png";
import saveIcon from "../../assets/icon/save_icon.svg";
import { toast } from "react-toastify";
import UserProfileSublyApi from "../../helper/UserProfileApi";
import { useSelector } from "react-redux";

const DiscountCard = ({ favorite, product, showLikes, post }) => {
  const { token } = useSelector((state) => state.userData.userDetails);

  const [showTag, setShowTag] = useState(false);
  const [postLike, setPostLike] = useState(post?.isLikedByCurrentUser);
  async function like() {
    const likeData = {
      postId: post._id,
      isLiked: !postLike,
    };
    setTimeout(async () => {
      await UserProfileSublyApi.postLike(token, likeData).then((response) => {
        if (response.statusCode == 200) {
          toast.success(response.message);
          window.location.reload();
        } else {
          toast.error(response.message);
        }
      });
    }, 500);
  }
  return (
    <div className="my-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            className="w-14 h-14 rounded-full"
            src={post?.createdBy?.profileImgUrl}
          />
          <p>{post?.createdBy?.userName}</p>
        </div>
        <div>
          <Icon width="16px" height="16px" icon="ph:dots-three-vertical-bold" />
        </div>
      </div>
      <div className="relative">
        <img
          className="my-3 rounded-lg w-full h-[600px]"
          src={post?.files[0]?.url}
        />
        <div>
          <div
            className="absolute left-[50%] bottom-[40%] w-3.5	h-3.5	bg-[#FFFFFF] rounded-full cursor-pointer"
            onClick={() => {
              setShowTag(!showTag);
            }}
          >
            {showTag && (
              <div className="bg-[#68686891] ml-5 w-20 rounded-[24px] px-2 py-2">
                <p className="text-[#FFFFFF]  text-sm ">Hoodie</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        {product && (
          <div>
            <p className="text-sm ">
              <span className="text-sm text-[#9039FF] font-medium">232</span>{" "}
              Products Sold
            </p>
            <div className="flex items-center gap-1">
              <p className="text-sm">Buyed by </p>
              <img className="w-[16px] h-[16px]" src={profile} />
              <p className="text-sm text-[#9039FF] font-medium">Aron</p>
            </div>
          </div>
        )}
        {favorite && (
          <div>
            <p className="text-[10px]">{post?.caption}</p>
            <div
              className="flex items-center cursor-pointer"
              // onClick={() => {
              //   openLikes();
              // }}
            >
              {post?.likes?.map((item) => {
                return (
                  <>
                    <img
                      className="w-8 h-8 border-[1px] border-white  rounded-full"
                      src={item.profileImg}
                    />
                  </>
                );
              })}
              <p className="text-[10px] ml-1 w-28" onClick={showLikes}>
                Liked by{" "}
                <span className="text-[10px] font-medium">
                  {post.likes[0]?.name}
                </span>{" "}
                and{" "}
                <span className="text-[10px] font-medium">
                  {" "}
                  {post.likesCount}
                </span>
              </p>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <img src={saveIcon} />
          <Icon
            icon={
              postLike === true
                ? "emojione:red-heart"
                : "fluent:heart-28-regular"
            }
            // color="red"
            onClick={() => {
              setPostLike(postLike);
              like();
            }}
            cursor="pointer"
          />
          <Icon icon="mynaui:chat-messages" />
          <Icon icon="mingcute:send-line" />
        </div>
      </div>
    </div>
  );
};

export default DiscountCard;
