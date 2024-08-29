import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { GILROY_MEDIUM } from "../../utils/fonts";
import { discount_icon } from "../../utils/images";
import VectorImage from "react-native-vector-image";
import {
  blackColor,
  grey,
  lightGrey,
  midGray,
  skyBlueColor,
} from "../../utils/colors";

const data = [
  {
    id: "1",
    cashbackText: "Cashback $10",
    voucherText: "1 Voucher",
    iconSource: discount_icon,
    description:
      "Lorem ipsum dolor sit amet consectetur, Sapien ac sollicitudin egestas.\n End in 9 hours!",
  },
  {
    id: "2",
    cashbackText: "Cashback $10",
    voucherText: "1 Voucher",
    iconSource: discount_icon,
    description: "End in 9 hours!",
  },
  {
    id: "3",
    cashbackText: "Cashback $10",
    voucherText: "1 Voucher",
    iconSource: discount_icon,
    description:
      "Lorem ipsum dolor sit amet consectetur, Sapien ac sollicitudin egestas.\n End in 9 hours!",
  },
  {
    id: "4",
    cashbackText: "Cashback $10",
    voucherText: "1 Voucher",
    iconSource: discount_icon,
    description: "End in 9 hours!",
  },
];

const VoucherItem = ({ item }) => (
  <SafeAreaView>
    <View style={styles.mainView}>
      <View style={styles.icontwo}>
        <VectorImage style={styles.icon} source={item.iconSource} />
      </View>
      <View>
        <View style={styles.viewcash}>
          <Text style={styles.cashtext}>{item.cashbackText}</Text>
          <View style={styles.touchableVoucher}>
            <TouchableOpacity>
              <Text style={styles.vouchertext}>{item.voucherText}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dectext}>
          <Text style={styles.text}>{item.description}</Text>
        </View>
      </View>
    </View>

    <View style={styles.viewLine}></View>
  </SafeAreaView>
);

const VoucherScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ marginHorizontal: 15 }}>
      <View style={styles.maincontainer}>
        <View style={styles.vouchercontainer}>
          <CustomHeaderShown
            title="Voucher"
            navigation={navigation}
            rightheadertext={"Enter Code"}
            onRightHeaderPress={() => {}}
          />
        </View>
        <Text style={styles.protext}>Promotions available be used</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <VoucherItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default VoucherScreen;

const styles = StyleSheet.create({
  maincontainer: {},
  mainView: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },

  protext: {
    marginTop: 30,
    fontFamily: GILROY_MEDIUM,
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 28,
    color: blackColor,
  },
  dectext: {
    marginBottom: 30,
    width: "90%",
  },
  cashtext: {
    marginTop: 20,
    fontSize: 20,
  },
  text: {
    marginTop: 10,
    lineHeight: 21,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    color: grey,
  },
  vouchertext: {
    color: skyBlueColor,
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 11.77,
    fontFamily: GILROY_MEDIUM,
    alignSelf: "center",
    marginTop: 5,
    marginRight: 8,
  },
  viewcash: {
    flexDirection: "row",
    alignItems: "center",
  },
  touchableVoucher: {
    alignSelf: "center",
    paddingLeft: 15,
    marginTop: 17,
    marginLeft: 17,
    backgroundColor: "#E8F5FF",
    height: 20,
    width: 70,
    borderRadius: 24,
  },
  viewIcon: {
    paddingLeft: 20,
  },
  icon: {
    width: 12,
    height: 12,
    backgroundColor: "#F1F1F1",
  },
  icontwo: {
    justifyContent: "center",
    width: 24,
    height: 24,
    backgroundColor: lightGrey,
    borderRadius: 12,
    alignItems: "center",
  },
  viewLine: {
    borderBottomColor: midGray,
    borderBottomWidth: 1,
    width: "90%",
    alignSelf: "center",
  },
});
