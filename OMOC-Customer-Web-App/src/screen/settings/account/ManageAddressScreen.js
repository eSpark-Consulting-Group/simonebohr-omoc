import React, { useEffect, useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductSublyApi from "../../../helper/ProductApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../utils/Loader";

const ManageAddressScreen = () => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const addressId = useLocation();

  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [selectAddress, setSelectAddress] = useState(
    addressId.state ? addressId.state : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  function refreshPage() {
    window.location.reload();
  }
  async function deleteAddressApi() {
    setIsLoading(true);
    const id = selectAddress;
    await ProductSublyApi.deleteAddress(token, id).then((response) => {
      setIsLoading(false);
      // console.log("-------DELETE", response);
      if (response.statusCode == 200) {
        toast.success(response.message);
        refreshPage();
      }
    });
  }

  useEffect(() => {
    async function addressListHandle() {
      setIsLoading(true);
      await ProductSublyApi.fetchAddressList(token).then((response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          setAddressList(response.data);
        }
      });
    }
    addressListHandle();
  }, []);
  return (
    <div>
      {isLoading ? <Loader /> : ""}
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
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-medium">
                      {strings.MANAGE_DELIVERY_ADDRESS}
                    </p>
                    <button
                      className="bg-[#0094FF] w-32 rounded-[32px] h-9 flex items-center justify-center gap-2"
                      onClick={() => {
                        navigate(
                          "/Setting/Manage-Delivery-Address/Add-New-Address"
                        );
                      }}
                    >
                      <Icon
                        color="white"
                        width={12}
                        height={12}
                        icon="mingcute:add-line"
                      />
                      <p className="text-xs text-white">
                        {strings.ADD_ADDRESS}
                      </p>
                    </button>
                  </div>
                  {addressList && addressList.length > 0
                    ? addressList.map((val, index) => {
                        return (
                          <div
                            onClick={() => {
                              setSelectAddress(val._id);
                            }}
                            className={`${
                              selectAddress == val._id
                                ? " border-[#0094FF]"
                                : "border-[#F2F2F2]"
                            } flex justify-between mt-3 p-3 border-[1px]  rounded-xl relative `}
                          >
                            <div className="flex gap-3">
                              <Icon
                                width={24}
                                height={34}
                                className="mt-2"
                                icon={val.icon}
                              />
                              <div>
                                <div className="flex gap-2">
                                  <p className="font-bold">{val.name}</p>
                                  {val.isPrimary && (
                                    <div className="bg-[#E8F5FF] rounded-3xl flex items-center justify-center px-2">
                                      <p className="text-[#0094FF] text-[10px]">
                                        Primary Address
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <p className="text-[#9E9E9E] font-medium my-2">
                                  {val.phoneNumber}
                                </p>
                                <p className="text-[#9E9E9E] font-medium">
                                  {val.address}
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              {showInfo && val._id === selectAddress && (
                                <div className="bg-white p-4 rounded-xl shadow-lg mt-3 absolute right-8 top-7 z-10">
                                  <p className="font-medium text-xs cursor-pointer">
                                    {strings.SET_AS_DEFAULT_ADDRESS}
                                  </p>
                                  <p
                                    className="font-medium text-xs my-3 cursor-pointer"
                                    onClick={() => {
                                      navigate("/Edit-Address", { state: val });
                                    }}
                                  >
                                    {strings.EDIT_ADDRESS}
                                  </p>
                                  <p
                                    className="font-medium text-xs text-[#C80000] cursor-pointer"
                                    onClick={() => {
                                      deleteAddressApi();
                                    }}
                                  >
                                    {strings.DELETE}
                                  </p>
                                </div>
                              )}
                              <Icon
                                className="cursor-pointer"
                                icon="ph:dots-three-vertical-bold"
                                onClick={() => {
                                  setShowInfo(!showInfo);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })
                    : ""}
                  {addressList.length == 0 && (
                    <p className="text-center text-sm font-medium text-gray-500 py-3">
                      {strings.NO_RECORD_FOUND}
                    </p>
                  )}
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

export default ManageAddressScreen;
