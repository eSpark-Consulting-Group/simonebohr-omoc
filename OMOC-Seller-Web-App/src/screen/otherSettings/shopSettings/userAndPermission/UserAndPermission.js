import React, { useState } from "react";
import Header from "../../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import profile from "../../../../assets/icon/profile_icon.svg";
import shopping from "../../../../assets/icon/shopping_icon.svg";
import AddAdminModal from "./AddAdminModal";

function UserAndPermission() {
  const approveStyle = "text-[#22C55E] bg-[#22C55E1A]";
  const [manageDropdown, setManageDropdown] = useState(false);
  const [addAdmin, setAddAdmin] = useState(false);

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
                        {strings.USER_AND_PERMISSION}
                      </h3>
                      <p className="text-[#7A7A7A] text-sm font-normal">
                        {strings.MANAGE_YOUR_SHOP_HERE}
                      </p>
                    </div>
                    <div
                      onClick={() => setAddAdmin(true)}
                      className="newInvoice-btn cursor-pointer !gap-1 max-sm:mt-4"
                    >
                      <Icon
                        icon="bi:plus"
                        color="white"
                        width="32"
                        height="32"
                      />
                      <p className="text-base font-normal">
                        {strings.ADD_ADMIN}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-auto">
                    <div className="w-max">
                      <div>
                        <table className="invoiceTableClass w-full overflow-auto">
                          <div className="rounded-xl bg-white mb-4 !w-max">
                            <tr className="flex justify-around items-center !text-[#2E2E2E] !text-xs !font-semibold !w-max">
                              <th className="!w-[230px] !pl-4 !text-start">
                                {strings.USER_NAME}
                              </th>
                              <th className="!w-[170px]">{strings.ACCESS}</th>
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
                                    placeholder={placeholder.SEARCH_ADMIN}
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
                                <div>
                                  <p className="text-base font-semibold !text-start truncate">
                                    James Harden
                                  </p>
                                  <p className="text-xs font-normal !text-start">
                                    Jamesharden@gmail.com
                                  </p>
                                </div>
                              </td>
                              <td className="!w-[170px] text-[#757575] text-sm !text-start">
                                <div className="flex items-center gap-2 justify-center">
                                  <img src={profile} />
                                  <img src={shopping} />
                                  <Icon
                                    icon="solar:shop-outline"
                                    color="#9e9e9e"
                                    width="19"
                                    height="19"
                                  />
                                </div>
                              </td>
                              <td className="!w-[150px] text-[#757575] text-sm font-medium">
                                <span
                                  className={`${approveStyle} rounded-3xl text-xs font-medium py-2 px-3`}
                                >
                                  Active
                                </span>
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
                                  {manageDropdown && <ManageOption />}
                                </span>
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
        <AddAdminModal addAdmin={addAdmin} setAddAdmin={setAddAdmin} />
      </div>
    </>
  );
}
export default UserAndPermission;

function ManageOption() {
  return (
    <div className="bg-white !z-10 rounded-xl w-44 text-start p-3 absolute !top-20 shadow-2xl invoice-option-box right-0">
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-lg">
        {strings.EDIT}
      </p>
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-lg">
        {strings.REMOVE_ACCESS}
      </p>
    </div>
  );
}
