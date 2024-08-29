import { Icon } from "@iconify/react";
import React, { useState } from "react";
import saveIcon from "../../assets/icon/save_icon.svg";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import UserProfileSublyApi from "../../helper/UserProfileApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PostCard = ({ openLikes, openPost, data }) => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const navigate = useNavigate();
  const [postLike, setPostLike] = useState(data.isLikedByCurrentUser);

  async function like() {
    const likeData = {
      postId: data._id,
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
    <div className="my-4 bg-white p-3 rounded-lg ">
      <div className="flex justify-between items-center ">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate("/Other-Profile");
          }}
        >
          <img
            className="w-14 h-14 rounded-full"
            src={data.createdBy.profileImgUrl}
          />
          <p>{data.createdBy.userName}</p>
        </div>
        <div>
          <Icon width="16px" height="16px" icon="ph:dots-three-vertical-bold" />
        </div>
      </div>
      <div
        className="flex flex-wrap gap-1"
        onClick={() => {
          openPost();
        }}
      >
        {}
        <Container>
          <Row className="my-2">
            {data.files.length === 1 ? (
              <Col md="12" className="p-0">
                <img
                  className="my-1 rounded-lg h-[152px] w-full"
                  src={data.files[0].url}
                />
              </Col>
            ) : (
              <>
                <Col md="6" className="p-0">
                  <img
                    className="my-1 rounded-lg h-[152px] "
                    src={data?.files[0]?.url}
                  />
                </Col>
                <Col md="6">
                  <Row>
                    {data?.files?.map((item) => {
                      return (
                        <>
                          <Col md="6" className="p-0">
                            <img
                              className="ml-2 rounded-lg w-[80px] h-[72px] my-1 "
                              src={item.url}
                            />
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] mb-1">{data.caption}</p>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              openLikes();
            }}
          >
            {data.likes.map(() => {
              return (
                <img
                  className="w-8 h-8 -ml-4 border-[1px] border-white  rounded-full"
                  src={data.likes[0]?.profileImg}
                />
              );
            })}

            <p className="text-[10px] ml-1 w-28">
              Liked by{" "}
              <span className="text-[10px] font-medium">
                {data.likes[0]?.name}
              </span>{" "}
              and{" "}
              {
                <span className="text-[10px] font-medium">
                  {" "}
                  {data.likesCount} others
                </span>
              }
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <img src={saveIcon} />
          <Icon
            icon={
              postLike === true
                ? "emojione:red-heart"
                : "fluent:heart-28-regular"
            }
            onClick={() => {
              setPostLike(postLike);
              like();
            }}
          />
          <Icon icon="mynaui:chat-messages" />
          <Icon icon="mingcute:send-line" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
