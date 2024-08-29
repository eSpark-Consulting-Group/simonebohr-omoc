import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CONTEXT, palceholders, strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";
import SearchTabBar from "./SearchTabBar";
import { arrow_down, check_icon, shoes, uncheck_box } from "../utils/images";
import VectorImage from "react-native-vector-image";
import FastImage from "react-native-fast-image";

const data = [
  {
    image: shoes,
    title: "Nike Air Jordan",
    code: "1239u1023",
    icon: check_icon,
    price: "Price",
    stock: "Stock",
  },
  {
    image: shoes,
    title: "Nike Air Jordan",
    code: "1239u1023",
    icon: uncheck_box,
    price: "Price",
    stock: "Stock",
  },
];

const CategoryBottomSheet = ({ hideMe }) => {
  const [chooseProduct, setChooseProduct] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "80%"], []);

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
      backdropComponent={renderBackdrop}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      handleIndicatorStyle={styles.bottomSheetStyle}
      onChange={handleSheetChanges}
      backgroundComponent={() => (
        <View
          style={[styles.backContainer, { backgroundColor: Colors.whiteColor }]}
        />
      )}
    >
      <View style={styles.mainView}>
        <View style={styles.viewtextHeader}>
          <Text style={styles.addLegal}>{CONTEXT.ADD_NEW_PRODUCT}</Text>
        </View>
        <View style={styles.searchBarView}>
          <SearchTabBar
            style={styles.searchBar}
            placeholder={strings.SEARCH_PRODUCT_SKU}
          />
        </View>
        <View style={styles.sortView}>
          <View style={styles.viewBoxSort}>
            <Text style={styles.textSort}>{palceholders.SORT_BY}</Text>
            <TouchableOpacity>
              <VectorImage source={arrow_down} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {!chooseProduct && (
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.mainViewContainer}>
                  <View style={styles.flatlistView}>
                    <View style={styles.imageView}>
                      <FastImage source={item.image} style={styles.shoeImage} />
                      <View style={styles.viewTitle}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.code}>{item.code}</Text>
                      </View>
                      <View style={styles.viewContainer}></View>
                    </View>

                    <View style={styles.viewbox}>
                      <View style={styles.priceView}>
                        <View style={styles.viewDollor}>
                          <Text style={styles.priceText}>{item.price}</Text>
                          <Text style={styles.dollor}>$ 999,000</Text>
                        </View>
                      </View>
                      <View style={styles.priceView}>
                        <View style={styles.viewDollor}>
                          <Text style={styles.priceText}>{item.stock}</Text>
                          <Text style={styles.dollor}>32</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}

        {!chooseProduct && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              setChooseProduct(true);
            }}
          >
            <Text style={styles.btnText}>{CONTEXT.ADD_PRODUCT}</Text>
          </TouchableOpacity>
        )}

        {chooseProduct && (
          <View style={styles.mainFlatlistView}>
            <View style={styles.flatlistView}>
              <VectorImage source={check_icon} style={styles.blueCheckIcon} />
              <View style={styles.imageViewContainer}>
                <FastImage source={shoes} style={styles.image} />
                <View style={styles.titleView}>
                  <Text style={styles.title}>{strings.NIKE_JORDAN}</Text>
                  <Text style={styles.code}>{strings.CODE}</Text>
                </View>
                <View style={styles.viewContainer}></View>
              </View>

              <View style={styles.viewbox}>
                <View style={styles.priceView}>
                  <View style={styles.viewDollor}>
                    <Text style={styles.priceText}>{strings.PRICE}</Text>
                    <Text style={styles.dollor}>$ 999,000</Text>
                  </View>
                </View>
                <View style={styles.priceView}>
                  <View style={styles.viewDollor}>
                    <Text style={styles.priceText}>{strings.STOCK}</Text>
                    <Text style={styles.dollor}>32</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

export default CategoryBottomSheet;

const styles = StyleSheet.create({
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomSheetStyle: {
    backgroundColor: Colors.neutralGrey,
    width: 61,
    height: 4,
  },
  searchBarView: {
    marginTop: 20,
  },
  mainViewContainer: {
    marginTop: 5,
  },
  image: {
    height: 48,
    width: 48,
  },
  sortView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  checkicon: {
    position: "absolute",
    marginTop: 60,
  },
  imageView: {
    flexDirection: "row",
  },
  mainFlatlistView: {
    marginTop: 10,
  },
  blueCheckIcon: {
    position: "absolute",
    marginTop: 60,
  },
  imageViewContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
  },
  titleView: {
    marginLeft: 15,
    marginTop: 5,
  },
  shoeImage: {
    height: 48,
    width: 48,
  },
  viewTitle: {
    marginLeft: 15,
    marginTop: 5,
  },
  viewContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "15%",
    gap: 5,
  },
  flatlistView: {
    width: "100%",
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 12,
    borderColor: Colors.gray88,
  },
  mainView: {
    flex: 1,
    marginHorizontal: 15,
  },
  addLegal: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    color: Colors.neutralBlack,
  },
  viewtextHeader: {
    marginTop: 30,
    marginLeft: 16,
  },

  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    width: "95%",
    position: "absolute",
    bottom: 40,
    zIndex: 0,
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  countryText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.neutralBlack,
    marginTop: 5,
  },
  searchBar: {
    width: "100%",
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.neutralGrey,
  },
  viewBoxSort: {
    width: 122,
    height: 49,
    backgroundColor: Colors.whiteColor,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.gray91,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  textSort: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.lightBlack,
    marginLeft: 20,
  },
  arrowIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 20,
    tintColor: Colors.lightBlack,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 12,
    color: Colors.charcoal,
  },
  code: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
    lineHeight: 18,
  },
  viewDollor: {
    gap: 10,
    marginTop: 10,
    marginHorizontal: 15,
  },
  viewbox: {
    width: "95%",
    height: 66,
    gap: 8,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  priceView: {
    width: 180,
    height: 66,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
    borderColor: Colors.gray88,
  },
  priceText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.grey,
  },
  dollor: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.neutralBlack,
  },
  inputLegalPolicy: {
    width: "100%",
    height: "25%",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    borderColor: Colors.gray88,
    marginTop: 15,
    alignSelf: "center",
  },
  containerBTN: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 30,
  },
  textButton: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  textButtonPreview: {
    fontSize: 14,
    fontWeight: "400",
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
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonViewLondon: {
    width: "49%",
    height: 51,
    borderColor: Colors.neutralGrey,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.neutralGrey,
    flexDirection: "row",
    justifyContent: "center",
  },
  textLondon: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    marginTop: 5,
    fontWeight: "400",
    color: Colors.lightGrey50,
  },
});
