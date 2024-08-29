import { StyleSheet, Text, View, Dimensions, Modal } from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import {
  dangerRed,
  darkBlue,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../utils/colors";
import { three_dot_Icon, union_icon } from "../utils/images";
import { strings } from "../assets/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import AddPaymenBottomSheet from "../screen/paymentScreen/AddPaymenBottomSheet";
const screenHeight = Dimensions.get("window").height;
const percentageHeight = 14;
const smallContainerHeight = Dimensions.get("window").height;
const smallContainerpercentageHeight = 10;

const PaymentCard = ({ data, brandFontSize, onDelete }) => {
  const [showPayment, setShowPayment] = useState(false);
  const getExpDuration = () => {

    const expireMonth = data?.expireMonth || data?.expiryMonth || "MM";
    const expireYear = data?.expireYear || data?.expiryYear || "YY";
    const formattedMonth =
      expireMonth && expireMonth < 10 ? `0${expireMonth}` : expireMonth;
    const formattedYear = expireYear && expireYear?.toString()?.slice(-2);
    const formattedExpirationDate = `${formattedMonth}/${formattedYear}`;
    return formattedExpirationDate;
  };

  const onAddNewCard = async () => {
    try {
      // const { error: tokenError, token } = await createToken({
      //   type: "Card",
      //   name: "shivam pandey",
      //   currency: "usd",
      // });
      // if (token) {
      //   const res = await ApiService.addPaymentCardApi({
      //     token,
      //     isDefault: val?.isDefault,
      //   });
      //   const obj = res?.data?.card;
      //   setCardsList((prev) => {
      //     return [obj, ...prev];
      //   });
      // } else {
      // }
    } catch (error) {
      console.log("add new card error", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.iconContainer}>
          <Menu>
            <MenuTrigger style={styles.triggerIcon}>
              <VectorImage
                style={styles.topRightIcon}
                source={three_dot_Icon}
              />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption style={styles.addressBtn} onSelect={() => {}}>
                <Text style={styles.defaultAddressText}>Set as default</Text>
              </MenuOption>
              <MenuOption
                style={styles.editAddressBtn}
                onSelect={() => setShowPayment(true)}
              >
                <Text style={styles.editAddressText}>Edit Card</Text>
              </MenuOption>
              <MenuOption style={styles.deleteBtn} onSelect={() => onDelete()}>
                <Text style={styles.deleteText}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <View style={styles.badgeContainer}>
          <VectorImage source={union_icon} />
          <View style={styles.badgeView}>
            <Text style={styles.badgeText}>{strings.DEFAULT_CARD}</Text>
          </View>
        </View>
        <View style={styles.cardNumber}>
          <Text style={styles.numberText}>
            **** **** **** {data?.last4Digit || data?.last4}
          </Text>
        </View>
      </View>
      <View style={styles.smallContainer}>
        <View style={{ gap: 4 }}>
          <Text style={styles.cardName}>{data?.holderName}</Text>
          <Text style={styles.expDate}>
            {strings.EXP} {getExpDuration()}
          </Text>
        </View>
        <View>
          <Text style={[styles.brandText, { fontSize: brandFontSize }]}>
            {data?.brand}
          </Text>
        </View>
      </View>
      {showPayment && (
        <Modal transparent>
          <AddPaymenBottomSheet
            hideMe={() => {
              setShowPayment(false);
            }}
            onSubmit={onAddNewCard}
            isEdit={true}
            data={data}
          />
        </Modal>
      )}
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  mainContainer: {
    width: "92.5%",
    backgroundColor: skyBlueColor,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  smallContainer: {
    height: (smallContainerHeight * smallContainerpercentageHeight) / 100,
    width: "92.5%",
    backgroundColor: darkBlue,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  topRightIcon: {
    width: 6,
    height: 16,
    tintColor: whiteColor,
  },
  iconContainer: {
    alignItems: "flex-end",
  },
  badgeView: {
    backgroundColor: whiteColor,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    borderRadius: 24,
  },
  badgeText: {
    fontSize: 10,
    color: skyBlueColor,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 20,
  },
  cardNumber: {
    height: 50,
    justifyContent: "center",
    marginTop: 8,
    marginLeft: 20,
  },
  numberText: {
    color: whiteColor,
    fontSize: 19,
    fontFamily: GILROY_MEDIUM,
  },
  cardName: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_MEDIUM,
    color: whiteColor,
  },
  expDate: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_MEDIUM,
    color: whiteColor,
  },
  brandText: {
    fontWeight: "bold",
    color: whiteColor,
  },
  addressBtn: {
    marginVertical: 8,
  },
  defaultAddressText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    lineHeight: 17,
    color: neutralBlack,
  },
  editAddressBtn: {
    marginVertical: 8,
  },
  editAddressText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    lineHeight: 17,
    color: neutralBlack,
  },
  deleteBtn: {
    width: "50%",
  },
  deleteText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    lineHeight: 17,
    color: dangerRed,
  },
  triggerIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "transparent",
    marginTop: 30,
  },
  optionsWrapper: {
    borderRadius: 10,
    backgroundColor: whiteColor,
    paddingLeft: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.4,
    elevation: 3,
    gap: 4,
    paddingVertical: 15,
    width: "80%",
    alignSelf: "flex-end",
  },
};
