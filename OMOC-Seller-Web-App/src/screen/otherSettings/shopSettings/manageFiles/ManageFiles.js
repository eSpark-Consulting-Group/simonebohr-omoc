import React, { useState } from "react";
import Header from "../../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import shoe from "../../../../assets/image/shoe-img.png";

function ManageFiles() {
  const [manageDropdown, setManageDropdown] = useState(false);
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
                  <h3 className="text-[32px] font-bold">
                    {strings.MANAGE_FILES}
                  </h3>
                  <p className="text-[#7A7A7A] text-sm font-normal">
                    {strings.MANAGE_YOUR_SHOP_HERE}
                  </p>
                </div>
                <div className="overflow-auto">
                  <div className="w-max">
                    <div>
                      <table className="invoiceTableClass w-full overflow-auto">
                        <div className="rounded-xl bg-white mb-4 !w-max">
                          <tr className="flex justify-around items-center !text-[#2E2E2E] !text-xs !font-semibold !w-max">
                            <th className="!w-[230px] !pl-4 !text-start">
                              {strings.FILE_NAME}
                            </th>
                            <th className="!w-[170px] !text-start">
                              {strings.TYPE}
                            </th>
                            <th className="!w-[150px]">{strings.LICENSE}</th>
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
                        <div className="rounded-xl bg-white mb-3 !w-min">
                          <tr className="flex justify-around items-center !w-max">
                            <td className=" text-start !pl-4 !w-[230px]">
                              <div className="flex items-center gap-2">
                                <img
                                  src={shoe}
                                  className="w-14 h-14 rounded-xl bg-[#F4F4F4] p-2"
                                />
                                <p className="text-base font-medium !text-start truncate">
                                  Shoe
                                </p>
                              </div>
                            </td>
                            <td className="!w-[170px] text-[#757575] text-sm !text-start">
                              <p className="font-medium">jpg</p>
                            </td>
                            <td className="!w-[150px] text-[#757575] text-sm font-medium">
                              All Right Reserved
                            </td>
                            <td className="!w-[250px] relative flex justify-end  !mr-5 relative">
                              <span
                                onClick={() => {
                                  setManageDropdown(!manageDropdown);
                                }}
                                className="flex justify-center items-center gap-1 !py-2.5 px-2 cursor-pointer  rounded-2xl border-2"
                              >
                                {strings.MANAGE}
                                <Icon
                                  icon="iconamoon:arrow-down-2-light"
                                  width="24"
                                  height="24"
                                />
                                {manageDropdown && <FileManage />}
                              </span>
                            </td>
                          </tr>
                        </div>
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

export default ManageFiles;

function FileManage() {
  return (
    <div className="bg-white !z-10 rounded-xl w-52 text-start p-3 absolute !top-20 shadow-2xl invoice-option-box right-0">
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-xl">
        {strings.EDIT_LICENSE}
      </p>
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-xl">
        {strings.DELETE_FILE}
      </p>
    </div>
  );
}
