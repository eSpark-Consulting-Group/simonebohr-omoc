import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { three_dots_icon, user_frame } from "../utils/images";
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
import { CONTEXT, strings } from "../utils/string/strings";

const data = [
  {
    image: user_frame,
    title: "Hoodie Havana V1 -White",
    code: "CODE123123124124",
    status: "Active",
    city: "Chicago",
    icon: three_dots_icon,
    price: "Price",
    stock: "Stock",
  },
  {
    image: user_frame,
    title: "Hoodie Havana V1 -White",
    code: "CODE123123124124",
    status: "Active",
    city: "Chicago",
    icon: three_dots_icon,
    price: "Price",
    stock: "Stock",
  },
  {
    image: user_frame,
    title: "Hoodie Havana V1 -White",
    code: "CODE123123124124",
    status: "Active",
    city: "Chicago",
    icon: three_dots_icon,
    price: "Price",
    stock: "Stock",
  },
];

const ProductInventoryComponent = () => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <View style={styles.mainView}>
            <View style={styles.flatlistView}>
              <View style={styles.viewContainer}>
                <View style={styles.imageView}>
                  <FastImage source={item.image} style={styles.userImage} />
                  <View style={styles.titleCodeView}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.code}>{item.code}</Text>
                  </View>
                </View>
                <View style={styles.statusViewCity}>
                  <View style={styles.viewMainStatus}>
                    <View style={styles.viewActive}>
                      <Text style={styles.status}>{item.status}</Text>
                    </View>
                    <View>
                      <Text style={styles.city}>{item.city}</Text>
                    </View>
                  </View>
                  <Menu>
                    <MenuTrigger>
                      <VectorImage source={item.icon} style={styles.threeDot} />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={styles.modalContent}>
                      <MenuOption
                        onSelect={() => Alert.alert(`Edit`)}
                        style={styles.viewRemove}
                      >
                        <Text style={styles.remove}>
                          {strings.ADD_PRODUCT_ID}
                        </Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => Alert.alert(`Delete`)}
                        style={styles.viewBan}
                      >
                        <Text style={styles.banUser}>
                          {CONTEXT.DELETE_PRODUCT}
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>

              <View style={styles.viewbox}>
                <View style={styles.priceView}>
                  <View style={styles.viewDollor}>
                    <Text style={styles.priceText}>{item.price}</Text>
                    <Text style={styles.dollor}>$ 999,000</Text>
                  </View>
                </View>
                <View style={styles.priceView}>
                  <View style={styles.viewDollor}>
                    <Text style={styles.priceText}>{item.stock}</Text>
                    <Text style={styles.dollor}>32</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

export default ProductInventoryComponent;

const styles = StyleSheet.create({
  flatlistView: {
    width: "100%",
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 12,
    borderColor: Colors.gray88,
  },
  mainView: {
    marginTop: 10,
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
});
