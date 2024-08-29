import React, { useCallback, useRef, useMemo,useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop, BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { CONTEXT} from "../../../utils/string/strings";
import { Colors } from "../../../utils/colors";
import CustomButton from "../../../component/CustomButton";
import { GILROY_MEDIUM,GILROY_REGULAR,GILROY_SEMIBOLD} from "../../../utils/fonts";

const ProductNameModel = ({ hideMe,}) => {
    const [selectItem, setSelectItem] = useState(null);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => ["25%",  "60%"],
    []
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      hideMe();
    }
    return index;
  }, []);

  const onselect = (id) => {
    setSelectItem((prevSelectItem) =>
      prevSelectItem === id ? null : id
    );
  };

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

  const namelist=[
    {id:1 ,name:'Defective product'},
    {id:2 ,name:'Wrong product (size, color or different product)'},
    {id:3 ,name:'Item not working properly'},
    {id:4 ,name:'Non original product'},
    {id:5 ,name:'The product differs from the description/photo'},
  ]

  return (
    <BottomSheet
      ref={sheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.bottomSheetStyle}
      style={styles.bottomView}> 
        <View style={styles.createViewText}>
          <Text style={styles.regionText}>{CONTEXT.PRODUCT_NAME}</Text>
        </View>
        <BottomSheetFlatList
          data={namelist}
          style={styles.bottomsheetList}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.blueBorder,{backgroundColor: selectItem === item.id ? Colors.lightSkyBlue : Colors.whiteColor}]}
            onPress={() => onselect(item.id)}>
                <Text style={[styles.greyText,{ color:selectItem === item.id ?  Colors.skyBlueColor :Colors.blackColor}]}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

     

      <View style={styles.BtnView}>
        <CustomButton
          text={'Choose'}
          style={styles.button}
          textstyle={styles.btnName}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
  },

  blueBorder:{
    borderRadius: 5,
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems:'flex-start',
    marginVertical:2,
  },
  regionText: {
    fontSize: 20,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    marginBottom:6
  },
  greyText: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
   
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

  tabUnSelectTexT: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.skyBlueColor,
    fontSize: 12.5,
    marginTop:5,
  },
  createViewText:{marginRight:5, paddingVertical: 15, },
  bottomsheetList: { marginTop: 1 },
});

export default ProductNameModel;


