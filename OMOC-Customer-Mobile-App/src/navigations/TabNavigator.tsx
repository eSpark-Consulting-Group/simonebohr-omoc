import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import SearchStack from "./SearchStack";
import VideoStack from "./VideoStack";
import FavouriteStack from "./FavouriteStack";
import ProfileStack from "./ProfileStack";
import VectorImage from "react-native-vector-image";
import {
  heart_icon,
  home_icon,
  profile_icon,
  search_icon,
  video_icon,
} from "../utils/images";
import { neutralBlack, skyBlueColor } from "../utils/colors";
import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT } from "../utils";
import { useSelector } from "react-redux";
import { GILROY_REGULAR } from "../utils/fonts";
import FastImage from "react-native-fast-image";

const Tab = createBottomTabNavigator();
function TabNavigator() {
  const userData = useSelector((state) => state?.profile?.user);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color }) => {
          if (route.name === "Home") {
            return (
              <VectorImage
                source={home_icon}
                tintColor={color}
                style={styles.icon}
              />
            );
          }
          if (route.name === "Search") {
            return (
              <VectorImage
                source={search_icon}
                tintColor={color}
                style={styles.icon}
              />
            );
          }
          if (route.name === "Video") {
            return (
              <VectorImage
                source={video_icon}
                tintColor={color}
                style={styles.icon}
              />
            );
          }

          if (route.name === "Favourite") {
            return (
              <VectorImage
                source={heart_icon}
                tintColor={color}
                style={styles.icon}
              />
            );
          }
          if (route.name === "Profile") {
            return (
              <>
                {!!userData?.profileImg ? (
                  <FastImage
                    source={{ uri: userData?.profileImg }}
                    style={styles.myProfilePic}
                  />
                ) : (
                  <VectorImage
                    source={profile_icon}
                    tintColor={color}
                    style={styles.icon}
                  />
                )}
              </>
            );
          }
        },
        tabBarActiveTintColor: skyBlueColor,
        tabBarInactiveTintColor: neutralBlack,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: GILROY_REGULAR,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Video"
        component={VideoStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
export default TabNavigator;
const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  tabBar: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingTop: 5,
    height: SCREEN_HEIGHT * 0.11,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  myProfilePic: {
    height: 24,
    width: 24,
    borderRadius: 999,
  },
});
