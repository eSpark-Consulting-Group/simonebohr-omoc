import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import loginBg1 from "../../assets/images/Frame 1000005441 (3).png";
import { placeholder, strings } from "../../utils/strings";
import profileIcon from "../../assets/icon/profile.svg";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";

const SetUpPhone = () => {
  const navigate = useNavigate();
  const [userPhone, setUserPhone] = useState("");
  const [countryCode, setcountryCode] = useState("");
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="6">
            <div className="flex items-center justify-center h-full">
              <div className="p-5 ">
                <div className="flex justify-between">
                  <Icon icon="ep:arrow-up" rotate={3} />
                  <p className="text-[28px] font-medium">
                    {strings.SETUP_ACCOUNT}
                  </p>
                  <p></p>
                </div>
                <div className="">
                  <p className="text-center my-2 text-[#0094FF] text-[28px] font-bold">
                    {strings.SETUP_PHONE_NUMBER}
                  </p>
                  <div className=" my-3 flex justify-center">
                    <p className="text-sm text-[#757575] w-full">
                      {strings.BECAUSE_OUSIGNUP_GOOGLE_WEE_NEED_TO_YOUR_NUMBER}
                    </p>
                  </div>
                  <div className="mt-3 rounded-full ">
                    <PhoneInput
                      enableSearch={true}
                      containerStyle={{
                        width: "100%",
                        height: "50px",
                        backgroundColor: "#F5F5F5",
                        borderRadius: "50px",
                        borderRadius: "25px",
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        height: "56px",
                      }}
                      inputStyle={{
                        border: "none",
                        outline: "none",
                        width: "100%",
                        boxShadow: "none",
                        backgroundColor: "transparent",
                      }}
                      buttonStyle={{
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      country={"in"}
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true,
                      }}
                      onChange={(value, country) => {
                        let dial = country.dialCode;
                        let phone = value.slice(dial.length, value.length);
                        setUserPhone(phone);
                        setcountryCode(dial);
                      }}
                    />
                  </div>

                  <div className="items-center w-full  flex mt-3">
                    <button
                      className="rounded-3xl bg-[#0094FF] w-full mx-auto py-[14px]"
                      onClick={() => {
                        navigate("/Verification");
                      }}
                    >
                      <p className="text-white">{strings.SAVE_CHANGES}</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6" className="relative">
            <img className="w-full h-screen" src={loginBg1} />
            <div className=" absolute bottom-10 right-10 flex">
              <button
                className=" mr-3 bg-[#fff] h-[72px] w-[72px] rounded-full shadow-2xl flex justify-center items-center"
                // onClick={prevSlide}
              >
                <Icon icon="ep:arrow-up" color="blue" rotate={3} />
              </button>
              <button
                className="bg-[#fff] h-[72px] w-[72px] rounded-full shadow-2xl flex justify-center items-center"
                // onClick={nextSlide}
              >
                <Icon icon="ep:arrow-up" color="blue" rotate={1} />
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SetUpPhone;
