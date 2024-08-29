import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../screen/LoginScreen";
import WelcomeSeller from "../screen/WelcomeSeller";
import HomeScreen from "../screen/HomeScreen";
import WelcomScreenEnquri from "../screen/WelcomScreenEnquri";
import ShippingLabel from "../screen/ShippingLabel";
import ReadyToDelivery from "../screen/OrdersScreens/ReadyToDelivery";
import DeliveredOrderScreen from "../screen/OrdersScreens/DeliveredOrderScreen";
import OrderComplain from "../screen/OrdersScreens/OrderComplain";
import OrderInvoiceScreen from "../screen/OrdersScreens/OrderInvoiceScreen";
import ShopOrderScreen from "../screen/OrdersScreens/ShopOrderScreen";
import ProductPackaging from "../screen/OrdersScreens/ProductPackaging";
import ProductScreen from "../screen/productsScreen/ProductScreen";
import AllVoucherScreen from "../screen/productsScreen/vouchers/AllVoucherScreen";
import ProductVoucher from "../screen/productsScreen/vouchers/ProductVoucher";
import NewsletterVoucher from "../screen/productsScreen/vouchers/NewsletterVoucher";
import LiveStreamVoucher from "../screen/productsScreen/vouchers/LiveStreamVoucher";
import Expired from "../screen/productsScreen/vouchers/ Expired";
import CustomizeVoucher from "../screen/productsScreen/vouchers/CustomizeVoucher";
import ProductCategoriesList from "../screen/ProductCategories/ProductCategoriesList";
import AddProductCategories from "../screen/ProductCategories/AddProductCategories";
import AllTestimonialList from "../screen/ProductTestimonial/AllTestimonialList";
import NeedToAction from "../screen/ProductTestimonial/NeedToAction";
import ApprovedTestimonial from "../screen/ProductTestimonial/ApprovedTestimonial";
import ComplainTestimonial from "../screen/ProductTestimonial/ComplainTestimonial";
import CheckOut from "../screen/productsScreen/checkout/CheckOut";
import ManageBarcode from "../screen/ProductBarcode/ManageBarcode";
import AssignBarcode from "../screen/ProductBarcode/AssignBarcode";
import ProductBarcodeUpdate from "../screen/ProductBarcode/ProductBarcodeUpdate";
import PrintBarcodeLabels from "../screen/ProductBarcode/PrintBarCodeLabels";
import BalanceScreen from "../screen/profileShop/balance/BalanceScreen";
import ReturnScreen from "../screen/productsScreen/return/ReturnScreen";
import CustomerScreen from "../screen/otherSettings/customer/CustomerScreen";
import PostAndStoriesDashboard from "../screen/PostAndStory/PostAndStoriesDashboard";
import ProductCertificate from "../screen/ProductCertificate/ProductCertificate";
import CreatePost from "../screen/PostAndStory/CreatePost/CreatePost";
import ShopAnalytics from "../screen/otherSettings/analytics/ShopAnalytics";
import MarketingScreen from "../screen/otherSettings/marketing/MarketingScreen";
import Markets from "../screen/otherSettings/marketing/Markets";
import ManageCountry from "../screen/otherSettings/marketing/ManageCountry";
import CreateFirstAd from "../screen/otherSettings/marketing/CreateFirstAd";
import TopAdsScreen from "../screen/otherSettings/marketing/TopAdsScreen";
import CreateYourAdsStepOne from "../screen/otherSettings/marketing/CreateYourAdsStepOne";
import PostAndStoriesDraft from "../screen/PostAndStory/PostAndStoriesDraft";
import PostAndStoriesSchedule from "../screen/PostAndStory/PostAndStoriesSchedule";
import PostAndStoriesDashboardStory from "../screen/PostAndStory/PostAndStoriesDashboardStory";
import CreateStories from "../screen/PostAndStory/CreateStories/CreateStories";
import CreateYourAdsStepTwo from "../screen/otherSettings/marketing/CreateYourAdsStepTwo";
import AddNewProduct from "../screen/addProductScreen/AddNewProduct";
import AddNewProductStepTwo from "../screen/addProductScreen/AddNewProductStepTwo";
import AddDigitalProductStepTwo from "../screen/addDigitalProduct/AddDigitalProductStepTwo";
import AddDigitalProduct from "../screen/addDigitalProduct/AddDigitalProduct";
import AddDigitalProductStepThree from "../screen/addDigitalProduct/AddDigitalProductStepThree";
import VideoHelp from "../screen/otherSettings/videoHelp/VideoHelp";
import ShopSettings from "../screen/otherSettings/shopSettings/ShopSettings";
import ShopSettingsFAQ from "../screen/otherSettings/shopSettings/ShopSettingsFAQ";
import ProductFAQ from "../screen/otherSettings/shopSettings/ProductFAQ";
import GeneralFAQ from "../screen/otherSettings/shopSettings/GeneralFAQ";
import GeneralInformation from "../screen/otherSettings/shopSettings/generalInformation/GeneralInformation";
import YourBrand from "../screen/otherSettings/shopSettings/yourBrand/YourBrand";
import SocialModule from "../screen/otherSettings/shopSettings/socialModule/SocialModule";
import ManagePartnership from "../screen/otherSettings/shopSettings/socialModule/ManagePartnerships";
import AgeRestriction from "../screen/otherSettings/shopSettings/ageRestriction/AgeRestriction";
import ShopStatus from "../screen/otherSettings/shopSettings/shopStatus/ShopStatus";
import ManageFiles from "../screen/otherSettings/shopSettings/manageFiles/ManageFiles";
import LegalPolicies from "../screen/otherSettings/shopSettings/legalPolicies/LegalPolicies";
import LegalPoliciesDetail from "../screen/otherSettings/shopSettings/legalPolicies/LegalPoliciesDetail";
import SetupBilling from "../screen/otherSettings/shopSettings/setupBilling/SetupBilling";
import ShopShipping from "../screen/otherSettings/shopSettings/shopShipping/ShopShipping";
import RequestFreeShipping from "../screen/otherSettings/shopSettings/shopShipping/RequestFreeShipping";
import UserAndPermission from "../screen/otherSettings/shopSettings/userAndPermission/UserAndPermission";
import NewsLetter from "../screen/otherSettings/newsLetter/NewsLetter";
import { useSelector } from "react-redux";
import LoginWith from "../screen/LoginWithScreen";
import SignUpWith from "../screen/SignUpWithScreen";

function Router() {
  const { token } = useSelector((state) => state.userData.userDetails);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/Home" /> : <LoginWith />}
        />
        <Route
          path="/SignUp-with"
          element={token ? <Navigate to="/Home" /> : <SignUpWith />}
        />
        <Route
          path="/Sign-in"
          element={token ? <Navigate to="/Home" /> : <LoginScreen />}
        />
        <Route
          path="/Sign-up"
          element={token ? <Navigate to="/Home" /> : <WelcomeSeller />}
        />
        <Route
          path="/Home"
          element={!token ? <Navigate to="/" /> : <HomeScreen />}
        />
        <Route
          path="/Seller-enqury"
          element={!token ? <Navigate to="/" /> : <WelcomScreenEnquri />}
        />
        <Route
          path="/Shipping"
          element={!token ? <Navigate to="/" /> : <ShippingLabel />}
        />
        <Route
          path="/Order/New-order"
          element={!token ? <Navigate to="/" /> : <ShopOrderScreen />}
        />
        <Route
          path="/Order/Ready-to-delivery"
          element={!token ? <Navigate to="/" /> : <ReadyToDelivery />}
        />
        <Route
          path="/Order/Delivered"
          element={!token ? <Navigate to="/" /> : <DeliveredOrderScreen />}
        />
        <Route
          path="/Order/Completed-order"
          element={!token ? <Navigate to="/" /> : <OrderComplain />}
        />
        <Route
          path="/Order/Complain"
          element={!token ? <Navigate to="/" /> : <OrderComplain />}
        />
        <Route
          path="/Order/Invoice"
          element={!token ? <Navigate to="/" /> : <OrderInvoiceScreen />}
        />
        <Route
          path="/Order/Ready-For-Packaging"
          element={!token ? <Navigate to="/" /> : <ProductPackaging />}
        />
        <Route
          path="/Product/Inventory"
          element={!token ? <Navigate to="/" /> : <ProductScreen />}
        />
        <Route
          path="/Product/Categories"
          element={!token ? <Navigate to="/" /> : <ProductCategoriesList />}
        />
        <Route
          path="/Product/Testimonial"
          element={!token ? <Navigate to="/" /> : <AllTestimonialList />}
        />
        <Route
          path="/Product/Categories/add-Categories"
          element={!token ? <Navigate to="/" /> : <AddProductCategories />}
        />
        <Route
          path="/Product/Categories/edit-Categories"
          element={
            !token ? (
              <Navigate to="/" />
            ) : (
              <AddProductCategories isUpdate={true} />
            )
          }
        />
        <Route
          path="/Product/Testimonial/All-testimonial"
          element={!token ? <Navigate to="/" /> : <AllTestimonialList />}
        />
        <Route
          path="/Product/Testimonial/Need-to-action"
          element={!token ? <Navigate to="/" /> : <NeedToAction />}
        />
        <Route
          path="/Product/Testimonial/Approved-testimonial"
          element={!token ? <Navigate to="/" /> : <ApprovedTestimonial />}
        />
        <Route
          path="/Product/Testimonial/complain"
          element={!token ? <Navigate to="/" /> : <ComplainTestimonial />}
        />
        <Route
          path="/Product/Vouchers"
          element={!token ? <Navigate to="/" /> : <AllVoucherScreen />}
        />
        <Route
          path="/Product/Vouchers/AllVouchers"
          element={!token ? <Navigate to="/" /> : <AllVoucherScreen />}
        />
        <Route
          path="/Product/Vouchers/ProductVouchers"
          element={!token ? <Navigate to="/" /> : <ProductVoucher />}
        />
        <Route
          path="/Product/Vouchers/NewsletterVoucher"
          element={!token ? <Navigate to="/" /> : <NewsletterVoucher />}
        />
        <Route
          path="/Product/Vouchers/LiveStreamVoucher"
          element={!token ? <Navigate to="/" /> : <LiveStreamVoucher />}
        />
        <Route
          path="/Product/Vouchers/Expired"
          element={!token ? <Navigate to="/" /> : <Expired />}
        />
        <Route
          path="/Product/Vouchers/CustomizeVoucher"
          element={!token ? <Navigate to="/" /> : <CustomizeVoucher />}
        />
        <Route
          path="/Product/Inventory"
          element={!token ? <Navigate to="/" /> : <ProductScreen />}
        />
        <Route
          path="/Product/Categories"
          element={!token ? <Navigate to="/" /> : <ProductCategoriesList />}
        />
        <Route
          path="/Product/Categories/add-Categories"
          element={!token ? <Navigate to="/" /> : <AddProductCategories />}
        />
        <Route
          path="/Product/Checkout"
          element={!token ? <Navigate to="/" /> : <CheckOut />}
        />
        <Route
          path="/Product/Barcode"
          element={!token ? <Navigate to="/" /> : <ManageBarcode />}
        />
        <Route
          path="/Product/Barcode/Assign-barcode"
          element={!token ? <Navigate to="/" /> : <AssignBarcode />}
        />
        <Route
          path="/Product/Barcode/Barcode-update"
          element={!token ? <Navigate to="/" /> : <ProductBarcodeUpdate />}
        />
        <Route
          path="/Product/Barcode/SKUs-update"
          element={!token ? <Navigate to="/" /> : <ProductBarcodeUpdate />}
        />
        <Route
          path="/Product/Barcode/Print-barcode-label"
          element={!token ? <Navigate to="/" /> : <PrintBarcodeLabels />}
        />
        <Route
          path="/Product/Return"
          element={!token ? <Navigate to="/" /> : <ReturnScreen />}
        />
        <Route
          path="/Other-settings/Customer"
          element={!token ? <Navigate to="/" /> : <CustomerScreen />}
        />
        <Route
          path="/Other-settings/Analytics"
          element={!token ? <Navigate to="/" /> : <ShopAnalytics />}
        />
        <Route
          path="/Profile/Balance"
          element={!token ? <Navigate to="/" /> : <BalanceScreen />}
        />
        <Route
          path="/Profile/Post-story/Post"
          element={!token ? <Navigate to="/" /> : <PostAndStoriesDashboard />}
        />
        <Route
          path="/Product/Certification"
          element={!token ? <Navigate to="/" /> : <ProductCertificate />}
        />
        <Route
          path="/Profile/Post-story/Create-post"
          element={!token ? <Navigate to="/" /> : <CreatePost />}
        />
        <Route
          path="/Other-settings/Marketing"
          element={!token ? <Navigate to="/" /> : <MarketingScreen />}
        />
        <Route
          path="/Other-settings/Marketing/Markets"
          element={!token ? <Navigate to="/" /> : <Markets />}
        />
        <Route
          path="/Other-settings/Marketing/TopAds"
          element={!token ? <Navigate to="/" /> : <TopAdsScreen />}
        />
        <Route
          path="/Other-settings/Marketing/ManageCountry"
          element={!token ? <Navigate to="/" /> : <ManageCountry />}
        />
        <Route
          path="/Other-settings/Marketing/Create-FirstAd"
          element={!token ? <Navigate to="/" /> : <CreateFirstAd />}
        />
        <Route
          path="/Other-settings/Marketing/Create-your-ads-step-1"
          element={!token ? <Navigate to="/" /> : <CreateYourAdsStepOne />}
        />
        <Route
          path="/Profile/Post-story/Draft"
          element={!token ? <Navigate to="/" /> : <PostAndStoriesDraft />}
        />
        <Route
          path="/Profile/Post-story/Scheduled"
          element={!token ? <Navigate to="/" /> : <PostAndStoriesSchedule />}
        />
        <Route
          path="/Profile/Post-story/Story"
          element={
            !token ? <Navigate to="/" /> : <PostAndStoriesDashboardStory />
          }
        />
        <Route
          path="/Profile/Post-story/Create-story"
          element={!token ? <Navigate to="/" /> : <CreateStories />}
        />
        <Route
          path="/Other-settings/Marketing/Create-your-ads-step-2"
          element={!token ? <Navigate to="/" /> : <CreateYourAdsStepTwo />}
        />
        <Route
          path="/Product/Add-new-product-Step-1"
          element={!token ? <Navigate to="/" /> : <AddNewProduct />}
        />
        <Route
          path="/Product/Add-new-product-Step-2"
          element={!token ? <Navigate to="/" /> : <AddNewProductStepTwo />}
        />
        <Route
          path="/Product/Add-new-digitalProduct-Step-1"
          element={!token ? <Navigate to="/" /> : <AddDigitalProduct />}
        />
        <Route
          path="/Product/Add-new-digitalProduct-Step-2"
          element={!token ? <Navigate to="/" /> : <AddDigitalProductStepTwo />}
        />
        <Route
          path="/Product/Add-new-digitalProduct-Step-3"
          element={
            !token ? <Navigate to="/" /> : <AddDigitalProductStepThree />
          }
        />
        <Route
          path="/Other-settings/Video-help"
          element={!token ? <Navigate to="/" /> : <VideoHelp />}
        />
        <Route
          path="/Other-settings/Shop-settings"
          element={!token ? <Navigate to="/" /> : <ShopSettings />}
        />
        <Route
          path="/Other-settings/Shop-settings/FAQ"
          element={!token ? <Navigate to="/" /> : <ShopSettingsFAQ />}
        />
        <Route
          path="/Other-settings/Shop-settings/Product-FAQ"
          element={!token ? <Navigate to="/" /> : <ProductFAQ />}
        />
        <Route
          path="/Other-settings/Shop-settings/General-FAQ"
          element={!token ? <Navigate to="/" /> : <GeneralFAQ />}
        />
        <Route
          path="/Other-settings/Shop-settings/General-information"
          element={!token ? <Navigate to="/" /> : <GeneralInformation />}
        />
        <Route
          path="/Other-settings/Shop-settings/Your-brand"
          element={!token ? <Navigate to="/" /> : <YourBrand />}
        />
        <Route
          path="/Other-settings/Shop-settings/Social/Request"
          element={!token ? <Navigate to="/" /> : <SocialModule />}
        />
        <Route
          path="/Other-settings/Shop-settings/Social/Manage-partnerships"
          element={!token ? <Navigate to="/" /> : <ManagePartnership />}
        />
        <Route
          path="/Other-settings/Shop-settings/Social/Comment-settings"
          element={!token ? <Navigate to="/" /> : <SocialModule />}
        />
        <Route
          path="/Other-settings/Shop-settings/Social/Banned-user"
          element={!token ? <Navigate to="/" /> : <ManagePartnership />}
        />
        <Route
          path="/Other-settings/Shop-settings/Age-restriction"
          element={!token ? <Navigate to="/" /> : <AgeRestriction />}
        />
        <Route
          path="/Other-settings/Shop-settings/Shop-status"
          element={!token ? <Navigate to="/" /> : <ShopStatus />}
        />
        <Route
          path="/Other-settings/Shop-settings/Manage-files"
          element={!token ? <Navigate to="/" /> : <ManageFiles />}
        />
        <Route
          path="/Other-settings/Shop-settings/Legal-policies"
          element={!token ? <Navigate to="/" /> : <LegalPolicies />}
        />
        <Route
          path="/Other-settings/Shop-settings/Legal-policies-detail"
          element={!token ? <Navigate to="/" /> : <LegalPoliciesDetail />}
        />
        <Route
          path="/Other-settings/Shop-settings/Setup-billing"
          element={!token ? <Navigate to="/" /> : <SetupBilling />}
        />
        <Route
          path="/Other-settings/Shop-settings/Shop-shipping-rate"
          element={!token ? <Navigate to="/" /> : <ShopShipping />}
        />
        <Route
          path="/Other-settings/Shop-settings/Request-free-shipping"
          element={!token ? <Navigate to="/" /> : <RequestFreeShipping />}
        />
        <Route
          path="/Other-settings/Shop-settings/User-permission"
          element={!token ? <Navigate to="/" /> : <UserAndPermission />}
        />
        <Route
          path="/Other-settings/Newsletter"
          element={!token ? <Navigate to="/" /> : <NewsLetter />}
        />
        <Route
          path="/Other-settings/Newsletter"
          element={!token ? <Navigate to="/" /> : <NewsLetter />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
