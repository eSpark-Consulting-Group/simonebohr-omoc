import React, { useState } from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../utils/strings";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import hoodie from "../../../assets/image/image 9.png";
import TypeOfAdsModal from "./TypeOfAdsModal";

const cardData = [
  { type: "Appears", number: 0 },
  { type: "Click", number: 0 },
  { type: "Expenses", number: 0 },
  { type: "Income", number: 0 },
];

const data = [1, 2];

const TopAdsCard = () => {
  return (
    <Container className="flex my-5">
      <Grid container spacing={2}>
        {cardData.map((val, index) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <div className="bg-white px-5 py-5 rounded-lg">
                <div className="flex items-center gap-3">
                  <p className="text-base text-[#757575]">{val.type}</p>
                  <Icon
                    icon="fluent:info-24-regular"
                    color="#969696"
                    rotate={2}
                  />
                </div>
                <p className="text-4xl text-[#242424] mt-3 font-bold	">
                  {val.number}
                </p>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

const TopAdsScreen = () => {
  const navigate = useNavigate();
  const [openTypeModal, setOpenTypeModal] = useState(false);

  return (
    <div className={`!bg-[#f2f2f2] h-full`}>
      <div className=" w-full bg-[#fff] fixed top-0 z-20">
        <Header />
      </div>
      <Container className="pt-28">
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <SideMenuBar />
          </Grid>
          <Grid item md={9} xs={12}>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[32px]">{strings.TOP_ADS}</h2>
                <p className="text-[#7A7A7A] text-sm">
                  {strings.MANAGE_TOP_ADS_HERE}
                </p>
              </div>
              <button
                onClick={() => {
                  setOpenTypeModal(true);
                }}
                className="rounded-[30px] bg-[#0094FF] py-4 px-8"
              >
                <p className="text-white">{strings.CREATE_ADS}</p>
              </button>
            </div>
            <div className="border-b-2">
              <TopAdsCard />
            </div>
            <div className="overflow-auto">
              <div className="w-max">
                <section className="rounded-xl bg-white my-4 !mb-3 p-4 flex justify-between items-center w-[860px]">
                  <div className="invoiceSubHeadClass flex items-center gap-5 mr-4 cursor-pointer">
                    <div className="relative">
                      <span
                        className="py-3 px-5 flex justify-center items-center gap-3 "
                        // onClick={() => setUploadPopup(!uploadPopup)}
                      >
                        {/* {dropdownText} */}
                        <Icon
                          icon="solar:file-download-outline"
                          color="#757575"
                          width="22"
                          height="22"
                        />
                        <Icon
                          icon="iconamoon:arrow-down-2-light"
                          width="22"
                          height="22"
                        />
                      </span>
                      {/* {uploadPopup && <UploadProductDropdown />} */}
                    </div>
                    <div className="searchFieldClass w-full">
                      <label
                        htmlFor="search"
                        className="flex py-2 px-5 justify-between items-center w-full"
                      >
                        <input
                          className="w-full py-1"
                          type="text"
                          id="search"
                          placeholder={placeholder.SEARCH_PRODUCT}
                        />
                        <Icon icon="uil:search" width="24" height="24" />
                      </label>
                    </div>
                    <div style={{ right: 0 }} className="searchFieldClass">
                      <label
                        htmlFor="search"
                        className="flex py-2 px-5 justify-between items-center w-full"
                      >
                        <input className="w-full py-1" type="date" />
                      </label>
                    </div>
                    {/* <span className="py-3 px-5 flex justify-center items-center gap-3">
                  {strings.SORT_NEWEST}
                  <Icon
                    icon="iconamoon:arrow-down-2-light"
                    width="22"
                    height="22"
                  />
                </span> */}
                  </div>
                </section>
                <div className="rounded-xl bg-white my-4 !mb-3 p-4 flex justify-around items-center">
                  <p className="text-xs font-semibold">{strings.POST}</p>
                  <p className="ml-16"></p>
                  <p className="text-xs font-semibold">{strings.PERFOMANCE}</p>
                  <p className="text-xs font-semibold">{strings.EXPENSES}</p>
                  <p className="text-xs font-semibold">
                    {strings.ADVERTISING_COSTS}
                  </p>
                  <p className="text-xs font-semibold ">{strings.STATUS}</p>
                </div>

                {data.map(() => {
                  return (
                    <div
                      className="rounded-xl bg-white my-4 !mb-3 p-4 flex justify-between items-center"
                      //   key={index}
                    >
                      <div className="flex justify-center items-center">
                        <img src={hoodie} className="rounded-xl " />
                        <div className="ml-5">
                          <p className="text-xs font-semibold">
                            {strings.HOODIE_HAVANA}
                          </p>
                          <p className="text-xs text-[#7A7A7A]">
                            CODE123123124124
                          </p>
                        </div>
                      </div>
                      {/* <div className="w-24 h-9 rounded-md border-[1px] border-[#EDEDED] flex justify-center items-center gap-2">
                <div className="h-6 w-3.5 bg-[#E6E6E6] rounded-xl	text-center">
                  <p>$ </p>
                </div>
                <p className="text-xs font-medium	text-[#757575]">999,000</p>
              </div> */}
                      <p className="text-sm text-[#121212]">Not yet rated</p>
                      <p className="mr-5 text-sm text-[#121212]">$120</p>
                      <p className="text-sm text-[#121212]">Automatic </p>
                      <div className="flex justify-center items-center gap-1">
                        <div className="h-7 w-14 rounded-[22px] bg-[#22C55E1A] flex justify-center items-center">
                          <p className="text-[#22C55E] text-xs font-semibold">
                            {strings.ACTIVE}
                          </p>
                        </div>
                        <Icon
                          icon="bi:three-dots-vertical"
                          color="black"
                          width="21"
                          height="21"
                          //   onClick={() => {
                          //     setOpenModalIndex(val.id);
                          //     setShowInventory(!showInventory);
                          //   }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <TypeOfAdsModal
        openTypeModal={openTypeModal}
        setOpenTypeModal={setOpenTypeModal}
      />
    </div>
  );
};

export default TopAdsScreen;
