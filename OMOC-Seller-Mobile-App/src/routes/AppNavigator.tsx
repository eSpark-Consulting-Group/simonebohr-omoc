import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import SplashScreen from "../screens/authentication/SplashScreen";
import LoginScreen from "../screens/login/LoginScreen";
import Chats from "../screens/chats/Chats";
import { GILROY_REGULAR } from "../utils/fonts";
import ChatWindow from "../screens/chats/ChatWindow";
import OrderDetailScreen from "../screens/order/OrderDetailScreen";
import { Colors } from "../utils/colors";
import ChangePasswordScreen from "../screens/forgotpassword/ChangePasswordScreen";
import ForgotPasswordScreen from "../screens/forgotpassword/ForgotPasswordScreen";
import SendEmailScreen from "../screens/forgotpassword/SendEmailScreen";
import ShopSettingScreen from "../screens/shop/ShopSettingScreen";
import GeneralInformationScreen from "../screens/shop/GeneralInformationScreen";
import MapScreen from "../screens/map/MapScreen";
import AddProduct from "../screens/product/AddProduct";
import AddProductVariant from "../screens/product/AddProductVariant";
import AddProductWeight from "../screens/product/AddProductWeight";
import BrandScreen from "../screens/brand/BrandScreen";
import SignupScreen from "../screens/signup/SignupScreen";
import OtpScreen from "../screens/signup/OtpScreen";
import Home from "../screens/home/Index";
import SocialScreen from "../screens/shop/SocialScreen";
import ManageScreen from "../screens/shop/ManageScreen";
import Shop from "../screens/shop/Index";
import ManageFilesScreen from "../screens/shop/ManageFilesScreen";
import AgeRestrictionScreen from "../screens/shop/AgeRestrictionScreen";
import ShopStatusScreen from "../screens/shop/ShopStatusScreen";
import BillingScreen from "../screens/shop setting/BillingScreen";
import AddVoucher from "../screens/product/AddVoucher";
import AddCategory from "../screens/product/AddCategory";
import Shipping from "../screens/shop/Shipping";
import LegalPoliciesScreen from "../screens/shop setting/LegalPoliciesScreen";
import LegalPoliciesDetailsScreen from "../screens/shop setting/LegalPoliciesDetailsScreen";
import UserAndPermission from "../screens/shop/UserAndPermission";
import FaqScreen from "../screens/shop setting/FaqScreen";
import FaqSearchScreen from "../screens/shop setting/FaqSearchScreen";
import AddProductFaqScreen from "../screens/shop setting/AddProductFaqScreen";
import AddGeneralFaqScreen from "../screens/shop setting/AddGeneralFaqScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import AssignBarcodesSKUs from "../screens/productBarcode/AssignBarcodesSKUs";
import BarcodeScreen from "../screens/productBarcode/BarcodeScreen";
import PostAndStories from "../screens/profile/PostAndStories";
import CreatePost from "../screens/profile/CreatePost";
import OrderSetting from "../screens/profile/OrderSetting";
import CreateStory from "../screens/profile/CreateStory";
import TagProduct from "../screens/profile/TagProduct";
import ProductIdUpdate from "../screens/productBarcode/ProductIdUpdate";
import ReturnSettingsBarcode from "../screens/productBarcode/ReturnSettingsBarcode";
import InventoryScreen from "../screens/order/InventoryScreen";
import TestimonialProduct from "../screens/productBarcode/TestimonialProduct";
import Checkout from "../screens/product/Checkout";
import Barcode from "../screens/order/Barcode";
import InvoiceTitle from "../screens/order/InvoiceTitle";
import Category from "../screens/product/Category";
import Voucher from "../screens/product/Voucher";
import CustomizeVoucher from "../screens/product/CutomizeVoucher";
import CreateNewShop from "../screens/signup/newShop/CreateNewShop";
import NewShop from "../screens/home/NewShop";
import OrderDashboard from "../screens/order/OrderDashboard";
import ShopOrder from "../screens/order/ShopOrder";
import ProductPackaging from "../screens/order/ProductPackaging";
import CategoryDetailScreen from "../screens/product/CategoryDetailScreen";
import Setup from "../screens/othersetting/Setup";
import Market from "../screens/othersetting/Market";
import Customer from "../screens/othersetting/Customer";
import AddNewGeneralSubsciption from "../screens/othersetting/AddNewGeneralSubsciption";
import AddNewOfferForm from "../screens/othersetting/AddNewOfferForm";
import ViewGeneralSubsciption from "../screens/othersetting/ViewGeneralSubsciption";
import ShopAnalytics from "../screens/othersetting/ShopAnalytics";
import ManageNewsLetters from "../screens/othersetting/ManageNewsLetters";
import Newsletters from "../screens/othersetting/NewsLetters";
import TestimonalList from "../component/products/TestimonalList";
import AddNewProduct from "../screens/adddigital/AddNewProduct";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{
          title: "",
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontWeight: "500",
            color: Colors.neutralBlack,
            fontFamily: GILROY_REGULAR,
            fontSize: 20,
          },
          headerBackVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.whiteColor,
          },
        }}
      />
      <Stack.Screen
        name="ChatWindow"
        component={ChatWindow}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SendEmailScreen"
        component={SendEmailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Shop"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShopSettingScreen"
        component={ShopSettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GeneralInformationScreen"
        component={GeneralInformationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProductVariant"
        component={AddProductVariant}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProductWeight"
        component={AddProductWeight}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddVoucher"
        component={AddVoucher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCategory"
        component={AddCategory}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BrandScreen"
        component={BrandScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SocialScreen"
        component={SocialScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageScreen"
        component={ManageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageFilesScreen"
        component={ManageFilesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AgeRestrictionScreen"
        component={AgeRestrictionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShopStatusScreen"
        component={ShopStatusScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BillingScreen"
        component={BillingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Shipping"
        component={Shipping}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LegalPoliciesScreen"
        component={LegalPoliciesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LegalPoliciesDetailsScreen"
        component={LegalPoliciesDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserAndPermission"
        component={UserAndPermission}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FaqScreen"
        component={FaqScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FaqSearchScreen"
        component={FaqSearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProductFaqScreen"
        component={AddProductFaqScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddGeneralFaqScreen"
        component={AddGeneralFaqScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostAndStories"
        component={PostAndStories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BarcodeScreen"
        component={BarcodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AssignBarcodesSKUs"
        component={AssignBarcodesSKUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderSetting"
        component={OrderSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateStory"
        component={CreateStory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TagProduct"
        component={TagProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductIdUpdate"
        component={ProductIdUpdate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReturnSettingsBarcode"
        component={ReturnSettingsBarcode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InventoryScreen"
        component={InventoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TestimonialProduct"
        component={TestimonialProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvoiceTitle"
        component={InvoiceTitle}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Voucher"
        component={Voucher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TestimonalList"
        component={TestimonalList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomizeVoucher"
        component={CustomizeVoucher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateNewShop"
        component={CreateNewShop}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewShop"
        component={NewShop}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShopOrder"
        component={ShopOrder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductPackaging"
        component={ProductPackaging}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Setup"
        component={Setup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Market"
        component={Market}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryDetailScreen"
        component={CategoryDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Customer"
        component={Customer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewGeneralSubsciption"
        component={AddNewGeneralSubsciption}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewOfferForm"
        component={AddNewOfferForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewGeneralSubsciption"
        component={ViewGeneralSubsciption}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShopAnalytics"
        component={ShopAnalytics}
        options={{ headerShown: false }}
      />
            <Stack.Screen
        name="Newsletters"
        component={Newsletters}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageNewsLetters"
        component={ManageNewsLetters}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewProduct"
        component={AddNewProduct}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
