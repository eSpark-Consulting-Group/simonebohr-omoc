import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { uncheckbox, shoes } from "../../../utils/images";
import { checkbox } from "../../../utils/images";
import VectorImage from "react-native-vector-image";
import { Height } from "../../../utils";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../../utils/fonts";
import { Colors } from "../../../utils/colors";
import SearchTabBar from "../../../component/SearchTabBar";
import { CONTEXT, strings } from "../../../utils/string/strings";
import FastImage from "react-native-fast-image";
import CustomButton from "../../../component/CustomButton";

const productSectionData = [
  {
    id: 1,
    productDetail: {
      name: "Hoodie Havana V1",
      sku: "1239u1023",
      image: shoes,
    },
    varients: [
      { color: "red", price: "$400", stock: 12 },
      { color: "Yellow", price: "$400", stock: 12 },
    ],
  },
  {
    id: 2,
    productDetail: {
      name: "Hoodie Havana V1",
      sku: "1239u1023",
      image: shoes,
    },
    varients: [
      { color: "red", price: "$400", stock: 12 },
      { color: "Yellow", price: "$400", stock: 12 },
    ],
  },
];
const AddProductFAQModal = ({ hideMe, onSendClicked }) => {
  const [searchText, setSearchText] = useState("");
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "80%"], []);

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
        opacity={0.1}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.bottomSheetStyle}
      style={{ paddingHorizontal: 2 }}
    >
      <View style={styles.mainContainer}>
        <Text style={styles.productText}>{strings.ADD_PRODUCT_FAQ}</Text>
      </View>
      <SearchTabBar
        placeholder={"Search"}
        onChange={(txt) => setSearchText(txt)}
        value={searchText}
      />
      <BottomSheetFlatList
        data={productSectionData}
        style={styles.bottomsheetList}
        renderItem={({ item }) => (
          <View style={styles.mainContainer}>
            <View style={[styles.listContentView]}>
              <TouchableOpacity>
                <VectorImage source={checkbox} style={styles.checkStyle} />
              </TouchableOpacity>
              <FastImage
                source={item.productDetail.image}
                style={styles.imageStyle}
              />
              <View style={styles.productContentView}>
                <Text style={styles.titleText}>{item.productDetail.name}</Text>
                <Text style={styles.descText}>{item.productDetail.sku}</Text>
              </View>
            </View>
            {item.varients.map((val) => {
              return (
                <View style={styles.varientContainer}>
                  <View style={styles.colorConatiner}>
                    <TouchableOpacity>
                      <VectorImage
                        source={uncheckbox}
                        style={styles.checkStyle}
                      />
                    </TouchableOpacity>
                    <Text style={styles.varientColorText}>{val.color}</Text>
                  </View>
                  <Text style={styles.varientColorText}>
                    {CONTEXT.STOCK}: {val.stock}
                  </Text>
                  <Text style={styles.varientColorText}>{val.price}</Text>
                </View>
              );
            })}
            <View style={styles.divider} />
          </View>
        )}
      />
      <View style={styles.selectButtonView}>
        <CustomButton
          text={"Add"}
          style={styles.buttonStyle}
          textstyle={styles.textColor}
          onPress={() => onSendClicked()}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
  },
  listContentView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  imageStyle: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  checkStyle: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  titleText: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: "#242424",
  },
  descText: {
    textAlign: "justify",
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: Colors.lightBlack,
  },
  bottomsheetList: { marginTop: 1 },
  mainContainer: {
    width: "93%",
    alignSelf: "center",
    marginTop: 7,
  },
  productText: {
    fontSize: 24,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    paddingVertical: 7,
  },
  buttonStyle: {
    backgroundColor: Colors.skyBlueColor,
  },
  textColor: {
    color: Colors.whiteColor,
  },
  selectButtonView: {
    width: "95%",
    alignSelf: "center",
    marginBottom: 50,
    marginTop: 10,
  },
  varientContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    borderTopWidth: 1,
    justifyContent: "space-between",
    paddingRight: 15,
    borderColor: "#E0E0E0",
    paddingLeft: "15%",
  },
  varientColorText: {
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
    color: "#242424",
  },
  colorConatiner: { flexDirection: "row", gap: 10 },
  productContentView: { flex: 1, gap: 5, justifyContent: "center" },
  divider: { backgroundColor: "#E0E0E0", height: 1 },
});

export default AddProductFAQModal;
