import React from "react";
import Header from "../../../component/Header";
import { Container, Grid, Tooltip } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const options = [1, 2, 3];

const ReturnScreen = () => {
  return (
    <div className={`!bg-[#f2f2f2] h-full`}>
      <div className=" w-full bg-[#fff] fixed top-0 z-20">
        <Header />
      </div>
      <Container className="pt-28">
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <SideMenuBar />
          </Grid>
          <Grid item md={9} xs={12}>
            <h1 className="text-[32px] font-bold mt-5 mb-1">
              {strings.RETURN_SETTING_PAGE}
            </h1>
            <p className="text-sm text-[#7A7A7A]">
              {strings.SETUP_RULES_FOR_PRODUCT_RETURNS}
            </p>
            <div className="my-5">
              <h2 className="text-2xl font-bold my-5">
                {strings.AUTOMATIC_RETURN_PREFERENCES}
              </h2>
              <div className="bg-white rounded-xl p-5 ">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">
                    {strings.CHOOSE_PREFRENCE_FOR_RETURNS}
                  </h2>
                  <LightTooltip
                    title="If automatic returns is enabled, eligible items will be processed automatically and assigned a return label. Otherwise, the buyer will be asked to send a message to the seller."
                    arrow
                    className=""
                    placement="top-start"
                    // open={true}
                  >
                    <Icon
                      width="24"
                      height="24"
                      icon="fluent:info-32-regular"
                      rotate={2}
                    />
                  </LightTooltip>
                </div>
                <div className="flex items-center gap-3 my-5">
                  <input className="h-6 w-6" type="checkbox" />
                  <p className="text-lg text-[#2A2A2A]">
                    {strings.CHECKLIST_YOU_WANT_AUTORETURN_RULES}
                  </p>
                </div>
                <h2 className="text-xl font-semibold">
                  {strings.AUTOMATIC_PRODUCT_RETURN_RULE}
                </h2>
                <p className="text-lg text-[#2A2A2A] my-5">
                  {strings.SELECT_PRODUCT_CONDITION_AUTOMATICALLY}
                </p>
                <select className="border-[1px] rounded-lg px-3 py-[18px] flex items-center justify-between w-full ">
                  <option className="font-semibold">
                    {strings.DEFECTIVE_PRODUCT}
                  </option>
                  <option className="font-semibold">{strings.OPTION_2}</option>
                  <option className="font-semibold">{strings.OPTION_3}</option>
                  <option className="font-semibold">{strings.OPTION_4}</option>
                  {/* <Icon
                    width="15"
                    icon="solar:alt-arrow-up-linear"
                    rotate={2}
                  /> */}
                </select>
                <div className="flex items-center gap-3 mt-5">
                  <Icon
                    color="#0094FF"
                    width="24"
                    height="24"
                    icon="ion:add-outline"
                    rotate={2}
                  />
                  <p className="text-[#0094FF] font-semibold">
                    {strings.ADD_CONDITION}
                  </p>
                </div>
              </div>
            </div>
            <div className="my-5">
              <h2 className="text-2xl font-bold my-5">
                {strings.MANUAL_RETURN_FORM}
              </h2>
              <div className="bg-white rounded-xl p-5">
                <div className="flex items-center gap-2 w-2/3">
                  <h2 className="text-xl font-semibold">
                    {strings.SET_FORM_FILLED_PROCESSED_AUTOMATICALLY}
                  </h2>
                  <LightTooltip
                    title="If manual returns are enabled, the buyer will be redirected to the manual returns form page. The type of information that must be filled in by the buyer can be adjusted to the needs of the seller."
                    arrow
                    className=""
                    placement="top-start"
                    // open={true}
                  >
                    <Icon
                      width="44"
                      height="24"
                      icon="fluent:info-32-regular"
                      rotate={2}
                    />
                  </LightTooltip>
                </div>
                <div className="flex items-center gap-3 my-5">
                  <input className="h-6 w-6" type="checkbox" />
                  <p className="text-lg text-[#2A2A2A]">
                    {strings.CHECKLIST_YOU_WANT_AUTORETURN_RULES}
                  </p>
                </div>
                <p className="text-lg text-[#2A2A2A]">
                  {strings.LABEL_FOR_MANUAL_LINK}
                </p>
                <input
                  className="rounded-lg py-[10px] px-2  border-[#EDEDED] border-[1px] w-full my-5"
                  placeholder={placeholder.WRITE_LABEL_DESCRIPTION}
                />
                <p className="text-lg text-[#2A2A2A] my-5">
                  {strings.SELECT_TYPE_OF_INFORMATION_BUYER_MUST_FILL}
                </p>
                <select className="border-[1px] rounded-lg px-3 py-[18px] flex items-center justify-between w-full ">
                  <option className="font-semibold">
                    {strings.DEFECTIVE_PRODUCT}
                  </option>
                  <option className="font-semibold">{strings.NAME}</option>
                  <option className="font-semibold">
                    {strings.EMAIL_ADDRESS}
                  </option>
                  <option className="font-semibold">
                    {strings.ORDER_NUMBER}
                  </option>
                  <option className="font-semibold">
                    {strings.REASON_FOR_RETURN}
                  </option>
                  {/* <Icon
                    width="15"
                    icon="solar:alt-arrow-up-linear"
                    rotate={2}
                  /> */}
                </select>
                <div className="flex items-center gap-3 mt-5">
                  <Icon
                    color="#0094FF"
                    width="24"
                    height="24"
                    icon="ion:add-outline"
                    rotate={2}
                  />
                  <p className="text-[#0094FF] font-semibold">
                    {strings.ADD_INFORMATION_TYPE}
                  </p>
                </div>
              </div>
            </div>
            <div className="my-5">
              <h2 className="text-2xl font-bold my-5">
                {strings.RETURN_CONFIRMATION_MESSAGE}
              </h2>
              <div className="bg-white rounded-xl p-5">
                <div className="flex items-center gap-2 w-2/3">
                  <h2 className="text-xl font-semibold">
                    {strings.SET_MESSAGE_RETURN_IS_SUCCESSFULLY}
                  </h2>
                  <LightTooltip
                    title="A confirmation message will be displayed on the thank you page after the buyer has successfully processed the return."
                    arrow
                    className=""
                    placement="top-start"
                    // open={true}
                  >
                    <Icon
                      width="44"
                      height="24"
                      icon="fluent:info-32-regular"
                      rotate={2}
                    />
                  </LightTooltip>
                </div>
                <div className="flex items-center gap-3 my-5">
                  <input className="h-6 w-6" type="checkbox" />
                  <p className="text-lg text-[#2A2A2A]">
                    {strings.CHECKLIST_ENABLE_CONFIRMATION_MESSAGES}
                  </p>
                </div>
                <p className="text-lg text-[#2A2A2A]">
                  {strings.CONFIRMATION_MESSAGE_TITLE}
                </p>
                <input
                  className="rounded-lg py-[10px] px-2  border-[#EDEDED] border-[1px] w-full my-5"
                  placeholder={placeholder.WRITE_TITLE}
                />
                <p className="text-lg text-[#2A2A2A] my-5">
                  {strings.FILL_CONFIRMATION_MESSAGE}
                </p>
                <textarea
                  className="w-full border-[1px] rounded-lg h-44 p-5"
                  placeholder={placeholder.WRITE_MESSAGE}
                />
              </div>
            </div>
            <div className="flex justify-end my-5">
              <button className="bg-[#0094FF] px-7 py-[15px] rounded-[30px]">
                <p className="text-white">{strings.SAVE_SETTINGS}</p>
              </button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ReturnScreen;
