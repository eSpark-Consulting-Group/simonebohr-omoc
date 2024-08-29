import React, { useState } from "react";
import Header from "../../component/commonComponent/Header";
import AccountHeader from "../../component/commonComponent/AccountHeader";
import { strings } from "../../utils/strings";
import PostCard from "../../component/commonComponent/PostCard";
import { Col, Container, Row } from "react-bootstrap";
import MainFooter from "../../component/appComponent/MainFooter";
import WishListCard from "../../component/commonComponent/WishListCard";
import UploadModal from "../../component/appComponent/UploadModal";
import LikesModal from "../../component/appComponent/LikesModal";
import PostModal from "../../component/appComponent/PostModal";
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const OtherProfile = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [likes, setLikes] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const closeUpload = () => {
    setLikes(false);
    setPostModal(false);
  };
  const handleLikes = () => {
    setLikes(true);
  };
  const handlePost = () => {
    setPostModal(true);
  };
  return (
    <div>
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <AccountHeader otherProfile={true} />
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
            {data.map(() => {
              return (
                <Col xxl="3" lg="4" md="6">
                  {activeTab === 1 && (
                    <PostCard openPost={handlePost} openLikes={handleLikes} />
                  )}
                </Col>
              );
            })}
          </Row>
        </Container>
        <Container fluid>
          <Row>
            {data.map(() => {
              return (
                <Col xxl="3" lg="4" md="6">
                  {activeTab === 2 && <WishListCard />}
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <MainFooter />

      {likes && <LikesModal closeModal={closeUpload} isOpen={likes} />}
      {postModal && <PostModal isOpen={postModal} closeModal={closeUpload} />}
    </div>
  );
};

export default OtherProfile;
