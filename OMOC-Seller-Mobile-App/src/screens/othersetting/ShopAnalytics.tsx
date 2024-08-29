import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { Colors } from "../../utils/colors";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { CONTEXT, strings } from "../../utils/string/strings";
import VectorImage from "react-native-vector-image";
import { arrow_down, arrowleft_icon, info_circle } from "../../utils/images";
import GraphChartComponent from "../../component/GraphChartComponent";

const ShopAnalytics = () => {
  return (
    <MenuProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.mainContainerView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{CONTEXT.SHOP_ANALYTICS}</Text>

            <TouchableOpacity style={styles.viewBox}>
              <Text style={styles.textViewBy}>{CONTEXT.VIEW_BY}</Text>
              <Menu>
                <MenuTrigger>
                  <VectorImage
                    source={arrow_down}
                    style={styles.iconArrowDown}
                  />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.modalContent}>
                  <MenuOption style={styles.viewRemove}>
                    <Text style={styles.remove}>{CONTEXT.LIVE_VIEW}</Text>
                  </MenuOption>
                  <MenuOption style={styles.viewBan}>
                    <Text style={styles.banUser}>{CONTEXT.DAILY}</Text>
                  </MenuOption>
                  <MenuOption style={styles.viewBan}>
                    <Text style={styles.banUser}>{CONTEXT.MONTHLY}</Text>
                  </MenuOption>
                  <MenuOption style={styles.viewBan}>
                    <Text style={styles.banUser}>{CONTEXT.YEAR}</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </TouchableOpacity>
          </View>
          <Text style={styles.manageText}>
            {CONTEXT.MANAGE_YOUR_SHOP_ORDER}
          </Text>
          <View style={styles.mainOrderView}>
            <View style={styles.newOrderView}>
              <Text style={styles.newOrder}>{CONTEXT.NEW_ORDER}</Text>
              <Text style={styles.textTen}>10</Text>
              <TouchableOpacity style={styles.seeDetails}>
                <Text style={styles.TextSee}>{strings.SEE_DETAIL}</Text>
                <VectorImage source={arrowleft_icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.newOrderView}>
              <Text style={styles.newOrder}>{CONTEXT.NEW_ORDER}</Text>
              <Text style={styles.textTen}>10</Text>
              <TouchableOpacity style={styles.seeDetails}>
                <Text style={styles.TextSee}>{strings.SEE_DETAIL}</Text>
                <VectorImage source={arrowleft_icon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewInfo}>
            <Text style={styles.titleText}>{CONTEXT.SHOP_ANALYTICS}</Text>
            <TouchableOpacity>
              <VectorImage source={info_circle} style={styles.iconInfo} />
            </TouchableOpacity>
          </View>
          <GraphChartComponent />
        </View>
      </SafeAreaView>
    </MenuProvider>
  );
};

export default ShopAnalytics;

const styles = StyleSheet.create({
  mainContainerView: {
    marginHorizontal: 15,
    // backgroundColor:'black'
  },
  titleView: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  titleText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 33.6,
    color: Colors.blackColor,
  },

  manageText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.mediumGrey,
  },
  viewBox: {
    width: 114,
    height: 49,
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderColor: Colors.gray91,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textViewBy: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.mediumGrey,
  },
  iconArrowDown: {
    height: 20,
    width: 20,
    tintColor: Colors.gulfBlue,
  },
  modalContent: {
    width: 186,
    height: 204,
    alignSelf: "center",
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 16,
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
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
  newOrderView: {
    backgroundColor: Colors.whiteColor,
    width: "48%",
    height: 105,
    borderRadius: 12,
    padding: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textTen: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "700",
    fontSize: 32,
    color: Colors.neutral100,
  },
  newOrder: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 12,
    color: Colors.neutral100,
  },
  seeDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
  TextSee: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 12,
    color: Colors.skyBlueColor,
  },
  viewInfo: {
    marginTop: 35,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  iconInfo: {
    height: 20,
    width: 20,
  },
  mainOrderView: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
  },
});
