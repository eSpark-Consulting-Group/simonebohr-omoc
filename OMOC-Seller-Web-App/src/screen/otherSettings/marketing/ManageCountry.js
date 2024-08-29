import React, { useState } from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import MarketsTable from "./MarketsTable";
import ManageCountryTable from "./ManageCountryTable";
import { useNavigate } from "react-router-dom";

const data = [{ type: "Markets" }, { type: "Manage Country" }];

const Manage = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl flex justify-end items-end absolute top-12 right-0 bg-white shadow-lg p-2 my-3">
      <div className="bg-white  rounded-2xl z-10">
        <div
          className=" w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer"
          onClick={() => {
            navigate("/Other-settings/Marketing/Markets");
          }}
        >
          <p className="text-sm">{strings.MANAGE}</p>
        </div>
        <div className="w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer">
          <p className="text-sm">{strings.MANAGE_COUNTRY}</p>
        </div>
      </div>
    </div>
  );
};

const ManageCountry = () => {
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
            <div className="my-5 flex justify-between max-sm:flex-wrap gap-4">
              <div>
                <h1 className="text-[32px] font-bold">{strings.MARKETS}</h1>
                <p className="text-sm text-[#7A7A7A]">
                  {strings.HERE_YOU_CAN_SETUP_COUNTRY_SEE_YOUR_PRODUCT}
                </p>
              </div>
              <div className="flex items-center gap-5 justify-end flex-wrap">
                <div className="flex relative items-center ">
                  <input
                    className="bg-white py-3 px-4 rounded-[30px] border-[1px] border-[#EDEDED] "
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
                  <p>{strings.MANAGE_COUNTRY}</p>
                  <Icon icon="fluent:ios-arrow-24-filled" rotate={3} />
                  {showManage && <Manage />}
                </div>
              </div>
            </div>
            <button className="bg-[#0094FF] rounded-[30px] px-6 py-3 flex justify-center items-center gap-3">
              <Icon
                icon="ion:add"
                color="white"
                style={{ width: 24, height: 24 }}
                rotate={2}
              />
              <p className="text-white">{strings.ADD_COUNTRIES}</p>
            </button>
            <div className="my-5">
              <ManageCountryTable />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ManageCountry;
