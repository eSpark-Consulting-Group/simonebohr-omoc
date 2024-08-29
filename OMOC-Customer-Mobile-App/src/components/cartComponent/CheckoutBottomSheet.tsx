import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { GILROY_MEDIUM, GILROY_SEMIBOLD } from "../../utils/fonts";
import {
  blackColor,
  dangerRed,
  grey,
  lightGrey,
  midGray,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import CustomButton from "../../components/CustomButton";
import VectorImage from "react-native-vector-image";
import { arrow_down, arrow_up, next_icon } from "../../utils/images";
import { palceholders, strings } from "../../assets/string/strings";
import { useSelector } from "react-redux";
import FastImage from "react-native-fast-image";

const CheckoutBottomSheet = ({
  hideMe,
  onConfirmPayment,
  onPressPayment,
  onPressVoucher,
  onPressDelivery,
  cartData,
}) => {
  const [showHideView, setShowHideView] = useState(false);
  const selectedAddress = useSelector((state) => state.AddressSlice);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => [10, showHideView ? "85%" : "65%"],
    [showHideView]
  );
  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      hideMe();
    }
  }, []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={2}
        opacity={1}
      />
    ),
    []
  );
  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>{strings.CHECKOUT}</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={onPressPayment}
        >
          <Text style={styles.leftText}>{strings.PAYMENT}</Text>
          <View style={styles.rigthBtn}>
            <Text style={styles.rightText}>{strings.SELECT_METHOD}</Text>
            <VectorImage style={styles.icon} source={next_icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={onPressDelivery}
        >
          <Text style={styles.leftText}>{palceholders.ADDERSS}</Text>
          <View style={styles.rigthBtn}>
            <Text
              style={
                !selectedAddress ? styles.rightText : styles.boldText
              }
            >
              {!selectedAddress
                ? strings.SELECT_METHOD
                : selectedAddress.address}
            </Text>

            <VectorImage style={styles.icon} source={next_icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={onPressVoucher}
        >
          <Text style={styles.leftText}>{strings.VOUCHER}</Text>
          <View style={styles.rigthBtn}>
            <Text style={styles.rightText}>{strings.SELECT_METHOD}</Text>
            <VectorImage style={styles.icon} source={next_icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.totalContainer}>
          <Text style={styles.leftText}>{strings.TOTAL}</Text>
          <TouchableOpacity
            onPress={() => {
              setShowHideView(!showHideView);
            }}
            style={styles.rigthBtn}
          >
            <Text style={styles.totalText}>
              {"\u0024"}
              {cartData.totalPrice}{cartData.price}
            </Text>
            {showHideView ? (
              <FastImage style={styles.iconArrow} source={arrow_up} />
            ) : (
              <FastImage style={styles.iconArrow} source={arrow_down} />
            )}
          </TouchableOpacity>
        </TouchableOpacity>
        {showHideView && (
          <View style={styles.totalViewPrice}>
            <View style={styles.flexView}>
              <Text style={styles.rightText}>
                {palceholders.PRICE} (1 item)
              </Text>
              <Text style={styles.boldText}>${cartData.originalPrice||0}</Text>
            </View>
            <View style={styles.flexView}>
              <Text style={styles.rightText}>{palceholders.DISCOUNT}</Text>
              <Text style={styles.boldText}>${cartData.discountPrice||0}</Text>
            </View>
            <View style={styles.flexView}>
              <Text style={styles.rightText}>{palceholders.TAX_DELIVERY}</Text>
              <Text style={styles.boldText}>$0</Text>
            </View>
            <View style={styles.flexView}>
              <Text style={styles.rightText}>{strings.TOTAL}</Text>
              <Text style={styles.boldText}>
                {"\u0024"}
                {cartData.totalPrice||cartData.price}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>
            {strings.BY_PLACING_AN_ORDER_YOU_AGREE_TO_OUR}
            <Text style={styles.boldText}>{strings.TERMS}</Text>
            {strings.AND}
            <Text style={styles.boldText}>{strings.CONDITION}</Text>
          </Text>
        </View>
      </View>
      <CustomButton
        textstyle={styles.textStyle}
        text={strings.CONFIRM_PAYMENT}
        style={styles.btn}
        onPress={onConfirmPayment}
      />
    </BottomSheet>
  );
};

export default CheckoutBottomSheet;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: GILROY_SEMIBOLD,
  },
  container: {
    marginHorizontal: 15,
  },
  inputBox: {
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 35,
    borderBottomWidth: 1,
    borderBlockColor: midGray,
    paddingBottom: 25,
  },
  btn: {
    backgroundColor: skyBlueColor,
    position: "absolute",
    bottom: 30,
  },
  textStyle: {
    color: whiteColor,
  },
  rigthBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  leftText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    color: neutralBlack,
  },
  rightText: {
    fontSize: 13.5,
    fontWeight: "400",
    color: grey,
  },
  icon: {
    width: 4,
    height: 8,
  },
  iconArrow: {
    width: 10,
    height: 15,
    resizeMode: "contain",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  totalText: {
    fontSize: 24,
    fontWeight: "500",
    color: skyBlueColor,
  },
  bottomText: {
    color: grey,
    lineHeight: 25,
  },
  boldText: {
    fontSize: 14,
    fontWeight: "600",
    color: blackColor,
  },
  bottomContainer: {
    width: "70%",
    marginTop: 15,
  },
  totalViewPrice: {
    width: 356,
    backgroundColor: lightGrey,
    borderRadius: 5,
    padding: 6,
    marginTop: 10,
  },
  flexView: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBlockColor: midGray,
    paddingVertical: 10,
  },
});
