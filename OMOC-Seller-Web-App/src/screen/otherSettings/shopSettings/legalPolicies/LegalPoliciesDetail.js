import React from "react";
import redTrash from "../../../../assets/icon/redTrash.svg";
import Header from "../../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../../component/SIdeMenuBar";
import { strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";

function LegalPoliciesDetail() {
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
                      <h3 className="text-3xl font-bold mb-1">
                        {strings.LEGAL_POLICIES}
                      </h3>
                      <p className="text-[#7A7A7A] text-sm font-normal">
                        {strings.ADD_DIFFERENT_LEGAL_POLICIES_AND_LANGUAGE}
                      </p>
                    </div>
                    <div className="border-2 rounded-3xl text-[#C80000] flex items-center text-base font-semibold py-3 px-5 border-[#C80000] cursor-pointer !gap-1 max-sm:mt-4">
                      <img src={redTrash} />
                      <p className="text-base font-normal">{strings.DELETE}</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-[#9E9E9E] text-sm font-normal mb-2">
                      {strings.LEGAL_POLICIES_CAP}
                    </p>
                    <div className="bg-white rounded-xl border-[#E8E8E8] px-4 py-3 flex gap-2 items-end justify-between w-3/4 max-sm:w-full">
                      <div>
                        <p className="text-sm font-normal text-[#616161] leading-7">
                          Lorem ipsum dolor sit amet consectetur. Hendrerit et
                          sit neque nulla laoreet auctor Lorem ipsum dolor sit
                          Lorem ipsum dolor sit amet consectetur.
                          {[1, 2, 3, 4, 5].map(() => (
                            <li className="pl-4">
                              Hendrerit et sit neque nulla laoreet auctor.
                            </li>
                          ))}
                        </p>
                      </div>
                      <div>
                        <Icon icon="solar:pen-outline" width="18" height="18" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default LegalPoliciesDetail;
