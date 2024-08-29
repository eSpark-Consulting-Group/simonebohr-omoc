import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";

const BarcodeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Customheader
        title={CONTEXT.BARCODE}
        showBackIcon={true}
        Containerstyle={styles.customHeaderStyle}
        onPress={() => {}}
        optionImage={null}
      />
      <View style={styles.headerTitleView}>
        <Text style={styles.manageBarcodeText}>
          {strings.MANAGE_YOUR_BARCODE_SKU}
        </Text>
        <Text style={styles.manageShopOrderText}>
          {strings.MANAGE_YOUR_SHOP_ORDER}
        </Text>
      </View>
      <View style={styles.optionsCardView}>
        <Text style={styles.cardTitleText}>
          {strings.BARCODES_SKU_HELP_HELP_YOU_MANAGE}
        </Text>
        <Text style={styles.printBarCodeLabelsText}>
          {strings.BARCODE_SKU_ASSIGNED_TEXT}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.printBarcodeButton}>
            <Text style={styles.buttonText}>
              {strings.PRINT_BARCODE_LABELS}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.printBarcodeButton}
            onPress={() => {
              navigation.navigate("AssignBarcodesSKUs");
            }}
          >
            <Text style={styles.buttonText}>
              {strings.ASSIGN_BARCODES_SKUS}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BarcodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  printBarcodeButton: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Colors.whiteColor,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: "#0094FF",
    paddingVertical: 14,
  },
  buttonText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    width: "70%",
    color: "#0094FF",
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
  },
  headerTitleView: { marginStart: 20, marginTop: 25 },
  manageBarcodeText: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 33,
  },
  manageShopOrderText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
    lineHeight: 22,
    color: "#000000",
  },
  optionsCardView: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 40,
    gap: 25,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  cardTitleText: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 20,
    lineHeight: 28,
    textAlign: "center",
  },
  printBarCodeLabelsText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    lineHeight: 13,
    textAlign: "center",
    width: "70%",
    color: "#9E9E9E",
  },
  customHeaderStyle: { marginTop: 15, paddingBottom: 5 },
});
