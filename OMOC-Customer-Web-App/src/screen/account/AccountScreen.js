import React, { useEffect, useState } from "react";
import Header from "../../component/commonComponent/Header";
import AccountHeader from "../../component/commonComponent/AccountHeader";
import { strings } from "../../utils/strings";
import PostCard from "../../component/commonComponent/PostCard";
import { Col, Container, Row } from "react-bootstrap";
import MainFooter from "../../component/appComponent/MainFooter";
import WishListCard from "../../component/commonComponent/WishListCard";
import LikesModal from "../../component/appComponent/LikesModal";
import PostModal from "../../component/appComponent/PostModal";
import ProductSublyApi from "../../helper/ProductApi";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import CreatePostModal from "../../component/appComponent/CreatePostModal";
import CreatePost from "./CreatePost";
import CustomOrderSettiing from "./CustomOrderSetting";
import TagProductModal from "./TagProductModal";
import TagProduct from "./TagProduct";
import PublishNowModal from "./PublishNowModal";
import CreateStories from "./CreateStories";
import EditClipModal from "./EditClipModal";
import UserProfileSublyApi from "../../helper/UserProfileApi";
import { toast } from "react-toastify";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const AccountScreen = () => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [activeTab, setActiveTab] = useState(1);
  const [openUpload, setOpenUpload] = useState(false);
  const [likes, setLikes] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [wishCategory, setWishCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [orderSetting, setOrderSetting] = useState(false);
  const [openTagProductModal, setOpenTagProductModal] = useState(false);
  const [isTagProduct, setIsTagProduct] = useState(false);
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const [createStory, setCreateStory] = useState(false);
  const [openEditClip, setOpenEditClip] = useState(false);
  const [storyClipBtn, setStoryClipBtn] = useState(1);
  const [page, setPage] = useState("");
  const [pageSize, setPageSize] = useState(15);
  const [sortValue, setSortValue] = useState({
    status: true,
    text: "Sorty By",
  });
  const [postData, setPostData] = useState();

  const [imageFile, setImageFile] = useState([]);
  const [postContent, setPostContent] = useState();
  // ============API for creating seller post============
  const createPostHandler = async () => {
    const requestData = {
      files: imageFile,
      tags: ["65d60f4a36cd981d289d5ea5"],
      hideLikeViewCount: true,
      isCommentingOff: true,
      isSensitiveContent: true,
      caption: postContent,
    };
    await UserProfileSublyApi.createPostHandle(requestData, token).then(
      (response) => {
        if (response.statusCode == 200) {
          toast.success(response.message);
          window.location.reload();
        } else {
          toast.error(response.data.message);
        }
      }
    );
  };

  const handleUpload = () => {
    setOpenUpload(true);
  };
  const closeUpload = () => {
    setOpenUpload(false);
    setLikes(false);
    setPostModal(false);
  };
  const handleLikes = () => {
    setLikes(true);
  };
  const handlePost = () => {
    setPostModal(true);
  };

  useEffect(() => {
    fetchWishItem();
    getPost();
  }, [showModal]);

  async function fetchWishItem() {
    setIsLoading(true);
    await ProductSublyApi.fetchWishCategory(token).then((response) => {
      setIsLoading(false);
      if (response.statusCode == 200) {
        setWishCategory(response.data);
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
  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <div>
        <AccountHeader myProfile={true} openUpload={handleUpload} />
      </div>
      <div className="bg-[#F8F9FD] px-20 max-md:px-6">
        <div className="flex gap-20 py-10">
          <div
            className={`${
              activeTab === 1
                ? "border-b-[1px] border-[#0094FF] text-[#0094FF]"
                : "text-[#AEAEAE]"
            } px-2 cursor-pointer`}
            onClick={() => {
              setActiveTab(1);
            }}
          >
            <p className="text-lg">{strings.POST}</p>
          </div>
          <div
            className={`${
              activeTab === 2
                ? "border-b-[1px] border-[#0094FF] text-[#0094FF]"
                : "text-[#AEAEAE]"
            } px-2 cursor-pointer`}
            onClick={() => {
              setActiveTab(2);
            }}
          >
            <p className="text-lg">{strings.WISHLIST}</p>
          </div>
        </div>
        <Container fluid>
          <Row>
            {postData?.map((item) => {
              return (
                <Col xxl="3" lg="4" md="6">
                  {activeTab === 1 && (
                    <PostCard
                      data={item}
                      openPost={handlePost}
                      openLikes={handleLikes}
                    />
                  )}
                </Col>
              );
            })}
          </Row>
        </Container>
        <Container fluid>
          <Row>
            {wishCategory?.length > 0
              ? wishCategory.map((val, index) => {
                  return (
                    <Col xxl="3" lg="4" md="6">
                      {activeTab === 2 && (
                        <WishListCard
                          path={"/All-Product"}
                          productName={val.name}
                          count={val.count}
                          id={val.id}
                          image={val.thumbnail}
                        />
                      )}
                    </Col>
                  );
                })
              : ""}
          </Row>
        </Container>
      </div>
      <MainFooter />
      {openUpload && (
        <CreatePostModal
          createPostModal={openUpload}
          setCreatePost={() => {
            setCreatePost(true);
          }}
          onClose={() => {
            setOpenUpload(false);
          }}
          setCreateStory={() => {
            setCreateStory(true);
          }}
        />
      )}

      {likes && <LikesModal closeModal={closeUpload} isOpen={likes} />}
      {postModal && <PostModal isOpen={postModal} closeModal={closeUpload} />}
      <CreatePost
        isOpen={createPost}
        modalClose={() => {
          setCreatePost(false);
        }}
        OrderSetting={() => {
          setOrderSetting(true);
        }}
        setOpenTagProductModal={() => {
          setOpenTagProductModal(true);
          setCreatePost(false);
        }}
        setOpenPublishModal={setOpenPublishModal}
        setImageFile={setImageFile}
        imageFile={imageFile}
        setPostContent={setPostContent}
        postContent={postContent}
      />
      <CustomOrderSettiing
        orderSetting={orderSetting}
        setOrderSetting={setOrderSetting}
      />
      <TagProductModal
        setOpenTagProductModal={setOpenTagProductModal}
        openTagProductModal={openTagProductModal}
        isTagProduct={isTagProduct}
        setIsTagProduct={setIsTagProduct}
      />
      <TagProduct
        isTagProduct={isTagProduct}
        setIsTagProduct={setIsTagProduct}
      />
      <CreateStories
        isOpen={createStory}
        onClose={() => {
          setCreateStory(false);
        }}
        setOpenEditClip={() => {
          setOpenEditClip(true);
        }}
        setStoryClipBtn={setStoryClipBtn}
        setOpenPublishModal={setOpenPublishModal}
      />
      <EditClipModal
        openEditClip={openEditClip}
        setOpenEditClip={() => {
          setOpenEditClip(false);
        }}
        storyClipBtn={storyClipBtn}
      />
      <PublishNowModal
        openPublishModal={openPublishModal}
        setOpenPublishModal={() => {
          setOpenPublishModal(true);
          setCreatePost(false);
        }}
        setOpenEditClip={setOpenEditClip}
        setStoryClipBtn={setStoryClipBtn}
        clickBtn={createPostHandler}
      />
    </div>
  );
};

export default AccountScreen;
