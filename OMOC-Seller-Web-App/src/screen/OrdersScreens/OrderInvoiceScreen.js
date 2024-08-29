import React, { useState } from "react";
import "./OrdersScreen.css";
import { Icon } from "@iconify/react";
import Modal from "react-modal";
import InvoiceOptions from "./InvoiceOptions";
import { placeholder, strings } from "../../utils/strings";
import OrderInvoiceSubHeader from "../../component/OrderInvoiceSubHeader";
import OrderInvoiceHeader from "../../component/OrderInvoiceHeader";
import ManageOption from "./ManageOption";
import ResendInvoiceModal from "./ResendInvoiceModal";
import BarCodeSuccessModal from "./BarCodeSuccessModal";
import BarCodeErrorModal from "./BarCodeErrorModal";
import ReturnAddressModal from "./ReturnAddressModal";
import EditOrderModal from "./EditOrderModal";
import CallChatNavigator from "../../component/CallChatNavigator";
import Header from "../../component/Header";
import SideMenuBar from "../../component/SIdeMenuBar";
import AddNewInvoiceModal from "../../component/AddNewInvoice";
import { Container, Grid, TableBody } from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor:"red"
    width: "46%",
  },
};
function OrderInvoiceScreen() {
  let subtitle;
  const [openModal, setOpenModal] = useState(false);
  const [openManage, setOpenManage] = useState(false);
  const [resendInvoice, setResendInvoice] = useState(false);
  const [newInvoiceModal, setNewInvoiceModal] = useState(false);

  function afterOpenModal() {
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setResendInvoice(false);
  }

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
              <div className="w-full pt-5 h-screen">
                <div className="flex justify-between items-center max-sm:flex-wrap">
                  <div>
                    <h2 className="text-3xl font-bold mb-1">
                      {strings.ORDER_LIST_DASH}
                    </h2>
                    <p className="font-normal text-sm text-gray-500">
                      {strings.MANAGE_YOUR_ORDER}
                    </p>
                  </div>
                  <div
                    className="newInvoice-btn cursor-pointer max-sm:mt-4"
                    onClick={() => {
                      setOpenModal(!openModal);
                    }}
                  >
                    <Icon icon="bi:plus" color="white" width="32" height="32" />
                    <p>{strings.NEW_INVOICE}</p>
                    {openModal && (
                      <InvoiceOptions setNewInvoiceModal={setNewInvoiceModal} />
                    )}
                  </div>
                </div>
                <div>
                  <OrderInvoiceHeader />
                </div>
                <div>
                  <OrderInvoiceSubHeader
                    placeholderText={placeholder.SEARCH_INVOICE}
                    btnText={strings.RESEND_INVOICE}
                    dropdownText={strings.ALL_TYPES}
                    onClickLeftBtn={() => {
                      setResendInvoice(true);
                    }}
                  />
                </div>
                <div className={`${"overflow-auto"}`}>
                  <div className="w-max">
                    <TableContainer className="!w-[857px]">
                      <Table
                        aria-label="simple table"
                        className="rounded-xl bg-white mb-4"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              className="!text-sm !font-semibold"
                            >
                              #
                            </TableCell>
                            <TableCell
                              align="center"
                              className="!text-sm !font-semibold"
                            >
                              {strings.INVOICE}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="!text-sm !font-semibold"
                            >
                              {strings.DATE_ISSUED}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="!text-sm !font-semibold"
                            >
                              {strings.DATE_DUE}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="!text-sm !font-semibold"
                            >
                              {strings.COSTUMER}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="!text-sm !font-semibold"
                            >
                              {strings.STATUS}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="!text-sm !font-semibold"
                            >
                              {strings.AMOUNT}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="!text-sm !font-semibold !px-11"
                            ></TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                    <div className="relative">
                      <TableContainer>
                        <Table
                          aria-label="simple table"
                          className="rounded-xl bg-white mb-4"
                        >
                          <TableBody>
                            <TableRow>
                              <TableCell
                                align="left"
                                className="!text-sm !font-semibold"
                              >
                                <input type="checkbox" className="w-5 h-5" />
                              </TableCell>
                              <TableCell
                                align="left"
                                className="!text-sm !font-semibold"
                              >
                                INV-000043
                              </TableCell>
                              <TableCell
                                align="left"
                                className="!text-sm !font-semibold"
                              >
                                10-May-2020
                              </TableCell>
                              <TableCell
                                align="left"
                                className="!text-sm !font-semibold"
                              >
                                28-May-2020
                              </TableCell>
                              <TableCell
                                align="left"
                                className="!text-sm !font-semibold"
                              >
                                Jonny Deep
                              </TableCell>
                              <TableCell
                                align="left"
                                className="!text-sm !font-semibold"
                              >
                                <span className="bg-green-100 py-1 px-2 rounded-2xl	text-xs	text-green-700">
                                  Paid
                                </span>
                              </TableCell>
                              <TableCell
                                align="left"
                                className="!text-sm !font-semibold"
                              >
                                $500
                              </TableCell>
                              <TableCell
                                onClick={() => {
                                  setOpenManage(!openManage);
                                }}
                                align="left"
                              >
                                <span className="!text-sm !font-semibold manage-dropdown flex justify-center items-center gap-1 cursor-pointer ">
                                  <p className="ml-2"> {strings.MANAGE}</p>
                                  <Icon
                                    icon="iconamoon:arrow-down-2-light"
                                    width="24"
                                    height="24"
                                  />
                                </span>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      {openManage && <ManageOption />}
                    </div>
                  </div>
                </div>
              </div>{" "}
            </Grid>
          </Grid>
        </Container>
        <Modal
          isOpen={resendInvoice}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Resend Invoice Modal"
        >
          <div ref={(_subtitle) => (subtitle = _subtitle)}>
            <ResendInvoiceModal closeModal={closeModal} />
          </div>
        </Modal>
      </div>
      <div className="bottom-10 right-14 fixed">
        <CallChatNavigator />
      </div>
      <AddNewInvoiceModal
        setNewInvoiceModal={setNewInvoiceModal}
        newInvoiceModal={newInvoiceModal}
      />
    </>
  );
}

export default OrderInvoiceScreen;
