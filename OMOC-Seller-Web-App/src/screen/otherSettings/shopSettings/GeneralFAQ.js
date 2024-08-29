import React, { useState } from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import AddGeneralFAQ from "./AddGeneralFAQ";

function GeneralFAQ() {
  const [addGeneralFAQ, setAddGeneralFAQ] = useState(false);
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
                      {strings.GENERAL_FAQ}
                    </h3>
                    <p className="text-[#7A7A7A] text-sm font-normal">
                      {strings.MANAGE_YOUR_FAQ_ANSWER_USERS_QUESTUIONS}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => setAddGeneralFAQ(true)}
                      className="bg-[#0094FF] text-white text-base font-normal rounded-3xl py-3 px-4 flex items-center gap-3"
                    >
                      <Icon
                        icon="humbleicons:plus"
                        color="white"
                        width="24"
                        height="24"
                      />
                      {strings.ADD_GENERAL_FAQ}
                    </button>
                  </div>
                </div>
                <div className="overflow-auto">
                  <div className="w-max">
                    <div className="rounded-xl bg-white flex items-center p-5 mt-5 mb-4 gap-5 w-[857px]">
                      <div className="flex items-center w-full">
                        <span className="text-sm font-semibold">#</span>
                        <h2 className="text-center w-[90%] text-sm font-semibold">
                          {strings.QUESTION}
                        </h2>
                      </div>
                      <div className="w-full">
                        <h2 className="text-center text-sm font-semibold">
                          {strings.ANSWER}
                        </h2>
                      </div>
                    </div>
                    {[1, 2, 3, 4, 5].map(() => (
                      <div className="rounded-xl bg-white flex items-center py-5 px-4 mt-5 mb-4 gap-5 w-[857px]">
                        <div className="flex items-center gap-4 w-full">
                          <Icon icon="icon-park:drag" width="24" height="24" />
                          <p className="text-sm font-medium w-[90%]">
                            Tingkatkan performance bisnismu dengan strategi yang
                            tepat dan akurat, serta dapatkan profit yang lebih
                            baik.
                          </p>
                        </div>
                        <div className="flex items-center gap-4 w-full">
                          <p className="text-sm font-medium w-[90%]">
                            Tingkatkan performance bisnismu dengan strategi yang
                            tepat dan akurat, serta dapatkan profit yang lebih
                            baik.
                          </p>
                          <Icon
                            icon="tabler:dots"
                            color="black"
                            width="25"
                            height="25"
                            rotate={1}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <AddGeneralFAQ
          addGeneralFAQ={addGeneralFAQ}
          setAddGeneralFAQ={setAddGeneralFAQ}
        />
      </div>
    </>
  );
}

export default GeneralFAQ;
