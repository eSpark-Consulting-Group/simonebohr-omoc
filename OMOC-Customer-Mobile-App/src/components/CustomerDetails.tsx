import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomHeaderShown from "./CustomHeaderShown";
import { dropdown_icon, drop_up_icon, search_icon } from "../utils/images";
import VectorImage from "react-native-vector-image";
import { GILROY_REGULAR } from "../utils/fonts";
import { CustomerData } from "../sampleData/CustomerData";
import { blackColor, grey, neutralBlack, skyBlueColor, whiteColor } from "../utils/colors";
import CustomButton from "./CustomButton";
import { strings } from "../assets/string/strings";
import { ScrollView } from "react-native-gesture-handler";

const CustomerDetails = ({ navigation }) => {
  const [showText, setShowText] = useState(false);
  const [showImg, setShowImg] = useState(dropdown_icon);
  const [showShopNotification, setShowShopNotification] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const handleShopNotification = (item) => {
    setSelectedId(item.id);
    setShowDropdown((pre) => !pre);
    setShowText(true);
  };
  return (
    <SafeAreaView style={styles.backBtn}>
      <View style={styles.leftBackIcon}>
        <CustomHeaderShown
          title="FAQ"
          rightheadericon={search_icon}
          navigation={navigation}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 10,width:"92%",alignSelf:'center',marginTop:15 }}>
          <FlatList
            data={CustomerData}
            renderItem={({ item, index }) => {
              return (
                <>
                  <TouchableOpacity
                    style={styles.textView}
                    onPress={() => handleShopNotification(item)}
                  >
                    <Text style={styles.text}>{item.Heading}</Text>
                    <VectorImage
                      source={dropdown_icon}
                      style={
                        showDropdown && selectedId === item.id
                          ? styles.dropIconOpened
                          : styles.dropIcon
                      }
                    />
                  </TouchableOpacity>
                  {showDropdown && selectedId === item.id ? (
                    <Text style={styles.loremTextD}>{strings.LOREM_TEXT}</Text>
                  ) : null}
                </>
              );
            }}
          />
        </View>
        <View style={styles.liveBtnView}>
          <View style={styles.loremView}>
            <Text style={styles.loremText}>{strings.LOREM_TEXT}</Text>
          </View>
          <CustomButton
            text="Live Chat"
            style={styles.liveBtn}
            textstyle={styles.textStyle}
            onPress={() => navigation.navigate("LiveChat")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerDetails;

const styles = StyleSheet.create({
  backBtn: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  textView: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
    fontWeight: "400",
    color:neutralBlack
  },
  dropIcon: {
    marginTop: 7,
  },
  dropIconOpened: {
    transform: [{ rotate: "180deg" }],
  },
  loremView: {
    marginHorizontal: 10,
    marginTop: 0,
    bottom: 15,
  },
  loremText: {
    color: grey,
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 22,
  },
  liveBtn: {
    backgroundColor: skyBlueColor,
  },
  textStyle: {
    color: whiteColor,
  },
  liveBtnView: {
    marginTop: 30,
    paddingVertical:10,
    gap:20,
    paddingHorizontal:5,
    width:"98%",
    alignSelf:'center'
  },
  loremTextD: {
    color: grey,
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 21,
    marginTop: 10,
    width:"95%"
  },
  leftBackIcon: {
    marginHorizontal: 20,
  },
});
