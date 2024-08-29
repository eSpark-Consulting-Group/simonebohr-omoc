import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { strings } from "../../../utils/strings";
import VoucherHeader from "./VoucherHeader";
import Header from "../../../component/Header";
import SideMenuBar from "../../../component/SIdeMenuBar";
import VoucherComponentTable from "../../../component/VoucherComponentTable";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../../helper/ProductApi";
import ReactPaginate from "react-paginate";
import Loader from "../../../utils/Loader";

const Expired = () => {
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [totalPages, setTotalPages] = useState();
  const [voucherList, setVoucherList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchVouchers() {
      setIsLoading(true);
      try {
        const shopId = _id;
        const pageSize = 10;
        const response = await ProductSublyApi.fetchVoucherList(
          shopId,
          currentPage,
          pageSize,
          token,
          "expried"
        );
        setIsLoading(false);
        const vouchers = response.data.vouchers || [];
        setVoucherList(vouchers);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    }
    fetchVouchers();
  }, [currentPage]);

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
                <div className="md:flex justify-between my-5">
                  <div>
                    <h2 className="text-3xl font-bold mb-1">
                      {strings.MANAGE_YOUR_VOUCHER}
                    </h2>
                    <p className="text-sm text-[#7A7A7A] mt-2">
                      {strings.MANAGE_YOUR_VOUCHER_DEC}
                    </p>
                  </div>
                  <div className="flex gap-5">
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
                    Expired={true}
                    // allVoucher={true}
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

export default Expired;
