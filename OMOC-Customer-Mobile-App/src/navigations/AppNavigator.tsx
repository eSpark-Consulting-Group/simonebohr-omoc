import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../authentication/SplashScreen";
import TabNavigator from "./TabNavigator";
import SignUpScreen from "../screen/signUpScreen/SignUpScreen";
import OtpScreen from "../screen/otpScreen/OtpScreen";
import SuggetionScreen from "../screen/suggestionScreen/SuggetionScreen";
import HelpFavouriteScreen from "../screen/favouriteScreen/HelpFavouriteScreen";
import PopularPeopleScreen from "../screen/suggestionScreen/PopularPeopleScreen";
import SliderScreen from "../screen/suggestionScreen/SliderScreen";
import ForgotScreen from "../screen/forgotScreen/ForgotScreen";
import SendEmail from "../screen/forgotScreen/SendEmail";
import LoginScreen from "../screen/loginScreen/LoginScreen";
import ChangePassword from "../screen/forgotScreen/ChangePassword";
import CartItemCard from "../screen/cartScreen/CartItemCard";
import { StoryScreen } from "../screen/storyScreen/StoryScreen";
import WelcomeScreen from "../screen/loginScreen/WelcomeScreen";
import OtherProfile from "../screen/profileScreen/OtherProfile";
import PaymentScreen from "../screen/paymentScreen/PaymentScreen";
import VoucherScreen from "../screen/voucherScreen/VoucherScreen";
import AddressScreen from "../screen/addressScreen/AddressScreen";
import LoginPhone from "../screen/loginScreen/LoginPhone";
import DeliveryScreen from "../screen/deliveryScreenLatest/DeliveryScreen";
import MapScreen from "../screen/mapScreen/MapScreen";
import SettingScreen from "../screen/settings/SettingScreen";
import PersonalInformation from "../screen/settings/PersonalInformation";
import NotificationScreen from "../screen/notificationScreen/NotificationScreen";
import CustomNotificationScreen from "../screen/notificationScreen/CustomNotificationScreen";
import ReleasScreen from "../screen/settings/ReleasScreen";
import DeviceInformation from "../screen/settings/DeviceInformation";
import LanguageAndCountryScreen from "../screen/settings/LanguageAndCountryScreen";
import LanguagesScreen from "../screen/settings/LanguagesScreen";
import CountryScreen from "../screen/settings/CountryScreen";
import PaymentMethod from "../screen/paymentScreen/PaymentMethod";
import YourInterestScreen from "../screen/favouriteScreen/YourInterestScreen";
import YourNews from "../screen/settings/YourNews";
import PrivacyScreen from "../screen/privacyScreen/PrivacyScreen";
import ContactSync from "../screen/privacyScreen/ContactSync";
import DMsSetting from "../screen/privacyScreen/DMsSetting";
import BrandedContent from "../screen/privacyScreen/BrandedContent";
import YourActivity from "../screen/privacyScreen/YourActivity";
import Feedback from "../screen/privacyScreen/Feedback";
import Devices from "../screen/privacyScreen/Devices";
import YourData from "../screen/privacyScreen/YourData";
import SafetySettings from "../screen/privacyScreen/SafetySettings";
import CustomerDetails from "../components/CustomerDetails";
import CustomerScreen from "../screen/customerScreen/CustomerScreen";
import SocialSettingScreen from "../screen/socialScreen/SocialSettingScreen";
import RequestVerificationScreen from "../screen/socialScreen/RequestVerificationScreen";
import AdsSettingScreen from "../screen/socialScreen/AdsSettingScreen";
import SensitiveContentScreen from "../screen/socialScreen/SensitiveContentScreen";
import EditAddress from "../screen/addressScreen/EditAddress";
import ManageDeliveryAddress from "../screen/settings/ManageDeliveryAddress";
import AddNewAddress from "../screen/addressScreen/AddNewAddress";
import ManageYourAccount from "../screen/settings/ManageYourAccount";
import ChangePasswordScreen from "../screen/password/ChangePasswordScreen";
import LoginActivityScreen from "../screen/password/LoginActivityScreen";
import RatingsScreen from "../screen/ratingsScreen/RatingsScreen";
import RequestDetails from "../components/RequestDetails";
import MessageScreen from "../screen/directMessageScreen/MessageScreen";
import RequestScreen from "../screen/requestScreen/RequestScreen";
import LiveChat from "../screen/chatScreen/LiveChat";
import NewMessageScreen from "../screen/directMessageScreen/NewMessageScreen";
import AddParticipantScreen from "../screen/addParticipantScreen/AddParticipantScreen";
import NewGroupScreen from "../screen/newGroupScreen/NewGroupScreen";
import OmocGroupScreen from "../screen/omocGroup/OmocGroupScreen";
import EditGroupScreen from "../screen/omocGroup/EditGroupScreen";
import OmocOfficialScreen from "../screen/omocOfficialScreen/OmocOfficialScreen";
import CustomProductScreen from "../screen/individualProduct/CustomProductScreen";
import RequestLiveVideoBottomSheet from "../screen/chatScreen/RequestLiveVideoBottomSheet";
import ShareWishListScreen from "../screen/wishList/ShareWishListScreen";
import WishlistsScreen from "../screen/wishlistsScreen/WishlistsScreen";
import EditScreen from "../screen/editScreen/EditScreen";
import SetupProfileScreen from "../screen/setupProfileScreen/SetupProfileScreen";
import SetupAccountScreen from "../screen/setupAccountScreen/SetupAccountScreen";
import RecentSearchScreen from "../screen/searchScreen/RecentSearchScreen";
import OrderDetails from "../screen/addressScreen/OrderDetails";
import AllOrderList from "../screen/profileScreen/AllOrderList";
import AllWishlist from "../screen/profileScreen/AllWishlist";
import StoryTaker from "../screen/storyScreen/StoryTaker";
import StoryProcessor from "../screen/storyScreen/StoryProcessor";
import ChatScreen from "../screen/directMessageScreen/ChatScreen";
import MessageRequest from "../screen/requestScreen/MessageRequest";
import PostProcessor from "../screen/uploadPost/PostProcessor";
import TagFriendsScreen from "../screen/uploadPost/TagFriendsScreen";
import SelectLocationScreen from "../screen/uploadPost/SelectLocationScreen";
import AdvancedSettingsScreen from "../screen/uploadPost/AdvancedSettingsScreen";
import { MyStoryScreen } from "../screen/storyScreen/MyStoryScreen";
import ProductDetailScreen from "../screen/pdpScreen/ProductDetailScreen";
import VideoProcessor from "../screen/videoScreen/uploadVideo/VideoProcessor";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginPhone"
        component={LoginPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HelpFavouriteScreen"
        component={HelpFavouriteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PopularPeopleScreen"
        component={PopularPeopleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SuggetionScreen"
        component={SuggetionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotScreen"
        component={ForgotScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SendEmail"
        component={SendEmail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SliderScreen"
        component={SliderScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CartItemCard"
        component={CartItemCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtherProfile"
        component={OtherProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StoryScreen"
        component={StoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VoucherScreen"
        component={VoucherScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeliveryScreen"
        component={DeliveryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeviceInformation"
        component={DeviceInformation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Languages&Country"
        component={LanguageAndCountryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReleaseNote"
        component={ReleasScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomNotificationScreen"
        component={CustomNotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LanguagesScreen"
        component={LanguagesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="YourInterest"
        component={YourInterestScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CountryScreen"
        component={CountryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="YourNewsletter"
        component={YourNews}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Privacy&Security"
        component={PrivacyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContactSync"
        component={ContactSync}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DMsSettings"
        component={DMsSetting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BrandedContent"
        component={BrandedContent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="YourActivity"
        component={YourActivity}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Devices"
        component={Devices}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AboutYourData"
        component={YourData}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SafetySettings"
        component={SafetySettings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ManageDeliveryAddress"
        component={ManageDeliveryAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerDetails"
        component={CustomerDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SocialSettings"
        component={SocialSettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerSupport"
        component={CustomerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RequestVerificationScreen"
        component={RequestVerificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddNewAddress"
        component={AddNewAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdsSettingScreen"
        component={AdsSettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ManageYourAccount"
        component={ManageYourAccount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SensitiveContentScreen"
        component={SensitiveContentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginActivityScreen"
        component={LoginActivityScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="YourRatings"
        component={RatingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RequestDetails"
        component={RequestDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RequestScreen"
        component={RequestScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LiveChat"
        component={LiveChat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewMessageScreen"
        component={NewMessageScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddParticipantScreen"
        component={AddParticipantScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OmocGroupScreen"
        component={OmocGroupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewGroupScreen"
        component={NewGroupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditGroupScreen"
        component={EditGroupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OmocOfficialScreen"
        component={OmocOfficialScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomProductScreen"
        component={CustomProductScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShareWishListScreen"
        component={ShareWishListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RequestLiveVideoBottomSheet"
        component={RequestLiveVideoBottomSheet}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WishlistsScreen"
        component={WishlistsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SetupProfileScreen"
        component={SetupProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SetupAccountScreen"
        component={SetupAccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecentSearchScreen"
        component={RecentSearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllOrderList"
        component={AllOrderList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllWishlist"
        component={AllWishlist}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StoryProcessor"
        component={StoryProcessor}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StoryTaker"
        component={StoryTaker}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MessageRequest"
        component={MessageRequest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PostProcessor"
        component={PostProcessor}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TagFriendsScreen"
        component={TagFriendsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectLocationScreen"
        component={SelectLocationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdvancedSettingsScreen"
        component={AdvancedSettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyStoryScreen"
        component={MyStoryScreen}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="VideoProcessor"
        component={VideoProcessor}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
