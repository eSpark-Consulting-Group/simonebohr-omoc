import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import { blank_round_circle, blue_round_circle, plus } from "../utils/images";
import { CONTEXT, strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";

const InvoiceTitleComponent = () => {
  const [buttonPress, setbuttonPress] = useState(false);
  const handlePressFirst = () => {
    setbuttonPress(!buttonPress);
  };

  const handlePressSecond = () => {
    setbuttonPress(!buttonPress);
  };
  return (
    <SafeAreaView>
      <View style={styles.rateView}>
        <Text style={styles.rate}>{strings.RATE}</Text>
        <Text style={styles.doller}>$0.00</Text>
      </View>
 

      <View style={styles.containerBTNLineItem}>
        <TouchableOpacity
          style={[styles.buttonViewLineItem]}
         >
          <VectorImage source={plus} style={styles.plusIcon} />

          <Text style={[styles.textButtonLineItem]}>{strings.LINE_ITEM}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.textNotes}>{strings.NOTES_TERMS}</Text>

      <View style={styles.inputLegalPolicy}>
        <TextInput placeholder={strings.NOTES} multiline={true} />
      </View>
      <Text style={styles.textAnyRelevant}>{strings.ANY_RELEVANT}</Text>

      <View style={styles.inputLegalPolicy}>
        <TextInput placeholder={strings.TERMS_CONDITIONS} multiline={true} />
      </View>
      <Text style={styles.textAnyRelevant}>{strings.LATE_FEES}</Text>

      <Text style={styles.textNotes}>{strings.PAYMENT_SUMMARY}</Text>
      <View style={styles.viewSubTotal}>
        <Text style={styles.textSubTotal}>{strings.SUB_TOTAL}</Text>
        <Text style={styles.textTwenty}>$20.00</Text>
      </View>
      <View style={styles.viewTax}>
        <Text style={styles.textTax}>+ {strings.TAX}</Text>
        <Text style={styles.textTax}>+ {CONTEXT.DISCOUNT}</Text>
        <Text style={styles.textTax}>+ {strings.SHIPPING}</Text>
      </View>

      <View style={styles.viewSubTotal}>
        <Text style={styles.textSubTotal}>{strings.TOTAL}</Text>
        <Text style={styles.textTwenty}>$20.00</Text>
      </View>
      <View style={styles.viewAmount}>
        <Text style={styles.textAmountPaid}>{strings.AMOUNT_PAID}</Text>
        <View style={styles.inputUSDPriceView}>
          <Text style={styles.usd}>{strings.USD}</Text>
          <Text style={styles.textSlashInput}>|</Text>

          <TextInput
            style={styles.inputPriceUSD}
            placeholder={strings.INPUT_PRICE}
          />
        </View>
      </View>

      <View style={styles.viewSubTotal}>
        <Text style={styles.textSubTotal}>{strings.BALANCE_DUE}</Text>
        <Text style={styles.textTwenty}>$20.00</Text>
      </View>

      <Text style={styles.textdelivery}>{strings.DELIVERY_METHOD}</Text>
      <View style={styles.viewEmail}>
        <VectorImage source={blue_round_circle} />
        <Text style={styles.emailToCustumer}>{strings.EMAIL_TO_CUSTUMER}</Text>
      </View>
      <Text style={styles.sendInvoice}>{strings.SEND_YOUR_INVOICE}</Text>

      <Text style={styles.textCostumer}>{strings.COSTUMER_EMAIL}</Text>
      <View style={styles.writeViewBox}>
        <TextInput placeholder={strings.USER_EMAIL} style={styles.inputUser} />
      </View>

      <View style={styles.viewInvoiceDelivery}>
        <Text style={styles.textInvoiceDelivery}>
          {strings.INVOICE_DELIVERY}
        </Text>
        <View style={styles.viewIconText}>
          <VectorImage source={blue_round_circle} />
          <Text style={styles.textPdf}>{strings.INVOICE_PDF}</Text>
        </View>
        <View style={styles.viewIconText}>
          <VectorImage source={blank_round_circle} />
          <Text style={styles.textPdf}>{strings.INVOICE_AS_LINK}</Text>
        </View>
      </View>

      <View style={styles.viewDownloadPdf}>
        <VectorImage source={blank_round_circle} />
        <Text style={styles.emailToCustumer}>{strings.DOWNLOAD_PDF}</Text>
      </View>
      <Text style={styles.sendInvoice}>{strings.DOWNLOAD_THE_INVOICE}</Text>

      <View style={styles.containerBTN}>
        <TouchableOpacity style={styles.buttonView}>
          <Text style={styles.textButtonPreview}>
            {strings.PREVIEW_VOUCHER}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonViewCreate}>
          <Text style={styles.textButton}>{strings.CREATE_VOUCHER}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceTitleComponent;

const styles = StyleSheet.create({
  rateView: {
    marginLeft: 16,
    marginTop: 10,
  },
  rate: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.neutralBlack,
  },
  doller: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "600",
    fontSize: 16,
    color: Colors.neutral80,
    marginTop: 10,
  },
  btn: {
    width: "25%",
    height: 49,
    backgroundColor: Colors.skyBlueColor,
    marginLeft: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.neutralGrey,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  textLineItem: {
    color: Colors.whiteColor,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
  },
  plusIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  inputLegalPolicy: {
    width: "95%",
    height: "10%",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    borderColor: Colors.gray88,
    marginTop: 15,
    alignSelf: "center",
  },
  textNotes: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 20,
    color: Colors.neutralBlack,
    marginTop: 20,
    marginLeft: 15,
  },
  textAnyRelevant: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.grey,
    marginTop: 15,
    marginLeft: 15,
  },
  viewSubTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 15,
  },
  viewTax: {
    flexDirection: "row",
    gap: 15,
    marginLeft: 15,
    marginTop: 10,
  },
  textTax: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 12,
    color: Colors.lightBlack,
  },
  textSubTotal: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.midBlack,
  },
  textTwenty: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.grey,
  },
  viewAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 10,
  },
  inputUSDPriceView: {
    width: "60%",
    height: 51,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray88,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textdelivery: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 20,
    color: Colors.neutralBlack,
    marginTop: 20,
    marginHorizontal: 16,
  },
  viewEmail: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
  },
  emailToCustumer: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.neutral100,
    marginHorizontal: 20,
  },
  sendInvoice: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.neutral80,
    marginHorizontal: 60,
  },
  textCostumer: {
    marginHorizontal: 16,
    marginTop: 20,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.neutralBlack,
  },
  inputUser: {
    marginLeft: 10,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.grey,
  },
  textInvoiceDelivery: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.neutral100,
  },
  textPdf: {
    marginHorizontal: 20,
    marginTop: 4,
    fontFamily: GILROY_MEDIUM,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.neutral80,
  },
  viewIconText: {
    marginTop: 15,
    flexDirection: "row",
  },
  viewInvoiceDelivery: {
    marginHorizontal: 16,
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: Colors.grey12,
    // height: "10%",
    paddingBottom: 15,
  },
  viewDownloadPdf: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
  },
  btnContainerView: {
    width: "90%",
    height: 51,
    marginTop: 20,
    marginHorizontal: 15,
    gap: 15,
    flexDirection: "row",
  },
  btnPreview: {
    width: 185,
    height: 51,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.skyBlueColor,
  },
  textPreview: {
    textAlign: "center",
    marginTop: 15,
    color: Colors.skyBlueColor,
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
  },
  btnCreate: {
    width: 185,
    height: 51,
    backgroundColor: Colors.skyBlueColor,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.skyBlueColor,
  },
  textCreate: {
    textAlign: "center",
    marginTop: 15,
    color: Colors.whiteColor,
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
  },
  textSlashInput: {
    marginTop: 15,
    marginLeft: 15,
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
    width: "78%",
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    color: Colors.grey,
    marginLeft: 10,
  },
  writeViewBox: {
    width: "95%",
    height: 57,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutralGrey,
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
  textAmountPaid: {
    marginTop: 30,
  },

  containerBTN: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: "55%",
  },
  textButton: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  textButtonPreview: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.skyBlueColor,
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
  buttonViewCreate: {
    width: "49%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
  },
  textButtonLineItem: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  buttonViewLineItem: {
    width: "30%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.skyBlueColor,
  },
  containerBTNLineItem: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
