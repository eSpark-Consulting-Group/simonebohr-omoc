import React, { useEffect, useState } from "react";
import Header from "../../../component/Header";
import { Container, Slider } from "@mui/material";
import { placeholder, strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import productImage from "../../../assets/image/productImg/product 4.png";
import { useLocation, useNavigate } from "react-router-dom";
import ProductSublyApi from "../../../helper/ProductApi";
import { useSelector } from "react-redux";
import moment from "moment";

function CreateYourAdsStepTwo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { token } = useSelector((state) => state.userData.userDetails);
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const [openIndustryOption, setOpenIndustryOption] = useState(false);
  const [openIndustrySubOption, setOpenIndustrySubOption] = useState(false);
  const [yourGoal, setYourGoal] = useState(
    state?.goalType ? state?.goalType : ""
  );
  const [destination, setDestination] = useState(
    state?.destinationType ? state?.destinationType : ""
  );
  const [budget, setBudget] = useState(
    state?.budgetType ? state?.budgetType : ""
  );
  const [price, setPrice] = useState(state?.amount ? state?.amount : "");
  const [scheduleTime, setScheduleTime] = useState(
    state.startTime ? moment(state.startTime).format("hh:mm") : ""
  );
  const [schedule, setSchedule] = useState(
    state.startTime ? moment(state.startTime).format("yyyy-MM-DD") : ""
  );
  const [endDate, setEndDate] = useState(
    state.endTime ? moment(state.endTime).format("yyyy-MM-DD") : ""
  );
  const [endDateTime, setEndDateTime] = useState(
    state.endTime ? moment(state.endTime).format("hh:mm") : ""
  );
  const [industry, setIndustry] = useState("");
  const [gender, setGender] = useState(state?.gender ? state?.gender : "");
  const [range, setRange] = useState(
    state?.maxTargetAudience ? state?.maxTargetAudience : ""
  );
  const [actionButton, setActionButton] = useState("");
  const [productList, setProductList] = useState("");
  const [productId, setProductId] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  // const test =
  //   productList?.length > 0 &&
  //   productList?.filter((element) =>
  //     state.entityType.map((val) => val == element._id)
  //   );

  // console.log(test, state.entityType);

  // ==============Calling API for fetching product list===============
  useEffect(() => {
    async function fetchProductListhandle() {
      await ProductSublyApi.fetchProductList(_id, " ", 20, token)
        .then((res) => {
          if (res.statusCode == 200) {
            setProductList(res.data.products);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchProductListhandle();
  }, []);

  // ==================functions for choose product and remove products================
  function chooseProductHandle(item) {
    let product = [...productId];
    let productArr = [...selectedProduct];
    productArr.push(item);
    product.push(item?._id);
    setProductId(product);
    setSelectedProduct(productArr);
  }

  function removeProductHandle(index) {
    let product = [...productId];
    let productArr = [...selectedProduct];
    productArr.splice(index, 1);
    product.splice(index, 1);
    setProductId(product);
    setSelectedProduct(productArr);
  }

  function redirectHandle() {
    state.goalType = yourGoal;
    state.destinationType = destination;
    state.actionType = "";
    state.entityType = productId;
    state.maxTargetAudience = range;
    state.minTargetAudience = 0;
    state.budgetType = budget;
    state.amount = price;
    state.startTime = moment(schedule + " " + scheduleTime).format();
    state.endTime = moment(endDate + " " + endDateTime).format();
    state.industryType = "";
    state.minAge = "";
    state.maxAge = "";
    state.gender = gender;

    navigate("/Other-settings/Marketing/Create-FirstAd", { state });
  }

  console.log(state);

  return (
    <>
      <div className={`bg-[#F2F2F2] h-full pb-1`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header state={state} />
        </div>
        <Container className="pt-28">
          <div>
            <h3 className="text-3xl font-bold mb-10 mt-6">
              {strings.CREATE_YOUR_ADS_NOW_2}
            </h3>
            <div className="rounded-xl bg-white w-full h-full mb-4 py-16 px-20 max-sm:py-10 max-sm:px-10 ">
              <div className="w-4/6 max-md:w-full">
                <p className="text-2xl font-semibold">
                  {strings.SELECT_YOUR_GOAL}
                </p>
                <p className="text-sm font-medium text-[#404040]">
                  {strings.SELECT_THE_OBJECTIVE_OF_YOUR_AD}
                </p>
                <div className="my-8">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      className="w-6 h-6"
                      checked={
                        yourGoal && yourGoal == "more_profile_visits"
                          ? true
                          : false
                      }
                      value={"more_profile_visits"}
                      onChange={(e) => {
                        setYourGoal(e.target.value);
                      }}
                    />
                    <p className="text-base font-medium w-[90%]">
                      {strings.MORE_PROFILE_VISITS}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 my-6">
                    <input
                      type="radio"
                      className="w-6 h-6"
                      checked={
                        yourGoal && yourGoal == "more_website_visits"
                          ? true
                          : false
                      }
                      value={"more_website_visits"}
                      onChange={(e) => {
                        setYourGoal(e.target.value);
                      }}
                    />
                    <p className="text-base font-medium w-[90%]">
                      {strings.MORE_WEBSITE_VISITS}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      className="w-6 h-6"
                      value={"more_message"}
                      checked={
                        yourGoal && yourGoal == "more_message" ? true : false
                      }
                      onChange={(e) => {
                        setYourGoal(e.target.value);
                      }}
                    />
                    <p className="text-base font-medium w-[90%]">
                      {strings.MORE_MESSAGE}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-4/6 max-md:w-full">
                <p className="text-2xl font-semibold">
                  {strings.SELECT_YOUR_DESTINATION}
                </p>
                <p className="text-sm font-medium text-[#404040]">
                  {strings.CHOOSE_THE_DESTINATION_FOR_YOUR_AD}
                </p>
                <div className="mt-8">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      className="w-6 h-6"
                      value={"product"}
                      checked={
                        destination && destination == "product" ? true : false
                      }
                      onChange={(e) => {
                        setDestination(e.target.value);
                      }}
                    />
                    <div className="w-[90%]">
                      <p className="text-base font-medium">{strings.PRODUCT}</p>
                      <p className="text-sm font-normal text-[#404040]">
                        {strings.LEADS_USERS_DIRECTLY_TO_A_SPECIFIC_PRODUCT}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 my-6">
                    <input
                      type="radio"
                      className="w-6 h-6"
                      value={"post"}
                      checked={
                        destination && destination == "post" ? true : false
                      }
                      onChange={(e) => {
                        setDestination(e.target.value);
                      }}
                    />
                    <div className="w-[90%]">
                      <p className="text-base font-medium">{strings.POST}</p>
                      <p className="text-sm font-normal text-[#404040]">
                        {strings.LEADS_USERS_TO_A_SPECIFIC_POST}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 my-6">
                    <input
                      type="radio"
                      className="w-6 h-6"
                      value={"store"}
                      checked={
                        destination && destination == "store" ? true : false
                      }
                      onChange={(e) => {
                        setDestination(e.target.value);
                      }}
                    />
                    <div className="w-[90%]">
                      <p className="text-base font-medium">{strings.STORE}</p>
                      <p className="text-sm font-normal text-[#404040]">
                        {strings.LEADS_UERS_TO_YOUR_STORE}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      className="w-6 h-6"
                      value={"profile"}
                      checked={
                        destination && destination == "profile" ? true : false
                      }
                      onChange={(e) => {
                        setDestination(e.target.value);
                      }}
                    />
                    <div className="w-[90%]">
                      <p className="text-base font-medium">{strings.PROFILE}</p>
                      <p className="text-sm font-normal text-[#404040]">
                        {strings.LEADS_USRES_TO_YOUR_APPS}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#757575] text-sm font-medium mt-8 mb-6">
                    {strings.SETUP_MAXIMUM_AMOUNTS_OF_PRODUCTS}
                  </p>
                  <div className="w-1/2 max-md:w-full">
                    <p className="text-xl font-semibold">
                      {strings.ACTION_BUTTON}
                    </p>
                    <select className="w-full rounded-xl border-[#E0E0E0] border py-4 px-4 my-4">
                      <option>Learn More</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold my-2">
                  {strings.SELECT_PRODUCT_FOR_DESTINATION}
                </p>
                <div className="rounded-xl border flex justify-between max-md:flex-wrap">
                  <div className="py-4 px-5 !pb-0 w-full">
                    <p className="text-lg font-semibold">
                      {strings.SELECT_PRODUCT}
                    </p>
                    <div className="flex items-center gap-4 mt-5">
                      <label
                        htmlFor="search"
                        className="flex py-2 px-5 justify-between items-center w-full rounded-3xl border"
                      >
                        <input
                          className="w-full py-1"
                          type="text"
                          id="search"
                          placeholder={placeholder.SEARCH_PRODUCT}
                        />
                        <Icon icon="uil:search" width="24" height="24" />
                      </label>
                      <select className="py-3 px-4 rounded-3xl border">
                        <option>{"Sort (newest)"}</option>
                      </select>
                    </div>
                    <div className="h-64 overflow-auto mt-2 pr-1">
                      {productList?.length > 0 &&
                        productList?.map((val, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center my-4"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={val?.images[0]?.url}
                                alt="product"
                                className="rounded-xl bg-[#F5F5F5] w-16 h-16"
                              />
                              <div>
                                <p className="text-base font-semibold">
                                  {val?.name}
                                </p>
                                <p className="text-[#7A7A7A] text-sm font-normal">
                                  1239u1023
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                chooseProductHandle(val);
                              }}
                              className="rounded-3xl py-3 px-8 border border-[#0094FF] text-[#0094FF] text-sm font-medium"
                            >
                              {strings.CHOOSE}
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="py-4 px-5 rounded-e-xl pt-4 pr-1 w-4/5 max-md:w-full bg-[#F5F5F5]">
                    <p className="text-lg font-semibold">
                      {strings.PRODUCT_SELECTED}
                    </p>
                    {selectedProduct?.length == 0 && (
                      <p className="text-center text-sm font-medium text-gray-500 py-10">
                        {strings.NO_RECORD_FOUND}
                      </p>
                    )}
                    <div className="h-[320px] overflow-auto pr-2">
                      {" "}
                      {selectedProduct?.length > 0 &&
                        selectedProduct.map((val, index) => (
                          <div
                            key={index}
                            className={`${"flex justify-between items-center my-3 rounded-xl bg-white py-3 px-3"}`}
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={val?.images[0]?.url}
                                alt="product"
                                className="rounded-xl bg-[#F5F5F5] w-16 h-16"
                              />
                              <div>
                                <p className="text-base font-semibold">
                                  {val?.name}{" "}
                                </p>
                                <p className="text-[#7A7A7A] text-sm font-normal">
                                  1239u1023
                                </p>
                              </div>
                            </div>
                            <Icon
                              icon="ep:close"
                              width="25"
                              height="25"
                              cursor={"pointer"}
                              onClick={() => {
                                removeProductHandle(index);
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-3/4 max-md:w-full my-8">
                <p className="text-2xl font-semibold">{strings.RANGE_VIEW}</p>
                <p className="text-sm text-[#404040] font-medium">
                  {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
                </p>
                <div className="my-7">
                  <div className="flex items-center justify-between my-2">
                    <p className="text-base font-medium">
                      {strings.PEOPLE_500}
                    </p>
                    <p className="text-base font-medium">
                      {strings.PEOPLE_10000}
                    </p>
                  </div>
                  <Slider
                    className="!h-2"
                    defaultValue={range}
                    onChange={(e) => {
                      setRange(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-10">
                  <p className="mb-7 text-2xl font-semibold">
                    {strings.BUDGET_ESTIMATE_AND_SCHEDULE}
                  </p>
                  <p className="text-xl font-semibold mb-5">{strings.BUDGET}</p>
                  <div className="flex justify-between items-center gap-5 mb-1">
                    <select
                      onChange={(e) => {
                        setBudget(e.target.value);
                      }}
                      defaultValue={budget}
                      className="w-full rounded-xl border-[#E0E0E0] border py-4 px-4"
                    >
                      <option value={"daily"}>Daily Budget</option>
                      <option value={"life_time"}>Lifetime Budget</option>
                    </select>
                    <p className="flex items-center gap-2 text-[#616161] text-base font-semibold w-full p-4 rounded-xl border">
                      USD{" "}
                      <input
                        className="border-l-2 text-base font-normal pl-2 w-full"
                        type="text"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {strings.YOU_WILL_SPEND_UP_$250_ON_SOME_DAYS}
                  </p>
                </div>
              </div>
              <div className="w-80 max-sm:w-64">
                <div className="mb-7">
                  <p className="text-lg font-medium mb-2">{strings.SCHEDULE}</p>
                  <div className="flex justify-between items-center gap-4 ">
                    <input
                      type="date"
                      value={schedule}
                      onChange={(e) => {
                        setSchedule(e.target.value);
                      }}
                      className="rounded-xl border p-4 w-full"
                    />
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => {
                        setScheduleTime(e.target.value);
                      }}
                      className="rounded-xl border p-4 w-1/2"
                    />
                  </div>
                </div>
                <div className="mb-7">
                  <p className="text-lg font-medium mb-2">{strings.END}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <input type="checkbox" className="w-5 h-5" />
                    <p className="text-base font-normal">
                      {strings.SET_AN_END_DATE}
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                      }}
                      className="rounded-xl border p-4 w-full"
                    />
                    <input
                      type="time"
                      value={endDateTime}
                      onChange={(e) => {
                        setEndDateTime(e.target.value);
                      }}
                      className="rounded-xl border p-4 w-1/2"
                    />
                  </div>
                </div>
              </div>
              <div className="w-3/5 max-md:w-full mb-7">
                <p className="text-2xl font-semibold">
                  {strings.TARGET_AUDIENCE}
                </p>
                <p className="text-sm font-medium">
                  {strings.CHOOSE_THE_RIGHT_TARGET}
                </p>
              </div>
              <div className="w-4/6 max-md:w-full mb-7">
                <p className="text-xl font-semibold mb-4">{strings.INDUSTRY}</p>
                <div className="relative">
                  <p
                    onClick={() => {
                      setOpenIndustryOption(!openIndustryOption);
                      setOpenIndustrySubOption(false);
                    }}
                    className="w-full p-4 border rounded-xl text-base font-medium flex justify-between items-center cursor-pointer"
                  >
                    Select industry
                    <Icon icon="formkit:down" width="25" height="25" />
                  </p>
                  {openIndustryOption && (
                    <IndustryOtion
                      setOpenIndustrySubOption={setOpenIndustrySubOption}
                    />
                  )}
                  {openIndustrySubOption && (
                    <IndustrySubOtion
                      setOpenIndustrySubOption={setOpenIndustrySubOption}
                      setOpenIndustryOption={setOpenIndustryOption}
                    />
                  )}
                </div>
              </div>
              <div className="w-80 max-sm:w-64">
                <div className="mb-7">
                  <p className="text-xl font-semibold mb-4">{strings.AGE}</p>
                  <div className="flex justify-between items-center gap-4 max-sm:flex-wrap">
                    <p className="w-full p-4 border rounded-xl text-base font-medium flex justify-between items-center cursor-pointer">
                      21
                      <Icon icon="formkit:down" width="25" height="25" />
                    </p>
                    <p className="w-full p-4 border rounded-xl text-base font-medium flex justify-between items-center cursor-pointer">
                      60+
                      <Icon icon="formkit:down" width="25" height="25" />
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold mb-5">{strings.GENDER}</p>
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    className="w-6 h-6"
                    value={"all"}
                    checked={gender && gender == "all" ? true : false}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <p className="text-base font-medium">{strings.ALL}</p>
                </div>
                <div className="flex items-center gap-4 my-6">
                  <input
                    type="radio"
                    className="w-6 h-6"
                    value={"man"}
                    checked={gender && gender == "man" ? true : false}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <p className="text-base font-medium">{strings.MAN}</p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    className="w-6 h-6"
                    value={"woman"}
                    checked={gender && gender == "woman" ? true : false}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <p className="text-base font-medium">{strings.WOMAN}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-end items-center mb-10">
              <button
                onClick={() => {
                  navigate("/Other-settings/Marketing/Create-your-ads-step-1", {
                    state: state,
                  });
                }}
                className="rounded-3xl py-3 px-8 border-2 border-[#0094FF] text-[#0094FF] text-base font-semibold"
              >
                {strings.PREVIOUS}
              </button>
              <button
                className="rounded-3xl py-3 px-8 bg-[#0094FF] text-base font-semibold text-white"
                onClick={() => {
                  redirectHandle();
                }}
              >
                {strings.CONTINUE}
              </button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default CreateYourAdsStepTwo;

function IndustryOtion({ setOpenIndustrySubOption }) {
  return (
    <div
      onClick={() => setOpenIndustrySubOption(true)}
      className="w-72 rounded shadow-md p-2 absolute z-10 bg-white top-16"
    >
      <div className="flex justify-between cursor-pointer items-center text-sm font-medium hover:text-[#0094FF] hover:bg-[#E8F5FF] py-2 px-2 rounded-xl">
        <p>E-commerce</p>
        <Icon icon="icon-park-outline:down" width="18" height="18" rotate={3} />
      </div>
      <div className="flex justify-between cursor-pointer items-center text-sm font-medium hover:text-[#0094FF] hover:bg-[#E8F5FF] py-2 px-2 rounded-xl">
        <p>Retail</p>
        <Icon icon="icon-park-outline:down" width="18" height="18" rotate={3} />
      </div>
      <div className="flex justify-between cursor-pointer items-center text-sm font-medium hover:text-[#0094FF] hover:bg-[#E8F5FF] py-2 px-2 rounded-xl">
        <p>Education</p>
        <Icon icon="icon-park-outline:down" width="18" height="18" rotate={3} />
      </div>
      <div className="flex justify-between cursor-pointer items-center text-sm font-medium hover:text-[#0094FF] hover:bg-[#E8F5FF] py-2 px-2 rounded-xl">
        <p>Service</p>
        <Icon icon="icon-park-outline:down" width="18" height="18" rotate={3} />
      </div>
      <div className="flex justify-between cursor-pointer items-center text-sm font-medium hover:text-[#0094FF] hover:bg-[#E8F5FF] py-2 px-2 rounded-xl">
        <p>Content Creator & Media</p>
        <Icon icon="icon-park-outline:down" width="18" height="18" rotate={3} />
      </div>
    </div>
  );
}

function IndustrySubOtion({ setOpenIndustrySubOption, setOpenIndustryOption }) {
  return (
    <div
      onClick={() => {
        setOpenIndustrySubOption(false);
        setOpenIndustryOption(false);
      }}
      className="w-72 rounded shadow-md p-2 absolute z-10 bg-white right-20 top-16"
    >
      <div className="flex justify-between cursor-pointer items-center text-sm font-medium hover:text-[#0094FF] hover:bg-[#E8F5FF] py-2 px-2 rounded-xl">
        <p>Food and snacks</p>
      </div>
      <div className="flex justify-between cursor-pointer items-center text-sm font-medium hover:text-[#0094FF] hover:bg-[#E8F5FF] py-2 px-2 rounded-xl">
        <p>Alcohol drink</p>
      </div>
      <div className="flex justify-between cursor-pointer items-center text-sm font-medium hover:text-[#0094FF] hover:bg-[#E8F5FF] py-2 px-2 rounded-xl">
        <p>Non alcoholic drink</p>
      </div>
      <div className="flex justify-between cursor-pointer items-center text-sm font-medium hover:text-[#0094FF] hover:bg-[#E8F5FF] py-2 px-2 rounded-xl">
        <p>Clothes and shoes</p>
      </div>
      <div className="flex justify-between cursor-pointer items-center text-sm font-medium hover:text-[#0094FF] hover:bg-[#E8F5FF] py-2 px-2 rounded-xl">
        <p>Glasses, bags and accessories</p>
      </div>
      <div className="flex justify-between cursor-pointer items-center text-sm font-medium hover:text-[#0094FF] hover:bg-[#E8F5FF] py-2 px-2 rounded-xl">
        <p>Watch</p>
      </div>
    </div>
  );
}
