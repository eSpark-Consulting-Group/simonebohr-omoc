import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/icon/omoc_logo.svg";
import { placeholder, strings } from "../../utils/strings";
import LoginGoogleButton from "../../component/commonComponent/LoginGoogleButton";
import CustomInputBox from "../../component/commonComponent/CustomInputBox";
import CustomButton from "../../component/commonComponent/CustomButton";
import Footer from "../../component/authComponent/Footer";
import loginBg1 from "../../assets/images/Frame 1000005441 (3).png";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import AuthSublyApi from "../../helper/AuthApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";

const ForgotScreen = () => {
  const { token } = useSelector((state) => state.userData.userDetails);

  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function forgotPass() {
    setIsLoading(true);
    const userData = {
      email: userEmail,
    };
    await AuthSublyApi.forgotPassword(token, userData).then((response) => {
      setIsLoading(false);
      if (response.statusCode == 200) {
        toast.success(response.message);
        navigate("/EmailVerification", {
          state: userEmail,
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
                      {strings.FORGOT_PASSWORD}
                    </h1>
                    <p className="font-medium text-base text-gray-400 mt-4">
                      {strings.NO_WORRIES_WE_SEND_RESER_PASSWOED}
                    </p>

                    <div className="mt-5">
                      <input
                        className="w-full h-14 bg-[#F5F5F5] px-4 rounded-3xl text-sm font-normal"
                        placeholder={placeholder.EMAIL_PHONE}
                        // type={isEmail ? "email" : "password"}
                        value={userEmail}
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                        }}
                      />
                      {/* <CustomInputBox placeholder={placeholder.EMAIL_PHONE} /> */}
                    </div>

                    <div className="mt-3">
                      <button
                        className="w-full bg-[#0094FF] h-12 rounded-3xl "
                        onClick={() => {
                          forgotPass();
                        }}
                      >
                        <p className="text-[#FFFFFF] text-base">
                          {strings.SEND}
                        </p>
                      </button>
                    </div>
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

export default ForgotScreen;
