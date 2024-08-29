import React from "react";
import SubHeader from "../components/SubHeader";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import Header from "../components/Header";
import RightSideEditorbar from "../components/RightSidebar/RightSideEditorbar";
import { useSelector } from "react-redux";
import LeftSideAddNavbar from "../components/LeftSidebar/LeftSideAddNavbar";
import RightSideCommentBar from "../components/RightSidebar/RightSideCommentBar";

export default function WebView() {
  const showNavbar = useSelector((state) => state.subheader.subHeaderNav);
  return (
    <div>
      <Header />

      <SubHeader />

      <div className="flex">
        {showNavbar === "add" ? <LeftSideAddNavbar /> : <LeftSidebar />}
        <div className="flex-1  p-4">lorem1000</div>

        {showNavbar === "message" ? <RightSideCommentBar /> : <RightSideEditorbar />}
      </div>
    </div>
  );
}
