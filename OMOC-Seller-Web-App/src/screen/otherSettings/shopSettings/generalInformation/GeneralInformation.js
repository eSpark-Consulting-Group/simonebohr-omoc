import React, { useEffect, useState } from "react";
import Header from "../../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../../component/SIdeMenuBar";
import { strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import AddShopAddress from "./AddShopAddress";
import { useSelector } from "react-redux";
import OtherSettngSublyApi from "../../../../helper/OtherSettingsApi";
import { toast } from "react-toastify";

function GeneralInformation() {
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [addAddress, setAddAddress] = useState(false);
  const [personalInformation, setPersonalInformation] = useState({
    businessDetails: {},
    sellerDetails: {},
  });

  const [shopName, setShopName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [owner, setOwner] = useState("");
  const [taxId, setTaxId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  async function updatePersonalInformation() {
    const userData = {
      name: shopName,
      companyName: companyName,
      ownerName: owner,
      taxId: taxId,
      phone: phoneNumber,
      email: email,
    };
    await OtherSettngSublyApi.editGeneralInformation(token, _id, userData).then(
      (response) => {
        if (response.statusCode == 200) {
          toast.success(response.message);
          window.location.reload();
        } else {
          toast.error(response.massage);
        }
      }
    );
  }

  useEffect(() => {
    async function fetchPersonalInformation() {
      await OtherSettngSublyApi.generalInformation(token, _id).then(
        (response) => {
          // setPersonalInformation(response.data);
          // Set initial values for editable fields
          setShopName(response.data?.businessDetails?.name);
          setCompanyName(response.data?.businessDetails?.companyName);
          setOwner(response.data?.sellerDetails?.name);
          setTaxId(response.data?.businessDetails?.taxId);
          setPhoneNumber(response.data?.sellerDetails?.phone);
          setEmail(response.data?.sellerDetails?.email);
        }
      );
    }
    fetchPersonalInformation();
  }, []);
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
                    {strings.GENERAL_INFORMATION}
                  </h3>
                  <p className="text-[#7A7A7A] text-sm font-normal">
                    {strings.MANAGE_YOUR_SHOP_HERE}
                  </p>
                </div>
                <div className="flex items-center gap-5 mt-8 max-sm:flex-wrap">
                  <div className="w-full">
                    <p className="text-[#9E9E9E] text-sm font-normal mb-1">
                      {strings.SHOP_NAME_CAP}
                    </p>
                    <input
                      type="text"
                      className="bg-white rounded-xl w-full p-3"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-[#9E9E9E] text-sm font-normal mb-1">
                      {strings.COMPANY_NAME}
                    </p>
                    <input
                      type="text"
                      className="bg-white rounded-xl w-full p-3"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-5 mt-6 max-sm:flex-wrap">
                  <div className="w-full">
                    <p className="text-[#9E9E9E] text-sm font-normal mb-1">
                      {strings.OWNER}
                    </p>
                    <input
                      type="text"
                      className="bg-white rounded-xl w-full p-3"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-[#9E9E9E] text-sm font-normal mb-1">
                      {strings.TAX_ID_FAT}
                    </p>
                    <input
                      type="text"
                      className="bg-white rounded-xl w-full p-3"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-5 mt-6 max-sm:flex-wrap">
                  <div className="w-full">
                    <p className="text-[#9E9E9E] text-sm font-normal mb-1">
                      {strings.PHONE_NUMBER}
                    </p>
                    <input
                      type="text"
                      className="bg-white rounded-xl w-full p-3"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-[#9E9E9E] text-sm font-normal mb-1">
                      {strings.E_MAIL}
                    </p>
                    <input
                      type="text"
                      className="bg-white rounded-xl w-full p-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={updatePersonalInformation}
                    className="bg-[#0094FF] text-white text-base font-normal rounded-3xl py-3 px-8 flex items-center gap-3"
                  >
                    {strings.SAVE_CHANGE}
                  </button>
                </div>
                <div className="mt-8 mb-3">
                  <h3 className="text-[32px] font-bold">
                    {strings.SHOPS_ADDRESS}
                  </h3>
                  <p className="text-[#7A7A7A] text-sm font-normal">
                    {strings.MANAGE_YOUR_SHOP_ADDRESS_HERE}
                  </p>
                </div>
                <div className="w-3/4 mt-8 max-sm:w-full">
                  <div>
                    <p className="text-[#7A7A7A] text-sm font-normal mb-3 flex items-center gap-2">
                      {strings.ADDRESS_CAP} 1
                      <Icon
                        icon="uil:edit"
                        color="#0094ff"
                        width="20"
                        height="20"
                        cursor={"pointer"}
                        onClick={() => setAddAddress(true)}
                      />
                    </p>
                    <label className="bg-white rounded-xl w-full p-3 flex border-[#E8E8E8]">
                      <input type="text" className="w-full" />
                      <Icon
                        icon="ion:map-outline"
                        color="#9e9e9e"
                        width="25"
                        height="25"
                      />
                    </label>
                  </div>
                  <div className="mt-6">
                    <p className="text-[#7A7A7A] text-sm font-normal mb-3 flex items-center gap-2">
                      {strings.ADDRESS_CAP} 2
                      <Icon
                        icon="uil:edit"
                        color="#0094ff"
                        width="20"
                        height="20"
                        cursor={"pointer"}
                        onClick={() => setAddAddress(true)}
                      />
                    </p>
                    <label className="bg-white rounded-xl w-full p-3 flex border-[#E8E8E8]">
                      <input type="text" className="w-full" />
                      <Icon
                        icon="ion:map-outline"
                        color="#9e9e9e"
                        width="25"
                        height="25"
                      />
                    </label>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => setAddAddress(true)}
                      className="bg-[#0094FF] text-white text-base font-normal rounded-3xl py-3 px-4 flex items-center gap-3"
                    >
                      <Icon
                        icon="humbleicons:plus"
                        color="white"
                        width="24"
                        height="24"
                      />
                      {strings.ADD_OTHER_ADDRESS}
                    </button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <AddShopAddress addAddress={addAddress} setAddAddress={setAddAddress} />
      </div>
    </>
  );
}
export default GeneralInformation;
