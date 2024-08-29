import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Width } from "../../utils";
import { Colors } from "../../utils/colors";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import VectorImage from "react-native-vector-image";
import {
  arrow_down,
  calendar_icon,
  setting_whiteicon,
} from "../../utils/images";
import ShopOrderComponent from "../../component/ShopOrderComponent";
import ShopOrderBottomSheet from "../../component/ShopOrderBottomSheet";

const ShopOrder = () => {
  const [selectedStatus, setSelectedStatus] = useState("All Voucher");

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };
  const [newsLatterShow, setNewsLatterShow] = useState(false);
  const handleSelector = (name) => {
    setSelectedStatus(name);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.mainViewContainer}>
        <Customheader showBackIcon={true} title={CONTEXT.ORDER} />
      </View>
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.titleManage}>{CONTEXT.SHOP_ORDER}</Text>
        </View>
        <View style={styles.manageView}>
          <Text style={styles.mangeText}>{strings.MANAGE}</Text>
        </View>

        <View style={styles.containerBTN}>
          <View style={styles.settingbtnView}>
            <TouchableOpacity style={styles.buttonView}>
              <VectorImage source={setting_whiteicon} style={styles.plusIcon} />

              <Text style={styles.textButtonPreview}>{CONTEXT.SETTING}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateViewBox}>
            <TouchableOpacity>
              <VectorImage source={calendar_icon} style={styles.calendarIcon} />
            </TouchableOpacity>
            <Text style={styles.textDate}>20/02/2023 - 20/03/2023</Text>
          </View>
        </View>
        <ScrollView
          style={{ flexGrow: 0 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.allVoucherView}>
            <TouchableOpacity
              style={[
                selectedStatus == "New Orders"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => handleSelector("New Orders")}
            >
              <Text
                style={[
                  selectedStatus == "New Orders"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.NEW_ORDER}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedStatus == "Ready to delivery"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => handleSelector("Ready to delivery")}
            >
              <Text
                style={[
                  selectedStatus == "Ready to delivery"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.READY_DELIVERY}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedStatus == "Delivered"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => {
                handleSelector("Delivered"), setNewsLatterShow(true);
              }}
            >
              <Text
                style={[
                  selectedStatus == "Delivered"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.DELIVERED}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedStatus == "Completed Order"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => handleSelector("Completed Order")}
            >
              <Text
                style={[
                  selectedStatus == "Completed Order"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.COMPLETED_ORDER}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.viewMainBtnContainer}>
          <View style={styles.containerBTN}>
            <TouchableOpacity
              style={styles.buttonViewResend}
              onPress={handleBottomSheet}
            >
              <Text style={styles.textButtonResend}>
                {CONTEXT.RESEND_INVOICE}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerBTNallType}>
            <TouchableOpacity style={styles.buttonViewAllType}>
              <Text style={styles.textButtonAllType}>{CONTEXT.ALL_TYPES}</Text>
              <VectorImage source={arrow_down} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ShopOrderComponent />
      {showBottomSheet && (
        <ShopOrderBottomSheet
          hideMe={() => {
            setShowBottomSheet(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default ShopOrder;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  settingbtnView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainViewContainer: {
    width: "100%",
  },
  textDate: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.neutralBlack,
  },
  mainContainer: {
    marginHorizontal: 15,
  },
  allVoucherView: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  viewMainBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateViewBox: {
    width: "68%",
    height: 49,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.whiteColor,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  titleManage: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    color: Colors.blackColor,
    marginTop: 30,
  },
  calendarIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  mangeText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    color: Colors.dimGray,
  },
  manageView: {
    marginTop: 15,
    width: "75%",
  },
  containerBTN: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  icon: {
    height: 20,
    width: 20,
    left: 5,
    resizeMode: "contain",
  },
  containerBTNallType: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },

  textButton: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: Colors.whiteColor,
  },
  textButtonPreview: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: Colors.skyBlueColor,
  },
  textButtonResend: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: Colors.whiteColor,
  },
  textButtonAllType: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: Colors.mediumGrey,
  },
  buttonView: {
    width: 110,
    height: 49,
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonViewResend: {
    width: 147,
    height: 49,
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonViewAllType: {
    width: 130,
    height: 49,
    borderColor: Colors.gray91,
    borderWidth: 1,
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: Colors.grey98,
    flexDirection: "row",
    justifyContent: "center",
  },
  plusIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 5,
    tintColor: Colors.skyBlueColor,
  },
  searchBar: {
    width: "100%",
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.neutralGrey,
  },
  tab: {
    borderWidth: 0.5,
    borderColor: Colors.skyBlueColor,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.grey98,
  },
  selectTab: {
    marginVertical: Width * (2 / 100),
    paddingVertical: Width * (2 / 100),
    borderBottomColor: Colors.skyBlueColor,
    borderBottomWidth: Width * (0.5 / 100),
  },
  unSelectTab: {
    marginVertical: Width * (2 / 100),
    paddingVertical: Width * (2 / 100),
  },
  tabSelectTexT: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.skyBlueColor,
    fontSize: Width * (3.6 / 100),
  },
  tabUnSelectTexT: {
    fontFamily: GILROY_REGULAR,
    color: Colors.mediumGrey,
    fontSize: Width * (3.6 / 100),
  },
});
