import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import {  uncheckbox, shoes } from "../../../utils/images";
import { checkbox } from "../../../utils/images";
import VectorImage from "react-native-vector-image";
import { Height, Width } from "../../../utils";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../../utils/fonts";
import { Colors } from "../../../utils/colors";
import SearchTabBar from "../../../component/SearchTabBar";
import { CONTEXT } from "../../../utils/string/strings";
import FastImage from "react-native-fast-image";
import CustomButton from "../../../component/CustomButton";

const productList = [
  {
    id: 1,
    title: "Nike Air Jordon",
    price: "$1.120",
    image: shoes,stock:123, status:false
  },
  {
    id: 2,
    title: "Nike Air Jordon",
    price: "$1.120",
    image: shoes,stock:123,status:true
  },
  {
    id: 3,
    title: "Nike Air Jordon",
    price: "$1.120",
    image: shoes,status:true,
    stock:123
  },
  { id: 4, title: "Nike Air Jordon", price: "$1.120", image: shoes ,stock:123,status:true},
];
const TabProductModel = ({ product, hideMe }) => {
  const [searchText ,setSearchText]= useState('')
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
          backgroundColor:Colors.defaultGrey
        }}
        >
        <View style={styles.mainContainer}>
          <Text style={styles.productText}>{product}</Text>
          <SearchTabBar placeholder={"Search"} onChange={(txt)=>setSearchText(txt)} value={searchText} />
        </View>

        <View style={styles.horizontalView}>
          <Text style={[styles.headText, { width: Width * (58 / 100) }]}>
            {CONTEXT.PRODUCT_NAME}
          </Text>
          <Text style={[styles.headText, { width: Width * (18/ 100) }]}>
            {CONTEXT.PRICE}
          </Text>
          <Text style={[styles.headText, { width: Width * (10 / 100) }]}>
            {CONTEXT.STOCK}
          </Text>
        </View>

        <BottomSheetFlatList
          data={productList}
          style={styles.bottomsheetList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.mainContainer}>
              <View style={[styles.listContentView]}>
                <VectorImage source={item.status === false ? checkbox : uncheckbox}  style={styles.checkStyle} />
                <FastImage source={item.image} style={styles.imageStyle} />
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descText}>{item.price}</Text>
                <Text style={styles.descText}>{item.stock}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
         <View style={styles.selectButtonView}>
      <CustomButton text={'Send'} style={styles.buttonStyle} textstyle={styles.textColor}/>
           </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 665,
  },
  bottomSheetStyle: {
     backgroundColor: "#D9D9D9"
     },
  listContentView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: Colors.gray88,
    borderBottomWidth: Width * (0.2 / 100)
  },
  imageStyle: {
    width:38,
    height: 24,
    resizeMode: "contain",
    marginRight:10,
  },
  checkStyle: {
    width: 20,
    height: 16,
    resizeMode:'contain',
    marginHorizontal: Height * (1 / 100),
  },
  titleText: {
    textAlign: "justify",
    width: "43%",
    fontSize: 13,
    fontFamily: GILROY_MEDIUM,
    color:Colors.midBlack,
  },
  descText: {
    textAlign: "justify",
    width: "21%",
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color:Colors.lightBlack,
  },
  bottomsheetList: { marginTop: 1 },
  mainContainer: {
    width: "93%",
    marginHorizontal: 4,
    alignSelf: "center",
    marginTop:7
  },
  productText: {
    fontSize: 15,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    paddingVertical: 7,
  },
  horizontalView: {
    flexDirection: "row",
    backgroundColor: Colors.lightGrey,
    width: "93%",
    marginTop:Height*(3/100),
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
  buttonStyle:{
    backgroundColor:Colors.skyBlueColor
  },
  textColor:{
    color: Colors.whiteColor,
  },
  selectButtonView: {
     position: "absolute",
      bottom: 25,
       width: "100%" 
      },
});

export default TabProductModel;
