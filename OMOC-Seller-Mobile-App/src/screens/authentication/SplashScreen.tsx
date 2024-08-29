import React, { useEffect } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../utils/colors";
import { strings } from "../../utils/string/strings";
import StorageService from "../../services/storage.service";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      StorageService.getUser().then((res) => {
        const user = JSON.parse(res);
        if (!user) {
          navigation.replace("LoginScreen");
        } else {
          navigation.replace("TabNavigator");
        }
      });
    }, 1000);
  }, []);

  return (
    <View style={styles.constiner}>
      <View style={styles.SplashScreenView}>
        <Text style={styles.SplashScreenText}>{strings.OMOC}</Text>
      </View>
      <ActivityIndicator size={"large"} color={Colors.skyBlueColor} />
    </View>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  constiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },
  SplashScreenText: {
    color: Colors.skyBlueColor,
    fontSize: 30,
    fontWeight: "bold",
  },
  SplashScreenView: {
    marginBottom: 20,
  },
});
