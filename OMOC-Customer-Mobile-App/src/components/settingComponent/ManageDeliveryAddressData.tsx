import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import { dots_icon } from "../../utils/images";
import {
  GILROY_BLACK,
  GILROY_MEDIUM,
  GILROY_MEDIUM_ITALIC,
} from "../../utils/fonts";
import { strings } from "../../assets/string/strings";
import {
  dangerRed,
  grey,
  lightBlue,
  midGray,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import ApiService from "../../services/api.service";

const ManageDeliveryAddressData = ({ data, navigation }) => {
  const onDeleteBtn = async (deatil) => {
    try {
      const response = await ApiService.deleteAddress(data?._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.mainContainer}>
        {/* <FastImage source={data?.icon} style={styles.emoji} /> */}
        <Text style={styles.emoji}>{data?.icon}</Text>
        <View style={styles.listDetailView}>
          <View style={styles.container}>
            <Text style={styles.grandmaText}>{data?.name}</Text>
            <View style={styles.numberView}>
              <Text style={styles.subText}>{data?._id}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.addressText}>
              {data?.address}, {data?.city}, {data?.zipCode}, {data?.country}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.dotsIconView}>
          <Menu
            style={{ height: 50 }}
          >
            <MenuTrigger>
              <VectorImage source={dots_icon} style={[styles.dotsIcon]} />
            </MenuTrigger>
            <MenuOptions customStyles={styles.modelContainer}>
              <MenuOption
                style={styles.editAddressBtn}
                onSelect={() => {
                  navigation.navigate("EditAddress", { data });
                }}
              >
                <Text style={styles.editAddressText}>
                  {strings.EDIT_ADDRESS}
                </Text>
              </MenuOption>
              <MenuOption
                style={styles.deleteBtn}
                onSelect={() => onDeleteBtn(data?._id)}
              >
                <Text style={styles.deleteText}>{strings.DELETE}</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
export default ManageDeliveryAddressData;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    width: "92%",
    alignSelf: "center",
    marginTop: 25,
    paddingBottom: 15,
    gap: 16,
    paddingHorizontal: 10,
    borderColor: "#EDEDED",
  },
  emoji: {
    fontSize: 30,
    fontWeight: "500",
    justifyContent: "center",
    alignSelf: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  grandmaText: {
    color: neutralBlack,
    fontFamily: GILROY_MEDIUM_ITALIC,
    fontSize: 16,
  },
  border: {
    height: 1,
    backgroundColor: midGray,
    width: "100%",
    marginTop: 15,
  },
  primaryBtn: {
    backgroundColor: lightBlue,
    borderRadius: 24,
    marginTop: 5,
    marginLeft: 10,
  },
  PrimaryText: {
    fontWeight: "500",
    color: skyBlueColor,
    fontSize: 10,
    lineHeight: 11.77,
    paddingHorizontal: 10,
    textAlign: "center",
    marginTop: 5,
  },
  subText: {
    color: skyBlueColor,
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
  },
  numberView: {
    backgroundColor: "#E8F5FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 24,
  },
  addressText: {
    color: grey,
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
  },
  dotsIconView: {
    position: "absolute",
    right: 2,
    top: 0,
  },
  dotsIcon: {
    height: 20,
    width: 20,
  },
  modelContainer: {
    marginTop: "28%",
    width: "45%",
    height: "12%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: whiteColor,
    backgroundColor: whiteColor,
    marginLeft: "50%",
  },
  addressBtn: {
    width: "80%",
    height: 20,
  },
  defaultAddressText: {
    fontFamily: GILROY_BLACK,
    fontWeight: "500",
    fontSize: 12,
    color: neutralBlack,
    marginLeft: 5,
    marginTop: 5,
  },
  editAddressBtn: {
    height: 30,
    width: "50%",
    marginTop: 20,
  },
  editAddressText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 13,
    color: neutralBlack,
    marginLeft: 5,
  },
  deleteBtn: {
    width: "50%",
    height: 32,
  },
  deleteText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 13,
    color: dangerRed,
    marginLeft: 5,
  },
  listDetailView: { gap: 15 },
});
