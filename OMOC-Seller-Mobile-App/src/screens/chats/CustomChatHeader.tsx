import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import { arrowleft_icon, three_dots_icon } from "../../utils/images";
import { GILROY_MEDIUM } from "../../utils/fonts";
import { Colors } from "../../utils/colors";

const CustomChatHeader = ({ item, navigation }) => {
  console.log('item')
  return (
    <View style={styles.container}>
      <View style={styles.leftHeaderView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backView}
        >
          <VectorImage source={arrowleft_icon} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.userDetailView}>
          <FastImage style={styles.userImage} source={{uri:item.profileImg}} />
          <Text style={styles.headerText}>{item.name}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <VectorImage source={three_dots_icon} style={styles.moreIcon} />
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
  backIcon: { width: 6, height: 16, tintColor: Colors.neutralBlack },
  userDetailView: { flexDirection: "row", gap: 10, alignItems: "center" },
  headerText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 17,
    fontWeight: "500",
  },
  userImage: { width: 34, height: 34, borderRadius: 20, borderColor: Colors.lightGrey50,
    borderWidth: 0.5, },
  moreIcon: { width: 2, height: 16, tintColor: Colors.neutralBlack },
  moreButton: { paddingRight: 5, paddingLeft: 10 },
});

export default CustomChatHeader;
