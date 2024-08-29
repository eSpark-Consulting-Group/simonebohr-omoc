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
import { Colors } from "../../utils/colors";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import { plus } from "../../utils/images";
import SearchTabBar from "../../component/SearchTabBar";
import { Height, Width } from "../../utils";
import VoucherComponent from "../../component/VoucherComponent";
import CustomizeVoucher from "./CutomizeVoucher";

const Voucher = ({ navigation }) => {
  const [selectedStatus, setSelectedStatus] = useState("All Voucher");

  const [newsLatterShow, setNewsLatterShow] = useState(false);
  const handleSelector = (name) => {
    setSelectedStatus(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.mainViewContainer}>
        <Customheader showBackIcon={true} title={strings.INVENTORY} />
      </View>
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.titleManage}>{strings.MANAGE_YOUR_VOUCHER}</Text>
        </View>
        <View style={styles.manageView}>
          <Text style={styles.mangeText}>{strings.MANAGE_YOUR_PRODUCT}</Text>
        </View>
        <View style={styles.containerBTN}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => navigation.navigate("CutomizeVoucher")}
          >
            <VectorImage source={plus} style={styles.plusIcon} />

            <Text style={styles.textButtonPreview}>{strings.ADD_VOUCHER}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ flexGrow: 0 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.allVoucherView}>
            <TouchableOpacity
              style={[
                selectedStatus == "All Voucher"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => handleSelector("All Voucher")}
            >
              <Text
                style={[
                  selectedStatus == "All Voucher"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.ALL_VOUCHER}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedStatus == "Product Voucher"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => handleSelector("Product Voucher")}
            >
              <Text
                style={[
                  selectedStatus == "Product Voucher"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.PRODUCT_VOUCHER}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedStatus == "Newslatter"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => {
                handleSelector("Newslatter"), setNewsLatterShow(true);
              }}
            >
              <Text
                style={[
                  selectedStatus == "Newslatter"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.NEWSLETTER_VOUCHER}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedStatus == "Livestreamvoucher"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => handleSelector("Livestreamvoucher")}
            >
              <Text
                style={[
                  selectedStatus == "Livestreamvoucher"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.LIVESTREAM_VOUCHER}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedStatus == "Expired"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => handleSelector("Expired")}
            >
              <Text
                style={[
                  selectedStatus == "Expired"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.EXPIRED}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <SearchTabBar placeholder={strings.SEARCH} style={styles.searchBar} />

        <VoucherComponent allVoucher={true} />
      </View>
    </SafeAreaView>
    
  );
};

export default Voucher;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  mainViewContainer: {
    width: "100%",
  },
  mainContainer: {
    marginHorizontal: 15,
  },
  allVoucherView: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },

  titleManage: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    color: Colors.blackColor,
    marginTop: 30,
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
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  textButton: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  textButtonPreview: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  buttonView: {
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
  plusIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 5,
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
    backgroundColor: "#fafafa",
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
