import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "../screen/login/LoginScreen";
import RegisterScreen from "../screen/login/RegisterScreen";
import OtpScreen from "../screen/login/OtpScreen";
import WelcomeScreen from "../screen/welcomeScreens/WelcomeScreen";
import FavoriteSelect from "../screen/welcomeScreens/FavoriteSelect";
import SuggetionScreen from "../screen/welcomeScreens/SuggetionScreen";
import PopularPeople from "../screen/welcomeScreens/PopularPeople";
import ForgotScreen from "../screen/login/ForgotScreen";
import EmailVerifyScreen from "../screen/login/EmailVerifyScreen";
import ChangePassword from "../screen/login/ChangePassword";
import HomeScreen from "../screen/home/HomeScreen";
import DetailsScreen from "../screen/home/DetailsScreen";
import TshirtScreen from "../screen/home/TshirtScreen";
import CartScreen from "../screen/cart/CartScreen";
import CheckoutScreen from "../screen/cart/CheckoutScreen";
import AccountScreen from "../screen/account/AccountScreen";
import UploadScreen from "../screen/account/UploadScreen";
import OtherProfile from "../screen/account/OtherProfile";
import SettingScreen from "../screen/settings/SettingScreen";
import PersonalInformation from "../screen/settings/account/PersonalInformation";
import LanguagesCountryScreen from "../screen/settings/general/LanguagesCountryScreen";
import PaymentMethodScreen from "../screen/settings/account/PaymentMethodScreen";
import YourInterestScreen from "../screen/settings/account/YourInterestScreen";
import YourRatingScreen from "../screen/settings/account/YourRatingScreen";
import NeedToRating from "../component/appComponent/NeedToRating";
import HistoryRating from "../component/appComponent/HistoryRating";
import NewsletterScreen from "../screen/settings/account/NewsletterScreen";
import ManageAddressScreen from "../screen/settings/account/ManageAddressScreen";
import AddNewAddress from "../component/appComponent/AddNewAddress";
import ManageAccountScreen from "../screen/settings/account/ManageAccountScreen";
import NotificationSettings from "../screen/settings/general/NotificationSettings";
import CustomNotification from "../screen/settings/general/CustomNotification";
import ProductNotification from "../screen/settings/general/ProductNotification";
import Language from "../screen/settings/general/Language";
import Country from "../screen/settings/general/Country";
import SocialSettings from "../screen/settings/general/SocialSettings";
import RequestVerification from "../screen/settings/general/RequestVerification";
import AdsSetting from "../screen/settings/general/AdsSetting";
import SensitiveContent from "../screen/settings/general/SensitiveContent";
import VoucherComponent from "../component/appComponent/VoucherComponent";
import SelectPayment from "../component/appComponent/SelectPayment";
import CustomerSupport from "../screen/settings/general/CustomerSupport";
import FaqScreen from "../screen/settings/general/FaqScreen";
import DmsSetting from "../screen/settings/general/privacy&policy/DmsSetting";
import BrandedContent from "../screen/settings/general/privacy&policy/BrandedContent";
import YourActivity from "../screen/settings/general/privacy&policy/YourActivity";
import Devices from "../screen/settings/general/privacy&policy/Devices";
import Feedback from "../screen/settings/general/privacy&policy/Feedback";
import AboutYourData from "../screen/settings/general/privacy&policy/AboutYourData";
import SafetySettings from "../screen/settings/general/privacy&policy/SafetySettings";
import PasswordScreen from "../screen/settings/general/privacy&policy/safety-settings/PasswordScreen";
import LoginActivity from "../screen/settings/general/privacy&policy/safety-settings/LoginActivity";
import LoginInformation from "../screen/settings/general/privacy&policy/safety-settings/LoginInformation";
import TwoFactorAuth from "../screen/settings/general/privacy&policy/safety-settings/TwoFactorAuth";
import TermsCondition from "../screen/settings/general/privacy&policy/TermsCondition";
import CookiesSetting from "../screen/settings/general/privacy&policy/CookiesSetting";
import DataPrivacyPolicy from "../screen/settings/general/privacy&policy/DataPrivacyPolicy";
import PrivacyPolicy from "../screen/settings/general/PrivacyPolicy";
import Advertising from "../screen/settings/general/privacy&policy/Advertising";
import { useSelector } from "react-redux";
import ScrollToTop from "../scrollToTop";
import FavoriteScreen from "../screen/favorite/FavoriteScreen";
import SearchScreen from "../screen/favorite/SearchScreen";
import ProductScreen from "../screen/favorite/ProductScreen";
import FiltersScreen from "../screen/favorite/FiltersScreen";
import WishlistScreen from "../screen/wshlist/WishlistScreen";
import AllProduct from "../screen/wshlist/AllProduct";
import EditAddress from "../component/appComponent/EditAddress";
import CreatePost from "../screen/account/CreatePost";
import MyOrder from "../screen/order/MyOrder";
import MyOrderDetails from "../screen/order/MyOrderDetail";
import SetUpProfile from "../screen/login/SetUpProfile";
import SetUpPhone from "../screen/login/SetUpPhone";

const Router = () => {
  const { token } = useSelector((state) => state.userData.userDetails);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to={"/Home"} /> : <LoginScreen />}
        />
        <Route
          path="/Register"
          element={token ? <Navigate to={"/Home"} /> : <RegisterScreen />}
        />
        <Route path="/Verification" element={<OtpScreen />} />
        <Route
          path="/Welcome"
          element={!token ? <Navigate to="/" /> : <WelcomeScreen />}
        />
        <Route
          path="/Select-favorite"
          element={!token ? <Navigate to="/" /> : <FavoriteSelect />}
        />
        <Route
          path="/Suggetion"
          element={!token ? <Navigate to="/" /> : <SuggetionScreen />}
        />
        <Route
          path="/PopularPeople"
          element={!token ? <Navigate to="/" /> : <PopularPeople />}
        />
        <Route
          path="/ForgotPassword"
          element={token ? <Navigate to={"/Home"} /> : <ForgotScreen />}
        />
        <Route
          path="/EmailVerification"
          element={token ? <Navigate to={"/Home"} /> : <EmailVerifyScreen />}
        />
        <Route
          path="/Change-Password"
          element={token ? <Navigate to={"/Home"} /> : <ChangePassword />}
        />
        <Route
          path="/Home"
          element={!token ? <Navigate to="/" /> : <HomeScreen />}
        />
        <Route
          path="/Detail-Product/:id"
          element={!token ? <Navigate to="/" /> : <DetailsScreen />}
        />
        <Route
          path="/T-Shirt"
          element={!token ? <Navigate to="/" /> : <TshirtScreen />}
        />
        <Route
          path="/Cart"
          element={!token ? <Navigate to="/" /> : <CartScreen />}
        />
        <Route
          path="/Address"
          element={!token ? <Navigate to="/" /> : <CheckoutScreen />}
        />
        <Route
          path="/Account"
          element={!token ? <Navigate to="/" /> : <AccountScreen />}
        />
        <Route
          path="/Upload-Video"
          element={!token ? <Navigate to="/" /> : <UploadScreen />}
        />
        <Route
          path="/Other-Profile"
          element={!token ? <Navigate to="/" /> : <OtherProfile />}
        />
        <Route
          path="/Setting"
          element={!token ? <Navigate to="/" /> : <SettingScreen />}
        />
        <Route
          path="/Setting/Personal-Information"
          element={!token ? <Navigate to="/" /> : <SettingScreen />}
        />
        <Route
          path="/Setting/Payment-Method"
          element={!token ? <Navigate to="/" /> : <PaymentMethodScreen />}
        />
        <Route
          path="/Setting/Languages-Country"
          element={!token ? <Navigate to="/" /> : <LanguagesCountryScreen />}
        />
        <Route
          path="/Setting/Your-Interest"
          element={!token ? <Navigate to="/" /> : <YourInterestScreen />}
        />
        <Route
          path="/Setting/Your-Ratings"
          element={!token ? <Navigate to="/" /> : <YourRatingScreen />}
        />
        <Route
          path="/Setting/Your-Ratings/Need-To-Ratings"
          element={!token ? <Navigate to="/" /> : <NeedToRating />}
        />
        <Route
          path="/Setting/Your-Ratings/History"
          element={!token ? <Navigate to="/" /> : <HistoryRating />}
        />
        <Route
          path="/Setting/Your-News-Letter"
          element={!token ? <Navigate to="/" /> : <NewsletterScreen />}
        />
        <Route
          path="/Setting/Manage-Delivery-Address"
          element={!token ? <Navigate to="/" /> : <ManageAddressScreen />}
        />
        <Route
          path="/Setting/Manage-Delivery-Address/Add-New-Address"
          element={
            !token ? <Navigate to="/" /> : <AddNewAddress setting={true} />
          }
        />
        <Route
          path="/Setting/Manage-Your-Account"
          element={!token ? <Navigate to="/" /> : <ManageAccountScreen />}
        />
        <Route
          path="/Setting/Notification-Setting"
          element={!token ? <Navigate to="/" /> : <NotificationSettings />}
        />
        <Route
          path="/Setting/Notification-Setting/Custom-Notification"
          element={!token ? <Navigate to="/" /> : <CustomNotification />}
        />
        <Route
          path="/Setting/Notification-Setting/Product-Notification"
          element={!token ? <Navigate to="/" /> : <ProductNotification />}
        />
        <Route
          path="/Setting/Language-Country"
          element={!token ? <Navigate to="/" /> : <LanguagesCountryScreen />}
        />
        <Route
          path="/Setting/Language-Country/Language"
          element={!token ? <Navigate to="/" /> : <Language />}
        />
        <Route
          path="/Setting/Language-Country/Country"
          element={!token ? <Navigate to="/" /> : <Country />}
        />
        <Route
          path="/Setting/Social-Settings"
          element={!token ? <Navigate to="/" /> : <SocialSettings />}
        />
        <Route
          path="/Setting/Social-Settings/Request-Verification"
          element={!token ? <Navigate to="/" /> : <RequestVerification />}
        />
        <Route
          path="/Setting/Social-Settings/Ads-Setting"
          element={!token ? <Navigate to="/" /> : <AdsSetting />}
        />
        <Route
          path="/Setting/Social-Settings/Sensitive-Content"
          element={!token ? <Navigate to="/" /> : <SensitiveContent />}
        />
        <Route
          path="/Add-new-address"
          element={!token ? <Navigate to="/" /> : <AddNewAddress />}
        />
        <Route
          path="/Edit-Address"
          element={!token ? <Navigate to="/" /> : <EditAddress />}
        />
        <Route
          path="/Vouchers/:addressId"
          element={!token ? <Navigate to="/" /> : <VoucherComponent />}
        />
        <Route
          path="/Checkout"
          element={!token ? <Navigate to="/" /> : <SelectPayment />}
        />
        <Route path="/Add-new-address" element={<AddNewAddress />} />
        <Route path="/Checkout" element={<SelectPayment />} />
        <Route path="/Setting/Customer-Support" element={<CustomerSupport />} />
        <Route path="/Setting/Customer-Support/FAQ" element={<FaqScreen />} />
        <Route path="/Setting/Privacy-Policy" element={<PrivacyPolicy />} />
        <Route
          path="/Setting/Privacy-Policy/DmsSetting"
          element={<DmsSetting />}
        />
        <Route
          path="/Setting/Privacy-Policy/BrandedContent"
          element={<BrandedContent />}
        />
        <Route
          path="/Setting/Privacy-Policy/Your-Activity"
          element={<YourActivity />}
        />
        <Route path="/Setting/Privacy-Policy/Devices" element={<Devices />} />
        <Route path="/Setting/Privacy-Policy/Feedback" element={<Feedback />} />
        <Route
          path="/Setting/Privacy-Policy/About-Your-Data"
          element={<AboutYourData />}
        />
        <Route
          path="/Setting/Privacy-Policy/About-Your-Data/Safety-Settings"
          element={<SafetySettings />}
        />
        <Route
          path="/Setting/Privacy-Policy/About-Your-Data/Safety-Settings/Password"
          element={<PasswordScreen />}
        />
        <Route
          path="/Setting/Privacy-Policy/About-Your-Data/Safety-Settings/Login-Activity"
          element={<LoginActivity />}
        />
        <Route
          path="/Setting/Privacy-Policy/About-Your-Data/Safety-Settings/Saved-Login-Information"
          element={<LoginInformation />}
        />
        <Route
          path="/Setting/Privacy-Policy/About-Your-Data/Privacy-Policy"
          element={<DataPrivacyPolicy />}
        />
        <Route
          path="/Setting/Privacy-Policy/About-Your-Data/Terms-and-Condition"
          element={<TermsCondition />}
        />
        <Route
          path="/Setting/Privacy-Policy/About-Your-Data/Cookies-Setting"
          element={<CookiesSetting />}
        />
        <Route
          path="/Setting/Privacy-Policy/Advertising"
          element={<Advertising />}
        />
        <Route
          path="Setting/Privacy-Policy/About-Your-Data/Safety-Settings/Two-factor-authentication"
          element={<TwoFactorAuth />}
        />
        <Route path="/Favorite" element={<FavoriteScreen />} />
        <Route path="/Trending" element={<SearchScreen />} />
        <Route path="/Product" element={<ProductScreen />} />
        <Route path="/Filters" element={<FiltersScreen />} />
        <Route path="/Wishlist" element={<WishlistScreen />} />
        <Route path="/All-Product" element={<AllProduct />} />
        <Route path="/Account/Create-Post" element={<CreatePost />} />
        <Route
          path="/Myorder"
          element={!token ? <Navigate to="/" /> : <MyOrder />}
        />
        <Route
          path="/Myorder/My-Order-Details"
          element={!token ? <Navigate to="/" /> : <MyOrderDetails />}
        />
        <Route
          path="/Set-upProfile"
          element={!token ? <Navigate to="/" /> : <SetUpProfile />}
        />
        <Route
          path="/Set-upPhone"
          element={!token ? <Navigate to="/" /> : <SetUpPhone />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
