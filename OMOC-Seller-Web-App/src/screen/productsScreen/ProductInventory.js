import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { placeholder, strings } from "../../utils/strings";
import setting from "../../assets/icon/setting-2.svg";
import hoodie from "../../assets/image/image 9.png";
import StoreModal from "./StoreModal";
import InventoryInfo from "./InventoryInfo";
import Modal from "react-modal";
import AddProductModal from "./AddProductModal";
import ProductIdModal from "./ProductIdModal";
import UploadProductDropdown from "./UploadProductDropdown";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableBody } from "@mui/material";
import ProductSublyApi from "../../helper/ProductApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const Inventory = [
  { id: 1, text: "Hoodie Havana V1" },
  { id: 2, text: "Hoodie Havana V1" },
  { id: 3, text: "Hoodie Havana V1" },
  { id: 4, text: "Hoodie Havana V1" },
  { id: 5, text: "Hoodie Havana V1" },
];
const ProductInventory = ({ setIsLoader }) => {
  const activeStyle = "text-[#22C55E] bg-[#22C55E1A]";
  const inActiveStyle = "text-[#640000] bg-[#F4CCCC]";
  let subtitle;
  const { shopInfo } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [showStore, setShowStore] = useState(false);
  const [storeNameShow, setStoreNameShow] = useState(null);
  const [showInventory, setShowInventory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [uploadPopup, setUploadPopup] = useState(false);
  const [productList, setProductList] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState();

  const handleShowStore = (storeName) => {
    setStoreNameShow(storeName);
    setShowStore(!showStore);
  };
  function afterOpenModal() {
    subtitle.style.color = "#000";
  }
  function closeModal() {
    setShowAddProduct(false);
  }
  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  // ===============Fetch product list API=================
  useEffect(() => {
    async function productListHandle() {
      setIsLoader(true);
      await ProductSublyApi.fetchProductList(
        shopInfo._id,
        currentPage,
        pageSize,
        token
      ).then((response) => {
        setIsLoader(false);
        if (response.statusCode == 200) {
          setProductList(response.data.products);
          setTotalPages(Math.ceil(response.data.count / pageSize));
        }
      });
    }
    productListHandle();
  }, [shopInfo, showInventory, currentPage]);

  const handlePagination = (data) => {
    setCurrentPage(data.selected + 1); // Page numbers start from 0
  };

  // =============Delete product API==============
  async function deleteProductHandle() {
    setIsLoader(true);
    await ProductSublyApi.deleteProduct(
      openModalIndex,
      shopInfo._id,
      token
    ).then((response) => {
      setIsLoader(false);
      if (response.statusCode == 200) {
        toast.success(response.message);
        setShowInventory(false);
      } else {
        toast.error(response.data.message);
      }
    });
  }

  return (
    <>
      <div className="w-full pt-5">
        <div className="bg-[#F2F2F2] h-full">
          <div className="flex justify-between max-sm:flex-wrap">
            <div>
              <h2 className="text-3xl font-bold mb-1">
                {strings.MANAGE_YOUR_INVENTORY}
              </h2>
            </div>
            <div className="flex gap-5 max-sm:mt-4 max-md:flex-wrap">
              <div className="relative">
                <div
                  className="h-14 w-48 bg-white rounded-2xl flex justify-center  items-center gap-4"
                  onClick={() => {
                    setShowStore(!showStore);
                  }}
                >
                  {storeNameShow || "store"}
                  <Icon icon="simple-line-icons:arrow-up" rotate={2} />
                </div>
                {showStore && <StoreModal showStoreName={handleShowStore} />}
              </div>
              <div className="w-16 h-14 bg-white rounded-2xl flex justify-center  items-center">
                <Icon
                  icon="icon-park-outline:setting-two"
                  color="black"
                  width="22"
                  height="22"
                />
              </div>
              <div>
                <button
                  className="w-52 h-14 rounded-[32px] bg-[#0094FF] flex justify-center items-center gap-4"
                  onClick={handleAddProduct}
                >
                  <Icon
                    icon="ion:add"
                    color="white"
                    style={{ width: 24, height: 24 }}
                    rotate={2}
                  />
                  <p className="text-white">Add Your Product</p>
                </button>
              </div>
            </div>
          </div>
          <div>
            <section className="rounded-xl bg-white my-4 !mb-3 p-4 flex justify-between items-center">
              <div className="invoiceSubHeadClass flex items-center gap-5 mr-4 cursor-pointer max-sm:flex-wrap">
                <div className="relative">
                  <span
                    className="py-3 px-5 flex justify-center items-center gap-3 "
                    onClick={() => setUploadPopup(!uploadPopup)}
                  >
                    {/* {dropdownText} */}
                    <Icon
                      icon="solar:file-download-outline"
                      color="#757575"
                      width="22"
                      height="22"
                    />
                    <Icon
                      icon="iconamoon:arrow-down-2-light"
                      width="22"
                      height="22"
                    />
                  </span>
                  {uploadPopup && <UploadProductDropdown />}
                </div>
                <span className="py-3 px-5 flex justify-center items-center gap-3">
                  {strings.SORT_NEWEST}
                  <Icon
                    icon="iconamoon:arrow-down-2-light"
                    width="22"
                    height="22"
                  />
                </span>
              </div>
              <div className="searchFieldClass">
                <label
                  htmlFor="search"
                  className="flex py-2 px-5 justify-between items-center w-full"
                >
                  <input
                    className="w-full py-1"
                    type="text"
                    id="search"
                    placeholder={placeholder.SEARCH_PRODUCT}
                  />
                  <Icon icon="uil:search" width="24" height="24" />
                </label>
              </div>
            </section>
          </div>
          {productList.length == 0 && (
            <p className="text-center text-sm font-medium text-gray-500 py-3">
              {strings.NO_RECORD_FOUND}
            </p>
          )}
          <div className="overflow-auto">
            <div className="w-max">
              {productList && productList.length > 0 && (
                <TableContainer className="rounded-xl bg-white my-4 !mb-3 !w-[857px]">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <p className="text-xs font-semibold w-[187px]">
                            {strings.NAME_OF_PRODUCT}
                          </p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="text-xs font-semibold w-[60px]">
                            {strings.PRICE}
                          </p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="text-xs font-semibold w-[60px]">
                            {strings.STOCK}
                          </p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="text-xs font-semibold w-[80px]">
                            {strings.LOCATION}
                          </p>
                        </TableCell>
                        <TableCell align="left">
                          <p className="text-xs font-semibold w-[58px]">
                            {strings.STATUS}
                          </p>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              )}
              {productList && productList.length > 0
                ? productList.map((val, index) => {
                    return (
                      <div className="relative">
                        <TableContainer className="rounded-xl bg-white my-4 !mb-3">
                          <Table aria-label="simple table">
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  align="left"
                                  className="!text-sm !font-semibold"
                                >
                                  <div className="flex justify-center items-center max-md:flex-wrap">
                                    <img
                                      src={val.images[0].url}
                                      className="rounded-xl w-20 h-20"
                                    />
                                    <div className="ml-5 max-md:mt-2">
                                      <p className="text-xs font-semibold">
                                        {val.name}
                                      </p>
                                      <p className="text-xs text-[#7A7A7A]">
                                        CODE123123124124
                                      </p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className="!text-sm !font-semibold"
                                >
                                  <div className="w-24 h-9 rounded-md border-[1px] border-[#EDEDED] flex justify-center items-center gap-2">
                                    <div className="h-6 w-3.5 bg-[#E6E6E6] rounded-xl	text-center flex justify-center items-center">
                                      <p>$ </p>
                                    </div>
                                    <p className="text-xs font-medium	text-[#757575]">
                                      {val.price}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className="!text-sm !font-semibold"
                                >
                                  <div className="w-24 h-9 rounded-md border-[1px] border-[#EDEDED] flex justify-center items-center">
                                    <p className="text-xs font-medium	text-[#757575]">
                                      32
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className="!text-sm !font-semibold"
                                >
                                  <p className="mr-2">Chicago </p>
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className="!text-sm !font-semibold"
                                >
                                  <div className="flex justify-center items-center gap-6">
                                    <div
                                      className={`${
                                        val.isActive
                                          ? activeStyle
                                          : inActiveStyle
                                      } h-7 w-14 rounded-[22px] flex justify-center items-center`}
                                    >
                                      <p className=" text-xs font-semibold px-2">
                                        {val.isActive
                                          ? strings.ACTIVE
                                          : strings.INACTIVE}
                                      </p>
                                    </div>
                                    <Icon
                                      icon="bi:three-dots-vertical"
                                      color="black"
                                      width="21"
                                      height="21"
                                      cursor={"pointer"}
                                      onClick={() => {
                                        setOpenModalIndex(val._id);
                                        setShowInventory(!showInventory);
                                      }}
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        {showInventory && openModalIndex == val._id && (
                          <InventoryInfo
                            closeInfo={setShowInventory}
                            setOpenProduct={setOpenProduct}
                            functionAction={deleteProductHandle}
                          />
                        )}{" "}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-3">
              <p className="text-[#757575] text-sm font-medium">
                {" "}
                Showing {currentPage} of {totalPages}
              </p>
              <ReactPaginate
                previousLabel={
                  <Icon
                    icon="mingcute:left-line"
                    width="25"
                    height="24"
                    style={{ color: "#AEAEAE" }}
                  />
                }
                nextLabel={
                  <Icon
                    icon="mingcute:right-line"
                    width="25"
                    height="24"
                    style={{ color: "#AEAEAE" }}
                  />
                }
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={3}
                onPageChange={handlePagination}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item-pre"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item-next"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"activePage"}
              />
            </div>
          )}
          <Modal
            isOpen={showAddProduct}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                // backgroundColor:"red"
                width: "33%",
                borderRadius: "15px",
              },
            }}
            contentLabel="Resend Invoice Modal"
          >
            <div ref={(_subtitle) => (subtitle = _subtitle)}>
              <AddProductModal closeModal={closeModal} />
            </div>
          </Modal>
        </div>
        <ProductIdModal
          setOpenProduct={setOpenProduct}
          openProduct={openProduct}
        />
      </div>
    </>
  );
};

export default ProductInventory;
