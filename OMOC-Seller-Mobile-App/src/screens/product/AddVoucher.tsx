import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { Colors } from "../../utils/colors";
import { CONTEXT } from "../../utils/string/strings";
import VectorImage from "react-native-vector-image";
import { radioBtnOff, radioBtnOn } from "../../utils/images";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { showMessage } from "react-native-flash-message";
import en from "../../utils/string/en";
import ApiService from "../../services/api.service";
import { useSelector } from "react-redux";
import Spinner from "../../component/Spinner";

const voucherTypeList = [
  {
    id: 1,
    name: "Product Voucher",
    desc: "voucher will be apply for all product you have on your store",
  },
  {
    id: 2,
    name: "Newsletter Voucher",
    desc: "voucher will be apply for all product you have on your store",
  },
  {
    id: 3,
    name: "Livestream Voucher",
    desc: "voucher will be apply for all product you have on your store",
  },
];

const AddVoucher = ({ navigation }) => {
  const [voucherType, setVoucherType] = useState(voucherTypeList[2]);
  const [voucherName, setVoucherName] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [loading, setLoading] = useState(false);
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);

  const handlePreviewPress = () => {};

  const handleCreatePress = async () => {
    let isFormValid = false;
    if (!voucherName.trim().length) {
      showMessage({
        message: en.voucherNameError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
      isFormValid = false;
    } else if (!voucherCode.trim().length) {
      showMessage({
        message: en.voucherCodeError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
      isFormValid = false;
    } else {
      isFormValid = true;
    }
    if (isFormValid) {
      setLoading(true);
      try {
        const shopId = currentShop?._id;
        const params = {
          type: voucherType.name,
          name: voucherName,
          code: voucherCode,
          startDate: "2024-02-14",
          endDate: "2024-03-14",
          forAllBuyers: true,
          forFollowers: "false",
          shippingAmount: 5000,
          quota: 12,
          eventName: "Live",
          eventDate: "2024-02-14",
          applicableOn: "Free Shipping",
        };
        const response = await ApiService.addVoucherApi(shopId, params);
        setLoading(false);
        if (!!response?.status) {
          showMessage({
            message: "New Voucher added to the shope",
            duration: 3000,
            backgroundColor: Colors.skyBlueColor,
            type: "danger",
          });
          navigation.goBack();
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardView}
        onPress={() => {
          setVoucherType(item);
        }}
      >
        <VectorImage
          source={voucherType.id === item.id ? radioBtnOn : radioBtnOff}
          style={styles.imageStyle}
        />
        <View style={styles.productView}>
          <Text style={styles.titleStyle}>{item.name}</Text>
          <Text style={styles.smallText}>{item.desc} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Customheader
        showBackIcon={true}
        title={CONTEXT.ADD_VAUCHERS}
        Containerstyle={{ marginTop: 10, paddingBottom: 5 }}
      />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.typeView}>
          <Text style={styles.heading}>{CONTEXT.TYPE_VOUCHER}</Text>
          <FlatList data={voucherTypeList} renderItem={renderItem} />
        </View>
        <View style={styles.detailView}>
          <Text style={styles.heading}>2. {CONTEXT.DETAIL_VOUCHER}</Text>
          <Text style={[styles.titleStyle, { marginTop: 16 }]}>
            {CONTEXT.PRODUCT_NAME}
          </Text>
          <View style={styles.nameView}>
            <TextInput
              onChangeText={(text) => setVoucherName(text)}
              placeholder="Name"
              keyboardType="default"
              placeholderTextColor={Colors.grey}
              style={styles.inputText}
            />
          </View>
          <Text style={[styles.titleStyle, { marginTop: 8 }]}>
            {CONTEXT.VOUCHER_CODE}
          </Text>
          <View style={styles.nameView}>
            <TextInput
              onChangeText={(text) => setVoucherCode(text)}
              placeholder="Enter code"
              keyboardType="default"
              placeholderTextColor={Colors.grey}
              style={styles.inputText}
            />
          </View>
          <Text style={[styles.titleStyle, { marginTop: 8 }]}>
            {CONTEXT.VOUCHERS_PERIOD}
          </Text>
          <View style={styles.periodView}>
            <TouchableOpacity style={styles.periodTexInputView}>
              <Text style={styles.mediumStyle}>24/02/2023 03.00 AM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.periodTexInputView}>
              <Text style={styles.mediumStyle}>24/02/2023 03.00 AM</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.StartTextView}>
            <Text style={[styles.mediumStyle]}>{CONTEXT.START}</Text>
            <Text
              style={[styles.mediumStyle, { width: "50%", textAlign: "right" }]}
            >
              {CONTEXT.END}
            </Text>
          </View>
        </View>
        <View style={styles.containerBTN}>
          <TouchableOpacity
            style={[
              styles.buttonView,
              {
                backgroundColor: Colors.whiteColor,
              },
            ]}
            onPress={handlePreviewPress}
          >
            <Text
              style={[
                styles.textButton,
                {
                  color: Colors.skyBlueColor,
                },
              ]}
            >
              {CONTEXT.PREVIEW}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonView,
              {
                backgroundColor: Colors.skyBlueColor,
              },
            ]}
            onPress={handleCreatePress}
          >
            <Text
              style={[
                styles.textButton,
                {
                  color: Colors.whiteColor,
                },
              ]}
            >
              {CONTEXT.CREATE}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && <Spinner animating={loading} />}
    </SafeAreaView>
  );
};
export default AddVoucher;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  typeView: {
    width: "93%",
    alignSelf: "center",

    marginVertical: 20,
  },
  heading: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
  },
  cardView: {
    flexDirection: "row",
    padding: 12,
    width: "98%",
    borderColor: Colors.lightGrey50,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
  },
  imageStyle: {
    height: 25,
    width: 30,
    resizeMode: "contain",
  },
  titleStyle: {
    fontSize: 14,
    color: Colors.blackColor,
    fontFamily: GILROY_SEMIBOLD,
    lineHeight: 16,
  },
  smallText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: "#7A7A7A",
  },
  productView: {
    width: "80%",
    marginLeft: 10,
    gap: 4,
  },
  nameView: {
    width: "98%",
    borderColor: Colors.neutralGrey,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  detailView: {
    width: "93%",
    marginTop: 20,
    alignSelf: "center",
  },
  periodView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "98%",
    alignItems: "center",
  },
  mediumStyle: {
    fontSize: 13.5,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  StartTextView: { flexDirection: "row", marginTop: -7, marginBottom: 20 },
  containerBTN: {
    flexDirection: "row",
    width: "93%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  textButton: {
    fontSize: 14.5,
    fontFamily: GILROY_MEDIUM,
  },
  buttonView: {
    width: "49%",
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
  },
  periodTexInputView: {
    width: "48%",
    borderColor: Colors.neutralGrey,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  inputText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    paddingVertical: 4,
  },
});
