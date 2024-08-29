import React, { useState } from "react";
import Modal from "react-modal";
import { strings } from "../../utils/strings";
import hoodie from "../../assets/image/image 9.png";
import ScanProductModal from "./ScanProductModal";
import Header from "../../component/Header";
import SideMenuBar from "../../component/SIdeMenuBar";
import CallChatNavigator from "../../component/CallChatNavigator";
import BarCodeSuccessModal from "./BarCodeSuccessModal";
import { Container, Grid } from "@mui/material";

const PackageData = [
  {
    image: hoodie,
    productName: "Hoodie Havana V1",
    name: "Jonny Deep",
    quantity: 2,
  },
  {
    image: hoodie,
    productName: "Hoodie Havana V1",
    name: "Jonny Deep",
    quantity: 2,
  },
  {
    image: hoodie,
    productName: "Hoodie Havana V1",
    name: "Jonny Deep",
    quantity: 2,
  },
];
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "46%",
  },
};
const ProductPackaging = () => {
  let subtitle;
  const [scanProductModal, setScanProductModal] = useState(false);
  const [barcodeSuccess, setBarcodeSuccess] = useState(false);
  function handleScanModal() {
    setScanProductModal(true);
  }
  function afterOpenModal() {
    subtitle.style.color = "#000";
  }
  function closeModal() {
    setScanProductModal(false);
    setBarcodeSuccess(false);
  }
  const handleBarcode = () => {
    setBarcodeSuccess(true);
    setScanProductModal(false);
  };
  return (
    <div className={`bg-[#F2F2F2] h-full`}>
      <div className=" w-full bg-[#fff] fixed top-0 z-20">
        <Header />
      </div>
      <Container className="pt-28">
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <SideMenuBar />
          </Grid>
          <Grid item md={9} xs={12}>
            <div className="w-full pt-5">
              <h1 className="text-[32px] font-bold text-[#2A2A2A]">
                {strings.LIST_OF_PRODUCTS_READY_FOR_PACKAGING}
              </h1>
              <p className="text-sm font-normal	text-[#7A7A7A] mb-5">
                {strings.PRODUCTS_PACKAGING_DESCRIPTION}
              </p>
              <div className="max-md:overflow-auto">
                <div className="max-md:w-max">
                  <div className="flex bg-white h-14 rounded-xl	items-center justify-around max-md:w-[860px]">
                    <p className="text-sm font-semibold">{strings.PRODUCT}</p>
                    <p className="text-sm font-semibold">{strings.COSTUMER}</p>
                    <p className="text-sm font-semibold">{strings.QUANTITY}</p>
                    <p></p>
                  </div>
                  {PackageData.map(() => {
                    return (
                      <div className="flex justify-between  bg-white items-center p-5 rounded-xl my-2">
                        <div className="flex items-center gap-5 max-sm:flex-wrap">
                          <img
                            className="h-[72px] w-[72px] rounded-xl	"
                            src={hoodie}
                          />
                          <div>
                            <p className="text-xs font-semibold">
                              {strings.HOODIE_HAVANA}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm	font-normal	text-[#121212] mr-20 max-sm:mr-10">
                          {strings.JONNY_DEEP}
                        </p>
                        <p className="text-sm	font-normal	text-[#121212] px-2">
                          2
                        </p>

                        <button
                          className="	w-36 bg-[#0094FF] rounded-[30px] p-2 py-4"
                          onClick={handleScanModal}
                        >
                          <p className="text-white text-sm font-semibold">
                            {strings.SCAN_BARCODE}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Modal
                isOpen={scanProductModal}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={{
                  content: {
                    left: "auto",
                    right: "27%",
                    width: "50%",
                  },
                }}
                contentLabel="Example Modal"
              >
                <div ref={(_subtitle) => (subtitle = _subtitle)}>
                  <ScanProductModal
                    closeModal={closeModal}
                    barcode={handleBarcode}
                  />
                </div>
              </Modal>
              <Modal
                isOpen={barcodeSuccess}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div ref={(_subtitle) => (subtitle = _subtitle)}>
                  <BarCodeSuccessModal closeModal={closeModal} />
                </div>
              </Modal>
            </div>{" "}
          </Grid>
        </Grid>
      </Container>

      <div className="bottom-10 right-14 fixed">
        <CallChatNavigator />
      </div>
    </div>
  );
};

export default ProductPackaging;
