import React, { useState } from "react";
import Header from "../../../component/Header";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { Container, Grid } from "@mui/material";
import { placeholder, strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import CustomerTable from "./CustomerTable";
import AddSubscriptionModal from "./AddSubscriptionModal";
import Modal from "react-modal";
import { auto } from "@popperjs/core";
import NewOfferModal from "./NewOfferModal";
import SubscriptionDetailsModal from "./SubscriptionDetailsModal";
import SelectSubscriptionModal from "./SelectSubscriptionModal";
import CertainSubscriptionModal from "./CertainSubscriptionModal";
const CustomerScreen = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newOffer, setNewOffer] = useState(false);
  const [subsDetails, setSubsDetails] = useState(false);
  const [selectSubs, setSelectSubs] = useState(false);
  const [certain, setCertain] = useState(false);

  function closeModal() {
    setShowModal(false);
    setNewOffer(false);
    setSubsDetails(false);
    setCertain(false);
  }
  const handleModal = () => {
    // setShowModal(true);
    setSelectSubs(true);
  };
  const handleGeneralSub = () => {
    setShowModal(true);
    setSelectSubs(false);
  };
  const handlecertainSub = () => {
    setCertain(true);
    setSelectSubs(false);
  };

  const handleNewOffer = () => {
    setNewOffer(true);
    setShowModal(false);
    setCertain(false);
  };
  const handleDetails = () => {
    setSubsDetails(true);
    // alert("hello")
  };
  return (
    <div className={`!bg-[#f2f2f2] h-full`}>
      <div className=" w-full bg-[#fff] fixed top-0 z-20">
        <Header />
      </div>
      <Container className="pt-28">
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <SideMenuBar />
          </Grid>
          <Grid item md={9} xs={12}>
            <div className="flex justify-between items-center mt-5 max-sm:flex-wrap gap-4">
              <div>
                <h2 className="font-bold text-[32px]">
                  {strings.CUSTOMER_SUBSCRIBE}
                </h2>
                <p className="text-[#7A7A7A] text-sm">
                  {strings.MANAGE_SHOP_ORDER}
                </p>
              </div>
              <button
                className="flex justify-center items-center bg-[#0094FF] px-6 py-3 rounded-[32px] gap-3"
                onClick={handleModal}
              >
                <Icon icon="mi:add" color="white" />
                <p className="text-white">{strings.ADD_NEW_SUBSCRIPTION}</p>
              </button>
            </div>
            <div className="h-14 bg-white flex justify-around w-1/2 items-center rounded-lg my-5 max-sm:w-full">
              <p
                onClick={() => {
                  setActiveTab(1);
                }}
                className={`${
                  activeTab === 1 ? "text-[#0094FF] " : "text-[#C2C2C2]"
                } text-sm cursor-pointer font-semibold`}
              >
                {strings.GENERAL_SUBSCRIPTION}
              </p>
              <p
                onClick={() => {
                  setActiveTab(2);
                }}
                className={`${
                  activeTab === 2 ? "text-[#0094FF]" : "text-[#C2C2C2]"
                } text-sm cursor-pointer font-semibold`}
              >
                {strings.CERTAIN_SUBSCRIPTION}
              </p>
            </div>
            <div className="bg-white flex py-4 items-center px-3 rounded-lg justify-between gap-5 max-sm:flex-wrap">
              <div className="flex gap-4 max-sm:w-full max-sm:justify-between">
                <div className="flex items-center justify-between gap-3 h-12	border-[1px] border-[#EDEDED] rounded-[30px] p-4 max-sm:w-full">
                  <p className="text-[#7A7A7A] text-sm">
                    {strings.SUBSCRIPTION_FREQUENCY}
                  </p>
                  <Icon icon="ep:arrow-up-bold" rotate={2} />
                </div>
                <div className="flex items-center justify-between gap-3 h-12	border-[1px] border-[#EDEDED] rounded-[30px] p-4 max-sm:w-full">
                  <p className="text-[#7A7A7A] text-sm">
                    {strings.SUBSCRIPTION_STATUS}
                  </p>
                  <Icon icon="ep:arrow-up-bold" rotate={2} />
                </div>
              </div>
              <div className="flex justify-between items-center h-12	border-[1px] border-[#EDEDED] rounded-[30px] w-1/3 max-sm:w-full  p-4">
                <input
                  placeholder={placeholder.SEARCH_SUBSCRIPTION}
                  className="w-full"
                />
                <Icon icon="carbon:search" />
              </div>
            </div>
            <div className="overflow-auto">
              <div className="w-max">
                {activeTab === 2 && (
                  <CustomerTable certain={true} handleDetails={handleDetails} />
                )}
                {activeTab === 1 && (
                  <CustomerTable handleDetails={handleDetails} />
                )}
              </div>
            </div>
            {showModal && (
              <AddSubscriptionModal
                closeModal={closeModal}
                openNewOffer={handleNewOffer}
                isOpen={showModal}
              />
            )}
            {newOffer && (
              <NewOfferModal closeModal={closeModal} isOpen={newOffer} />
            )}
            {subsDetails && (
              <SubscriptionDetailsModal
                closeModal={closeModal}
                isOpen={subsDetails}
              />
            )}
            {selectSubs && (
              <SelectSubscriptionModal
                general={handleGeneralSub}
                certain={handlecertainSub}
                closeModal={closeModal}
                isOpen={selectSubs}
              />
            )}
            {certain && (
              <CertainSubscriptionModal
                certain={handlecertainSub}
                openNewOffer={handleNewOffer}
                closeModal={closeModal}
                isOpen={certain}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CustomerScreen;
