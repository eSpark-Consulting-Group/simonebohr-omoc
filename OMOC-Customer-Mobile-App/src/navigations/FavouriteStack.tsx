import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favourite from "../screen/favouriteScreen";
import { GILROY_MEDIUM } from "../utils/fonts";
import { neutralBlack, whiteColor } from "../utils/colors";

const Stack = createNativeStackNavigator();
const FavouriteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavouriteScreen"
        component={Favourite}
        options={{
          title: "Favorite",
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontWeight: "500",
            color: neutralBlack,
            fontFamily: GILROY_MEDIUM,
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

export default FavouriteStack;

const styles = StyleSheet.create({});
