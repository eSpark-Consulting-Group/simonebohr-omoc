import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Customheader from "../../component/Customheader";
import { strings } from "../../utils/string/strings";
import { Colors } from "../../utils/colors";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import { arrow_down, calendar_icon } from "../../utils/images";
import InvoiceTitleComponent from "../../component/InvoiceTitleComponent";

const InvoiceTitle = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Customheader
            title={strings.BARCODE}
            showBackIcon={true}
            optionImage={undefined}
            onPress={undefined}
            Containerstyle={undefined}
            rihgtIconStyle={undefined}
          />
        </View>
        <View style={styles.titleView}>
          <Text style={styles.invoiceTitle}>{strings.INVOICE_TITLE}</Text>
        </View>
        <View style={styles.mainView}>
          <View style={styles.viewBox}>
            <TextInput
              style={styles.textInvoice}
              placeholder={strings.INVOICE_NAME}
            />
          </View>
          <View style={styles.viewBox}>
            <Text style={styles.textHash}>#</Text>
            <Text style={styles.textSlash}>|</Text>
            <TextInput
              style={styles.input}
              placeholder={strings.INVOICE_NUMBER}
            />
          </View>
        </View>
        <View style={styles.viewBill}>
          <Text style={styles.billTo}>{strings.BILL_TO}</Text>
        </View>
        <View style={styles.clientViewBox}>
          <Text style={styles.textClient}>{strings.CLIENT}</Text>
          <TouchableOpacity>
            <VectorImage source={arrow_down} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.writeViewBox}>
          <TextInput
            style={styles.inputWrite}
            placeholder={strings.WRITE_THE_NUMBER}
          />
        </View>
        <View style={styles.clientViewBox}>
          <Text style={styles.textClient}>{strings.POST_SITE}</Text>
          <TouchableOpacity>
            <VectorImage source={arrow_down} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.writeViewBox}>
          <TextInput
            style={styles.inputWrite}
            placeholder={strings.WRITE_THE_NUMBER}
          />
        </View>

        <View style={styles.mainView}>
          <View style={styles.viewBox}>
            <TextInput
              style={styles.textInvoice}
              placeholder={strings.INVOICE_DATE}
            />
            <TouchableOpacity>
              <VectorImage source={calendar_icon} style={styles.calendarIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewBox}>
            <TextInput
              style={styles.textInvoice}
              placeholder={strings.PAYMENT_DUE}
            />
            <TouchableOpacity>
              <VectorImage source={calendar_icon} style={styles.calendarIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.item}>{strings.ITEM}</Text>
        <View style={styles.writeViewBox}>
          <TextInput
            style={styles.inputWrite}
            placeholder={strings.WRITE_DOWN}
          />
        </View>
        <Text style={styles.item}>{strings.QUANTITY}</Text>
        <View style={styles.writeViewBox}>
          <TextInput
            style={styles.inputWrite}
            placeholder={strings.WRITE_DOWN}
          />
        </View>
        <Text style={styles.item}>{strings.RATE}</Text>
        <View style={styles.inputPriceView}>
          <Text style={styles.usd}>{strings.USD}</Text>
          <Text style={styles.textSlashInput}>|</Text>
          <TextInput
            style={styles.textInputPrice}
            placeholder={strings.INPUT_PRICE}
          />
        </View>
        <InvoiceTitleComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvoiceTitle;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  headerContainer: {
    marginTop: 15,
  },
  invoiceTitle: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  titleView: {
    marginLeft: 16,
    marginTop: 25,
  },
  viewBox: {
    backgroundColor: Colors.whiteColor,
    width: "48%",
    height: 57,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutralGrey,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInvoice: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.grey,
    marginLeft: 16,
  },
  mainView: {
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  input: {
    marginLeft: 15,
    color: Colors.grey,
    width: "70%",
  },
  textSlash: {
    marginTop: 20,
    marginLeft: 15,
    color: Colors.grey,
  },
  textHash: {
    marginTop: 20,
    marginLeft: 15,
    color: Colors.neutral80,
  },
  billTo: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  viewBill: {
    marginLeft: 16,
    marginTop: 25,
  },
  clientViewBox: {
    width: "95%",
    height: 56,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray88,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textClient: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.neutralBlack,
    marginLeft: 15,
    marginTop: 20,
  },
  arrowIcon: {
    marginRight: 10,
    marginTop: 13,
  },
  inputWrite: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.grey,
    marginLeft: 15,
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
  calendarIcon: {
    marginRight: 10,
    marginTop: 15,
    tintColor: Colors.grey,
  },
  item: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.neutralBlack,
    marginLeft: 16,
    marginTop: 10,
  },
  inputPriceView: {
    width: "95%",
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
});
