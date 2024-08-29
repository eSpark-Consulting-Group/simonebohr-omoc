import React, { useState } from "react";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import "./ProductsScreen.css";
import shoe from "../../assets/image/shoe-img.png";
import Modal from "react-modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ProductIdModal = ({ setOpenProduct, openProduct }) => {
  const [isSelect, setIsSelect] = useState(false);
  const arr = [1, 2, 3];
  return (
    <Modal
      isOpen={openProduct}
      onRequestClose={() => {
        setOpenProduct(false);
      }}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          borderRadius: "15px",
        },
      }}
      contentLabel="Resend Invoice Modal"
    >
      <div className="addProductClass">
        <div className="flex justify-between pb-3">
          <p className="font-bold text-2xl">{strings.ADD_PRODUCT_ID}</p>
          <button
            onClick={() => {
              setOpenProduct(false);
              setIsSelect(false);
            }}
          >
            <Icon
              icon="system-uicons:cross"
              style={{ width: 24, height: 24 }}
            />
          </button>
        </div>
        {!isSelect && (
          <div className="searchFieldClass flex justify-between items-center py-3">
            <label
              htmlFor="search"
              className="flex py-2 px-5 justify-between items-center w-1/2 max-md:w-[60%]"
            >
              <input
                className="w-full py-1"
                type="text"
                id="search"
                placeholder={placeholder.SEARCH_PRODUCT}
              />
              <Icon icon="uil:search" width="24" height="24" />
            </label>
            <label className="rounded-xl border-[#EDEDED] border-2  py-3 px-5 w-[20%] max-md:w-[35%]">
              <select className="w-full">
                <option>XYZ</option>
              </select>
            </label>
          </div>
        )}
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead className="rounded-xl bg-[#F5F5F5]">
              <TableRow>
                <TableCell align="left" width={"45%"}>
                  <p className="text-base font-normal text-[#404040] text-center w-[280px]">
                    {strings.PRODUCT_NAME}
                  </p>
                </TableCell>
                <TableCell align="left" width={"30%"}>
                  <p className="text-base font-normal text-[#404040] text-center w-[180px]">
                    {strings.PRICE}
                  </p>
                </TableCell>
                <TableCell align="left" width={"25%"}>
                  <p className="text-base font-normal text-[#404040] text-center w-[145px]">
                    {strings.STOCK}
                  </p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left" scope="row">
                  <div className="flex items-center justify-start gap-12 max-md:gap-5">
                    <input type="checkbox" className="w-5 h-5" checked={true} />
                    <div className="flex items-center gap-4">
                      <img src={shoe} alt="product" />
                      <p className="text-base font-semibold ">
                        Nike Air Jordan
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="left">
                  <p className="text-base font-normal text-[#757575] text-center">
                    $1.120
                  </p>
                </TableCell>
                <TableCell align="left">
                  <p className="text-base font-normal text-[#757575] text-center">
                    123
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {isSelect && (
          <div className="my-4">
            <input
              type="text"
              className="w-full border-2 rounded-xl p-4"
              placeholder={placeholder.WRITE_TITLE_CATEGORIE}
            />
          </div>
        )}
        {!isSelect ? (
          <div className="flex items-center justify-end gap-4 mt-2">
            <button
              className="newInvoice-btn !px-4 !py-3 !gap-1 text-white"
              onClick={() => {
                setIsSelect(true);
              }}
            >
              {strings.CHOOSE_PRODUCT}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-4 mt-2">
            <button className="!text-[#0094FF] font-semibold rounded-3xl border-2 border-[#0094FF] px-4 py-3">
              {strings.SCAN_BARCODE}
            </button>
            <button className="!text-[#C2C2C2] font-semibold rounded-3xl bg-[#F5F5F5] px-4 py-3">
              {strings.SAVE_PRODUCT_ID}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ProductIdModal;
