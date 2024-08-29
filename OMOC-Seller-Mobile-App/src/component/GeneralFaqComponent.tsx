import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { strings } from "../utils/string/strings";
import { GILROY_REGULAR } from "../utils/fonts";
import { Colors } from "../utils/colors";
import { arrow_down } from "../utils/images";
import VectorImage from "react-native-vector-image";

const GeneralFaqComponent = ({ navigation, data }) => {
  const [showText, setShowText] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const handleShopNotification = (item) => {
    setSelectedId(item._id);
    setShowDropdown((pre) => !pre);
    setShowText(true);
  };

  return (
    <SafeAreaView>
      <View style={styles.flatlistView}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View>
                <TouchableOpacity
                  style={styles.textView}
                  onPress={() => handleShopNotification(item)}
                >
                  <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>{item.question}</Text>
                    <VectorImage
                      source={arrow_down}
                      style={[
                        styles.vectorIcon,
                        showDropdown && selectedId == item._id
                          ? styles.dropIconOpened
                          : styles.dropIcon,
                      ]}
                    />
                  </View>
                </TouchableOpacity>
                {showDropdown && selectedId == item._id ? (
                  <View style={styles.viewLorem}>
                    <Text style={styles.loremTextD}>{item.answer}</Text>
                  </View>
                ) : null}
              </View>
            );
          }}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.loremText}>{strings.LOREM_IPSUM_DOLOR}</Text>
      </View>
    </SafeAreaView>
  );
};

export default GeneralFaqComponent;

const styles = StyleSheet.create({
  viewGeneralProduct: {
    backgroundColor: Colors.lightGrey,
    marginTop: 20,
    width: "95%",
    height: 57,
    borderRadius: 24,
    alignSelf: "center",
    flexDirection: "row",
  },
  viewGeneral: {
    width: 174,
    height: 49,
    backgroundColor: Colors.skyBlueColor,
    marginTop: 4,
    marginLeft: 20,
    borderRadius: 24,
  },
  viewProduct: {
    width: 174,
    height: 49,
    backgroundColor: Colors.lightGrey,
    marginTop: 4,
    marginLeft: 20,
    borderRadius: 24,
  },
  textGeneral: {
    alignSelf: "center",
    marginTop: 17,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    color: Colors.whiteColor,
    fontSize: 12,
  },
  textProduct: {
    alignSelf: "center",
    marginTop: 17,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    color: Colors.blackColor,
    fontSize: 12,
  },
  viewTitle: {
    width: "95%",
    height: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  vectorIcon: {
    width: 16,
    height: 16,
  },
  textTitle: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    color: Colors.neutralBlack,
  },
  textView: {
    width: "90%",
    marginTop: 30,
    alignSelf: "center",
    marginHorizontal: 60,
  },
  loremText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 22,
    color: Colors.grey,
    width: "88%",
  },
  dropIcon: {
    marginTop: 7,
  },
  dropIconOpened: {
    transform: [{ rotate: "180deg" }],
  },
  loremTextD: {
    color: Colors.grey,
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    fontWeight: "400",
    marginHorizontal: 20,
    lineHeight: 21,
  },
  viewLorem: {
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutralGrey,
    marginHorizontal: 12,
  },
  flatlistView: {
    height: "72%",
  },
  btnView: {
    flexDirection: "row",
  },
});
