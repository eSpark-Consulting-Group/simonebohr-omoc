import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../component/SIdeMenuBar";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import TestimonialHeader from "./TestimonialHeader";
import ResponseTestimonialModal from "./ResponseTestimonialModal";
import ReportTestimonialModal from "./ReportTestimonialModal";
import ProductSublyApi from "../../helper/ProductApi";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";

function NeedToAction() {
  const pendingStyle = "text-[#FACC15] bg-[#FACC151A]";

  const [manageDropdown, setManageDropdown] = useState({
    isOpen: false,
    id: "",
  });
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [pendingData, setPendingData] = useState([]);
  const [productData, setProductData] = useState();
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    async function getPendingTestimonial() {
      setIsLoader(true);
      const pageSize = 10;
      const status = "pending";
      await ProductSublyApi.filterTestimonial(
        _id,
        token,
        pageSize,
        status
      ).then((response) => {
        setIsLoader(false);
        if (response.statusCode == 200) {
          setPendingData(response.data.reviews);
        }
      });
    }
    getPendingTestimonial();
  }, []);

  return (
    <>
      {isLoader ? <Loader /> : ""}
      <div className={`bg-[#F2F2F2] h-full`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <Grid container spacing={2}>
            <Grid item md={3} xs={12} className="w-full">
              <SideMenuBar />
            </Grid>
            <Grid item md={9} xs={12}>
              <div className="w-full pt-5">
                <div className="bg-[#F2F2F2] h-full">
                  <div className="flex justify-between items-center max-sm:flex-wrap">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">
                        {strings.TESTIMONIALS}
                      </h2>
                      <p className="font-normal text-sm text-[#7A7A7A]">
                        {strings.MANAGE_YOUR_PRODUCT}
                      </p>
                    </div>
                    <div className="max-sm:mt-4 max-sm:w-full max-sm:text-end">
                      <div className="flex justify-end items-center gap-1">
                        <Icon
                          icon="ion:star"
                          color="#ffc225"
                          width="38"
                          height="38"
                        />
                        <div className="flex justify-center items-end gap-1">
                          <h2 className="text-4xl font-bold">4.6</h2>
                          <p className="text-[#969696] text-xl font-semibold">
                            /5
                          </p>
                        </div>
                      </div>
                      <p className="font-normal text-sm text-[#7A7A7A]">
                        {strings.YOUR_SHOP_RATINGS}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-auto">
                    <div className="w-max">
                      <TestimonialHeader />
                      <div>
                        <table className="invoiceTableClass w-full overflow-auto">
                          <div className="rounded-xl bg-white mb-4 !w-max">
                            <tr className="flex justify-around items-center !text-[#2E2E2E] !text-sm !w-max">
                              <th className="!w-[190px] !pl-4 !text-start">
                                {strings.NAME_PRODUCT}
                              </th>
                              <th className="!w-[160px]">{strings.CUSTOMER}</th>
                              <th className="!w-[95px]">{strings.RATINGS}</th>
                              <th className="!w-[150px]">{strings.STATUS}</th>
                              <th className="!w-[200px] searchFieldClass !mr-5">
                                <label
                                  htmlFor="search"
                                  className="flex py-3 px-5 justify-between items-center w-full"
                                >
                                  <input
                                    className="!w-full py-1 !font-normal"
                                    type="text"
                                    id="search"
                                    placeholder={placeholder.SEARCH_NAME}
                                  />
                                  <Icon
                                    icon="uil:search"
                                    width="24"
                                    height="24"
                                  />
                                </label>
                              </th>
                            </tr>
                          </div>
                          {pendingData?.map((item, index) => {
                            console.log("------ITEM", item);
                            return (
                              <div
                                className="rounded-xl bg-white mb-3 !w-min"
                                key={index}
                              >
                                <tr className="flex justify-around items-center !w-max">
                                  <td className=" text-start !pl-4 !w-[190px]">
                                    <p className="text-[#2E2E2E] text-base font-semibold truncate ">
                                      {item.productDetails.productName}
                                    </p>
                                  </td>
                                  <td className="!w-[160px] text-[#7A7A7A] text-sm font-medium">
                                    {item.userDetails.name}
                                  </td>
                                  <td className="!w-[95px]">
                                    <div className="flex justify-center items-center gap-1">
                                      <Icon
                                        icon="ion:star"
                                        color="#ffc225"
                                        width="24"
                                        height="24"
                                      />
                                      <p className="text-sm font-medium">
                                        {item.rating}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="!w-[150px]">
                                    <span
                                      className={`${
                                        item.status == "pending"
                                          ? pendingStyle
                                          : item.status == "pending"
                                      } rounded-3xl text-xs font-medium py-2 px-3`}
                                    >
                                      {item.status}
                                    </span>
                                  </td>
                                  <td className="!w-[200px] relative flex justify-end  !mr-5 !pb-3">
                                    <span
                                      onClick={() => {
                                        setManageDropdown({
                                          isOpen: !manageDropdown.isOpen,
                                          id: item.ratingId,
                                        });
                                        setProductData(item);
                                      }}
                                      className="flex justify-center items-center gap-1 !py-3 px-2 cursor-pointer  rounded-2xl border-2"
                                    >
                                      {strings.MANAGE}
                                      <Icon
                                        icon="iconamoon:arrow-down-2-light"
                                        width="24"
                                        height="24"
                                      />
                                    </span>
                                    {manageDropdown.isOpen &&
                                      manageDropdown.id == item.ratingId && (
                                        <TestimonialManage
                                          setOpenResponseModal={
                                            setOpenResponseModal
                                          }
                                          openResponseModal={openResponseModal}
                                          setOpenReportModal={
                                            setOpenReportModal
                                          }
                                          openReportModal={openReportModal}
                                        />
                                      )}
                                  </td>
                                </tr>
                                <div className="px-5 text-[#2E2E2E]">
                                  <p className="text-xs font-semibold pb-3 ">
                                    {strings.REVIEW} :{" "}
                                    <span className="text-xs font-normal">
                                      {item.comment}
                                    </span>
                                  </p>
                                  {item.id == 1 && (
                                    <p className="text-xs font-semibold pb-4 ">
                                      {strings.RESPONSE} :{" "}
                                      <span className="text-xs font-normal">
                                        "thank you for your shopping!"
                                      </span>
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <ResponseTestimonialModal
          setOpenResponseModal={setOpenResponseModal}
          openResponseModal={openResponseModal}
          productData={productData}
          setIsLoader={setIsLoader}
        />
        <ReportTestimonialModal
          setOpenReportModal={setOpenReportModal}
          openReportModal={openReportModal}
          productData={productData}
          setIsLoader={setIsLoader}
        />
      </div>
    </>
  );
}

function TestimonialManage({
  setOpenResponseModal,
  openResponseModal,
  setOpenReportModal,
  openReportModal,
}) {
  return (
    <div className="bg-white z-10 rounded-xl w-52 text-start p-3 absolute !top-20 shadow-2xl invoice-option-box right-0">
      <p
        className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-xl"
        onClick={() => {
          setOpenResponseModal(!openResponseModal);
        }}
      >
        {strings.RESPONSE}
      </p>
      <p
        className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-xl"
        onClick={() => {
          setOpenReportModal(!openReportModal);
        }}
      >
        {strings.REPORT}
      </p>
    </div>
  );
}

export default NeedToAction;
