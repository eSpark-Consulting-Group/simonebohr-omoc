import React, { useEffect, useState } from "react";
import OrderInvoiceHeader from "../../component/OrderInvoiceHeader";
import OrderInvoiceSubHeader from "../../component/OrderInvoiceSubHeader";
import ShopOrderItem from "../../component/ShopOrderItem";
import { placeholder, strings } from "../../utils/strings";
import setting from "../../assets/icon/setting-2.svg";
import "./OrdersScreen.css";
import calender from "../../assets/icon/calendar.svg";
import CallChatNavigator from "../../component/CallChatNavigator";
import Header from "../../component/Header";
import SideMenuBar from "../../component/SIdeMenuBar";
import { Container, Grid } from "@mui/material";
import Modal from "react-modal";
import ChangeSolutionModal from "./ChangeSolutionModal";
import ConfirmModal from "./ConfirmModal";
import DeclineSubmissionModal from "./DeclineSubmissionModal";
import ReturnAddressModal from "./ReturnAddressModal";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import Loader from "../../utils/Loader";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "33%",
  },
};
function OrderComplain() {
  let subtitle;
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submission, setSubmission] = useState(false);
  const [returnAddress, setReturnAddress] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newOrderList, setNewOrderList] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  function afterOpenModal() {
    subtitle.style.color = "#000";
  }
  function closeModal() {
    setShowChangeModal(false);
    setShowConfirmModal(false);
    setSubmission(false);
    setReturnAddress(false);
    setShowConfirm(false);
  }

  const handleShowChange = () => {
    setShowChangeModal(true);
  };
  const handleShowConfirm = (value) => {
    if (value == 1) {
      setShowConfirmModal(true);
      setShowChangeModal(false);
    } else if (value == 2) {
      setShowConfirm(true);
      setShowChangeModal(false);
    } else if (value == 3) {
      setSubmission(true);
      setShowChangeModal(false);
    }
  };
  const handleSubmission = () => {
    setReturnAddress(true);
    setShowConfirmModal(false);
    setSubmission(false);
  };

  // ===============Order API for new order==============
  useEffect(() => {
    async function fetchOrderList() {
      setIsLoader(true);
      await ProductSublyApi.fetchOrderList(_id, "complain", token).then(
        (response) => {
          setIsLoader(false);
          if (response.statusCode == 200) {
            setNewOrderList(response.data);
          }
        }
      );
    }
    fetchOrderList();
  }, []);
  const response = [
    {
      key: 1,
      btnName: strings.ACCEPT_SUBMISSION,
      btnName2: strings.CHANGE_A_SOLUTION,
      message: "The buyer has requested a $100 refund",
    },
    {
      key: 2,
      btnName: strings.REQUEST_TO_PICKUP,
      btnName2: null,
      message: "Return Accepted",
    },
    {
      key: 3,
      btnName: strings.CHAT_BUYER,
      btnName2: strings.TRACK_ORDER,
      message: "The buyer has requested a product return",
    },
  ];
  return (
    <>
      {isLoader ? <Loader /> : ""}
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
              <div className="w-full pt-5">
                <div className="bg-[#F2F2F2] h-full">
                  <div className="flex justify-between items-center max-sm:flex-wrap">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">
                        {strings.ORDER_LIST_DASH}
                      </h2>
                      <p className="font-normal text-sm text-gray-500">
                        {strings.MANAGE_YOUR_ORDER}
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-2 max-sm:mt-4">
                      <div className="rounded-xl bg-white flex justify-center items-center gap-2 py-3 px-4">
                        <img src={calender} alt="calender" />
                        <p>20 Febuary 2023 - 20 March 2023</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <OrderInvoiceHeader />
                  </div>
                  {newOrderList && newOrderList.length > 0 && (
                    <div>
                      <OrderInvoiceSubHeader
                        placeholderText={placeholder.SEARCH_ORDER}
                        btnText={strings.ADD_TO_THE_PACK}
                        dropdownText={"Sort (newest)"}
                        delivered={true}
                      />
                    </div>
                  )}
                  <div className="max-h-[620px] overflow-auto">
                    {newOrderList && newOrderList.length > 0
                      ? newOrderList.map((items, index) => (
                          <ShopOrderItem
                            btnText={strings.ACCEPT_SUBMISSION}
                            isComplain={true}
                            showModal={handleShowChange}
                            items={items}
                            index={index}
                          />
                        ))
                      : ""}
                  </div>
                  {newOrderList.length == 0 && (
                    <p className="text-center text-sm font-medium text-gray-500 py-3">
                      {strings.NO_RECORD_FOUND}
                    </p>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <Modal
          isOpen={showChangeModal}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Change Solution Modal"
        >
          <div ref={(_subtitle) => (subtitle = _subtitle)}>
            {
              <ChangeSolutionModal
                onClickNext={handleShowConfirm}
                closeModal={closeModal}
              />
            }
          </div>
        </Modal>
        {showChangeModal && (
          <Modal
            isOpen={showChangeModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Change Solution Modal"
          >
            <div ref={(_subtitle) => (subtitle = _subtitle)}>
              {
                <ChangeSolutionModal
                  onClickNext={handleShowConfirm}
                  closeModal={closeModal}
                />
              }
            </div>
          </Modal>
        )}
        <Modal
          isOpen={showConfirmModal}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Confirm Modal"
        >
          <div ref={(_subtitle) => (subtitle = _subtitle)}>
            {
              <ConfirmModal
                submission={handleSubmission}
                closeModal={closeModal}
                returnFunds={false}
              />
            }
          </div>
        </Modal>
        {showConfirm && (
          <Modal
            isOpen={showConfirm}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Confirm Modal"
          >
            <div ref={(_subtitle) => (subtitle = _subtitle)}>
              {
                <ConfirmModal
                  returnFunds={true}
                  submission={handleSubmission}
                  closeModal={closeModal}
                />
              }
            </div>
          </Modal>
        )}
        <Modal
          isOpen={submission}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="DeclineSubmissionModal"
        >
          <div ref={(_subtitle) => (subtitle = _subtitle)}>
            {<DeclineSubmissionModal closeModal={closeModal} />}
          </div>
        </Modal>
        {returnAddress && (
          <Modal
            isOpen={returnAddress}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="DeclineSubmissionModal"
          >
            <div ref={(_subtitle) => (subtitle = _subtitle)}>
              {<ReturnAddressModal closeModal={closeModal} />}
            </div>
          </Modal>
        )}
      </div>
      <div className="bottom-10 right-14 fixed">
        <CallChatNavigator />
      </div>
    </>
  );
}

export default OrderComplain;
