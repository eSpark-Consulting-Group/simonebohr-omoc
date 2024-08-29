import React, { useState } from "react";
import UpgradeShopDashboard from "./UpgradeShopDashboard";
import NoteMessageModal from "./NoteMessageModal";
import { NavLink, useLocation } from "react-router-dom";
import "../assets/CommonStyling/CommonStyling.css";
import { Icon } from "@iconify/react";
import {
  sideBar,
  productSubOptions,
  profileSubOptions,
  otherSettingsOption,
} from "./SideBarMenuOption";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function SideMenuBar({ isDashboard }) {
  const location = useLocation();
  const orderCheck = location.pathname.match("Order");
  const productCheck = location.pathname.match("Product/");
  const productTestimonialCheck = location.pathname.match("Testimonial");
  const productVoucherCheck = location.pathname.match("Vouchers");
  const profile = location.pathname.match("Profile");
  const otherSettings = location.pathname.match("Other-settings");
  const post = location.pathname.match("Post");

  return (
    <>
      <div className="sideBarClass">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Menu
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={`${
                isDashboard
                  ? "w-full h-full border-r-4 pt-5 relative"
                  : "w-full h-full pb-72 border-r-4 pt-5 relative"
              }`}
            >
              {sideBar.map((val, index) => {
                return (
                  <div className="justify-center md:justify-end" key={index}>
                    <ul className="text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 manageActive">
                      <li className="border-b-2">
                        <NavLink
                          // className={``}
                          to={val.link}
                          className={`${
                            val.link.match(orderCheck) ||
                            val.link.match(productCheck) ||
                            val.link.match(profile) ||
                            val.link.match(otherSettings)
                              ? "active"
                              : ""
                          } w-40 w-full h-14 flex items-center cursor-pointer px-4`}
                        >
                          <span className="inactiveClass">{val.image}</span>
                          <span className="activeClass">{val.activeImage}</span>
                          <div className="flex justify-between w-full">
                            <p className="ml-5">{val.text}</p>
                            {val.dropdown && (
                              <span>
                                <Icon
                                  icon="mingcute:down-line"
                                  color="#969696"
                                  width="24"
                                  height="24"
                                />
                              </span>
                            )}
                          </div>
                        </NavLink>
                        {val.dropdown &&
                          location.pathname.includes("Product/") &&
                          !location.pathname.includes("Order") &&
                          val.link.match(productCheck) &&
                          productSubOptions.map((val, index) => (
                            <span key={index} className="subOptionActiveClass">
                              <NavLink
                                to={val.link}
                                className={`${
                                  val.link.match(productTestimonialCheck) ||
                                  val.link.match(productVoucherCheck)
                                    ? "active"
                                    : ""
                                } flex items-center justify-start gap-4 p-3`}
                              >
                                <img
                                  src={val.image}
                                  className="inactiveClass ml-4"
                                />
                                <img
                                  src={val.activeImage}
                                  className="activeClass ml-4"
                                />
                                <p className="">{val.name}</p>
                              </NavLink>
                            </span>
                          ))}
                        {val.dropdown &&
                          val.link.match(profile) &&
                          profileSubOptions.map((val, index) => (
                            <span key={index} className="subOptionActiveClass">
                              <NavLink
                                to={val.link}
                                className={`${
                                  val.link.match(post) ? "active" : ""
                                } flex items-center justify-start gap-4 p-3`}
                              >
                                <img
                                  src={val.image}
                                  className="inactiveClass ml-4"
                                />
                                <img
                                  src={val.activeImage}
                                  className="activeClass ml-4"
                                />
                                <p className="">{val.name}</p>
                              </NavLink>
                            </span>
                          ))}
                        {val.dropdown &&
                          val.link.match(otherSettings) &&
                          otherSettingsOption.map((val, index) => (
                            <span key={index} className="subOptionActiveClass">
                              <NavLink
                                to={val.link}
                                className={`${
                                  val.link.match(productTestimonialCheck) ||
                                  val.link.match(productVoucherCheck)
                                    ? "active"
                                    : ""
                                } flex items-center justify-start gap-4 p-3`}
                              >
                                <img
                                  src={val.image}
                                  className="inactiveClass ml-4"
                                />
                                <img
                                  src={val.activeImage}
                                  className="activeClass ml-4"
                                />
                                <p className="">{val.name}</p>
                              </NavLink>
                            </span>
                          ))}
                      </li>
                    </ul>
                  </div>
                );
              })}
              {isDashboard ? <UpgradeShopDashboard /> : <NoteMessageModal />}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div
        className={`${
          isDashboard
            ? "w-full h-full border-r-4 pt-5 relative hideSideBarClass"
            : "w-full h-full pb-72 border-r-4 pt-5 relative hideSideBarClass"
        }`}
      >
        {sideBar.map((val, index) => {
          return (
            <div className="justify-center md:justify-end" key={index}>
              <ul className="text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 manageActive">
                <li className="border-b-2">
                  <NavLink
                    // className={``}
                    to={val.link}
                    className={`${
                      val.link.match(orderCheck) ||
                      val.link.match(productCheck) ||
                      val.link.match(profile) ||
                      val.link.match(otherSettings)
                        ? "active"
                        : ""
                    } w-40 w-full h-14 flex items-center cursor-pointer px-4`}
                  >
                    <span className="inactiveClass">{val.image}</span>
                    <span className="activeClass">{val.activeImage}</span>
                    <div className="flex justify-between w-full">
                      <p className="ml-5">{val.text}</p>
                      {val.dropdown && (
                        <span>
                          <Icon
                            icon="mingcute:down-line"
                            color="#969696"
                            width="24"
                            height="24"
                          />
                        </span>
                      )}
                    </div>
                  </NavLink>
                  {val.dropdown &&
                    location.pathname.includes("Product") &&
                    !location.pathname.includes("Order") &&
                    val.link.match(productCheck) &&
                    productSubOptions.map((val, index) => (
                      <span key={index} className="subOptionActiveClass">
                        <NavLink
                          to={val.link}
                          className={`${
                            val.link.match(productTestimonialCheck) ||
                            val.link.match(productVoucherCheck)
                              ? "active"
                              : ""
                          } flex items-center justify-start gap-4 p-3`}
                        >
                          <img src={val.image} className="inactiveClass ml-4" />
                          <img
                            src={val.activeImage}
                            className="activeClass ml-4"
                          />
                          <p className="">{val.name}</p>
                        </NavLink>
                      </span>
                    ))}
                  {val.dropdown &&
                    val.link.match(profile) &&
                    profileSubOptions.map((val, index) => (
                      <span key={index} className="subOptionActiveClass">
                        <NavLink
                          to={val.link}
                          className={`${
                            val.link.match(post) ? "active" : ""
                          } flex items-center justify-start gap-4 p-3`}
                        >
                          <img src={val.image} className="inactiveClass ml-4" />
                          <img
                            src={val.activeImage}
                            className="activeClass ml-4"
                          />
                          <p className="">{val.name}</p>
                        </NavLink>
                      </span>
                    ))}
                  {val.dropdown &&
                    val.link.match(otherSettings) &&
                    otherSettingsOption.map((val, index) => (
                      <span key={index} className="subOptionActiveClass">
                        <NavLink
                          to={val.link}
                          className={`${
                            val.link.match(productTestimonialCheck) ||
                            val.link.match(productVoucherCheck)
                              ? "active"
                              : ""
                          } flex items-center justify-start gap-4 p-3`}
                        >
                          <img src={val.image} className="inactiveClass ml-4" />
                          <img
                            src={val.activeImage}
                            className="activeClass ml-4"
                          />
                          <p className="">{val.name}</p>
                        </NavLink>
                      </span>
                    ))}
                </li>
              </ul>
            </div>
          );
        })}
        {isDashboard ? <UpgradeShopDashboard /> : <NoteMessageModal />}
      </div>
    </>
  );
}

export default SideMenuBar;
