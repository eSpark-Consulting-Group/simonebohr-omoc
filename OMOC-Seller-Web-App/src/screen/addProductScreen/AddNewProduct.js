import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import Header from "../../component/Header";
import { strings } from "../../utils/strings";
import AddSpecialInfoModal from "./AddSpecialInfoModal";
import ProductDescription from "./ProductDescription";
import DetailProduct from "./DetailProduct";
import ProductVariant from "./ProductVariant";
import ManagementProduct from "./ManagementProduct";
import AboutShipping from "./AboutShipping";
import { useNavigate } from "react-router-dom";

function AddNewProduct() {
  const navigate = useNavigate();
  const [specialInfoModal, setSpecialInfoModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [imageFile, setImageFile] = useState([]);

  return (
    <section className="shopCreateClass">
      <div className={`bg-[#F2F2F2] h-full pb-1`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <h3 className="text-3xl font-bold my-8">
            {strings.ADD_YOUR_NEW_PRODUCT_ONE}
          </h3>
          <div className="rounded-xl bg-white w-full my-5 py-10 px-16 max-sm:px-8 max-sm:py-8 max-md:px-12 max-md:py-10">
            <Accordion className="!shadow-none">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="text-3xl font-bold"
              >
                {strings.PRODUCT_DESCRIPTION}
              </AccordionSummary>
              <AccordionDetails>
                <ProductDescription
                  setProductName={setProductName}
                  productName={productName}
                  setCategory={setCategory}
                />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="rounded-xl bg-white w-full my-5 py-10 px-16 max-sm:px-8 max-sm:py-8 max-md:px-12 max-md:py-10">
            <Accordion className="!shadow-none">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                className="text-3xl font-bold"
              >
                {strings.DETAIL_PRODUCT}
              </AccordionSummary>
              <AccordionDetails>
                <DetailProduct
                  setSpecialInfoModal={setSpecialInfoModal}
                  setProductPrice={setProductPrice}
                  productPrice={productPrice}
                  setBrand={setBrand}
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="rounded-xl bg-white w-full my-5 py-10 px-16 max-sm:px-8 max-sm:py-8 max-md:px-12 max-md:py-10">
            <Accordion className="!shadow-none">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
                className="text-3xl font-bold"
              >
                {strings.PRODUCT_VARIANT}
              </AccordionSummary>
              <AccordionDetails>
                <ProductVariant />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="rounded-xl bg-white w-full my-5 py-10 px-16 max-sm:px-8 max-sm:py-8 max-md:px-12 max-md:py-10">
            <Accordion className="!shadow-none">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4-content"
                id="panel4-header"
                className="text-3xl font-bold"
              >
                {strings.MANAGEMENT_PRODUCT}
              </AccordionSummary>
              <AccordionDetails>
                <ManagementProduct />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="rounded-xl bg-white w-full my-5 py-10 px-16 max-sm:px-8 max-sm:py-8 max-md:px-12 max-md:py-10">
            <Accordion className="!shadow-none">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5-content"
                id="panel5-header"
                className="text-3xl font-bold"
              >
                {strings.ABOUT_SHIPPING}
              </AccordionSummary>
              <AccordionDetails>
                <AboutShipping />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="flex items-center mb-5 justify-end">
            <button
              disabled={category && productName ? false : true}
              onClick={() =>
                navigate("/Product/Add-new-product-Step-2", {
                  state: {
                    name: productName,
                    category: category,
                    originalPrice: productPrice,
                    price: productPrice,
                    brand: brand,
                    images: imageFile,
                  },
                })
              }
              className="py-3 px-6 bg-[#0094FF] text-base font-semibold text-white rounded-3xl"
            >
              Next Step
            </button>
          </div>
        </Container>
      </div>
      <AddSpecialInfoModal
        specialInfoModal={specialInfoModal}
        setSpecialInfoModal={setSpecialInfoModal}
      />
    </section>
  );
}

export default AddNewProduct;
