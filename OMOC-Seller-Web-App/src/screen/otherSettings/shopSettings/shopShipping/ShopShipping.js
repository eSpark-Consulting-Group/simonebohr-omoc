import React, { useEffect, useState } from "react";
import Header from "../../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../../component/SIdeMenuBar";
import { strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import ShopShippingHeader from "./ShopShippingHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import OtherSettngSublyApi from "../../../../helper/OtherSettingsApi";
import { toast } from "react-toastify";
import EditShippingRegion from "./EditShippingRegion";

function ShopShipping() {
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [manageDropdown, setManageDropdown] = useState({
    isOpen: false,
    id: "",
  });
  const [shopSetting, setShopSetting] = useState([]);
  const [regionId, setRegionId] = useState();

  async function deleteShopRegion() {
    const shopId = _id;
    const id = regionId;
    await OtherSettngSublyApi.deleteShopSetting(token, shopId, id).then(
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
    async function getShopSetting() {
      const shopId = _id;
      await OtherSettngSublyApi.fetchShopSetting(token, shopId).then(
        (response) => {
          setShopSetting(response.data);
        }
      );
    }
    getShopSetting();
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
                <ShopShippingHeader />
                <div>
                  <TableContainer>
                    <Table className="w-full">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            className="rounded-s-2xl bg-white !text-sm !font-semibold"
                          >
                            {strings.REGION}
                          </TableCell>
                          <TableCell
                            align="center"
                            className="bg-white !text-sm !font-semibold"
                          >
                            {strings.TAX}
                          </TableCell>
                          <TableCell
                            align="center"
                            className="bg-white !text-sm !font-semibold"
                          >
                            {strings.ESTIMATED_SHIPPING_TIME}
                          </TableCell>
                          <TableCell
                            align="center"
                            className="bg-white !text-sm !font-semibold"
                          >
                            {strings.MINIMUM_PRICE}
                          </TableCell>
                          <TableCell
                            align="center"
                            className="rounded-e-2xl bg-white !text-sm !font-semibold "
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {shopSetting?.shippings?.map((items, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell
                                align="center"
                                className="!text-sm !font-medium"
                              >
                                {items.region}
                              </TableCell>
                              <TableCell
                                align="center"
                                className="!text-sm !font-normal"
                              >
                                {items.tax}
                              </TableCell>
                              <TableCell
                                align="center"
                                className="!text-sm !font-normal"
                              >
                                {items.minShippingTime}-{items.maxShippingTime}{" "}
                                days
                              </TableCell>
                              <TableCell
                                align="center"
                                className="!text-sm !font-normal"
                              >
                                <p>{items.minPrince}</p>
                              </TableCell>
                              <TableCell
                                align="center"
                                className="!text-sm !font-normal relative"
                              >
                                <Icon
                                  icon="bi:three-dots-vertical"
                                  width="24"
                                  height="24"
                                  cursor={"pointer"}
                                  onClick={() => {
                                    setManageDropdown({
                                      isOpen: !manageDropdown.isOpen,
                                      id: index,
                                    });
                                    setRegionId(items._id);
                                  }}
                                />
                                {manageDropdown.isOpen &&
                                  manageDropdown.id === index && (
                                    <ShippingOption
                                      deleteShopRegion={deleteShopRegion}
                                      item={items}
                                    />
                                  )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {shopSetting?.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5}>
                              <p className="text-center text-2xl my-2 font-medium text-gray-500 py-3">
                                {strings.NO_RECORD_FOUND}
                              </p>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default ShopShipping;

function ShippingOption({ deleteShopRegion, item }) {
  const [addShipping, setAddShipping] = useState(false);
  console.log("----ITEMS", item);
  return (
    <div className="bg-white !z-10 rounded-lg w-48 text-start p-3 absolute !top-5 shadow-2xl invoice-option-box right-16">
      <p
        className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-lg"
        onClick={() => {
          setAddShipping(true);
        }}
      >
        {strings.EDIT}
      </p>
      <p
        className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-lg"
        onClick={() => {
          deleteShopRegion();
        }}
      >
        {strings.DELETE_REGION}
      </p>
      <EditShippingRegion
        addShipping={addShipping}
        setAddShipping={setAddShipping}
        item={item} // Pass down the item object
      />
    </div>
  );
}
