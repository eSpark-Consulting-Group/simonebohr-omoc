import React, { useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartStorage } from "../../../Store/Slices/ProductSlice";
import { deleteUserDetails } from "../../../Store/Slices/AuthSlice";
import AuthSublyApi from "../../../helper/AuthApi";
import { toast } from "react-toastify";

const ManageAccountScreen = () => {
  const { token } = useSelector((state) => state.userData.userDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutHandle() {
    dispatch(deleteCartStorage());
    dispatch(deleteUserDetails());
    localStorage.clear();
    navigate("/");
  }
  async function deleteUser() {
    await AuthSublyApi.deleteUser(token).then((response) => {
      if (response.statusCode == 200) {
        toast.success(response.message);
        dispatch(deleteCartStorage());
        dispatch(deleteUserDetails());
        localStorage.clear();
        navigate("/");
      } else toast.error(response.message);
    });
  }
  return (
    <div>
      <div className="mx-20 max-md:mx-6 ">
        <Header />
      </div>
      <div className="bg-[#F8F9FD] py-5">
        <div className="px-20 max-md:px-6 pt-3">
          <p className="text-[32px] font-bold">{strings.SETTINGS}</p>
          <Container className="py-4" fluid>
            <Row>
              <Col md="3">
                <SettingsSideBar />
              </Col>
              <Col md="9">
                <div className="bg-white rounded-xl p-3">
                  <p className="text-2xl font-medium">
                    {strings.MANAGE_YOUR_ACCOUNT}
                  </p>
                  <div className="flex items-center justify-between border-b-[1px] py-3 px-2 ">
                    <p className="text-lg">{strings.ADD_ACCOUNT}</p>
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                  <div className="flex items-center justify-between py-3 px-2 ">
                    <p
                      className="text-lg text-[#C80000] cursor pointer"
                      onClick={deleteUser}
                    >
                      {strings.DELETE_YOUR_ACCOUNT}
                    </p>
                    <Icon color="#C80000" icon="ep:arrow-up" rotate={1} />
                  </div>
                  <div className="flex justify-between gap-2 mt-20">
                    <button className="border-[1px] border-[#0094FF] rounded-[24px] py-3 w-full">
                      <p className="text-[#0094FF] font-medium">
                        {strings.CHANGE_ACCOUNT}
                      </p>
                    </button>
                    <button
                      className="border-[1px] bg-[#0094FF] border-[#0094FF] rounded-[24px] py-3 w-full"
                      onClick={() => {
                        logoutHandle();
                      }}
                    >
                      <p className="text-white font-medium">{strings.LOGOUT}</p>
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default ManageAccountScreen;
