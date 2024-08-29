import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import Header from "../../../component/Header";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../utils/strings";
import ProductSublyApi from "../../../helper/ProductApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader";

const CustomizeVoucher = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userData.userDetails);
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const [getValue, setGetValue] = useState(1);
  const [email, setEmail] = useState("");
  const [voucherName, setVoucherName] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherStart, setVoucherStart] = useState("");
  const [voucherEnd, setVoucherEnd] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [freeShipping, setFreeShipping] = useState("");
  const [minimumOrder, setMinimumOrder] = useState("");
  const [voucherQuantity, setVoucherQuantity] = useState("");
  const [buyersAudience, setBuyersAudience] = useState(false);
  const [followersAudience, setFollowersAudience] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  async function addVoucherHandle() {
    setIsLoader(true);
    const voucherData = {
      type: getValue,
      name: voucherName,
      code: voucherCode,
      startDate: voucherStart,
      endDate: voucherEnd,
      forAllBuyers: true,
      forFollowers: false,
      shippingAmount: parseFloat(freeShipping),
      quota: parseInt(voucherQuantity),
      eventName: eventName,
      eventDate: eventDate,
      quantity: voucherQuantity,
      email: email,
    };

    try {
      const response = await ProductSublyApi.createVoucher(
        token,
        _id,
        voucherData
      );
      setIsLoader(false);
      if (response.statusCode === 200) {
        toast.success(response.message);
        navigate("/Product/Vouchers/AllVouchers");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`!bg-[#f2f2f2] h-full`}>
      {isLoader ? <Loader /> : ""}
      <div className=" w-full bg-[#fff] fixed top-0 z-20">
        <Header />
      </div>
      <Container className="pt-28">
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <SideMenuBar />
          </Grid>
          <Grid item md={9} xs={12}>
            <div className="my-5">
              <h1 className="text-[32px] font-bold	">
                {strings.CUSTOMIZE_YOUR_VOUCHER}
              </h1>
              <p className="text-sm text-[#7A7A7A] my-3">
                {strings.MANAGE_YOUR_VOUCHER_DEC}
              </p>
              <div className=" bg-white rounded-2xl p-5">
                <h1 className="text-2xl	font-semibold	 mb-5">
                  {strings.TYPE_OF_VOUCHER}
                </h1>
                <div className=" flex gap-5 max-sm:flex-wrap">
                  <div className=" border-[1px] rounded-lg flex items-center gap-5 py-4 px-6">
                    <input
                      className="h-6 w-11	"
                      type="radio"
                      name="voucher"
                      value={"Product Voucher"}
                      onChange={(e) => {
                        setGetValue(e.target.value);
                      }}
                    />
                    <div className="my-2 w-[90%]">
                      <h2 className="text-base font-semibold	">
                        {strings.PRODUCT_VOUCHER}
                      </h2>
                      <p className="text-sm text-[#7A7A7A]">
                        {strings.PRODUCT_VOUCHER_DEC}
                      </p>
                    </div>
                  </div>
                  <div className=" border-[1px] rounded-lg flex items-center gap-5 py-4 px-6">
                    <input
                      className="h-6 w-11	"
                      type="radio"
                      name="voucher"
                      value={"Newsletter Voucher"}
                      onChange={(e) => {
                        setGetValue(e.target.value);
                      }}
                    />

                    <div className="my-2 w-[90%]">
                      <h2 className="text-base font-semibold	">
                        {strings.NEWSLETTER_VOUCHER}
                      </h2>
                      <p className="text-sm text-[#7A7A7A]">
                        {strings.PRODUCT_VOUCHER_DEC}
                      </p>
                    </div>
                  </div>
                  <div className=" border-[1px] rounded-lg flex items-center gap-5 py-4 px-6">
                    <input
                      className="h-6 w-11	"
                      type="radio"
                      name="voucher"
                      value={"Livestream Voucher"}
                      onChange={(e) => {
                        setGetValue(e.target.value);
                      }}
                    />
                    <div className="my-2 w-[90%]">
                      <h2 className="text-base font-semibold	">
                        {strings.LIVESTREAM_VOUCHER}
                      </h2>
                      <p className="text-sm text-[#7A7A7A]">
                        {strings.PRODUCT_VOUCHER_DEC}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 my-5 px-5">
                <h1 className="text-2xl	font-semibold  mb-5">
                  {strings.DETAIL_VOUCHER}
                </h1>

                {getValue == "Newsletter Voucher" && (
                  <div className="flex-col	flex ">
                    <label>{strings.EMAIL_ADDRESS}</label>
                    <input
                      maxLength={70}
                      placeholder={placeholder.EMAIL_EXAMPLE}
                      className="border-[1px] border-[#E0E0E0] rounded-xl px-4 py-5 my-3"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <p className="text-end	">0/70</p>
                  </div>
                )}

                <div className="flex-col	flex ">
                  <label>{strings.VOUCHER_NAME}</label>
                  <input
                    maxLength={70}
                    placeholder={placeholder.EXAMPLE_SIMMER_SALE}
                    className="border-[1px] border-[#E0E0E0] rounded-xl px-4 py-5 my-3"
                    value={voucherName}
                    onChange={(e) => {
                      setVoucherName(e.target.value);
                    }}
                  />
                  <p className="text-end	">0/70</p>
                </div>
                <div className="flex-col	flex ">
                  <label>{strings.VOUCHER_CODE}</label>
                  <input
                    maxLength={70}
                    placeholder={placeholder.EXAMPLE_FREEDELRY}
                    className="border-[1px] border-[#E0E0E0] rounded-xl px-4 py-5 my-3"
                    value={voucherCode}
                    onChange={(e) => {
                      setVoucherCode(e.target.value);
                    }}
                  />
                  <p className="text-end	">0/70</p>
                </div>
                <div className="flex-col	flex ">
                  <label>{strings.VOUCHER_PERIOD}</label>
                  <div className="flex gap-5 max-sm:flex-wrap">
                    <div className="flex flex-col w-full">
                      <label className="my-4 text-sm font-medium	">
                        {strings.START}
                      </label>
                      <input
                        className="w-full border-[1px] rounded-xl border-[#C2C2C2] p-4"
                        type="datetime-local"
                        value={voucherStart}
                        onChange={(e) => {
                          setVoucherStart(e.target.value);
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-end mr-2 my-4 text-sm font-medium">
                        {strings.END}
                      </label>
                      <input
                        className="w-full border-[1px] rounded-xl border-[#C2C2C2] p-4"
                        type="datetime-local"
                        value={voucherEnd}
                        onChange={(e) => {
                          setVoucherEnd(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {getValue == "Livestream Voucher" && (
                  <>
                    <div className="flex-col	flex mt-5">
                      <label>{strings.LIVESTREAM_EVENT_NAME}</label>
                      <input
                        maxLength={70}
                        placeholder={placeholder.EXAMPLE_FREEDELRY}
                        className="border-[1px] border-[#E0E0E0] rounded-xl px-4 py-5 my-3"
                        value={eventName}
                        onChange={(e) => {
                          setEventName(e.target.value);
                        }}
                      />
                      <p className="text-end	">0/70</p>
                    </div>
                    <div className="flex-col	flex">
                      <label>{strings.LIVESTREAM_EVENT_DATE_TIME}</label>
                      <input
                        className="w-1/2 border-[1px] rounded-xl border-[#C2C2C2] p-4 mt-5"
                        type="datetime-local"
                        value={eventDate}
                        onChange={(e) => {
                          setEventDate(e.target.value);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="bg-white rounded-2xl p-5 my-5">
                <h1 className="text-2xl	font-semibold  mb-5">
                  {strings.VOUCHER_SETTING}
                </h1>
                <div className="flex gap-5 max-sm:flex-wrap">
                  <div className="flex gap-4 border-[1px] rounded-xl border-[#C2C2C2] p-4 w-full">
                    <input className="h-6 w-11" type="radio" name="shipping" />
                    <p>{strings.FREE_SHIPPING}</p>
                  </div>
                  <div className="flex gap-4 border-[1px] rounded-xl border-[#C2C2C2] p-4 w-full">
                    <input className="h-6 w-11" type="radio" name="shipping" />
                    <p>{strings.DISCOUNT}</p>
                  </div>
                </div>
                <div className="my-5">
                  <label className="text-base	font-medium">
                    {strings.AMOUNT_FREE_SHIPPING}
                  </label>
                  <div className="border-[1px] rounded-xl border-[#E0E0E0] px-4 py-3 flex mt-5">
                    <p className="border-r-2 pr-2 font-semibold text-[#616161]">
                      {strings.USD}
                    </p>
                    <input
                      className="ml-2"
                      placeholder={placeholder.INPUT_PRICE}
                      value={freeShipping}
                      onChange={(e) => {
                        setFreeShipping(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="my-5">
                  <label className="text-base	font-medium">
                    {strings.MINIMUM_ORDER}
                  </label>
                  <div className="border-[1px] rounded-xl border-[#E0E0E0] px-4 py-3 flex mt-5">
                    <p className="border-r-2 pr-2 font-semibold text-[#616161]">
                      {strings.USD}
                    </p>
                    <input
                      className="ml-2"
                      placeholder={placeholder.INPUT_PRICE}
                      value={minimumOrder}
                      onChange={(e) => {
                        setMinimumOrder(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-1/3 ">
                  <label className="text-base	font-medium">
                    {strings.VOUCHER_QUANTITY}
                  </label>
                  <input
                    className="border-[1px] rounded-xl px-4 py-3 mt-4"
                    value={voucherQuantity}
                    onChange={(e) => {
                      setVoucherQuantity(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <p className="my-5">{strings.TARGET_AUDIENCE}</p>
                  <div className="flex gap-5 max-sm:flex-wrap">
                    <div className="flex gap-4 border-[1px] rounded-xl border-[#C2C2C2] p-4 w-full">
                      <input
                        className="h-6 w-11"
                        type="radio"
                        name="Audience"
                        value={true}
                        onChange={() => {
                          setBuyersAudience(true);
                          setFollowersAudience(false);
                          console.log(buyersAudience, "buyer");
                        }}
                      />
                      <p>{strings.ALL_BUYERS}</p>
                    </div>
                    <div className="flex gap-4 border-[1px] rounded-xl border-[#C2C2C2] p-4 w-full">
                      <input
                        className="h-6 w-11"
                        type="radio"
                        name="Audience"
                        value={true}
                        onChange={() => {
                          setFollowersAudience(true);
                          setBuyersAudience(false);
                          console.log(followersAudience, "follower");
                        }}
                      />
                      <p>{strings.FOLLOWERS}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-end flex gap-5 pb-3">
              <button className="border-[1px] border-[#0094FF] rounded-[30px] px-8 py-3">
                <p className="text-semibold text-[#0094FF]">
                  {strings.PREVIEW_VOUCHER}
                </p>
              </button>
              <button
                className="border-[1px] border-[#0094FF] bg-[#0094FF] rounded-[30px] px-8 py-3"
                onClick={() => {
                  addVoucherHandle();
                }}
              >
                <p className="text-semibold text-white">
                  {strings.CREATE_VOUCHER}
                </p>
              </button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CustomizeVoucher;
