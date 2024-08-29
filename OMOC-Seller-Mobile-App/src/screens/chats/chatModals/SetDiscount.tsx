import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { delete_blackbox, edit_icon, shoes } from "../../../utils/images";
import { Height, Width } from "../../../utils";
import { Colors } from "../../../utils/colors";
import { CONTEXT } from "../../../utils/string/strings";
import FastImage from "react-native-fast-image";
import CustomTwoButton from "../../../component/CustomTwoButton";
import VectorImage from "react-native-vector-image";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../../utils/fonts";

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

const SetDiscount = ({ hideMe }) => {
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
  const renderItem = (data) => (
    <View key={data.id} style={[styles.flatContainer]}>
      <FastImage source={data.image} style={styles.imageStyle} />
      <Text style={styles.titleText}>{data.title}</Text>
      <Text style={styles.descText}>{data.price}</Text>
      <Text style={styles.descText}>{data.stock}</Text>
      <TouchableOpacity>
      <VectorImage source={edit_icon} style={styles.iconStyle} />
      </TouchableOpacity>
      <TouchableOpacity>
      <VectorImage source={delete_blackbox} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
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
          <Text style={styles.productText}>{CONTEXT.SET_DISCOUNT}</Text>
        </View>

        <ScrollView
          horizontal={true}
          style={styles.scrollDesign}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <View style={styles.horizontalView}>
              <Text style={[styles.headText, { width: 195 }]}>
                {CONTEXT.PRODUCT_NAME}
              </Text>
              <Text style={[styles.headText, { width: 72 }]}>
                {CONTEXT.PRICE}
              </Text>

              <Text style={[styles.headText]}>{CONTEXT.STOCK}</Text>
            </View>
            <FlatList
              data={productList}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>

        <CustomTwoButton
          firstTitile={CONTEXT.ADD_PRODUCT}
          secondTitile={"Send (1)"}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
  },
  imageStyle: {
    width: 40,
    height: 24,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  titleText: {
    textAlign: "justify",
    width: "34%",
    fontSize: 13,
    fontFamily: GILROY_MEDIUM,
    color: Colors.midBlack,
  },
  descText: {
    textAlign: "justify",
    width: "17%",
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: Colors.lightBlack,
  },
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
    marginTop:9
  },
  horizontalView: {
    flexDirection: "row",
    backgroundColor: Colors.lightGrey,
    width: "100%",
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
  flatContainer: {
    width: 470,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    marginTop:1,
    borderBottomColor: Colors.lightGrey50,
    borderBottomWidth: 0.5,
  },
  scrollDesign: {
    flexGrow: 0,
    marginHorizontal: 12,
  },
  iconStyle: {
    width: 20,
    height: 17,
    resizeMode: "contain",
    marginHorizontal: 15
  },
});

export default SetDiscount;
