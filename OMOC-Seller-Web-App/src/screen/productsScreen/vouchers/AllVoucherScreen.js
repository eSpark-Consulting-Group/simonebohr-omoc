import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { strings } from "../../../utils/strings";
import VoucherHeader from "./VoucherHeader";
import Header from "../../../component/Header";
import SideMenuBar from "../../../component/SIdeMenuBar";
import VoucherComponentTable from "../../../component/VoucherComponentTable";
import ProductSublyApi from "../../../helper/ProductApi";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "../../../assets/CommonStyling/CommonStyling.css";
import Loader from "../../../utils/Loader";

const AllVoucherScreen = () => {
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [voucherList, setVoucherList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchVouchers(currentPage); // Fetch vouchers for the current page when component mounts or currentPage changes
  }, [currentPage]);

  const fetchVouchers = async (page) => {
    setIsLoading(true);
    try {
      const response = await ProductSublyApi.fetchVoucherList(
        _id, // Assuming _id is defined in your component
        page,
        pageSize,
        token,
        ""
        // count
      );
      setIsLoading(false);
      const vouchers = response.data.vouchers || [];
      setVoucherList(vouchers);
      setTotalPages(Math.ceil(response.data.count / pageSize));
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  const handlePagination = (data) => {
    setCurrentPage(data.selected + 1); // Page numbers start from 0
  };

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <div className={`!bg-[#f2f2f2] h-full`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <Grid container spacing={2}>
            <Grid item md={3} xs={12} className="w-full">
              <SideMenuBar />
            </Grid>
            <Grid item md={9} xs={12}>
              <div className="bg-[#f2f2f2]">
                <div className="flex justify-between my-5 max-sm:flex-wrap">
                  <div>
                    <h2 className="text-3xl font-bold mb-1">
                      {strings.MANAGE_YOUR_VOUCHER}
                    </h2>
                    <p className="text-sm text-[#7A7A7A] mt-2">
                      {strings.MANAGE_YOUR_VOUCHER_DEC}
                    </p>
                  </div>
                  <div className="flex gap-5 max-sm:mt-4">
                    <div>
                      <button
                        className="w-52 h-14 rounded-[32px] bg-[#0094FF] flex justify-center items-center gap-4"
                        onClick={() => {
                          navigate("/Product/Vouchers/CustomizeVoucher");
                        }}
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
                  <VoucherHeader />
                </div>
                <div></div>
                <div className="max-h-[820px] overflow-auto">
                  <VoucherComponentTable
                    allVoucher={true}
                    voucherList={voucherList}
                  />
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-end gap-3 my-5">
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
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default AllVoucherScreen;
