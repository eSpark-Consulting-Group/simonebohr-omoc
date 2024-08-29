import React, { useEffect, useState } from "react";
import { placeholder, strings } from "../../utils/strings";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import { toast } from "react-toastify";
import Header from "../commonComponent/Header";
import { Col, Container, Row } from "react-bootstrap";
import SubTotalComponent from "../commonComponent/SubTotalComponent";
import MainFooter from "./MainFooter";
import SettingsSideBar from "../commonComponent/SettingsSideBar";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";

const EditAddress = ({ setting }) => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [nameValue, setNameValue] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const addressData = location.state;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (addressData) {
      setNameValue(addressData.name || "");
      setAddress(addressData.address || "");
      setRegion(addressData.region || "");
      setPhone(addressData.phoneNumber || "");
      setCity(addressData.city || "");
      setZipCode(addressData.zipCode || "");
      setCountry(addressData.country || "");
    }
  }, [addressData]);
  // =============Add New Address API===============
  async function addAddressHandle() {
    setIsLoading(true);
    const requestData = {
      name: nameValue,
      address: address,
      region: region,
      phoneNumber: phone,
      city: city,
      zipCode: zipCode,
      country: country,
    };
    const id = addressData._id;
    await ProductSublyApi.upDateAddress(requestData, token, id).then(
      (response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          toast.success(response.message);
          navigate("/Setting/Manage-Delivery-Address", {
            state: response._id,
          });
        } else {
          toast.error(response.data.message);
        }
      }
    );
  }

  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <div className=" px-20 max-md:px-6 bg-[#F8F9FD] py-5">
        <p className="text-[32px] font-bold ml-2 mb-3 ">{strings.SETTINGS}</p>
        <Container className="py-4" fluid>
          <Row>
            <Col md="3">
              <SettingsSideBar />
            </Col>
            <Col lg="9">
              <div className="bg-white rounded-xl p-3">
                <p className="text-2xl font-bold ">{strings.EDIT_ADDRESS}</p>
                <div className="pt-1 isDisabled">
                  <input
                    placeholder={placeholder.NAME}
                    value={nameValue}
                    onChange={(e) => {
                      setNameValue(e.target.value);
                    }}
                    className="border-[1px] rounded-[14px] w-full p-3 mt-3"
                  />
                  <input
                    placeholder={placeholder.ADDRESS}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    className="border-[1px] rounded-[14px] w-full p-3 mt-3"
                  />
                  <input
                    placeholder={placeholder.STATE}
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value);
                    }}
                    className="border-[1px] rounded-[14px] w-full p-3 mt-3"
                  />
                  <input
                    placeholder={placeholder.PHONE_NUMBER}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className="border-[1px] rounded-[14px] w-full p-3 mt-3"
                  />
                  <input
                    placeholder={placeholder.CITY}
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    className="border-[1px] rounded-[14px] w-full p-3 mt-3"
                  />
                  <input
                    placeholder={placeholder.ZIP_CODE}
                    value={zipCode}
                    onChange={(e) => {
                      setZipCode(e.target.value);
                    }}
                    className="border-[1px] rounded-[14px] w-full p-3 mt-3"
                  />
                  <input
                    placeholder={placeholder.COUNTRY}
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    className="border-[1px] rounded-[14px] w-full p-3 mt-3"
                  />
                  <div className="flex items-center gap-2 mt-4">
                    <input type="checkbox" />
                    <p className="text-xs text-[#0094FF] font-medium">
                      {strings.SET_AS_PRIMARY_ADDRESS}
                    </p>
                  </div>
                  <p className="text-xl font-bold mt-4">{strings.PIN_ON_MAP}</p>
                  <div className="bg-white rounded-xl"></div>
                  <button
                    onClick={() => addAddressHandle()}
                    disabled={
                      nameValue &&
                      address &&
                      region &&
                      phone &&
                      city &&
                      zipCode &&
                      country
                        ? false
                        : true
                    }
                    className="bg-[#0094FF] text-white rounded-3xl py-3 w-1/3 my-4"
                  >
                    <p className="font-medium">{strings.SAVE}</p>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default EditAddress;
