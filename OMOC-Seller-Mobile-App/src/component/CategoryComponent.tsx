import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { arrow_down, three_dots_icon, user_frame } from "../utils/images";
import { Colors } from "../utils/colors";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { CONTEXT, palceholders, strings } from "../utils/string/strings";

const data = [
  {
    image: user_frame,
    title: "Shoes",
    code: "Total Product: 999",
    icon: three_dots_icon,
  },
  {
    image: user_frame,
    title: "Shoes",
    code: "Total Product: 999",
    icon: three_dots_icon,
  },
  {
    image: user_frame,
    title: "Shoes",
    code: "Total Product: 999",
    icon: three_dots_icon,
  },
];

const CategoryComponent = ({ addPicture }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <View style={styles.mainView}>
            <View style={styles.flatlistView}>
              <View style={styles.viewContainer}>
                <TouchableOpacity>
                  <VectorImage source={item.icon} style={styles.threeDot} />
                </TouchableOpacity>
                <View style={styles.imageView}>
                  <FastImage source={item.image} style={styles.userImage} />
                  <View style={styles.titleCodeView}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.code}>{item.code}</Text>
                  </View>
                </View>

                <View style={styles.buttonViewLondon}>
                  <Text style={styles.textLondon}>{strings.MANAGE_NEW}</Text>
                  <Menu>
                    <MenuTrigger>
                      <VectorImage
                        source={arrow_down}
                        style={styles.arrowDown}
                      />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={styles.modalContent}>
                      <MenuOption
                        onSelect={() => Alert.alert(`Edit`)}
                        style={styles.viewRemove}
                      >
                        <Text style={styles.remove}>
                          {CONTEXT.EDIT_CATEGORIES}
                        </Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => addPicture()}
                        style={styles.viewBan}
                      >
                        <Text style={styles.banUser}>
                          {CONTEXT.ADD_PICTURE}
                        </Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => Alert.alert(`Delete`)}
                        style={styles.viewBan}
                      >
                        <Text style={styles.banUser}>
                          {palceholders.DELETE_CATEGORIES}
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({
  flatlistView: {
    width: "100%",
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 12,
    borderColor: Colors.whiteColor,
  },
  mainView: {
    marginTop: 10,
    backgroundColor: Colors.whiteColor,
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImage: {
    height: 48,
    width: 48,
  },
  imageView: {
    flexDirection: "row",
    marginRight: 20,
  },
  titleCodeView: {
    marginLeft: 15,
    marginTop: 5,
  },
  viewMainStatus: {
    justifyContent: "center",
    gap: 5,
  },
  statusViewCity: {
    flexDirection: "row",
    marginRight: 10,
  },
  viewActive: {
    backgroundColor: Colors.lightGreen,
    height: 22,
    width: 45,
    borderRadius: 25,
  },
  threeDot: {
    tintColor: Colors.blackColor,
    marginLeft: 25,
    marginTop: 15,
    height: 18,
  },
  status: {
    color: Colors.green,
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 10,
    textAlign: "center",
    marginTop: 5,
  },
  city: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 12,
    color: Colors.lightBlack,
  },
  viewbox: {
    width: "100%",
    height: 66,
    gap: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  priceView: {
    width: 180,
    height: 66,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
    borderColor: Colors.gray88,
  },
  priceText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.grey,
  },
  dollor: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.neutralBlack,
  },
  remove: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.skyBlueColor,
  },
  viewRemove: {
    width: 162,
    height: 36,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.aliceBlue,
  },
  viewNamePost: {
    width: "90%",
    flexDirection: "row",
  },
  modalContent: {
    marginLeft: 20,
    marginTop: "12%",
    width: "45%",
    zIndex: 4,
    alignSelf: "center",
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
  },
  banUser: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.blackColor,
  },
  viewBan: {
    width: 162,
    height: 36,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.whiteColor,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 12,
    color: Colors.charcoal,
  },
  code: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
    lineHeight: 18,
  },
  viewDollor: {
    gap: 10,
    marginTop: 10,
    marginHorizontal: 15,
  },
  buttonViewLondon: {
    width: 99,
    height: 45,
    borderColor: Colors.neutralGrey,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "center",
  },
  plusIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 5,
  },
  arrowDown: {
    left: 5,
    height: 20,
    width: 20,
    tintColor: Colors.gulfBlue,
  },
  textLondon: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    color: Colors.mediumGrey,
  },
});
