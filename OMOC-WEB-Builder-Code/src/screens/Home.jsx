import React from "react";
import Header from "../components/Header";
import HomeCarousel from "../components/HomeCarousel";
import BlueBorderButton from "../commonComponents/BlueBorderButton";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();




  return (
    <div>
      <Header />

      <div className="bg-white">
        <div className="flex justify-center text-center">
          <h1 className="font-medium text-3xl  lg:text-[64px] md:text-[50px] lg:w-[672px] w-auto md:leading-[75.33px] mt-3 mb-7">
            {" "}
            Choose shop template what you want!
          </h1>
        </div>

        <HomeCarousel />

        <div className="flex  items-center xl:justify-end mt-8 xl:pe-64 justify-center">
          <div onClick={() => navigate("/TemplateCard")}>
            <BlueBorderButton text="See all templates" className="xl:py-4 xl:px-8"/>
          </div>
          <div onClick={() => navigate("/WebView")} className="ms-10">
            <BlueBorderButton text="Skip this Step" className="xl:py-4 xl:px-8" />
          </div>
        </div>
      </div>

  
    </div>
  );
}
