import React, { useState } from "react";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import trash from "../../assets/icon/trash.svg";
import camera from "../../assets/icon/camera.svg";
import {
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InventoryModal from "./InventoryModal";

function ProductVariant() {
  const [openInventory, setOpenInventory] = useState(false);
  return (
    <>
      <div>
        <div className="flex justify-between items-center gap-5 flex-wrap mb-7">
          <div className="w-2/3 max-sm:w-full">
            <p className="text-2xl font-semibold">
              {strings.ADD_PRODUCT_VARIANT}
            </p>
            <p className="text-sm text-[#404040] font-medium">
              {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
            </p>
          </div>
          <button className="border-2 border-[#0094FF] text-[#0094FF] text-base font-semibold rounded-3xl py-2.5 px-4">
            {strings.ADD_PRODUCT_VARIANT}
          </button>
        </div>
        {[1, 2].map(() => (
          <div className="my-5 flex items-center gap-4 max-sm:flex-wrap">
            <div className="flex justify-between items-center border border-[#E0E0E0] rounded-xl py-3 px-4 w-1/2">
              <p className="text-base font-medium">Color</p>
              <Icon
                icon="iconamoon:arrow-up-2-light"
                color="#101010"
                width="30"
                height="30"
                rotate={2}
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <div className="flex justify-between items-center border border-[#E0E0E0] rounded-xl py-3 px-4 w-full">
                <div className="text-sm text-[#0094ff] font-normal flex items-center gap-4 flex-wrap w-[90%]">
                  {["red", "White", "Black"].map((items) => (
                    <p className="flex items-center gap-2 rounded-xl bg-[#E8F5FF] py-1 px-2">
                      <span>{items}</span>
                      <Icon
                        icon="mingcute:close-fill"
                        color="#0094ff"
                        width="10"
                        height="10"
                        rotate={2}
                      />
                    </p>
                  ))}
                </div>
                <Icon
                  icon="iconamoon:arrow-up-2-light"
                  color="#101010"
                  width="30"
                  height="30"
                  rotate={2}
                />
              </div>
              <img src={trash} />
            </div>
          </div>
        ))}
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-[#F5F5F5]">
                  <TableCell
                    align="center"
                    className="!py-3 rounded-s-xl !text-[#9E9E9E] !text-sm !font-semibold "
                  >
                    {strings.VARIANT_IMAGE}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="!text-[#9E9E9E] !text-sm !font-semibold "
                  >
                    {strings.VARIANT_COLOR}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="!text-[#9E9E9E] !text-sm !font-semibold "
                  >
                    {strings.VARIANT_SIZE}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="!text-[#9E9E9E] !text-sm !font-semibold "
                  >
                    {strings.VARIANT_PRICE}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="!text-[#9E9E9E] !text-sm !font-semibold "
                  >
                    {strings.VARIANT_STOCK}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="!text-[#9E9E9E] !text-sm !font-semibold "
                  >
                    {strings.VARIANT_SKU}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="!text-[#9E9E9E] !text-sm !font-semibold "
                  >
                    {strings.VARIANT_WEIGHT}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="!text-[#9E9E9E] !text-sm !font-semibold "
                  >
                    {strings.VARIANT_STATUS}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="!py-3 rounded-e-xl w-20"
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-center">
                {[1, 2, 3, 4].map(() => (
                  <TableRow className="text-center">
                    <TableCell align="center" className="border-b-2 py-5">
                      <img
                        src={camera}
                        className="m-auto w-12 h-12 p-2 bg-[#F5F5F5] rounded-md border-[#EDEDED] border"
                      />
                    </TableCell>
                    <TableCell align="center" className="border-b-2 py-5">
                      {" "}
                      <p className="text-base font-semibold">White</p>
                    </TableCell>
                    <TableCell align="center" className="border-b-2 py-5">
                      {" "}
                      <p className="text-base font-normal">8</p>
                    </TableCell>
                    <TableCell align="center" className="border-b-2 py-5">
                      <p className="border-2 rounded-md text-xs font-medium py-1.5 px-2 flex items-center gap-2 justify-center">
                        <span className="bg-[#E6E6E6] text-[#9E9E9E] rounded-3xl p-1 font-medium">
                          $
                        </span>
                        999,000
                      </p>
                    </TableCell>
                    <TableCell align="center" className="border-b-2 py-5">
                      <p className="border-2 rounded-md text-xs font-medium py-2.5 px-5">
                        999
                      </p>
                    </TableCell>
                    <TableCell align="center" className="border-b-2 py-5">
                      <p className="border-2 rounded-md text-xs font-medium py-2.5 px-5">
                        999
                      </p>
                    </TableCell>
                    <TableCell align="center" className="border-b-2 py-5">
                      <p className="border-2 rounded-md text-xs font-medium py-2.5 px-5">
                        999
                      </p>
                    </TableCell>
                    <TableCell align="center" className="border-b-2 py-5">
                      <Switch />
                    </TableCell>
                    <TableCell align="center" className="border-b-2 py-5">
                      <button
                        onClick={() => setOpenInventory(true)}
                        className="border-[#0094FF] rounded-3xl border-2 text-[#0094FF] font-medium text-sm py-2.5 px-5"
                      >
                        Edit
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <InventoryModal
          openInventory={openInventory}
          setOpenInventory={setOpenInventory}
        />
      </div>
    </>
  );
}

export default ProductVariant;
