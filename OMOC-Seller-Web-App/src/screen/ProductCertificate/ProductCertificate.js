import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../component/SIdeMenuBar";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import shirt from "../../assets/image/shirt_pic.png";
import shoe from "../../assets/image/shoe-img.png";
import AddCertification from "./AddCertification";
import ProductSublyApi from "../../helper/ProductApi";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

function ProductCertificate() {
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const approveStyle = "text-[#22C55E] bg-[#22C55E1A]";
  const rejectStyle = "text-[#640000] bg-[#F4CCCC]";
  const pendingStyle = "text-[#0094FF] bg-[#0094ff1a]";

  const [openAddCertificate, setOpenAddCertificate] = useState(false);
  const [certificatesList, setCertificatesList] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [productsId, setProductsId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState();
  const [productList, setProductList] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [productKey, setProductKey] = useState("");

  const handlePagination = (data) => {
    setCurrentPage(data.selected + 1); // Page numbers start from 0
  };

  // =============API for fetching certificateslist==============
  useEffect(() => {
    fetchCertificatesHandle();
  }, [openAddCertificate]);
  function fetchCertificatesHandle(key) {
    setTimeout(
      async () => {
        setIsLoader(true);
        await ProductSublyApi.fetchCertificateList(_id, token, pageSize, key)
          .then((response) => {
            setIsLoader(false);
            if (response.statusCode == 200) {
              setCertificatesList(response.data.certificateRequests);
              setTotalPages(Math.ceil(response.data.count / pageSize));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      key ? 2000 : 0
    );
  }

  // ==================API for add product for certificate================
  async function addCertificateHandle() {
    setIsLoader(true);
    const requestData = {
      productIds: productsId,
    };
    await ProductSublyApi.addCertificate(_id, token, requestData)
      .then((response) => {
        setIsLoader(false);
        if (response.statusCode == 200) {
          toast.success(response.message);
          setOpenAddCertificate(false);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // ==================fetch product list for certificates=================
  useEffect(() => {
    fetchProduct();
  }, [openAddCertificate]);
  function fetchProduct(key) {
    setTimeout(
      async () => {
        setIsLoader(true);
        await ProductSublyApi.productCertificate(_id, token, key)
          .then((response) => {
            setIsLoader(false);
            if (response.statusCode == 200) {
              setProductList(response.data.products);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      key ? 2000 : 0
    );
  }

  return (
    <>
      {isLoader ? <Loader /> : ""}
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
              <div className="w-full pt-5">
                <div className="bg-[#F2F2F2] h-full">
                  <div className="flex items-center justify-between max-sm:flex-wrap">
                    <div>
                      <h3 className="text-3xl font-bold mb-1">
                        {strings.TRACK_YOUR_CERTIFICATE}
                      </h3>
                      <p className="text-[#7A7A7A] text-sm font-normal">
                        {strings.MANAGE_YOUR_VOUCHER_DEC}
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setOpenAddCertificate(!openAddCertificate);
                      }}
                      className="newInvoice-btn cursor-pointer !gap-1 max-sm:mt-4"
                    >
                      <Icon
                        icon="bi:plus"
                        color="white"
                        width="32"
                        height="32"
                      />
                      <p className="text-base font-normal">
                        {strings.APPLY_CERTIFICATION}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 flex justify-between items-center mt-8 mb-4">
                    <p className="text-sm font-semibold w-full">
                      {strings.NAME_OF_PRODUCT}
                    </p>
                    <p className="text-sm font-semibold w-3/5 ml-8">
                      {strings.STATUS}
                    </p>
                    <label
                      htmlFor="search"
                      className="flex py-2 px-5 justify-between items-center w-3/5 border rounded-3xl"
                    >
                      <input
                        className="w-full py-1"
                        type="text"
                        id="search"
                        value={searchValue}
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                          fetchCertificatesHandle(e.target.value);
                        }}
                        placeholder={placeholder.SEARCH_PRODUCT}
                      />
                      <Icon icon="uil:search" width="24" height="24" />
                    </label>
                  </div>
                  {certificatesList.length == 0 && (
                    <p className="text-center text-sm font-medium text-gray-500 py-3">
                      {strings.NO_RECORD_FOUND}
                    </p>
                  )}
                  {certificatesList?.length > 0 &&
                    certificatesList?.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-4 flex justify-between items-center my-3 gap-4"
                      >
                        <div className="flex gap-4 items-center w-full max-sm:flex-wrap">
                          <img
                            src={item.product?.images[0]?.url}
                            alt="product"
                            className="rounded-xl w-16 h-16 bg-[#EDEDED] p-2"
                          />
                          <p className="text-base font-medium">
                            {item?.product?.name}
                          </p>
                        </div>
                        <div className="w-3/5 flex">
                          <p
                            className={`${
                              item.status == "pending"
                                ? pendingStyle
                                : item.status == "accepted"
                                ? approveStyle
                                : item.id == "rejected"
                                ? rejectStyle
                                : ""
                            } rounded-3xl text-xs font-medium py-2 px-3`}
                          >
                            {item.status}
                          </p>
                        </div>

                        <div className="w-3/5 flex justify-end">
                          <span className="flex justify-center items-center gap-1 !py-3 px-4 cursor-pointer rounded-2xl border-2">
                            {strings.MANAGE}
                            <Icon
                              icon="iconamoon:arrow-down-2-light"
                              width="24"
                              height="24"
                            />
                          </span>
                        </div>
                      </div>
                    ))}
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
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <AddCertification
          openAddCertificate={openAddCertificate}
          setOpenAddCertificate={setOpenAddCertificate}
          productsId={productsId}
          setProductsId={setProductsId}
          productList={productList}
          addCertificateHandle={addCertificateHandle}
          productKey={productKey}
          setProductKey={setProductKey}
          fetchProduct={fetchProduct}
        />
      </div>
    </>
  );
}

export default ProductCertificate;
