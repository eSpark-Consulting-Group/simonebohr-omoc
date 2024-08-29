import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import Header from "../../component/Header";
import { strings } from "../../utils/strings";
import IndividualisationForms from "../addProductScreen/IndividualisationForms";
import AddFAQ from "../addProductScreen/AddFAQ";
import ConfiguratorProduct from "../addProductScreen/ConfiguratorProduct";

function AddDigitalProductStepThree() {
  return (
    <section>
      <div className={`bg-[#F2F2F2] h-full pb-1`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <h3 className="text-3xl font-bold my-8">
            {strings.ADD_YOUR_DIGITAL_PRODUCT_THREE}
          </h3>
          <div className="rounded-xl bg-white w-full my-5 py-10 px-16 max-sm:px-8 max-sm:py-8 max-md:px-12 max-md:py-10">
            <Accordion className="!shadow-none">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
                className="text-3xl font-bold"
              >
                {strings.INDIVIDUALISATION_FORMS}
              </AccordionSummary>
              <AccordionDetails>
                <IndividualisationForms />
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
                {strings.FAQ}
              </AccordionSummary>
              <AccordionDetails>
                <AddFAQ />
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
                {strings.CONFIGURATOR_PRODUCTS}
              </AccordionSummary>
              <AccordionDetails>
                <ConfiguratorProduct />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="flex items-center mb-5 justify-end">
            <button className="py-3 px-6 bg-[#0094FF] text-base font-semibold text-white rounded-3xl">
              Add Your Product
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default AddDigitalProductStepThree;
