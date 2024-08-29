import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { CONTEXT, palceholders, strings } from "../../utils/string/strings";
import { add_icon, search, three_dots_icon } from "../../utils/images";
import { Colors } from "../../utils/colors";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import SearchTabBar from "../../component/SearchTabBar";
import VectorImage from "react-native-vector-image";
import SubscriptionBottomSheet from "../../component/SubscriptionBottomSheet";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
const data = [
  {
    id: "00001",
    productname: "Black Hoodie RazorSI",
    frequency: "Monthly",
    date: "30/05/2023",
    price: "$120",
    status: "Inactive",
    icon: three_dots_icon,
  },
  {
    id: "00001",
    productname: "Black Hoodie RazorSI",
    frequency: "Monthly",
    date: "30/05/2023",
    price: "$120",
    status: "Inactive",
    icon: three_dots_icon,
  },
  {
    id: "00001",
    productname: "Black Hoodie RazorSI",
    frequency: "Monthly",
    date: "30/05/2023",
    price: "$120",
    status: "Inactive",
    icon: three_dots_icon,
  },
  {
    id: "00001",
    productname: "Black Hoodie RazorSI",
    frequency: "Monthly",
    date: "30/05/2023",
    price: "$120",
    status: "Inactive",
    icon: three_dots_icon,
  },
];
const Customer = () => {
  const [buttonPress, setbuttonPress] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const handlePressFirst = () => {
    setbuttonPress(!buttonPress);
  };

  const handlePressSecond = () => {
    setbuttonPress(!buttonPress);
  };
  return (
    <MenuProvider>
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar barStyle={"dark-content"} />

        <Customheader
          showBackIcon={true}
          title={CONTEXT.CUSTOMERS_AND_SUBSCRIBE}
        />
        <View style={styles.mainViewContainer}>
          <View style={styles.viewGeneralProduct}>
            <TouchableOpacity
              style={[
                styles.buttonView,
                {
                  backgroundColor: buttonPress
                    ? Colors.lightGrey
                    : Colors.skyBlueColor,
                },
              ]}
              onPress={handlePressFirst}
            >
              <Text
                style={[
                  styles.textGeneral,
                  {
                    color: buttonPress
                      ? Colors.neutralBlack
                      : Colors.whiteColor,
                  },
                ]}
              >
                {CONTEXT.GENERAL_SUBSCRIPTION}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonView,
                {
                  backgroundColor: buttonPress
                    ? Colors.skyBlueColor
                    : Colors.lightGrey,
                },
              ]}
              onPress={handlePressSecond}
            >
              <Text
                style={[
                  styles.textProduct,
                  {
                    color: buttonPress ? Colors.whiteColor : Colors.blackColor,
                  },
                ]}
              >
                {CONTEXT.CERTAIN_SUBSCRIPTION}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagView}>
            <Text style={styles.textGenSub}>
              {CONTEXT.GENERAL_SUBSCRIPTION}
            </Text>
            <Text style={styles.textTag}>{CONTEXT.TAG_THE_PRODUCT}</Text>
          </View>
          <View style={styles.searchView}>
            <SearchTabBar
              placeholder={strings.SEARCH}
              style={styles.searchBar}
            />
          </View>
          <ScrollView
            horizontal={true}
            style={styles.scrollDesign}
            showsHorizontalScrollIndicator={false}
          >
            <View>
              <View style={styles.horizontalView}>
                <View style={styles.rankView}>
                  <View style={styles.productView}>
                    <Text style={styles.textRank}>{CONTEXT.ID}</Text>
                  </View>

                  <View style={styles.productView}>
                    <Text style={styles.textRank}>{CONTEXT.PRODUCT_NAME}</Text>
                  </View>
                  <View style={styles.productView}>
                    <Text style={styles.textRank}>{CONTEXT.FREQUENCY}</Text>
                  </View>

                  <View style={styles.productView}>
                    <Text style={styles.textRank}>
                      {CONTEXT.NEXT_BILL_DATE}
                    </Text>
                  </View>
                  <View style={styles.productView}>
                    <Text style={styles.textRank}>{CONTEXT.FREQUENCY}</Text>
                  </View>
                  <View style={styles.productView}>
                    <Text style={styles.textRank}>
                      {CONTEXT.NEXT_BILL_DATE}
                    </Text>
                  </View>
                  <View style={styles.productView}>
                    <Text style={styles.textRank}>{CONTEXT.PRICE}</Text>
                  </View>
                  <View style={styles.productView}>
                    <Text style={styles.textRank}>{strings.STATUS}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.flatlistView}>
                <FlatList
                  data={data}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.viewContainer}>
                        <Text style={styles.textID}>{item.id}</Text>

                        <Text style={styles.textProductName}>
                          {item.productname}
                        </Text>

                        <Text style={styles.textfrequency}>
                          {item.frequency}
                        </Text>
                        <Text style={styles.textfrequency}>{item.date}</Text>
                        <Text style={styles.textFrq}>{item.frequency}</Text>
                        <Text style={styles.textDate}>{item.date}</Text>
                        <Text style={styles.textPrice}>{item.price}</Text>
                        <View style={styles.statusView}>
                          <Text style={styles.textStatus}>{item.status}</Text>
                        </View>
                        <Menu>
                          <MenuTrigger>
                            <VectorImage
                              source={item.icon}
                              style={styles.threeDotsIcon}
                            />
                          </MenuTrigger>
                          <MenuOptions
                            optionsContainerStyle={styles.modalContent}
                          >
                            <MenuOption
                              onSelect={handleBottomSheet}
                              style={styles.viewRemove}
                            >
                              <Text style={styles.remove}>{CONTEXT.VIEW}</Text>
                            </MenuOption>
                            <MenuOption
                              onSelect={() => Alert.alert(`Delete`)}
                              style={styles.viewBan}
                            >
                              <Text style={styles.banUser}>
                                {CONTEXT.EDIT_SUBSCRIPTION}
                              </Text>
                            </MenuOption>
                            <MenuOption
                              onSelect={() => Alert.alert(`Delete`)}
                              style={styles.viewBan}
                            >
                              <Text style={styles.banUser}>
                                {CONTEXT.DELETE_SUBSCRIPTION}
                              </Text>
                            </MenuOption>
                          </MenuOptions>
                        </Menu>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.buttonViewAllType}
            onPress={handleBottomSheet}
          >
            <VectorImage source={add_icon} style={styles.addIcon} />

            <Text style={styles.textButtonADD}>
              {CONTEXT.ADD_NEW_SUBSCRIPTION}
            </Text>
          </TouchableOpacity>
        </View>
        {showBottomSheet && (
          <SubscriptionBottomSheet
            hideMe={() => {
              setShowBottomSheet(false);
            }}
          />
        )}
      </SafeAreaView>
    </MenuProvider>
  );
};

export default Customer;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: Colors.whiteColor,
    flex: 1,
  },
  horizontalView: {},
  statusView: {
    width: 55,
    height: 22,
    backgroundColor: Colors.lightRed,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    left: 40,
  },
  scrollDesign: {
    flexGrow: 0,
    marginHorizontal: 12,
  },
  mainViewContainer: {
    marginHorizontal: 15,
    height: "100%",
  },
  header: {
    marginTop: 15,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewGeneralProduct: {
    width: "100%",
    backgroundColor: Colors.lightGrey,
    marginTop: 25,
    borderRadius: 24,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonView: {
    borderRadius: 30,
    width: "50%",
    paddingVertical: 18,
    alignItems: "center",
  },
  textGeneral: {
    fontFamily: GILROY_REGULAR,
    color: Colors.whiteColor,
    fontSize: 12,
    fontWeight: "400",
  },
  textProduct: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    fontSize: 12,
    fontWeight: "400",
  },
  textGenSub: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    color: Colors.blackColor,
  },
  textTag: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.blackColor,
  },
  tagView: {
    marginTop: 25,
    gap: 15,
  },
  searchView: {
    marginTop: 30,
  },
  searchBar: {
    width: "100%",
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.neutralGrey,
  },
  rankView: {
    height: 57,
    backgroundColor: Colors.ghostWhite,
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    gap: 35,
    width: "100%",
  },
  textRank: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "700",
    fontSize: 12,
    color: Colors.neutralBlack,
  },
  productView: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatlistView: {},
  viewContainer: {
    width: "100%",
    height: 44,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: Colors.gray88,
    gap: 35,
  },
  textTitle: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 12,
    color: Colors.neutralBlack,
  },
  textProductflatList: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
  },
  textFrq: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
    left: 15,
  },
  textDate: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
    left: 30,
  },
  textPrice: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
    left: 50,
  },
  textfrequency: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
    right: 15,
  },
  textID: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
    marginLeft: 20,
  },
  textProductName: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
    textAlign: "center",
    width: 100,
    height: 28,
    right: 10,
  },
  buttonViewAllType: {
    width: "100%",
    height: 49,
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    gap: 10,
  },
  textButtonADD: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    color: Colors.whiteColor,
  },
  addIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    tintColor: Colors.whiteColor,
  },
  textStatus: {
    fontFamily: GILROY_REGULAR,
    fontSize: 10,
    fontWeight: "500",
    color: Colors.dangerRed,
  },
  threeDotsIcon: {
    tintColor: Colors.blackColor,
    height: 16,
    marginLeft: 35,
  },
  modalContent: {
    marginLeft: 10,
    alignSelf: "center",
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
  },
  viewRemove: {
    width: 162,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.aliceBlue,
  },
  remove: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.skyBlueColor,
  },
  banUser: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.blackColor,
  },
  viewBan: {
    width: 162,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.whiteColor,
    marginTop: 15,
  },
  titleText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 33.6,
    color: Colors.blackColor,
  },
  Reason: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 12,
    fontWeight: "700",
    color: Colors.charcoal,
  },
});
