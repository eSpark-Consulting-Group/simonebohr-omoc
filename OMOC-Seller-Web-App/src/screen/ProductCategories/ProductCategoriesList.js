import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../component/SIdeMenuBar";
import Header from "../../component/Header";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import ProductManageOption from "./ProductManageOption";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";

function ProductCategoriesList() {
  const [openManagePopup, setOpenManagePopup] = useState(false);
  const [openManage, setOpenManage] = useState();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const { shopInfo } = useSelector((state) => state.dashboard);
  const [categoriesList, setCategoriesList] = useState();
  const [isLoader, setIsLoader] = useState(false);

  async function deleteCategoryHandle() {
    setIsLoader(true);
    try {
      const response = await ProductSublyApi.deleteCategory(
        token,
        _id,
        openManage
      );
      setIsLoader(false);
      if (response.statusCode === 200) {
        toast.success(response.message);
        navigate("/Product/Categories");
        window.location.reload(false);
        setOpenManagePopup(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function fetchCategory() {
      setIsLoader(true);
      await ProductSublyApi.fetchCategoryList(shopInfo._id, 1, 10, token).then(
        (response) => {
          setIsLoader(false);
          setCategoriesList(response.data);
          if (response.statusCode == 200) {
          }
        }
      );
    }
    fetchCategory();
  }, []);
  return (
    <section>
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
                  <div className="flex justify-between items-center max-sm:flex-wrap">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">
                        {strings.MANAGE_YOUR_CATEGORIES}
                      </h2>
                      <p className="font-normal text-sm text-gray-500">
                        {strings.MANAGE_YOUR_PRODUCT}
                      </p>
                    </div>
                    <div
                      className="newInvoice-btn cursor-pointer !gap-1 max-sm:mt-4"
                      onClick={() => {
                        navigate("/Product/Categories/add-Categories");
                      }}
                    >
                      <Icon
                        icon="bi:plus"
                        color="white"
                        width="32"
                        height="32"
                      />
                      <p>{strings.ADD_CATEGORIE}</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="flex items-center mb-5 bg-white rounded-xl px-4 py-5">
                      <div className="w-full text-center">
                        <p className="text-sm font-semibold">
                          {strings.PRODUCT_CATEGORIES}
                        </p>
                      </div>
                      <div className="w-full text-center">
                        <p className="text-sm font-semibold">
                          {strings.TOTAL_PRODUCT}
                        </p>
                      </div>
                      <div className="searchFieldClass w-full text-center">
                        <label
                          htmlFor="search"
                          className="flex py-2 px-5 justify-between items-center w-full"
                        >
                          <input
                            className="w-full py-1"
                            type="text"
                            id="search"
                            placeholder={placeholder.SEARCH_CATEGORIES}
                          />
                          <Icon icon="uil:search" width="24" height="24" />
                        </label>
                      </div>
                    </div>
                    {categoriesList && categoriesList.length > 0 ? (
                      categoriesList.map((val, index) => {
                        return (
                          <div className="flex items-center mb-4 bg-white rounded-xl px-4 py-4">
                            <div className="w-full text-center">
                              <div className="flex items-center  gap-10">
                                <Icon
                                  icon="bi:three-dots-vertical"
                                  color="black"
                                  width="24"
                                  height="24"
                                />
                                <div className="flex items-center gap-5 max-sm:gap-1 max-sm:justify-center max-sm:flex-wrap">
                                  <span className="bg-[#F4F4F4] rounded-xl w-[72px] h-[72px] p-2 max-sm:p-0 border border-[#EDEDED]">
                                    <img
                                      src={val.image}
                                      alt="product"
                                      className="w-[69px] h-[46px] p-1"
                                    />
                                  </span>
                                  <p className="text-base text-[#2E2E2E] font-semibold ">
                                    {val.title}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="w-full text-center">
                              <p className="text-sm text-[#757575] font-medium">
                                {val.totalProducts}
                              </p>
                            </div>
                            <div className="searchFieldClass w-full text-center flex items-center justify-around relative">
                              <span></span>
                              <p
                                className="cursor-pointer text-sm gap-2 border-2 rounded-2xl border-[#EDEDED] flex items-center justify-center py-4 px-5"
                                onClick={() => {
                                  setOpenManagePopup(!openManagePopup);
                                  setOpenManage(val.id);
                                }}
                              >
                                {strings.MANAGE}
                                <Icon
                                  icon="iconamoon:arrow-down-2-light"
                                  width="20"
                                  height="20"
                                />{" "}
                              </p>
                              {openManagePopup && openManage === val.id && (
                                <ProductManageOption
                                  item={val}
                                  deleteFunction={deleteCategoryHandle}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div>
                        <p className="text-center text-sm font-medium text-gray-500 py-3">
                          {strings.NO_RECORD_FOUND}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </section>
  );
}

export default ProductCategoriesList;
