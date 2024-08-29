import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import ShopDecoration from "./screens/ShopDecoration";
import TemplateCard from "./screens/TemplateCard";
import Test from "./components/Test";
import PagesShopDecor from "./screens/PagesShopDecor";
import FormsResponse from "./screens/FormsResponse";
import WebView from "./screens/WebView";
import CMS from "./screens/CMS";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopdecoration" element={<ShopDecoration />} />
          <Route path="/TemplateCard" element={<TemplateCard />} />

          <Route path="/test" element={<Test />} />
          <Route path="/PagesShopDecor" element={<PagesShopDecor />} />
          <Route path="/FormsResponse" element={<FormsResponse />} />
          <Route path="/WebView" element={<WebView />} />
          <Route path="/CMS" element={<CMS />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
