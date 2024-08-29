import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { strings } from "../assets/string/strings";
import { skyBlueColor, whiteColor } from "../utils/colors";
import { GILROY_BLACK_ITALIC } from "../utils/fonts";
import StorageService from "../services/storage.service";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    StorageService.getUser().then((res) => {
      const user = JSON.parse(res);
      if (!user) {
        navigation.replace("WelcomeScreen");
      } else {
        navigation.replace("TabNavigator");
      }
    });
  }, []);

  return (
    <View style={styles.constiner}>
      <View style={styles.SplashScreenView}>
        <Text style={styles.SplashScreenText}>{strings.OMOC}</Text>
      </View>
      <ActivityIndicator size={"large"} color={skyBlueColor} />
    </View>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  constiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: whiteColor,
    fontFamily: GILROY_BLACK_ITALIC,
  },
  SplashScreenText: {
    color: skyBlueColor,
    fontSize: 30,
    fontWeight: "bold",
  },
  SplashScreenView: {
    marginBottom: 20,
  },
});
