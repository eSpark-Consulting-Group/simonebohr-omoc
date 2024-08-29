import React from "react";
import { strings } from "../../utils/strings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../../component/Header";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
} from "@mui/material";
import DigitalProductDescription from "./DigitalProductDescription";
import DigitalDetailProduct from "./DigitalDetailProduct";
import DigitalProductVariant from "./DigitalProductVariant";
import DigitalManagementProduct from "./DigitalManagementProduct";
import { useNavigate } from "react-router-dom";

function AddDigitalProductStepTwo() {
  const navigate = useNavigate();
  return (
    <section>
      <div className={`bg-[#F2F2F2] h-full pb-1`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <h3 className="text-3xl font-bold my-8">
            {strings.ADD_YOUR_DIGITAL_PRODUCT_TWO}
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
                <DigitalProductDescription />
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
                <DigitalDetailProduct />
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
                <DigitalProductVariant />
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
                <DigitalManagementProduct />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="flex items-center mb-5 justify-end">
            <button
              onClick={() => navigate("/Product/Add-new-digitalProduct-Step-3")}
              className="py-3 px-6 bg-[#0094FF] text-base font-semibold text-white rounded-3xl"
            >
              Next Step
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default AddDigitalProductStepTwo;
