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
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import ProfileShopSublyApi from "../../helper/ProfileShopApi";

function PostAndStoriesDashboardStory() {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [storyList, setStoryList] = useState("");
  const [page, setPage] = useState("");
  const [offset, setOffset] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [sortValue, setSortValue] = useState({
    status: true,
    text: "Sorty By",
  });
  const [isLoader, setIsLoader] = useState(false);

  // =============fetcing post list data==============
  useEffect(() => {
    fetchSellerStory();
  }, [offset, sortValue]);

  async function fetchSellerStory() {
    setIsLoader(true);
    await ProfileShopSublyApi.fetchStoryList(
      token,
      pageSize,
      offset,
      sortValue.status
    )
      .then((response) => {
        setIsLoader(false);
        if (response.statusCode == 200) {
          setStoryList(response.data?.stories);
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
                    isStory={true}
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                    setOffset={setOffset}
                  />
                  <div className="my-7">
                    {storyList.length == 0 && (
                      <p className="text-center text-sm font-medium text-gray-500 py-3">
                        {strings.NO_RECORD_FOUND}
                      </p>
                    )}
                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      {storyList.length > 0 &&
                        storyList?.map((item, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <div className="mb-7">
                              <div className="h-60 overflow-hidden">
                                <img
                                  src={item.url}
                                  className="rounded-t-xl bg-[#F7F6F4] w-full h-full"
                                  alt="product"
                                />
                              </div>
                              <div className="bg-white flex justify-between items-center py-3 px-3 rounded-b-xl">
                                <div className="flex items-center gap-6">
                                  <div className="flex items-center gap-2">
                                    <Icon
                                      icon="ph:heart"
                                      width="24"
                                      height="24"
                                    />
                                    {item?.likesCount}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon
                                      icon="mynaui:chat-messages"
                                      width="24"
                                      height="24"
                                    />
                                    {item?.commentsCount}
                                  </div>
                                </div>
                                <div>
                                  <Icon
                                    icon="tabler:dots-vertical"
                                    width="24"
                                    height="24"
                                  />
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

export default PostAndStoriesDashboardStory;
