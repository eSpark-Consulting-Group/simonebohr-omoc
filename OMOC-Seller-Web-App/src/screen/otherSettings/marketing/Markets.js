import React, { useState } from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import MarketsTable from "./MarketsTable";
import { useNavigate } from "react-router-dom";

const data = [{ type: "Markets" }, { type: "Manage Country" }];

const Manage = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl flex justify-end items-end absolute top-12 right-0 bg-white shadow-lg p-2 my-3">
      <div className="bg-white  rounded-2xl z-10">
        <div className=" w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer">
          <p className="text-sm">{strings.MANAGE}</p>
        </div>
        <div
          className="w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer"
          onClick={() => {
            navigate("/Other-settings/Marketing/ManageCountry");
          }}
        >
          <p className="text-sm">{strings.MANAGE_COUNTRY}</p>
        </div>
      </div>
    </div>
  );
};

const Markets = () => {
  const [showManage, setShowManage] = useState(false);

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
            <div className="my-5 flex justify-between max-sm:flex-wrap gap-3">
              <div>
                <h1 className="text-[32px] font-bold">{strings.MARKETS}</h1>
                <p className="text-sm text-[#7A7A7A]">
                  {strings.MANGE_YOUR_SHOP_HERE}
                  {/* {strings.HERE_YOU_CAN_SETUP_COUNTRY_SEE_YOUR_PRODUCT} */}
                </p>
              </div>
              <div className="flex items-center gap-5 max-sm:flex-wrap max-sm:justify-end max-sm:w-full">
                <div className="flex relative items-center w-full max-sm:w-1/2">
                  <input
                    className="bg-white py-3 px-4 rounded-[30px] border-[1px] border-[#EDEDED] pr-24 w-full"
                    placeholder={placeholder.SEARCH_YOUR_PRODUCT}
                  />
                  <Icon
                    icon="tabler:search"
                    className=""
                    style={{ position: "absolute", right: 10 }}
                    width="24px"
                  />
                </div>
                <div
                  className="bg-white rounded-2xl h-[53px] px-6 py-3 flex items-center gap-5 relative cursor-pointer"
                  onClick={() => {
                    setShowManage(!showManage);
                  }}
                >
                  <p>{strings.MARKETS}</p>
                  <Icon icon="fluent:ios-arrow-24-filled" rotate={3} />
                  {showManage && <Manage />}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl h-[53px] w-44	 px-6 py-3 flex items-center gap-5">
              <select>
                <option>United State</option>
              </select>
            </div>
            <div className="my-5">
              <MarketsTable />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Markets;
