import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Customheader from "../../component/Customheader";
import { CONTEXT, palceholders, strings } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import {
  arrow_down,
  arrowleft_icon,
  bag_happy_icon,
  blank_round_circle,
  blue_round_circle,
  imageTwo,
  info_circle,
  trash_icon,
} from "../../utils/images";
import VectorImage from "react-native-vector-image";
import { FlatList, ScrollView } from "native-base";
import FastImage from "react-native-fast-image";
import AddProductFAQModal from "./barcodeModals/AddProductFAQModal";

const data = [
  { id: 1, title: "Hoodie Havana V1 -White", sku: 123801, newSku: 1840812048 },
  { id: 2, title: "Hoodie Havana V1 -White", sku: 123801, newSku: 1840812048 },
  { id: 3, title: "Hoodie Havana V1 -White", sku: 123801, newSku: 1840812048 },
];

const AssignBarcodesSKUs = ({ navigation }) => {
  const [showProductsList, setShowProductsList] = useState(false);
  const [showAddProductFAQModal, setShowAddProductFAQModal] = useState(false);
  const [assignType, setAssignType] = useState("SKU");
  return (
    <SafeAreaView style={styles.container}>
      <Customheader
        title={CONTEXT.BARCODE}
        showBackIcon={true}
        Containerstyle={styles.customHeaderStyle}
        onPress={() => {}}
        optionImage={info_circle}
        rightIconStyle={styles.infoIconStyle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitleView}>
          <Text style={styles.manageBarcodeText}>
            {strings.ASSIGN_BARCODES_SKUS}
          </Text>
        </View>
        <View style={styles.optionsCardView}>
          <Text style={styles.cardHeaderText}>{strings.ASSIGN_TO_THE}</Text>
          <TouchableOpacity
            style={styles.optionsButtonView}
            onPress={() => {
              setAssignType("SKU");
            }}
          >
            <VectorImage
              source={
                assignType === "SKU" ? blue_round_circle : blank_round_circle
              }
            />
            <View style={styles.optionContentView}>
              <Text style={styles.optionTitleText}>{strings.SKUS}</Text>
              <Text style={styles.optionDescriptionText}>
                {strings.ASSING_THE_GENERATE_CODE_TO_SKU}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionsButtonView}
            onPress={() => {
              setAssignType("Barcode");
            }}
          >
            <VectorImage
              source={
                assignType === "barcode"
                  ? blue_round_circle
                  : blank_round_circle
              }
            />
            <View style={styles.optionContentView}>
              <Text style={styles.optionTitleText}>{CONTEXT.BARCODE}</Text>
              <Text style={styles.optionDescriptionText}>
                {strings.ASSING_THE_GENERATE_CODE_TO_SKU}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsCardView}>
          <Text style={styles.cardHeaderText}>{strings.CREATE_SKUS_USING}</Text>
          <TouchableOpacity style={styles.optionsButtonView}>
            <VectorImage source={blue_round_circle} />
            <View style={styles.optionContentView}>
              <Text style={styles.optionTitleText}>
                {strings.A_UNIQUELY_GENERATED_NUMBER}
              </Text>
              <Text style={styles.optionDescriptionText}>
                {strings.EASYSCAN_GENERATES_UNIQUE_14_DIG_NUM}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionsButtonView}>
            <VectorImage source={blank_round_circle} />
            <View style={styles.optionContentView}>
              <Text style={styles.optionTitleText}>{strings.VARIANT_ID}</Text>
              <Text style={styles.optionDescriptionText}>
                {strings.THE_PRODUCT_VARIANT_14_DIGIT_ID}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.optionsCardView}>
          <Text style={styles.cardHeaderText}>
            {strings.SAVE_TEMPLATE_OPTIONAL}
          </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder={palceholders.TEMPLATE_NAME}
              style={styles.saveTemplateInput}
              placeholderTextColor={"#9E9E9E"}
            />
          </View>
          <View style={styles.saveTemplateContainer}>
            <TouchableOpacity
              style={styles.saveTemplateButton}
              onPress={() => {}}
            >
              <Text style={styles.printReportText}>
                {strings.SAVE_TEMPLATE}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.optionsCardView}>
          <Text style={styles.cardHeaderText}>{strings.LABEL_LAYOUT}</Text>
          <View style={styles.labelLayOutText}>
            <Text style={styles.dropDownHeaderText}>
              {strings.ABOVE_BARCODE}
            </Text>
            <TouchableOpacity style={styles.dropDownContainer}>
              <Text style={styles.dropDownTitleText}>
                {CONTEXT.PRODUCT_NAME}
              </Text>
              <VectorImage source={arrow_down} />
            </TouchableOpacity>
          </View>
          <View style={styles.labelLayOutText}>
            <Text style={styles.dropDownHeaderText}>
              {strings.GENERATE_THE_BARCODE_SYMBOL}
            </Text>
            <TouchableOpacity style={styles.dropDownContainer}>
              <Text style={styles.dropDownTitleText}>
                {strings.PRODUCT_SKU}
              </Text>
              <VectorImage source={arrow_down} />
            </TouchableOpacity>
          </View>
          <View style={styles.labelLayOutText}>
            <Text style={styles.dropDownHeaderText}>
              {strings.BELOW_BARCODE}
            </Text>
            <TouchableOpacity style={styles.dropDownContainer}>
              <Text style={styles.dropDownTitleText}>
                {strings.PRODUCT_PRICE}
              </Text>
              <VectorImage source={arrow_down} />
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={styles.optionsCardView}>
          <View style={styles.createSkuHeaderView}>
            <Text style={styles.createSkuUsingText}>
              {strings.CREATE_SKUS_USING}
            </Text>
            <Text style={styles.clearAllText}>{strings.CLEAR_ALL}</Text>
          </View>
          {!showProductsList ? (
            <>
              <View style={styles.createSkuSubView}>
                <VectorImage
                  source={bag_happy_icon}
                  style={styles.happyBagIcon}
                />
                <Text style={styles.selectYourProductText}>
                  {strings.SELECT_YOUR_TO_ASSIGN}
                </Text>
                <TouchableOpacity
                  style={styles.selectProductButton}
                  onPress={() => setShowProductsList(true)}
                >
                  <Text style={styles.selectProductButtonText}>
                    {strings.SELECT_PRODUCTS}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={data}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity style={styles.listView}>
                        <View style={styles.listSubContainer}>
                          <FastImage
                            source={imageTwo}
                            style={styles.listImage}
                          />
                          <View style={styles.itemContantView}>
                            <Text style={styles.itemTitleText}>
                              {item.title}
                            </Text>
                            <View style={styles.itemsSkuView}>
                              <Text style={styles.skuText}>
                                SKU: {item.sku}
                              </Text>
                              <VectorImage
                                source={arrowleft_icon}
                                style={styles.arrowIcon}
                              />
                              <Text style={styles.newSkuText}>
                                {item.newSku}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity>
                          <VectorImage
                            source={trash_icon}
                            style={styles.trashIcon}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </>
          )}
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.addProductButton}
            onPress={() => {
              setShowAddProductFAQModal(true);
            }}
          >
            <Text style={styles.addProductText}>{CONTEXT.ADD_PRODUCT}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.printAllProducts}
            onPress={() => {
              navigation.navigate("ProductIdUpdate", { type: assignType });
            }}
          >
            <Text style={styles.printAllProductsText}>
              {strings.ASSIGN_ALL_SKUS}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showAddProductFAQModal && (
        <AddProductFAQModal
          onSendClicked={() => {}}
          hideMe={() => {
            setShowAddProductFAQModal(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default AssignBarcodesSKUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitleView: { marginStart: 20, marginTop: 25, marginBottom: 10 },
  manageBarcodeText: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 24,
    lineHeight: 33,
    color: "#000000",
  },
  optionsCardView: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    gap: 15,
    paddingVertical: 25,
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
  customHeaderStyle: { marginTop: 10, paddingBottom: 5 },
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
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
    borderColor: "#E0E0E0",
  },
  listSubContainer: {
    flexDirection: "row",
    gap: 12,
  },
  listImage: { width: 48, height: 48, borderRadius: 8 },
  itemContantView: {
    gap: 4,
  },
  itemTitleText: {
    fontSize: 12,
    fontFamily: GILROY_SEMIBOLD,
    lineHeight: 17,
    color: "#2E2E2E",
  },
  itemsSkuView: {
    flexDirection: "row",
    gap: 4,
  },
  skuText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    lineHeight: 17,
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
    paddingVertical: 16,
    width: "49%",
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
  addProductText: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 16,
    color: "#0094FF",
  },
  buttonsView: {
    flexDirection: "row",
    width: "89%",
    alignSelf: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },

  saveTemplateButton: {
    borderColor: "#0094FF",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  printReportText: {
    fontSize: 10,
    fontFamily: GILROY_REGULAR,
    lineHeight: 12,
    color: "#0094FF",
  },
  saveTemplateContainer: { flexDirection: "row" },
  textInputContainer: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderRadius: 12,
    borderColor: "#EDEDED",
  },
  dropDownContainer: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#E0E0E0",
  },
  saveTemplateInput: { paddingVertical: 10 },
  dropDownHeaderText: {
    color: "#9E9E9E",
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    lineHeight: 16,
  },
  dropDownTitleText: {
    fontSize: 16,
    color: "#242424",
    fontFamily: GILROY_MEDIUM,
    lineHeight: 16,
  },
  labelLayOutText: { gap: 8 },
});
