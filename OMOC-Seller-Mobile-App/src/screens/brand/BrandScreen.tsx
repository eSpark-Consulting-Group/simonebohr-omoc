import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../utils/colors";
import Customheader from "../../component/Customheader";
import { strings } from "../../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import FastImage from "react-native-fast-image";
import {
  fb_icon,
  instagram_icon,
  add_icon,
  omoc_image,
  omoc_pencil_icon,
  pinterest_icon,
  snapchat_icon,
  tick_circle_icon,
  tiktoc_icon,
  twitter_icon,
} from "../../utils/images";
import VectorImage from "react-native-vector-image";
import BrandBottomSheet from "../../component/BrandBottomSheet";

const data = [
  {
    img: instagram_icon,
    title: "OMOC OFFICIAL",
    circleRightIcon: tick_circle_icon,
    icon: omoc_pencil_icon,
  },
  {
    img: fb_icon,
    title: "OMOC OFFICIAL",
    circleRightIcon: tick_circle_icon,
    icon: omoc_pencil_icon,
  },
  {
    img: twitter_icon,
    title: "OMOC OFFICIAL",
    circleRightIcon: tick_circle_icon,
    icon: omoc_pencil_icon,
  },
  {
    img: tiktoc_icon,
    title: "OMOC OFFICIAL",
    circleRightIcon: tick_circle_icon,
    icon: omoc_pencil_icon,
  },
  {
    img: pinterest_icon,
    title: "add your pinterest account",
    circleRightIcon: add_icon,
  },
  {
    img: snapchat_icon,
    title: "OMOC OFFICIAL",
    circleRightIcon: tick_circle_icon,
    icon: omoc_pencil_icon,
  },

  ,
];

const BrandScreen = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Customheader
        title={strings.BRAND}
        showBackIcon={true}
        Containerstyle={{ marginTop: 15, paddingBottom: 5 }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.text}>
          <Text style={styles.loremText}>{strings.LOREM_TEXT}</Text>
        </View>
        <View style={styles.imageText}>
          <FastImage source={omoc_image} style={styles.omocImage} />
          <Text style={styles.omoc}>{strings.OMOC_OFFICIAL}</Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleBottomSheet}
          >
            <VectorImage source={omoc_pencil_icon} style={styles.pencilIcon} />
            <Text style={styles.btnText}>{strings.EDIT}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.socialView}>
          <Text style={styles.textSocial}>{strings.SOCIAL_MEDIA}</Text>
          <FlatList
            data={data}
            contentContainerStyle={{ marginBottom: "30%" }}
            renderItem={({ item }) => {
              return (
                <View style={styles.mediaView}>
                  <View style={styles.touchableView}>
                    <TouchableOpacity>
                      <VectorImage source={item?.img} />
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.title,
                        {
                          color:
                            item?.title === "add your pinterest account"
                              ? Colors.grey
                              : Colors.neutralBlack,
                        },
                      ]}
                    >
                      {item?.title}
                    </Text>
                  </View>
                  <View style={styles.circleView}>
                    <TouchableOpacity>
                      <VectorImage
                        source={item?.circleRightIcon}
                        style={styles.icons}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <VectorImage source={item?.icon} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      {showBottomSheet && (
        <BrandBottomSheet
          hideMe={() => {
            setShowBottomSheet(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default BrandScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: Colors.whiteColor,
    flex: 1,
  },
  text: {
    width: "85%",
    height: 66,
    marginTop: 20,
    left: 16,
  },
  icon: {
    height: 16,
    width: 16,
    tintColor: Colors.grey,
  },
  icons: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  loremText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 21.6,
    color: Colors.grey,
  },
  omocImage: {
    height: 120,
    width: 120,
    resizeMode: "contain",
  },
  imageText: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  omoc: {
    marginTop: 18,
  },
  touchableView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  circleView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  btn: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18.83,
    letterSpacing: 5,
    color: Colors.skyBlueColor,
  },
  btnText: {
    color: Colors.skyBlueColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  continueButton: {
    backgroundColor: Colors.whiteColor,
    borderWidth: 1,
    borderColor: Colors.skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    marginTop: 15,
    width: "93%",
    flexDirection: "row",
    gap: 10,
    paddingVertical: 11,
  },
  pencilIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  viewicon: {
    flexDirection: "row",
  },
  socialView: { paddingHorizontal: 5 },
  textSocial: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18.83,
    color: Colors.neutralBlack,
    left: 18,
  },
  mediaView: {
    width: "95%",
    height: 53,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 10,
    borderColor: Colors.gray91,
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {},
  divider: {
    height: 1,
    width: "93%",
    backgroundColor: "#EEEEEE",
    alignSelf: "center",
    marginVertical: 20,
  },
});
