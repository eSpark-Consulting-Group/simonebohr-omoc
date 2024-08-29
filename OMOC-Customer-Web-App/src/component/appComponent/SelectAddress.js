import React, { useState } from "react";
import { strings } from "../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import { Icon } from "@iconify/react";
import SubTotalComponent from "../commonComponent/SubTotalComponent";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

const SelectAddress = ({
  setNewAddress,
  showInfo,
  setShowInfo,
  ShowAddress,
  ShowVoucher,
  addressList,
}) => {
  const navigate = useNavigate();
  const addressId = useLocation();
  const [selectAddress, setSelectAddress] = useState(
    addressId.state ? addressId.state : ""
  );
  const location = useLocation();
  const productIds = location.state;

  return (
    <div>
      <Container fluid>
        <Row>
          <Col lg="9">
            <div className="bg-white rounded-xl p-3 my-4">
              <div className="flex items-center justify-between pb-3">
                <p className="text-xl	font-bold">{strings.SELECT_ADDRESS}</p>
                <button
                  className="bg-[#0094FF] w-32 rounded-[32px] h-9 flex items-center justify-center gap-2"
                  onClick={() => {
                    setNewAddress(true);
                    ShowAddress(false);
                    navigate("/Add-new-address");
                  }}
                >
                  <Icon
                    color="white"
                    width={12}
                    height={12}
                    icon="mingcute:add-line"
                  />
                  <p className="text-xs text-white">{strings.ADD_ADDRESS}</p>
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
                            icon={"openmoji:home-button"}
                          />
                          <div>
                            <div className="flex gap-2">
                              <p className="font-bold">{val.name}</p>
                              {val.primary && (
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
                          {showInfo && (
                            <div className="bg-white p-4 rounded-xl shadow-lg mt-3 absolute right-8 top-7">
                              <p className="font-medium text-xs">
                                {strings.SET_AS_DEFAULT_ADDRESS}
                              </p>
                              <p className="font-medium text-xs my-3">
                                {strings.EDIT_ADDRESS}
                              </p>
                              <p className="font-medium text-xs text-[#C80000]">
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
            <div className="bg-white rounded-xl p-3 my-4">
              <p className="text-xl font-bold">{strings.SEND_TO_YOUR_FRIEND}</p>
              <select className="w-full border-[#F2F2F2] border-[1px] p-3 rounded-xl mt-4">
                <option className="font-bold">Choose Friend</option>
              </select>
            </div>
          </Col>
          <Col lg="3">
            <SubTotalComponent
              btnText={"Select Voucher"}
              btnClick={() => {
                navigate(`/Vouchers/${selectAddress}`, { state: productIds });
              }}
              isAddress={true}
              selectAddress={selectAddress}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SelectAddress;
