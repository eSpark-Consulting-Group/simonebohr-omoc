import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import {  shoes } from "../../../utils/images";
import { Height, Width } from "../../../utils";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../../utils/fonts";
import { Colors } from "../../../utils/colors";
import { CONTEXT } from "../../../utils/string/strings";
import FastImage from "react-native-fast-image";
import CustomTwoButton from "../../../component/CustomTwoButton";


const productList = [
  {
    id: 1,
    title: "Nike Air Jordon",
    price: "$1.120",
    image: shoes,
    stock: 123,
    status: false,
  },
];

const Bundling = ({ hideMe, openNameandBundle }) => {
    const [buttonPress, setbuttonPress] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", Height * 11], []);

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
        opacity={0.3}
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
        style={{
          backgroundColor: "#F3F3F3",
        }}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.productText}>Bundling</Text>
        </View>

        <View style={styles.horizontalView}>
          <Text style={[styles.headText, { width: Width * (55 / 100) }]}>
            {CONTEXT.PRODUCT_NAME}
          </Text>
          <Text style={[styles.headText, { width: Width * (18 / 100) }]}>
            {CONTEXT.PRICE}
          </Text>
          <Text style={[styles.headText, { width: Width * (15 / 100) }]}>
            {CONTEXT.STOCK}
          </Text>
        </View>

        <BottomSheetFlatList
          data={productList}
          style={styles.bottomsheetList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.mainContainer}>
              <View style={[styles.listContentView]}>
                <FastImage source={item.image} style={styles.imageStyle} />
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descText}>{item.price}</Text>
                <Text style={styles.descText}>{item.stock}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

  
         <CustomTwoButton firstTitile={CONTEXT.ADD_PRODUCT_BUNDLING} secondTitile={'Send (1)'}/>

      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
  },
  listContentView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomColor: Colors.gray88,
    borderBottomWidth:0.8
  },
  imageStyle: {
    width: Width * (7.9 / 100),
    height: Height * (5.8 / 100),
    resizeMode: "contain",
    marginHorizontal: Height * (1 / 100),
  },
  checkStyle: {
    width: Width * (5 / 100),
    height: Height * (5 / 100),
    resizeMode: "contain",
    marginHorizontal: Height * (1 / 100),
  },
  titleText: {
    textAlign: "justify",
    width: "50%",
    fontSize: 13,
    fontFamily: GILROY_MEDIUM,
    color:Colors.midBlack,
  },
  descText: {
    textAlign: "justify",
    width: "21%",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color:Colors.lightBlack,
  },
  bottomsheetList: { marginTop: 1 },
  mainContainer: {
    width: "93%",
    marginHorizontal: 4,
    alignSelf: "center",
    marginTop: 2,
  },
  productText: {
    fontSize: 15,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
  },
  horizontalView: {
    flexDirection: "row",
    backgroundColor: Colors.lightGrey,
    width: "93%",
    marginTop: Height * (3 / 100),
    marginVertical: 7,
    paddingVertical: Width * (3 / 100),
    paddingHorizontal: Width * (3.6 / 100),
    borderRadius: Width * (2 / 100),
    alignSelf: "center",
  },
  headText: {
    fontSize: 13,
    fontFamily: GILROY_REGULAR,
    color: Colors.midBlack,
  },
  buttonStyle: {
    backgroundColor: Colors.skyBlueColor,
  },
  textColor: {
    color: Colors.whiteColor,
  },

});

export default Bundling;

