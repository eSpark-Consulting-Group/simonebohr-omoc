import React, { useState } from "react";
import Header from "../../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../../component/SIdeMenuBar";
import { strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import AddLegalPolicies from "./AddLegalPolicies";
import { useNavigate } from "react-router-dom";

function LegalPolicies() {
  const navigate = useNavigate();
  const [openLegalOption, setOpenLegalOption] = useState(false);
  const [addPoliciesModal, setAddPoliciesModal] = useState(false);
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
                <div className="bg-[#F2F2F2] h-full">
                  <div className="flex items-center justify-between max-sm:flex-wrap mt-5 mb-3">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">
                        {strings.LEGAL_POLICIES}
                      </h3>
                      <p className="text-[#7A7A7A] text-sm font-normal">
                        {strings.ADD_DIFFERENT_LEGAL_POLICIES_AND_LANGUAGE}
                      </p>
                    </div>
                    <div
                      onClick={() => setAddPoliciesModal(true)}
                      className="newInvoice-btn cursor-pointer !gap-1 max-sm:mt-4"
                    >
                      <Icon
                        icon="bi:plus"
                        color="white"
                        width="32"
                        height="32"
                      />
                      <p className="text-base font-normal">
                        {strings.ADD_LEGAL_POLICIES}
                      </p>
                    </div>
                  </div>
                  <div className="my-8">
                    <div className="flex justify-between gap-5 items-center bg-white mb-4 rounded-lg p-4">
                      <div
                        className="cursor-pointer w-full"
                        onClick={() => {
                          navigate(
                            "/Other-settings/Shop-settings/Legal-policies-detail"
                          );
                        }}
                      >
                        <p className="text-base font-semibold">
                          Legal Policies
                        </p>
                      </div>
                      <div className="relative">
                        <Icon
                          icon="bi:three-dots-vertical"
                          width="24"
                          height="24"
                          cursor={"pointer"}
                          onClick={() => setOpenLegalOption(!openLegalOption)}
                        />
                        {openLegalOption && <LegalOption />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <AddLegalPolicies
          addPoliciesModal={addPoliciesModal}
          setAddPoliciesModal={setAddPoliciesModal}
        />
      </div>
    </>
  );
}

export default LegalPolicies;

function LegalOption() {
  return (
    <div className="bg-white !z-10 rounded-xl w-52 text-start p-3 absolute !top-0 shadow-2xl invoice-option-box right-5">
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-lg">
        {strings.DEACTIVE}
      </p>
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-lg">
        {strings.EDIT}
      </p>
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-lg">
        {strings.DELETE}
      </p>
    </div>
  );
}
