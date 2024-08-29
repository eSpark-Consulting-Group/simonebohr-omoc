import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { blackColor, skyBlueColor, whiteColor } from "../utils/colors";
import { GILROY_LIGHT } from "../utils/fonts";
import FastImage from "react-native-fast-image";
import { menImage } from "../utils/images";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";

const CardHome = ({ text, companyName, menImage }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={menImage}
        style={styles.cardBgImage}
        resizeMode="cover"
        imageStyle={{ borderRadius: 17 }}
      >
        {text && <Text style={styles.text}>{text}</Text>}
        <View style={styles.brandContent}>{companyName}</View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    width:'100%',
  },
  textColumn: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: blackColor,
    marginLeft: 10,
    marginTop: 10,
    fontFamily: GILROY_LIGHT,
  },
  imageColumn: {
    flex: 1,
    justifyContent: "center",
    margin: 0,
    alignContent: "center",
  },
  brandContent: { position: "absolute", width: "100%", bottom: 3, zIndex: 1 },
  cardBgImage: {
    height: WINDOW_HEIGHT*0.22,
    borderRadius: 17,
  },
});

export default CardHome;
