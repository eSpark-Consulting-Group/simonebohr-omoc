import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Video from "../screen/videoScreen";

const Stack = createNativeStackNavigator();
const VideoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="video"
        component={Video}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default VideoStack;

const styles = StyleSheet.create({});
