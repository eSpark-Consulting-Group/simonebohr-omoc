import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import {
  bag_happy_icon,
  check_icon,
  receipt_icon,
  tag_icon,
  user_frame,
} from "../../../utils/images";
import VectorImage from "react-native-vector-image";
import { Height } from "../../../utils";
import {
  GILROY_BOLD,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../../utils/fonts";
import SearchTabBar from "../../../component/SearchTabBar";
import { Colors } from "../../../utils/colors";
import FastImage from "react-native-fast-image";
import CustomButton from "../../../component/CustomButton";

const productList = [
  {
    id: 1,
    productName: "Hoodie Havana V1 + 2 Items",
    price: "$ 799",
    date: "20 Febuary 2023",
    INV: "INV/CODE123123124124",
    image: user_frame,
    isSeclcted: false,
  },
  {
    id: 2,
    productName: "Hoodie Havana V1 + 2 Items",
    price: "$ 799",
    date: "20 Febuary 2023",
    INV: "INV/CODE123123124124",
    image: user_frame,
    isSeclcted: false,
  },
];

const SearchInvoiceModal = ({ hideMe }) => {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", Height * 0.9], []);

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
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        backdropComponent={renderBackdrop}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleIndicatorStyle={styles.bottomSheetStyle}
      >
        <View style={styles.subContainer}>
          <Text style={styles.headerText}>Search Invoice</Text>
          <SearchTabBar placeholder={"Search"} style={styles.searchBar} />
          <BottomSheetFlatList
            data={productList}
            renderItem={({ item }) => {
              return (
                <View style={styles.itemListView}>
                  <TouchableOpacity>
                    <VectorImage source={check_icon} />
                  </TouchableOpacity>
                  <FastImage source={item.image} style={styles.productImage} />
                  <View style={styles.contentView}>
                    <Text style={styles.productNameText}>
                      {item.productName}
                    </Text>
                    <View style={styles.subContentView}>
                      <Text style={styles.invText}>{item.INV}</Text>
                      <Text style={styles.invText}>{item.date}</Text>
                    </View>
                    <Text style={styles.priceText}>{item.price}</Text>
                  </View>
                </View>
              );
            }}
            style={styles.bottomsheetList}
          />
          <View style={styles.selectButtonView}>
            <CustomButton
              text="Confirm Selected"
              style={styles.btnStyle}
              textstyle={styles.btnText}
              onPress={() => {
                handleSheetChanges(0);
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  bottomSheetStyle: { backgroundColor: "#D9D9D9" },
  subContainer: {
    height: "100%",
    paddingTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  bottomsheetList: { marginTop: 15 },
  itemListView: {
    width: "99.5%",
    borderRadius: 12,
    backgroundColor: Colors.whiteColor,
    marginVertical: 4,
    gap: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  contentView: {
    gap: 8,
    justifyContent: "center",
  },
  productNameText: {
    textAlign: "justify",
    width: "80%",
    fontSize: 14,
    fontFamily: GILROY_SEMIBOLD,
    color: "#2E2E2E",
  },
  invText: {
    textAlign: "justify",
    width: "80%",
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: Colors.mediumGrey,
  },
  priceText: {
    textAlign: "justify",
    width: "80%",
    fontSize: 12,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.neutralBlack,
  },
  searchBar: { marginTop: 20, width: "100%" },
  headerText: {
    textAlign: "justify",
    fontSize: 16,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.neutralBlack,
  },
  selectButtonView: { position: "absolute", bottom: 25, width: "100%" },
  btnStyle: { backgroundColor: Colors.skyBlueColor },
  btnText: { color: Colors.whiteColor },
  productImage: { width: 98, height: 98 },
  subContentView: { gap: 5 },
});

export default SearchInvoiceModal;
