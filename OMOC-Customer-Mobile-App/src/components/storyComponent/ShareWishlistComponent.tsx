import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React from "react";
import {
  midGray,
  neutralBlack,
  midBlack,
  whiteColor,
  lightGrey50,
  skyBlueColor,
  grey,
  matterhorn,
} from "../../utils/colors";
import { GILROY_REGULAR, GILROY_SEMIBOLD } from "../../utils/fonts";
import FastImage from "react-native-fast-image";
import { shareWishlistData } from "../../sampleData/ShareWishlistData";
import CustomCheckBox from "../CustomCheckBox";
import CustomButton from "../CustomButton";

const ShareWishlistComponent = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.mainView}>
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          data={shareWishlistData}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatlistView}>
                <View style={styles.viewFastImage}>
                  <FastImage style={styles.directImage} source={item.image} />
                </View>
                <View style={styles.viewText}>
                  <Text style={styles.textYeete}>{item.name}</Text>
                  <Text style={styles.decriptionText}>{item.decription}</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                  <CustomCheckBox
                    boxType="square"
                    onFillColor={skyBlueColor}
                    onCheckColor={whiteColor}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShareWishlistComponent;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  mainView: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  requestText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: "right",
    color: lightGrey50,
  },
  message: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 28.8,
    color: neutralBlack,
  },
  flatlistView: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderColor: midGray,
    width: "99%",
    alignSelf: "center",
    flexDirection: "row",
  },
  textYeete: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22.4,
    color: neutralBlack,
  },
  boremText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16.8,
  },
  firstIcon: {
    justifyContent: "center",
    backgroundColor: skyBlueColor,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  oneIcon: {
    height: 20,
    width: 20,
  },
  viewText: {
    height: 60,
    width: "75%",
    gap: 4,
    marginHorizontal: 15,
  },
  viewFastImage: {
    // marginTop: 15,
  },
  directImage: {
    height: 48,
    width: 48,
  },
  viewMessageRequest: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  messageChat: {
    color: whiteColor,
    alignSelf: "center",
  },
  flatList: {
    marginBottom: 20,
  },
  decriptionText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    color: matterhorn,
  },
});
