import React from "react";
import profile from "../../assets/images/profile_pic.png";
import { Icon } from "@iconify/react";
import { Col, Container, Row } from "react-bootstrap";
import { strings } from "../../utils/strings";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartStorage } from "../../Store/Slices/ProductSlice";
import { deleteUserDetails } from "../../Store/Slices/AuthSlice";

const data = [
  {
    icon: "fluent:vehicle-truck-bag-20-regular",
    heading: "My Order",
    path: "/Myorder",
  },
  {
    icon: "fluent:vehicle-truck-bag-20-regular",
    heading: "Livestream",
    path: "",
  },
  {
    icon: "fluent:vehicle-truck-bag-20-regular  ",
    heading: "Wishlist",
    path: "/Wishlist",
  },
  {
    icon: "ph:heart",
    heading: "Favorite/feeds",
    path: "/Favorite",
  },
  {
    icon: "solar:bag-2-broken",
    heading: "Shop With Friends",
    path: "",
  },
  {
    icon: "solar:video-frame-play-horizontal-linear",
    heading: "Video",
    path: "",
  },
  {
    icon: "uil:setting",
    heading: "Settings",
    path: "/Setting",
  },
];

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userData.userDetails);
  function logoutHandle() {
    dispatch(deleteCartStorage());
    dispatch(deleteUserDetails());
    localStorage.clear();
    navigate("/");
  }
  return (
    <div className="profileResponsive bg-white rounded-2xl absolute mt-20 p-3 z-10">
      <div className="flex justify-between items-center p-3 bg-[#F6F6F6] rounded-lg	">
        <div
          className="flex items-center gap-2"
          onClick={() => {
            navigate("/Account");
          }}
        >
          <img
            className="rounded-full w-[40px] h-[40px]"
            src={user?.profileImg}
          />
          {user?.userName || user?.name}
        </div>
        <Icon
          cursor="pointer"
          width="24px"
          height="24px"
          icon="uil:setting"
          onClick={() => {
            navigate("/Setting");
          }}
        />
      </div>
      <div>
        <Container>
          <Row>
            {data.map((val, index) => {
              return (
                <Col sm="6">
                  <div
                    className="flex items-center gap-3 border-b-[1px] cursor-pointer py-3"
                    onClick={() => {
                      navigate(val.path);
                    }}
                  >
                    <div className="h-6 w-6 rounded-full bg-[#E5F4FF] flex items-center justify-center">
                      <Icon color="#0094FF" icon={val.icon} />
                    </div>
                    <p className="text-sm font-medium">{val.heading}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
        <div className="flex items-center gap-2 mt-3 ml-3 cursor-pointer">
          <div className="bg-[#F9E5E5] h-6 w-6 rounded-full flex items-center justify-center ">
            <Icon color="#C80000" icon="solar:logout-outline" />
          </div>
          <p onClick={() => logoutHandle()} className="text-[#C80000]">
            {strings.LOGOUT}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
