import React, { useState } from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import profile from "../../../assets/image/Ellipse 647.png";
import EmployeeList from "./EmployeeList";
import AddReason from "./AddReason";

function VideoHelp() {
  const [openModal, setOpenModal] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [addReasonModal, setAddReasonModal] = useState(false);
  return (
    <>
      <div className={`bg-[#F2F2F2] h-full`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <Grid container spacing={2}>
            <Grid item md={3} xs={12} className="w-full">
              <SideMenuBar />
            </Grid>
            <Grid item md={9} xs={12}>
              <div className="w-full">
                <div className="flex justify-between items-center mt-5 max-sm:flex-wrap gap-4">
                  <div>
                    <h2 className="font-bold text-[32px]">
                      {strings.SETUP_VIDEO_HELP}
                    </h2>
                    <p className="text-[#7A7A7A] text-sm">
                      {strings.MAKE_A_REASON_THAT_WILL}
                    </p>
                  </div>
                  <button
                    onClick={() => setAddReasonModal(true)}
                    className="flex justify-center items-center bg-[#0094FF] px-6 py-3 rounded-[32px] gap-3"
                  >
                    <Icon icon="mi:add" color="white" />
                    <p className="text-white">{strings.ADD_REASON}</p>
                  </button>
                </div>
                <div className="relative">
                  <div className="overflow-x-auto my-2">
                    <div className="w-max">
                      <div className="bg-white flex items-center justify-between p-4 mt-6 rounded-xl w-[857px]">
                        <div className="w-full">
                          <p className="text-sm font-semibold text-center">
                            {strings.REASON}
                          </p>
                        </div>
                        <div className="w-full">
                          <p className="text-sm font-semibold text-center">
                            {strings.EMPLOYEE}
                          </p>
                        </div>
                      </div>
                      <div className="bg-white flex items-center justify-between p-4 mt-4 rounded-xl">
                        <div className="w-full">
                          <p className="text-sm font-medium text-[#464E5F]">
                            1. Certain product offerings are not available
                          </p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                          <div>
                            <span className="flex items-center">
                              <img
                                src={profile}
                                alt="profile"
                                className="w-6 h-6"
                              />
                              <img
                                src={profile}
                                alt="profile"
                                className="w-6 h-6"
                              />
                              <img
                                src={profile}
                                alt="profile"
                                className="w-6 h-6"
                              />
                              <span
                                onClick={() => setOpenList(true)}
                                className="cursor-pointer bg-[#0094FF] p-1 rounded-full w-6 h-6 text-white text-xs"
                              >
                                +5
                              </span>
                            </span>
                          </div>
                          <span className="">
                            <Icon
                              icon="bi:three-dots-vertical"
                              width="25"
                              height="25"
                              cursor={"pointer"}
                              onClick={() => setOpenModal(!openModal)}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {openModal && <OptionModal />}
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <EmployeeList openList={openList} setOpenList={setOpenList} />
        <AddReason
          addReasonModal={addReasonModal}
          setAddReasonModal={setAddReasonModal}
        />
      </div>
    </>
  );
}

export default VideoHelp;

function OptionModal() {
  return (
    <div className="bg-white shadow-2xl rounded-xl p-3 absolute right-10 w-40 top-32">
      <p className="pb-2 pt-2 px-2 hover:!text-[#0094FF] hover:bg-[#E8F5FF] rounded-xl cursor-pointer">
        {strings.EDIT_REASON}
      </p>
      <p className="pb-2 pt-2 px-2 hover:!text-[#0094FF] hover:bg-[#E8F5FF] rounded-xl cursor-pointer">
        {strings.DELETE_PRODUCT}
      </p>
    </div>
  );
}
