import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { skyBlueColor, whiteColor } from "../../utils/colors";
import { GILROY_REGULAR } from "../../utils/fonts";
import { TouchableOpacity } from "react-native";
import ShareWishlistComponent from "../../components/storyComponent/ShareWishlistComponent";
import SearchTabBar from "../searchScreen/SearchTabBar";
import CustomButton from "../../components/CustomButton";

const ShareWishListScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttonTab = [
    {
      label: strings.PERSONAL,
    },
    {
      label: strings.SUPPORT,
    },
  ];
  return (
    <SafeAreaView style={styles.backBtn}>
      <View style={styles.btnView}>
        <CustomHeaderShown
          title={strings.SHARE_WISHLIST}
          style={styles.btn}
          navigation={navigation}
        />
      </View>
      <View style={styles.mainBtn}>
        <SearchTabBar placeholder={strings.SEARCH} />
      </View>
      <View style={styles.buttons}></View>
      <ShareWishlistComponent />

      <View>
        <CustomButton
          style={styles.shareButton}
          text="Share"
          textstyle={styles.txtStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShareWishListScreen;

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  btn: {
    width: "45%",
    height: 49,
    backgroundColor: skyBlueColor,
    borderRadius: 24,
    marginLeft: 2,
  },
  btnText: {
    textAlign: "center",
    padding: 15,
  },
  historyBtn: {
    width: "45%",
    height: 49,
    backgroundColor: skyBlueColor,
    borderRadius: 24,
    marginLeft: 30,
  },
  mainBtn: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  msgText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
    fontWeight: "600",
  },
  reqText: {
    color: skyBlueColor,
    fontsize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginHorizontal: 15,
  },
  msgEditIcon: {
    width: 24,
    height: 24,
  },
  editIconView: {
    alignSelf: "flex-end",
    bottom: 22,
  },
  btnView: {
    marginHorizontal: 15,
  },
  shareButton: {
    width: "95%",
    height: 47,
    marginBottom: 35,
    borderRadius: 24,
    gap: 10,
    backgroundColor: skyBlueColor,
  },
  txtStyle: {
    color: whiteColor,
  },
});
