import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { Colors } from "../../utils/colors";
import { CONTEXT, strings } from "../../utils/string/strings";
import VectorImage from "react-native-vector-image";
import { calendar_icon, radioBtnOff, radioBtnOn } from "../../utils/images";
import {
  GILROY_REGULAR,
  GILROY_MEDIUM,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";

const CustomizeVoucher = () => {
  const [buttonPress, setbuttonPress] = useState(false);
  const handlePressFirst = () => {
    setbuttonPress(!buttonPress);
  };

  const handlePressSecond = () => {
    setbuttonPress(!buttonPress);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Customheader
        showBackIcon={true}
        title={CONTEXT.CUSTOMIZE_VOUCHER}
        Containerstyle={styles.header}
      />
      <View style={styles.viewCustomize}>
        <View>
          <Text style={styles.titleManage}>
            {strings.CUSTOMIZE_YOUR_VOUCHER}
          </Text>
        </View>
        <View style={styles.manageView}>
          <Text style={styles.mangeText}>{strings.MANAGE_YOUR_PRODUCT}</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.typeView}>
          <Text style={styles.heading}>{CONTEXT.TYPE_VOUCHER}</Text>
          <View style={[styles.cardView, { marginTop: "5%" }]}>
            <VectorImage source={radioBtnOn} style={styles.imageStyle} />
            <View style={styles.productView}>
              <Text style={styles.titleStyle}>{CONTEXT.PRODUCT_VOUCHER}</Text>
              <Text style={styles.smallText}>
                voucher will be apply for all product you have on your store
              </Text>
            </View>
          </View>
          <View style={styles.cardView}>
            <VectorImage source={radioBtnOff} style={styles.imageStyle} />
            <View style={styles.productView}>
              <Text style={styles.titleStyle}>
                {CONTEXT.NEWSLETTER_VOUCHER}
              </Text>
              <Text style={styles.smallText}>
                voucher will be apply for all product you have on your store
              </Text>
            </View>
          </View>
          <View style={[styles.cardView, { marginBottom: "8%" }]}>
            <VectorImage source={radioBtnOff} style={styles.imageStyle} />
            <View style={styles.productView}>
              <Text style={styles.titleStyle}>
                {CONTEXT.LIVESTREAM_VOUCHER}
              </Text>
              <Text style={styles.smallText}>
                voucher will be apply for all product you have on your store
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.detailView]}>
          <Text style={styles.heading}>2. {CONTEXT.DETAIL_VOUCHER}</Text>

          <View style={styles.nameView}>
            <Text style={styles.email}>{strings.EMAIL_ADDRESS}</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholderTextColor={Colors.grey}
            />
          </View>

          <View style={styles.nameView}>
            <Text style={styles.email}>{CONTEXT.VOUCHER_NAME}</Text>

            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.grey}
            />
          </View>
          <View style={styles.nameView}>
            <Text style={styles.email}>{CONTEXT.VOUCHER_CODE}</Text>

            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.grey}
            />
          </View>
          <View style={styles.viewBox}>
            <View style={styles.viewTextInput}>
              <Text style={styles.start}>{CONTEXT.START}</Text>
              <TextInput style={styles.inputEnd} />
            </View>
            <TouchableOpacity>
              <VectorImage source={calendar_icon} style={styles.calendarIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewBox}>
            <View style={styles.viewTextInput}>
              <Text style={styles.start}>{CONTEXT.END}</Text>
              <TextInput style={styles.inputEnd} />
            </View>

            <TouchableOpacity>
              <VectorImage source={calendar_icon} style={styles.calendarIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingView}>
          <View style={[styles.VoucherView]}>
            <Text style={styles.headingVoucher}>
              3. {strings.VOUCHER_SETTING}
            </Text>
            <View style={[styles.cardFreeShip]}>
              <VectorImage source={radioBtnOn} style={styles.imageStyle} />
              <View style={styles.productView}>
                <Text style={styles.titleStyle}>{strings.FREE_SHIPPING}</Text>
              </View>
            </View>
            <View style={[styles.cardDiscount, { marginBottom: "8%" }]}>
              <VectorImage source={radioBtnOff} style={styles.imageStyle} />
              <View style={styles.productView}>
                <Text style={styles.titleStyle}>{strings.DISCOUNT}</Text>
              </View>
            </View>
          </View>
          <View style={styles.viewFree}>
            <Text style={styles.item}>{strings.AMOUNT_FREE_SHIPPING}</Text>
            <View style={styles.inputPriceView}>
              <Text style={styles.usd}>{strings.USD}</Text>
              <Text style={styles.textSlashInput}>|</Text>
              <TextInput
                style={styles.textInputPrice}
                placeholder={strings.INPUT_PRICE}
              />
            </View>
          </View>
          <View style={styles.viewFree}>
            <Text style={styles.item}>{strings.MINIMUM_ORDER}</Text>
            <View style={styles.inputPriceView}>
              <Text style={styles.usd}>{strings.USD}</Text>
              <Text style={styles.textSlashInput}>|</Text>
              <TextInput
                style={styles.textInputPrice}
                placeholder={strings.INPUT_PRICE}
              />
            </View>
          </View>
          <View style={styles.viewFree}>
            <Text style={styles.item}>{strings.VOUCHER_QUOTA}</Text>
            <View style={styles.inputPriceViewQouta}>
              <TextInput style={styles.textInputPrice} />
            </View>
          </View>

          <View style={[styles.AllBuyerView]}>
            <Text style={styles.item}>{strings.VOUCHER_QUOTA}</Text>
            <View style={[styles.cardFreeShip, {}]}>
              <VectorImage source={radioBtnOn} style={styles.imageStyle} />
              <View style={styles.productView}>
                <Text style={styles.titleStyle}>{strings.ALL_BUYERS}</Text>
              </View>
            </View>
            <View style={[styles.cardDiscount, { marginBottom: "8%" }]}>
              <VectorImage source={radioBtnOff} style={styles.imageStyle} />
              <View style={styles.productView}>
                <Text style={styles.titleStyle}>{strings.FOLLOWERS}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerBTN}>
          <TouchableOpacity
            style={[
              styles.buttonView,
              {
                backgroundColor: buttonPress
                  ? Colors.whiteColor
                  : Colors.skyBlueColor,
              },
            ]}
            onPress={handlePressFirst}
          >
            <Text
              style={[
                styles.textButton,
                {
                  color: buttonPress ? Colors.skyBlueColor : Colors.whiteColor,
                },
              ]}
            >
              {strings.PREVIEW_VOUCHER}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonView,
              {
                backgroundColor: buttonPress
                  ? Colors.skyBlueColor
                  : Colors.whiteColor,
              },
            ]}
            onPress={handlePressSecond}
          >
            <Text
              style={[
                styles.textButton,
                {
                  color: buttonPress ? Colors.whiteColor : Colors.skyBlueColor,
                },
              ]}
            >
              {strings.CREATE_VOUCHER}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CustomizeVoucher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  inputEnd: {
    marginTop: 10,
  },
  viewCustomize: {
    marginHorizontal: 15,
  },
  settingView: {
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
  },
  header: {
    marginTop: 15,
    paddingBottom: 5,
  },
  viewFree: {
    marginHorizontal: 15,
  },
  typeView: {
    marginTop: "8%",
    marginHorizontal: 20,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    paddingTop: 20,
  },
  viewTextInput: {
    width: "85%",
  },
  calendarIcon: {
    marginRight: 10,
    marginTop: 15,
    tintColor: Colors.codgray,
  },
  inputPriceViewQouta: {
    width: "100%",
    height: 51,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.brightBlue,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  start: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.grey,
  },
  date: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.neutralBlack,
  },
  cardFreeShip: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: 56,
    borderColor: Colors.lightGrey50,
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    marginVertical: 7,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.aliceBlue,
  },
  email: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.grey,
  },
  heading: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    marginLeft: 15,
  },
  headingVoucher: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    marginLeft: 7,
  },
  viewBox: {
    width: "95%",
    height: 66,
    borderColor: Colors.gray88,
    borderWidth: 1,
    borderRadius: 14,
    padding: 8,
    marginVertical: 7,
    alignSelf: "center",
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  manageView: {
    marginTop: 15,
    width: "75%",
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
  input: {
    marginTop: 10,
    width: "100%",
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    borderColor: Colors.mediumGrey,
    borderRadius: 9,
    padding: 8,
    marginVertical: 7,
    alignItems: "center",
    alignSelf: "center",
    marginRight: 25,
  },
  imageStyle: {
    height: 25,
    width: 30,
    resizeMode: "contain",
  },
  titleStyle: {
    fontSize: 14.8,
    fontWeight: "500",
    color: Colors.blackColor,
  },
  smallText: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: GILROY_REGULAR,
    color: Colors.grey,
  },
  productView: {
    width: "80%",
    marginLeft: 10,
  },
  cardDiscount: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: 56,
    borderColor: Colors.lightGrey50,
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    marginVertical: 7,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.whiteColor,
  },
  nameView: {
    width: "95%",
    height: 66,
    borderColor: Colors.gray88,
    borderWidth: 1,
    borderRadius: 14,
    padding: 8,
    marginVertical: 7,
    alignSelf: "center",
    backgroundColor: Colors.whiteColor,
  },
  detailView: {
    marginHorizontal: 15,
    paddingTop: 20,
    marginTop: 15,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
  },
  AllBuyerView: {
    marginHorizontal: 15,
    paddingTop: 10,
    marginTop: 10,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
  },
  VoucherView: {
    marginHorizontal: 15,
    paddingTop: 10,
    marginTop: 15,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
  },
  periodView: {},
  mediumStyle: {
    fontSize: 13.5,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  StartTextView: {
    flexDirection: "row",
    marginTop: -7,
  },
  containerBTN: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  textButton: {
    fontSize: 14.5,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
  },
  buttonView: {
    width: "49%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
  },
  item: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.neutralBlack,
    marginLeft: 5,
    marginTop: 10,
  },
  inputPriceView: {
    width: "100%",
    height: 51,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray88,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  usd: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "600",
    fontSize: 16,
    color: Colors.neutral80,
    marginTop: 17,
    marginLeft: 10,
  },
  textSlashInput: {
    marginTop: 15,
    marginLeft: 5,
    color: Colors.grey,
  },
  inputPriceUSD: {
    width: "66%",
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    color: Colors.grey,
    marginLeft: 10,
  },
  textInputPrice: {
    width: "80%",
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    color: Colors.neutralBlack,
    marginLeft: 10,
  },
});
