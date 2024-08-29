import React, { useEffect, useState } from "react";
import Header from "../../component/commonComponent/Header";
import { Col, Container, Row } from "react-bootstrap";
import DiscountCard from "../../component/commonComponent/DiscountCard";
import omocLogo from "../../assets/icon/omoc_black_logo.svg";
import { Icon } from "@iconify/react";
import profile from "../../assets/images/profile_pic.png";
import LikesModal from "../../component/appComponent/LikesModal";
import AuthSublyApi from "../../helper/AuthApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";
import UserProfileSublyApi from "../../helper/UserProfileApi";

const data = [1, 2, 3, 4, 5];
const FavoriteScreen = ({ closeModal }) => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [likes, setLikes] = useState(null);
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState();
  const [page, setPage] = useState("");
  const [pageSize, setPageSize] = useState(15);
  const [postData, setPostData] = useState();
  const [sortValue, setSortValue] = useState({
    status: true,
    text: "Sorty By",
  });
  const closeUpload = () => {
    setLikes(null);
  };
  const handleLikes = (item) => {
    setLikes(item);
  };
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
  async function getPost() {
    setIsLoading(true);
    await UserProfileSublyApi.fetchPostList(
      token,
      pageSize,
      page,
      sortValue.status
    ).then((response) => {
      setPostData(response.data.posts);
    });
  }
  useEffect(() => {
    async function getUser() {
      setIsLoading(true);
      const pageSize = 10;
      await AuthSublyApi.getSuggestion(token, pageSize).then((response) => {
        setIsLoading(false);
        setUserData(response.data.usersList); // Assuming response.data is an array
      });
    }
    getPost();
    getUser();
  }, []);

  return (
    <div>
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      {isLoading ? <Loader /> : ""}
      <div className="bg-[#F8F9FD]">
        <Container fluid>
          <Row>
            <Col className="" md="9">
              <div className="bg-white rounded-xl pt-3 my-5 pl-5 mx-20 max-md:mx-6">
                <div className=" relative">
                  <div className="flex gap-2 overflow-x-auto">
                    <div className="flex relative">
                      <img src={omocLogo} />
                      <div className="w-5 h-5 rounded-full flex justify-center items-center bg-white absolute right-0">
                        <Icon width={12} height={12} icon="mingcute:add-line" />
                      </div>
                    </div>

                    {data.map(() => {
                      return (
                        <img
                          className="border-[1px] rounded-full border-[#0094FF]"
                          src={omocLogo}
                        />
                      );
                    })}
                  </div>
                  <div
                    className="bg-white h-8	w-8 rounded-full flex items-center justify-center drop-shadow-md ..."
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: 14,
                    }}
                  >
                    <Icon icon="ep:arrow-up" color="blue" rotate={1} />
                  </div>
                </div>

                <div className="mx-20">
                  {postData?.map((item) => {
                    return (
                      <DiscountCard
                        showLikes={() => handleLikes(item)}
                        favorite={true}
                        post={item}
                      />
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col md="3">
              <div className="bg-white rounded-xl p-3 my-5 mr-20 max-md:mr-6">
                {userData?.map((user) => {
                  return (
                    <div className="flex items-center justify-between  border-b-[1px] py-3">
                      <div className="flex gap-1 items-center">
                        <img
                          className="w-14 h-14 rounded-full"
                          src={user.profileImg}
                        />
                        <div>
                          <div className="flex gap-1">
                            <p className="text-lg font-medium">{user.name}</p>
                            <Icon
                              icon="bitcoin-icons:verify-filled"
                              color="#3d9ffb"
                            />
                          </div>
                          <p className="text-sm text-[#AEAEAE]">Follow you</p>
                        </div>
                      </div>
                      <button
                        className={`${
                          user.isFollowing === true
                            ? "bg-[#F5F5F5] text-[#9E9E9E]"
                            : "bg-[#0094FF] text-white "
                        } rounded-3xl px-3 py-2`}
                        onClick={() => {
                          setUserId(user.id);
                          if (user?.isFollowing === true) {
                            unFollow();
                          } else {
                            follow();
                          }
                        }}
                      >
                        <p className="text-[10px]">
                          {user.isFollowing === true ? "Following" : "Follow"}
                        </p>
                      </button>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
        {!!likes && (
          <LikesModal closeModal={closeUpload} isOpen={!!likes} data={likes} />
        )}
      </div>
    </div>
  );
};

export default FavoriteScreen;
