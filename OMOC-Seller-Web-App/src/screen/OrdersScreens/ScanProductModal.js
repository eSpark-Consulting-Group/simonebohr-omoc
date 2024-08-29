import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { placeholder, strings } from "../../utils/strings";
import hoodie from "../../assets/image/image 9.png";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const detailProductData = [
  {
    image: hoodie,
    productName: "Hoodie Havana V1",
    barcode: 192023,
    name: "Jonny Deep",
    quantity: 2,
    price: "$450",
  },
  {
    image: hoodie,
    productName: "Hoodie Havana V1",
    barcode: 192023,
    name: "Jonny Deep",
    quantity: 2,
    price: "$450",
  },
  {
    image: hoodie,
    productName: "Hoodie Havana V1",
    barcode: 192023,
    name: "Jonny Deep",
    quantity: 2,
    price: "$450",
  },
];

const ScanProductModal = ({ closeModal, subtitle, barcode }) => {
  const [productEmpty, setProdectEmpty] = useState(0);
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-bold text-2xl">{strings.SCAN_PRODUCT}</p>
        <button onClick={closeModal}>
          <Icon icon="system-uicons:cross" style={{ width: 24, height: 24 }} />
        </button>
      </div>
      <p className="text-xl	font-semibold mt-5">{strings.BARCODE_SKU}</p>
      <div className="flex gap-5 my-5">
        <input
          placeholder={placeholder.INVOIC_NAME_EG}
          className="w-full rounded-xl border-[#EDEDED] h-14 border-2 p-2"
        />
        <button className="h-14 w-24 bg-[#0094FF] rounded-[30px]">
          <p className="text-[#fff]">{strings.ADD}</p>
        </button>
      </div>
      {detailProductData.length === 0 ? (
        <div className="flex justify-center border-2 border-[#EDEDED] rounded-xl">
          <div className="items-self-center">
            <h1 className="text-2xl font-semibold my-5 text-center">
              {strings.SCAN_ITEMS_FOR_PACKING}
            </h1>
            <p className="text-base text-[#2A2A2A] leading-7 text-center my-5">
              {strings.SCAN_ITEMS_DESCRIPTION}
            </p>
            <div className="flex justify-center my-5">
              <button className="h-14 w-60 rounded-[30px] border-[#0094FF] border-2">
                <p className="font-semibold text-[#0094FF]">
                  {strings.SEE_WHAT_OMOC_SCAN_DO}
                </p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-semibold my-5">
            {strings.DETAIL_PRODUCT}
          </h1>
          {detailProductData.map(() => {
            return (
              <TableContainer className="border-2 rounded-xl my-4">
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        <div className="flex items-center gap-5 max-sm:flex-wrap max-sm:gap-1">
                          <img
                            className="h-[72px] w-[72px] rounded-xl	"
                            src={hoodie}
                          />
                          <div>
                            <p className="text-xs font-semibold my-2">
                              {strings.HOODIE_HAVANA}
                            </p>
                            <p className="text-xs text-[#7A7A7A]">
                              Barcode : 192023
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <p className="text-sm	font-normal	text-[#121212]">
                          {strings.JONNY_DEEP}
                        </p>
                      </TableCell>
                      <TableCell align="left">
                        <p className="text-sm	font-normal	text-[#121212]">2</p>
                      </TableCell>
                      <TableCell align="left">
                        <p className="text-sm	font-normal	text-[#121212]">$450</p>
                      </TableCell>
                      <TableCell align="left">
                        <Icon
                          icon="material-symbols-light:delete-outline"
                          className="h-6 w-6"
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            );
          })}

          <div className="flex justify-between items-center mt-5">
            <div>
              <p className="text-sm	font-normal text-[#2A2A2A]">
                {strings.PRICE_TOTAL}
              </p>
              <p className="text-lg	font-semibold text-[#2A2A2A]">$450</p>
            </div>
            <button
              className="h-14	w-64 rounded-[30px] bg-[#0094FF]"
              onClick={barcode}
            >
              <p className="text-lg	font-semibold text-white">
                {strings.SAVE_ORDER_AS_PACKAGED}
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanProductModal;
