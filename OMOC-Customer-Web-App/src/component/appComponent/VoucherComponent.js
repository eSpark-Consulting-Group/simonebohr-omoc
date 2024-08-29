import React, { useEffect, useState } from "react";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import { Col, Container, Row } from "react-bootstrap";
import SubTotalComponent from "../commonComponent/SubTotalComponent";
import { useNavigate, useParams, useLocation } from "react-router";
import Header from "../commonComponent/Header";
import ProductSublyApi from "../../helper/ProductApi";
import { useSelector } from "react-redux";
const data = [1, 2, 3, 4];

const VoucherComponent = ({ showSelect, ShowVoucher }) => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const { addressId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const productIds = location.state;
  const [voucherData, setVoucherData] = useState();
  const [selectVoucher, setSelectVoucher] = useState();
  useEffect(() => {
    async function getVoucher() {
      await ProductSublyApi.fetchVoucher(token, {
        productIds: productIds.map((product) => {
          return product.id;
        }),
      }).then((response) => {
        setVoucherData(response.data);
      });
    }
    getVoucher();
  }, []);
  return (
    <div>
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <div className=" px-20 max-md:px-6 bg-[#F8F9FD]">
        <Container fluid>
          <Row>
            <Col lg="9">
              <div className="bg-white rounded-xl p-3 my-4">
                <p className="text-xl font-bold">{strings.SELECT_VOUCHER}</p>
                {voucherData?.vouchers?.map((voucher) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectVoucher(voucher._id);
                      }}
                      className={`${
                        selectVoucher == voucher._id
                          ? " border-[#0094FF]"
                          : "border-[#F2F2F2]"
                      } mt-5 border-[1px] rounded-xl border-[1px]  p-3 hover:border-[#0094FF]`}
                    >
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#F1F1F1] flex justify-center items-center">
                          <Icon
                            color="#0094FF"
                            width={10}
                            icon="streamline:discount-percent-coupon"
                          />
                        </div>
                        <p className="font-bold">{voucher.name}</p>
                        <div className="bg-[#E8F5FF] rounded-3xl	flex items-center px-2">
                          <p className="text-[10px] font-medium text-center text-[#0094FF]">
                            {voucher.quantity} Voucher
                          </p>
                        </div>
                      </div>
                      <div className="ml-10 my-3 w-80	leading-7	">
                        <p className="text-[#9E9E9E] font-medium">
                          Lorem ipsum dolor sit amet consectetur. Sapien ac
                          sollicitudin egestas.
                        </p>
                        <p className="text-[#9E9E9E] font-medium">
                          Ends in 9 hours!
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col lg="3">
              <SubTotalComponent
                btnText={"Select Payment Method"}
                btnClick={() => {
                  navigate("/Checkout", { state: addressId });
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default VoucherComponent;
