import React, { useState } from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";

function NewsLetter() {
  const [openOption, setOpenOption] = useState(false);
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
                <div className="bg-[#F2F2F2] h-full">
                  <div className="flex items-center justify-between max-sm:flex-wrap mt-5 mb-8">
                    <div>
                      <h3 className="text-3xl font-bold mb-1">
                        {strings.NEWSLETTERS}
                      </h3>
                      <p className="text-[#7A7A7A] text-sm font-normal">
                        {strings.MANAGE_YOUR_SHOP_HERE}
                      </p>
                    </div>
                    <div className="newInvoice-btn cursor-pointer !gap-1 max-sm:mt-4">
                      <p className="text-base font-normal">
                        {strings.CREATE_NEWSLETTER}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-auto">
                    <div className="w-max">
                      <div>
                        <table className="invoiceTableClass w-full overflow-auto">
                          <div className="rounded-xl bg-white mb-4 !w-max">
                            <tr className="flex justify-around items-center !text-[#2E2E2E] !text-xs !font-semibold !w-max">
                              <th className="!w-[150px] !pl-4 !text-start">
                                {strings.TITLE}
                              </th>
                              <th className="!w-[400px] !pl-12 !text-start">
                                {strings.DESCRIPTION}
                              </th>
                              <th className="!w-[250px] searchFieldClass !mr-5">
                                <label
                                  htmlFor="search"
                                  className="flex py-3 px-5 justify-between items-center w-full"
                                >
                                  <input
                                    className="!w-full py-1 !font-normal"
                                    type="text"
                                    id="search"
                                    placeholder={placeholder.SEARCH_INVOICE}
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
                          <div className="rounded-xl bg-white mb-3 !w-min">
                            <tr className="flex justify-around items-center !w-max">
                              <td className=" text-start !pl-4 !w-[200px]">
                                <p className="text-xs font-normal !text-start">
                                  Flash Sale 2023
                                </p>
                              </td>
                              <td className="!w-[430px] text-[#757575] text-sm !text-start !ml-1">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's stan
                              </td>
                              <td className="!w-[170px] relative flex justify-end  !mr-5 relative">
                                <Icon
                                  icon="bi:three-dots-vertical"
                                  width="25"
                                  height="25"
                                  cursor={"pointer"}
                                  onClick={() => setOpenOption(!openOption)}
                                />
                                {openOption && <NewsOption />}
                              </td>
                            </tr>
                          </div>
                        </table>
                      </div>
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

export default NewsLetter;

function NewsOption() {
  return (
    <div className="bg-white !z-10 rounded-xl w-44 text-start p-3 absolute !top-5 shadow-2xl invoice-option-box right-6">
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-lg">
        {strings.EDIT_NEWSLETTER}
      </p>
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-lg">
        {strings.DELETE}
      </p>
    </div>
  );
}
