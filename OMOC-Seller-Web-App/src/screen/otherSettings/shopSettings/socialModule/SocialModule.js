import React, { useState } from "react";
import Header from "../../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import SocialHeader from "./SocialHeader";

function SocialModule() {
  const approveStyle = "text-[#22C55E] bg-[#22C55E1A]";
  const pendingStyle = "text-[#FACC15] bg-[#FACC151A]";
  const arr = [
    { id: 1, status: "Approve" },
    { id: 2, status: "Pending" },
  ];
  return (
    <>
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
              <div className="w-full">
                <div className="mt-5 mb-3">
                  <h3 className="text-[32px] font-bold">{strings.SOCIAL}</h3>
                  <p className="text-[#7A7A7A] text-sm font-normal">
                    {strings.MANAGE_YOUR_SHOP_HERE}
                  </p>
                </div>
                <div className="overflow-auto">
                  <div className="w-max">
                    <SocialHeader />
                    <div>
                      <table className="invoiceTableClass w-full overflow-auto">
                        <div className="rounded-xl bg-white mb-4 !w-max">
                          <tr className="flex justify-around items-center !text-[#2E2E2E] !text-xs !font-semibold !w-max">
                            <th className="!w-[170px] !pl-4 !text-start">
                              {strings.NAME_USER}
                            </th>
                            <th className="!w-[230px] !text-start">
                              <p className="w-[110px] m-auto">
                                {strings.LINK_POST}
                              </p>
                            </th>
                            <th className="!w-[150px]">{strings.STATUS}</th>
                            <th className="!w-[250px] searchFieldClass !mr-5">
                              <label
                                htmlFor="search"
                                className="flex py-3 px-5 justify-between items-center w-full"
                              >
                                <input
                                  className="!w-full py-1 !font-normal"
                                  type="text"
                                  id="search"
                                  placeholder={placeholder.SEARCH_USER}
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
                        {arr.map((item, index) => (
                          <div
                            className="rounded-xl bg-white mb-3 !w-min"
                            key={index}
                          >
                            <tr className="flex justify-around items-center !w-max">
                              <td className=" text-start !pl-4 !w-[170px]">
                                <p className="text-[#757575] text-sm font-medium !text-start">
                                  John dope
                                </p>
                              </td>
                              <td className="!w-[230px] text-sm !text-start">
                                <div className="w-[110px] m-auto">
                                  <p className="truncate font-medium">
                                    Bomber Jacket mantol
                                  </p>
                                  <span className="text-xs font-normal text-[#616161]">
                                    23904810283
                                  </span>
                                </div>
                              </td>
                              <td className="!w-[150px]">
                                <span
                                  className={`${
                                    item.id == 1
                                      ? approveStyle
                                      : item.id == 2
                                      ? pendingStyle
                                      : ""
                                  } rounded-3xl text-xs font-medium py-2 px-3`}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td className="!w-[250px] relative flex justify-end  !mr-5">
                                {item.id == 2 ? (
                                  <div className="flex items-center gap-4">
                                    <button className="bg-[#0094FF] rounded-2xl text-white py-3 px-4 text-sm font-normal">
                                      {strings.APPROVE}
                                    </button>
                                    <button className="text-[#C80000] border-2 rounded-2xl border-[#C80000] py-2.5 px-4 text-sm font-normal">
                                      {strings.APPROVE}
                                    </button>
                                  </div>
                                ) : (
                                  <Icon
                                    icon="bi:three-dots-vertical"
                                    width="24"
                                    height="24"
                                  />
                                )}
                              </td>
                            </tr>
                          </div>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default SocialModule;
