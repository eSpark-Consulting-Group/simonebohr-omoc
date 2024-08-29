import React, { useState } from "react";
import OtpInput from "react-otp-input";

import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/icon/omoc_logo.svg";
import { placeholder, strings } from "../../utils/strings";
import LoginGoogleButton from "../../component/commonComponent/LoginGoogleButton";
import CustomInputBox from "../../component/commonComponent/CustomInputBox";
import CustomButton from "../../component/commonComponent/CustomButton";
import Footer from "../../component/authComponent/Footer";
import loginBg1 from "../../assets/images/Frame 1000005441 (3).png";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthSublyApi from "../../helper/AuthApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";

const EmailVerifyScreen = () => {
  const { token } = useSelector((state) => state.userData.userDetails);

  const userEmail = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [forgotEmail, setForgotEmail] = useState(userEmail.state);
  const [newToken, setNewToken] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function resetPassword() {
    setIsLoading(true);
    const resetData = {
      email: forgotEmail,
      otp: otp,
    };
    await AuthSublyApi.otpResetPassword(token, resetData).then((response) => {
      setIsLoading(false);
      if (response.statusCode == 200) {
        console.log(response.data.token);
        setNewToken(response.data.token);
        toast.success(response.message);
        navigate("/Change-Password", {
          state: response.data.token,
        });
      } else {
        toast.error(response.data.message);
      }
    });
  }
  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <Container fluid>
        <Row className="">
          <Col md="6" className="pt-5 !px-20 max-md:mb-10">
            <Container>
              <Row>
                <Col>
                  <img src={logo} />
                  <div className="mt-16 xl:mt-16 lg:mt-7">
                    <h1 className="text-5xl font-semibold">
                      {strings.EMAIL_WAS_SEND}
                    </h1>
                    <p className=" text-base text-gray-400 mt-4 leading-7	">
                      {strings.WE_HAVE_SEND_YOU_RESET_PASSWORD_LINK}
                      <br />
                      <span className="text-[#9039FF]">
                        {" "}
                        simon@shopomoc.com
                      </span>
                    </p>
                    <p className="text-5xl font-medium my-10">04.58</p>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
                      renderSeparator={<span> </span>}
                      renderInput={(props) => <input {...props} />}
                      containerStyle={"justify-center gap-2"}
                      inputStyle={
                        "!w-20 !h-20  bg-[#F5F5F5] rounded-[10px] text-center text-3xl"
                      }
                      inputType={"number"}
                    />
                    <p className="mt-10 text-[#AEAEAE] text-lg	">
                      {strings.DONT_RECEIVE_OTP}{" "}
                      <span
                        className="text-lg font-medium text-[#0094FF] cursor-pointer"
                        onClick={() => {
                          navigate("/Change-Password");
                        }}
                      >
                        {strings.RESEND}
                      </span>
                    </p>
                    <button
                      className=" w-full bg-[#0094FF] h-12 rounded-3xl "
                      onClick={() => {
                        resetPassword();
                      }}
                    >
                      {strings.SUBMIT}
                    </button>
                  </div>
                  {/* <div className="md:block hidden w-[40%] fixed bottom-0	">
                    <Footer />
                  </div> */}
                </Col>
              </Row>
            </Container>
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
        <div className="block  md:hidden">
          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default EmailVerifyScreen;
