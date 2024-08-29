import React from "react";
import Header from "../../component/Header";
import { Container } from "@mui/material";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function AddDigitalProduct() {
  const navigate = useNavigate();
  return (
    <section>
      <div className={`bg-[#F2F2F2] h-full pb-1`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <h3 className="text-3xl font-bold my-8">
            {strings.ADD_YOUR_DIGITAL_PRODUCT_ONE}
          </h3>
          <div className="flex text-center justify-between gap-8 pt-10 max-md:flex-wrap mb-8">
            <div className="bg-white w-full rounded-2xl p-10">
              <div className="flex gap-3 items-end justify-center mb-4">
                <p className="text-2xl font-bold">
                  {strings.ADD_PRODUCT_MANUALLY}
                </p>
                <Icon icon="ep:warning" width="25" height="25" />
              </div>
              <p className="text-base font-normal leading-8">
                {strings.USE_SIMPLE_PLAYOUT}
              </p>
              <button
                onClick={() => {
                  navigate("/Product/Add-new-digitalProduct-Step-2");
                }}
                className="text-white py-4 bg-[#0094FF] mt-5 rounded-[30px] text-base font-semibold px-5 w-full"
              >
                {strings.ADD_PRODUCT}
              </button>
            </div>
            <div className="bg-white w-full rounded-2xl p-10">
              <div className="flex gap-3 items-end justify-center mb-4">
                <p className="text-2xl font-bold">
                  {strings.ADD_PRODUCT_FROM_A_FILE}
                </p>
                <Icon icon="ep:warning" width="25" height="25" />
              </div>
              <p className="text-base font-normal leading-8">
                {strings.USE_SIMPLE_PLAYOUT}
              </p>
              <button className="text-[#0094FF] border-[#0094FF] border-2 rounded-[30px] mt-5 text-base font-semibold py-4 px-5 w-full">
                {strings.UPLOAD_FILE}
              </button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default AddDigitalProduct;
