import React, { useEffect, useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import { strings } from "../../../utils/strings";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import cardIcon from "../../../assets/icon/card_icon.svg";
import AddCardModal from "../../../component/appComponent/AddCardModal";
import PaymentCard from "../../../component/commonComponent/PaymentCard";
import PaymentApi from "../../../helper/PaymentApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Info = () => {
  return (
    <div className="bg-white rounded-xl p-3">
      <p className="text-sm font-medium">{strings.SET_AS_DEFAULT}</p>
      <p className="text-sm font-medium">{strings.EDIT_CARD}</p>
      <p className="text-sm font-medium text-[#C80000] mt-2">
        {strings.DELETE}
      </p>
    </div>
  );
};
const PaymentMethodScreen = () => {
  const { token } = useSelector((state) => state.userData.userDetails);

  const [showInfo, setShowInfo] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [addPaymentModal, setAddPaymentModal] = useState(false);
  useEffect(() => {
    PaymentApi.getAllPayment(token)
      .then(({ data }) => {
        setCardList(data?.cards);
      })
      .catch((err) => {
        toast.error(err?.message || "");
      });
  }, []);
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
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-medium">
                      {strings.PAYMENT_METHOD}
                    </p>
                    <button
                      className="bg-[#0094FF] py-3 px-4 rounded-[32px] flex justify-center items-center gap-2"
                      onClick={() => {
                        setAddPaymentModal(true);
                      }}
                    >
                      <Icon
                        color="white"
                        width={16}
                        height={16}
                        icon="mingcute:add-line"
                      />
                      <p className="text-white text-xs">
                        {strings.ADD_PAYMENT_METHOD}
                      </p>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {cardList?.map((data) => {
                      return (
                        <div className="my-3">
                          <PaymentCard cardData={data} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {addPaymentModal && (
          <AddCardModal
            heading={strings.ADD_PAYMENT_METHOD}
            openModal={addPaymentModal}
            closeModal={() => {
              setAddPaymentModal(false);
            }}
          />
        )}
      </div>
      <MainFooter />
    </div>
  );
};

export default PaymentMethodScreen;
