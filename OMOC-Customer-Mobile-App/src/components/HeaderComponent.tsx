import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import VectorImage from "react-native-vector-image";
import backIcon from "../assets/Icon/back_icon.svg";
import { neutralBlack, skyBlueColor } from "../utils/colors";
import { camera_icon, message_edit_icon, shop_icon } from "../utils/images";

const HeaderComponent: FC<{
  navigation?: any;
  title?: string;
  onCameraPress?: () => void;
  onEditPress?: () => void;
}> = ({ navigation, title, onCameraPress, onEditPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.omocContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={styles.backView}
        >
          <VectorImage source={backIcon} style={styles.BackButton} />
        </TouchableOpacity>
        <View style={styles.secContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={styles.backView}
          >
            <VectorImage source={shop_icon} style={styles.shopIcon} />
          </TouchableOpacity>

          <Text style={[styles.titleText]}>{title}</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity
          onPress={() => {
            onCameraPress();
          }}
        >
          <VectorImage source={camera_icon} style={styles.secondIconstyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onEditPress();
          }}
        >
          <VectorImage source={message_edit_icon} style={styles.iconstyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 7,
    justifyContent: "space-evenly",
    alignContent: "center",
    paddingHorizontal: 2,
    flexDirection: "row",
    marginLeft: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "500",
    color: neutralBlack,
    marginRight: "42%",
  },
  rightText: {
    fontSize: 16,
    fontWeight: "500",
    color: skyBlueColor,
  },
  BackButton: {
    marginTop: 0,
  },
  backView: {},
  rightView: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  iconstyle: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  shopIcon: {
    height: 17,
    width: 17,
    marginLeft: 25,
  },
  secondIconstyle: {
    width: 24,
    height: 24,
    tintColor: neutralBlack,
  },
  omocContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  secContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rightContainer: {
    flexDirection: "row",
  },
});
