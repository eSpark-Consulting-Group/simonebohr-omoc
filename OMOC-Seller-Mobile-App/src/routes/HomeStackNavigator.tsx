import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/home/Index";
import { GILROY_REGULAR } from "../utils/fonts";
import { neutralBlack, whiteColor } from "../utils/colors";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          title: "",
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontWeight: "500",
            color: neutralBlack,
            fontFamily: GILROY_REGULAR,
            fontSize: 20,
          },
          headerShown: true,
          headerStyle: {
            backgroundColor: whiteColor,
          },
        }}
      />
    </Stack.Navigator>
  );
};
export default HomeStackNavigator;
