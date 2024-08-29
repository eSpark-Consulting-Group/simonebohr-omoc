import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import {
  arrowleft_icon,
  bag_happy_icon,
  blank_round_circle,
  blue_round_circle,
  imageTwo,
  info_circle,
  trash_icon,
} from "../../utils/images";
import { FlatList, ScrollView } from "native-base";
import FastImage from "react-native-fast-image";

const data = [
  { id: 1, title: "Hoodie Havana V1 -White", sku: 123801, newSku: 1840812048 },
  { id: 2, title: "Hoodie Havana V1 -White", sku: 123801, newSku: 1840812048 },
  { id: 3, title: "Hoodie Havana V1 -White", sku: 123801, newSku: 1840812048 },
  { id: 3, title: "Hoodie Havana V1 -White", sku: 123801, newSku: 1840812048 },
  { id: 3, title: "Hoodie Havana V1 -White", sku: 123801, newSku: 1840812048 },
  { id: 3, title: "Hoodie Havana V1 -White", sku: 123801, newSku: 1840812048 },
];

const ProductIdUpdate = ({ route }) => {
  const { type } = route.params;

  const getHeaderText = () => {
    if (type === "SKU") {
      return strings.SKUS_UPDATE;
    }
    return strings.BARCODE_UPDATE;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Customheader
        title={CONTEXT.BARCODE}
        showBackIcon={true}
        Containerstyle={styles.customHeaderStyle}
        onPress={() => {}}
        optionImage={info_circle}
        rihgtIconStyle={styles.infoIconStyle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitleView}>
          <Text style={styles.manageBarcodeText}>{getHeaderText()}</Text>
          <TouchableOpacity style={styles.addProductButton} onPress={() => {}}>
            <Text style={styles.printReportText}>{strings.PRINT_REPORT}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsCardView}>
          <View style={styles.createSkuHeaderView}>
            <Text style={styles.createSkuUsingText}>
              {strings.UPDATE_PRODUCT}
            </Text>
            <Text style={styles.clearAllText}>{strings.CLEAR_ALL}</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.listView}>
                  <FastImage source={imageTwo} style={styles.listImage} />
                  <View style={styles.itemContantView}>
                    <Text style={styles.itemTitleText}>{item.title}</Text>
                    <Text style={styles.skuText}>
                      {type}: {item.sku}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductIdUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitleView: {
    width: "93%",
    marginTop: 25,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  manageBarcodeText: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 24,
    lineHeight: 33,
    color: "#000000",
  },
  optionsCardView: {
    width: "93%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    gap: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  createSkuCardView: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  customHeaderStyle: { marginTop: 15, paddingBottom: 5 },
  infoIconStyle: {
    width: 24,
    height: 24,
  },
  cardHeaderText: {
    fontSize: 20,
    fontFamily: GILROY_SEMIBOLD,
    lineHeight: 28,
    color: "#000000",
  },
  optionsButtonView: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  optionTitleText: {
    fontSize: 16,
    fontFamily: GILROY_SEMIBOLD,
    lineHeight: 22,
    color: "#000000",
  },
  optionDescriptionText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    lineHeight: 14,
    color: "#000000",
  },
  optionContentView: { gap: 5, justifyContent: "center" },
  createSkuHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createSkuUsingText: {
    fontSize: 20,
    fontFamily: GILROY_SEMIBOLD,
    lineHeight: 22,
    color: "#000000",
  },
  clearAllText: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    lineHeight: 16,
    color: "#0094FF",
  },
  createSkuSubView: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    marginTop: 5,
  },
  happyBagIcon: {
    width: 50,
    height: 50,
    tintColor: "#9039FF",
  },
  selectYourProductText: {
    fontSize: 20,
    fontFamily: GILROY_SEMIBOLD,
    lineHeight: 28,
    color: "#000000",
    textAlign: "center",
  },
  selectProductButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0094FF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  selectProductButtonText: {
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  listView: {
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
    borderColor: "#E0E0E0",
    flexDirection: "row",
    gap: 12,
  },
  listSubContainer: {},
  listImage: { width: 48, height: 48, borderRadius: 8 },
  itemContantView: {
    gap: 4,
  },
  itemTitleText: {
    fontSize: 12,
    fontFamily: GILROY_SEMIBOLD,
    lineHeight: 12,
    color: "#2E2E2E",
  },
  itemsSkuView: {
    flexDirection: "row",
    gap: 4,
  },
  skuText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    lineHeight: 16,
    color: "#121212",
  },
  arrowIcon: { tintColor: "#242424" },
  trashIcon: { tintColor: "#000000" },
  newSkuText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    lineHeight: 17,
    color: "#121212",
  },
  addProductButton: {
    borderColor: "#0094FF",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  printAllProducts: {
    borderColor: "#0094FF",
    borderWidth: 1,
    paddingVertical: 16,
    width: "49%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "#0094FF",
  },
  printAllProductsText: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 16,
    color: "#FFFFFF",
  },
  printReportText: {
    fontSize: 10,
    fontFamily: GILROY_REGULAR,
    lineHeight: 12,
    color: "#0094FF",
  },
  buttonsView: {
    flexDirection: "row",
    width: "89%",
    alignSelf: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
});
