import React, { useState } from "react";
import profil_pic from "../../assets/images/profile_pic.png";
import AuthSublyApi from "../../helper/AuthApi";
import { useSelector } from "react-redux";

const FollowingCard = ({ user }) => {
  const { token } = useSelector((state) => state.userData.userDetails);

  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleFollowToggle = async () => {
    setIsFollowing(!isFollowing);
    if (isFollowing) {
      await unFollow();
    } else {
      await follow();
    }
  };

  async function follow() {
    const followId = { userId: user.id };
    await AuthSublyApi.followUser(token, followId).then((response) => {

    });
  }

  async function unFollow() {
    const unFollowId = { userId: user.id };

    await AuthSublyApi.unFollowUser(token, unFollowId).then((response) => {
    });
  }

  return (
    <div className="border-[1px] rounded-3xl border-[#EDEDED] my-3 py-2 flex justify-center">
      <div>
        <img
          className="mx-auto rounded-full w-[72px] h-[72px]"
          src={user.profileImg}
          alt="Profile"
        />
        <p className="my-3 text-center">{user.name}</p>
        <div className="flex justify-center">
          <button
            className={`px-[6px] py-[8px] border-[1px] w-full rounded-3xl border-[#AADBFF] text-[#0094FF] ${
              isFollowing ? "bg-white text-[#0094FF]" : "bg-blue-500 text-white"
            }`}
            onClick={handleFollowToggle}
          >
            <p>{isFollowing ? "Following" : "Follow"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowingCard;