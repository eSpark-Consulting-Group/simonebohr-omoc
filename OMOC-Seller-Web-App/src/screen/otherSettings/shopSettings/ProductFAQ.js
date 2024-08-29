import React, { useState } from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import product from "../../../assets/image/productImg/product 2.png";
import AddProductFAQ from "./AddProdctFAQ";

function ProductFAQ() {
  const [addProductFAQ, setAddProductFAQ] = useState(false);
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
              <div className="w-full">
                <div className="mt-5 mb-3 flex justify-between items-center gap-4 max-sm:flex-wrap">
                  <div>
                    <h3 className="text-[32px] font-bold">
                      {strings.PRODUCT_FAQ}
                    </h3>
                    <p className="text-[#7A7A7A] text-sm font-normal">
                      {strings.MANAGE_YOUR_FAQ_ANSWER_USERS_QUESTUIONS}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => setAddProductFAQ(true)}
                      className="bg-[#0094FF] text-white text-base font-normal rounded-3xl py-3 px-4 flex items-center gap-3"
                    >
                      <Icon
                        icon="humbleicons:plus"
                        color="white"
                        width="24"
                        height="24"
                      />
                      {strings.ADD_PRODUCT_FAQ}
                    </button>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl mt-6 mb-4">
                  <label
                    htmlFor="search"
                    className="flex py-2 px-5 justify-between items-center w-1/2 rounded-3xl border max-sm:w-full"
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
                <Grid container spacing={2}>
                  {[1, 2, 3, 4, 5].map(() => (
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="rounded-xl bg-white py-3 px-3 w-full">
                        <div className="flex justify-between items-center gap-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={product}
                              alt="product"
                              className="w-16 h-16 p-1 bg-[#F4F4F4] rounded-xl"
                            />
                            <p className="text-base font-semibold">
                              Hoodie Havana V1
                            </p>
                          </div>
                          <Icon
                            icon="iconamoon:arrow-left-2"
                            width="25"
                            height="25"
                            rotate={2}
                          />
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
        <AddProductFAQ
          addProductFAQ={addProductFAQ}
          setAddProductFAQ={setAddProductFAQ}
        />
      </div>
    </>
  );
}

export default ProductFAQ;
