import React, { useCallback, useRef, useMemo,useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { GILROY_MEDIUM, GILROY_SEMIBOLD } from "../../utils/fonts";
import { CONTEXT } from "../../utils/string/strings";
import { Colors } from "../../utils/colors";
import CustomButton from "../../component/CustomButton";
import SearchTabBar from "../../component/SearchTabBar";
import VectorImage from "react-native-vector-image";
import { arrow_down, shoe_image, shoes } from "../../utils/images";
import FastImage from "react-native-fast-image";
import ScheduleBottom from "./ScheduleBottom";

const TagProductBottom = ({ hideMe ,onCLICK}) => {
  const [schedule, setSchedule]=useState(false)
    const productData=[
        {id:1, title:'Nike Air Jorder',code:'1239u1023',price:'$ 1.124',sold:"$1.123"},
        {id:2, title:'Nike Air Jorder',code:'1239u1023',price:'$ 1.124',sold:"$1.123"},
        {id:3, title:'Nike Air Jorder',code:'1239u1023',price:'$ 1.124',sold:"$1.123"},
        {id:1, title:'Nike Air Jorder',code:'1239u1023',price:'$ 1.124',sold:"$1.123"},
    ]
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["15%", "77%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      hideMe();
    }
    return index;
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={2}
        opacity={1.2}
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
      style={styles.bottomView}
    >
      <View style={styles.createViewText}>
        <Text style={styles.regionText}>{CONTEXT.TAG_PRODUCT}</Text>
      </View>

      <SearchTabBar
        placeholder={"Search Product/SKU"}
        style={styles.regionView}
      />
      <TouchableOpacity
        style={styles.sortView}
        // onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={[styles.payText, { color: Colors.gray66 }]}>
          {CONTEXT.SORT_BY}
        </Text>
        <VectorImage source={arrow_down} style={styles.pluseIcon} />
      </TouchableOpacity>


<View style={styles.listView}>
   <FlatList
   data={productData}
   showsVerticalScrollIndicator={false}
   renderItem={(item)=>{
    return(
      <View style={styles.listProductview}>
      <View style={styles.flexView}>
        <FastImage source={shoes} style={styles.shoesImg} />
        <View style={styles.productNameView}>
          <Text style={styles.productTexT}>Nike Air Jordon</Text>
          <Text style={styles.greyText}>1239u1023</Text>
        </View>
      </View>
      <View style={styles.priceAndSold}>
        <View style={styles.borderViewStyle}>
          <Text style={styles.lightGreyText}>{CONTEXT.PRICE}</Text>
          <Text>$ 1.120</Text>
        </View>

        <View style={styles.borderViewStyle}>
          <Text style={styles.lightGreyText}>Sold</Text>
          <Text>$ 1.120</Text>
        </View>
      </View>
    </View>
    )
   }}    
/>
</View>

      <View style={styles.BtnView}>
        <CustomButton
          text={CONTEXT.ADD_PRODUCT}
          style={styles.button}
          textstyle={styles.btnName}
          onPress={()=>onCLICK()}/>
      </View>

  
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
  },
  regionView: {
    width: "100%",
    paddingVertical: 7,
    alignItems: "center",
  },
  blueBorder: {
    width: "25%",
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.5,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  regionText: {
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    marginVertical: 6,
  },
  greyText: {
    fontSize: 13.5,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.lightBlack,
    marginTop: 5,
  },
  button: {
    backgroundColor: Colors.skyBlueColor,
  },
  btnName: {
    color: Colors.whiteColor,
  },
  BtnView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
  },
  bottomView: {
    backgroundColor: "#F3F3F3",
    borderRadius: 70,
    alignSelf: "center",
    paddingHorizontal: 10,
  },

  productTexT: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    fontSize: 15,
  },
  createViewText: {
    marginRight: 5,
    marginTop: 15,
  },
  payText: {
    fontSize: 15,
    fontFamily: GILROY_MEDIUM,
    color: Colors.whiteColor,
  },
  sortView: {
    width: "30%",
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 11.5,
    borderRadius: 25,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightGrey50,
    borderWidth: 0.7,
    alignSelf: "flex-end",
  },
  pluseIcon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    marginHorizontal: 7,
  },
  shoesImg: {
    height: 48,
    width: 48,
    resizeMode: "contain",
  },
  listProductview: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 13,
    paddingVertical: 11.5,
    borderRadius: 12,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightGrey50,
    borderWidth: 0.7,
  },
  flexView: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 6,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },
  productNameView: {
    marginLeft: 10,
  },
  lightGreyText: {
    fontSize: 15,
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
  },
  borderViewStyle: {
    width: 165,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightGrey50,
    borderWidth: 0.7,
    gap: 7,
  },
  priceAndSold: {
    marginTop: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  listView:{
    flex:1,
    marginBottom:80,
  }
});

export default TagProductBottom;
