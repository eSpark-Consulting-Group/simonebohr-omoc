import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import SideMenuBar from "../../component/SIdeMenuBar";
import { Container, Grid } from "@mui/material";
import PostAndStoryHeader from "./PostAndStoryHeader";
import product1 from "../../assets/image/productImg/product 1.png";
import product2 from "../../assets/image/productImg/product 2.png";
import product3 from "../../assets/image/productImg/product 3.png";
import deleteIcon from "../../assets/icon/trash.svg";
import magicpen from "../../assets/icon/magicpen.svg";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import ProfileShopSublyApi from "../../helper/ProfileShopApi";
import Loader from "../../utils/Loader";

function PostAndStoriesDraft() {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [showAction, setShowAction] = useState({ isShow: false, index: "" });
  const [sortValue, setSortValue] = useState({
    status: true,
    text: "Sorty By",
  });
  const [page, setPage] = useState("");
  const [offset, setOffset] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [draftList, setDraftList] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const product = [
    { product: product1 },
    { product: product2 },
    { product: product3 },
  ];

  // =============fetcing post list data==============
  useEffect(() => {
    fetchDraftListHandle();
  }, [offset, sortValue]);

  async function fetchDraftListHandle() {
    setIsLoader(true);
    await ProfileShopSublyApi.fetchDarftList(
      token,
      pageSize,
      offset,
      sortValue.status
    )
      .then((response) => {
        setIsLoader(false);
        if (response.statusCode == 200) {
          setDraftList(response.data?.stories);
          setPage(Math.ceil(response.data.count / pageSize));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //--------function for handling pagination------
  const handlePageClick = async (data) => {
    await setOffset(data.selected + 1);
  };

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
                  <PostAndStoryHeader
                    isDraft={true}
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                    setOffset={setOffset}
                  />
                  <div className="my-7">
                    {draftList.length == 0 && (
                      <p className="text-center text-sm font-medium text-gray-500 py-3">
                        {strings.NO_RECORD_FOUND}
                      </p>
                    )}
                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      {draftList.length > 0 &&
                        draftList?.map((item, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <div
                              onMouseOver={() => {
                                setShowAction({ isShow: true, index: index });
                              }}
                              onMouseLeave={() => {
                                setShowAction({ isShow: false, index: "" });
                              }}
                              className="mb-7 relative"
                            >
                              <div
                                className={`${
                                  showAction.isShow && showAction.index == index
                                    ? "h-72 overflow-hidden"
                                    : "h-60 overflow-hidden"
                                }`}
                              >
                                <img
                                  src={item.url}
                                  className={`${
                                    showAction.isShow &&
                                    showAction.index == index
                                      ? "rounded-xl"
                                      : "rounded-t-xl"
                                  } ${"rounded-t-xl bg-[#F7F6F4] w-full h-full"}`}
                                  alt="product"
                                />
                              </div>
                              <div
                                className={`${
                                  showAction.isShow && showAction.index == index
                                    ? "hidden"
                                    : "bg-white flex justify-between items-center py-3 px-3 rounded-b-xl"
                                }`}
                              >
                                <p className="truncate text-base font-normal w-11/12">
                                  HOT deals 2023 New year eve discount
                                </p>
                              </div>
                              <div
                                className={`${
                                  showAction.isShow && showAction.index == index
                                    ? "rounded-xl absolute w-full h-full top-0 items-center flex justify-center bg-[#00000059]"
                                    : "hidden"
                                }`}
                              >
                                <div>
                                  <button className="flex w-28 mb-4 justify-center items-center gap-1 text-[#0094FF] border-[#0094FF] rounded-3xl text-base font-normal bg-white px-4 py-2.5">
                                    <img src={magicpen} />
                                    {strings.EDIT}
                                  </button>
                                  <button className="flex w-28 items-center justify-center gap-1 text-white rounded-3xl text-base font-normal bg-[#C80000] px-4 py-2.5">
                                    <img src={deleteIcon} className="invert" />
                                    {strings.DELETE}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Grid>
                        ))}
                    </Grid>
                  </div>
                  {page > 1 && (
                    <div className="flex items-center justify-end gap-3 mb-4">
                      <p className="text-[#757575] text-sm font-medium">
                        {" "}
                        Showing {offset} of {page}
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
                        forcePage={offset == 1 ? 0 : offset - 1}
                        pageCount={page}
                        marginPagesDisplayed={3}
                        onPageChange={handlePageClick}
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
      </div>
    </>
  );
}

export default PostAndStoriesDraft;
