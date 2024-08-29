import React, { useCallback, useRef, useMemo,useState,useEffect} from "react";
import { StyleSheet, View, Text,TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { bag_happy_icon, receipt_icon, tag_icon, tag_unselected } from "../../../utils/images";
import VectorImage from "react-native-vector-image";
import { Height } from "../../../utils";
import { GILROY_REGULAR, GILROY_SEMIBOLD } from "../../../utils/fonts";
import TabProductModel from "./TagProductModal";
import { Colors } from "../../../utils/colors";


const productList = [
  {
    id: 1,
    title: "Tag Product",
    desc: "Tag the product you want to send to users or buyers",
    image: tag_unselected,
  },
  {
    id: 2,
    title: "Bundling Product",
    desc: "Sell numerous items or product in a single transaction",
    image: bag_happy_icon,
  },
  {
    id: 3,
    title: "Set Discount",
    desc: "adjust the price of your product for specific buyers",
    image: receipt_icon,
  },
];

const ProductModal = ({ hideMe,onSelectProduct }) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", Height * 0.48], []);
 

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
        opacity={1}
      />
    ),
    []
  );

  const handlePress = (item) => {
    onSelectProduct(item);
  };
  

  



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
         <BottomSheetFlatList
          data={productList}
          style={styles.bottomsheetList}
          renderItem={({ item,index }) => ( 
            <TouchableOpacity
              key={item.id}
              style={[styles.listContainer,]}
              onPress={() => {handleSheetChanges(index); handlePress(item.title);}}>
              <VectorImage source={item.image} />
              <View style={styles.listContentView}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descText}>{item.desc}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </BottomSheet>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 210,
  },
  bottomSheetStyle: { backgroundColor: "#D9D9D9" },
  listContainer: {
    flexDirection: "row",
    marginBottom: 15,
    borderWidth: 1,
    padding: 15,
    width: "92%",
    alignSelf: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    borderColor:Colors.lightGrey50,
  },
  listContentView: { flexDirection: "column", gap: 5 },
  titleText: {
    textAlign: "justify",
    width: "80%",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: GILROY_SEMIBOLD,
    color:Colors.midBlack,
  },
  descText: {
    textAlign: "justify",
    width: "80%",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: Colors.mediumGrey,
  },
  bottomsheetList: { marginTop: 25 },
});

export default ProductModal;
