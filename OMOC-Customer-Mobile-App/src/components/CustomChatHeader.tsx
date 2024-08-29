import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import { lightGrey50, neutralBlack } from "../utils/colors";
import { GILROY_MEDIUM } from "../utils/fonts";
import backIcon from "../assets/Icon/back_icon.svg";
import camera from "../assets/Icon/camera.svg";
import { message_edit_icon } from "../utils/images";

const CustomChatHeader = ({ item, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftHeaderView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backView}
        >
          <VectorImage source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.userDetailView}>
          <FastImage style={styles.userImage} source={{uri:item?.profileImg}} />
          <Text style={styles.headerText}>{item?.name}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <VectorImage source={camera} style={styles.moreIcon} />
        <VectorImage source={message_edit_icon} style={styles.moreIcon} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 15,
    marginTop:5
  },
  leftHeaderView: { alignItems: "center", flexDirection: "row" },
  backView: { paddingLeft: 20, transform: [{ rotateY: "180deg" }] },
  backIcon: { width: 10, height: 16, tintColor: neutralBlack ,transform: [{ rotateZ:'180deg' }],resizeMode:'contain'},
  userDetailView: { flexDirection: "row", gap: 10, alignItems: "center" },
  headerText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 17,
    fontWeight: "500",
  },
  userImage: { width: 34, height: 34, borderRadius: 20, borderColor:lightGrey50,
    borderWidth: 0.5, },
  moreIcon: { width:25, height:25, tintColor: neutralBlack },
  moreButton: { paddingRight: 5, paddingLeft: 10 , flexDirection:"row",justifyContent:'space-between', width:'20%'},
});

export default CustomChatHeader;
