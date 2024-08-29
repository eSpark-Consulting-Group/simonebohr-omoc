import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VectorImage from "react-native-vector-image";
import { Colors, skyBlueColor } from "../utils/colors";
import { StyleSheet } from "react-native";
import HomeStackNavigator from "./HomeStackNavigator";
import OrderStackNavigator from "./OrderStackNavigator";
import ProductStackNavigator from "./ProductStackNavigator";
import ShopStackNavigator from "./ShopStackNavigator";
import MoreStackNavigator from "./MoreStackNavigator";
import {
  home_icon,
  more_icon,
  order_icon,
  product_icon,
  shop_icon,
} from "../utils/images";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
function TabNavigator() {
  const hideTabBar = (route) => {
    const focusedRoute = getFocusedRouteNameFromRoute(route);

    return focusedRoute && ["ChatsScreen"].includes(focusedRoute)
      ? "none"
      : "flex";
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconColor;
          iconColor = focused ? Colors.skyBlueColor : "rgb(70,70,70)";

          if (route.name === "HomeStackNavigator") {
            color = focused ? Colors.skyBlueColor : "rgb(160,160,160)";
            return (
              <VectorImage
                source={home_icon}
                tintColor={color}
                style={styles.icon}
              />
            );
          }
          if (route.name === "OrderStackNavigator") {
            color = focused ? Colors.skyBlueColor : "rgb(160,160,160)";
            return (
              <VectorImage
                source={order_icon}
                tintColor={color}
                style={styles.icon}
              />
            );
          }
          if (route.name === "ProductStackNavigator") {
            color = focused ? Colors.skyBlueColor : "rgb(160,160,160)";
            return (
              <VectorImage
                source={product_icon}
                tintColor={color}
                style={styles.icon}
              />
            );
          }
          if (route.name === "ShopStackNavigator") {
            color = focused ? Colors.skyBlueColor : "rgb(160,160,160)";
            return (
              <VectorImage
                source={shop_icon}
                tintColor={color}
                style={styles.icon}
              />
            );
          }
          if (route.name === "MoreStackNavigator") {
            color = focused ? Colors.skyBlueColor : "rgb(160,160,160)";
            return (
              <VectorImage
                source={more_icon}
                tintColor={color}
                style={styles.icon}
              />
            );
          }
        },
        tabBarActiveTintColor: Colors.skyBlueColor,
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          display: hideTabBar(route),
        },
      })}
    >
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{ tabBarLabel: "Home", headerShown: false }}
      />
      <Tab.Screen
        name="OrderStackNavigator"
        component={OrderStackNavigator}
        options={{ tabBarLabel: "Order", headerShown: false }}
      />
      <Tab.Screen
        name="ProductStackNavigator"
        component={ProductStackNavigator}
        options={{ tabBarLabel: "Product", headerShown: false }}
      />
      <Tab.Screen
        name="ShopStackNavigator"
        component={ShopStackNavigator}
        options={{ tabBarLabel: "Shop", headerShown: false }}
      />
      <Tab.Screen
        name="MoreStackNavigator"
        component={MoreStackNavigator}
        options={{ tabBarLabel: "More", headerShown: false }}
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
});
