import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { FC, useCallback, useMemo, useRef, useState,useEffect } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { palceholders, strings } from "../../assets/string/strings";
import { GILROY_MEDIUM } from "../../utils/fonts";
import { TextInput } from "react-native";
import { blackColor, grey, purple, skyBlueColor, whiteColor } from "../../utils/colors";
import { useDispatch } from "react-redux";
import VectorImage from "react-native-vector-image";
import { group_save, unsave, white_save } from "../../utils/images";


interface Props {
  hideMe: any;
  ontext?: any;
  onclose: any;
}

const AddwhishlistBottomsheet:FC<Props> = ({ hideMe,onSingleAdd}:Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [10, "30%"], []);

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
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.bottomSheetStyle}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.headingText}>{palceholders.OPTION_ADD_TO_WISHLIST}</Text>
        <TouchableOpacity style={[styles.btnContainer,{marginTop: 27}]} onPress={()=>onSingleAdd()}>
            <VectorImage source={unsave} style={[styles.imageStyle,{tintColor:purple}]}/>
        <Text style={styles.buttonText}>{palceholders.ADD_TO_MY_WISHLIST}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}>
            <VectorImage source={white_save} style={styles.imageStyle}/>
        <Text style={styles.buttonText}>{palceholders.ADD_TO_GROUP_WISHLIST}</Text>
        </TouchableOpacity>  
        
      </View>
    </BottomSheet>
  );
};

export default AddwhishlistBottomsheet

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 10,
  },
  headingText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: GILROY_MEDIUM,
  },
  imageStyle: {
    width:25,
    height:25,
    resizeMode:'contain',
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    marginLeft: 15,
  },
  bottomSheetStyle: { 
    backgroundColor: "#D9D9D9",
     width: 45
     },
  textInput: {
    width: 350,
    borderColor: grey,
    borderWidth: 1,
    borderRadius: 9,
    padding: 10,
    marginTop: 30,
    alignSelf: "center",
  },
  addButton: {
    width: 355,
    backgroundColor: purple,
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignSelf:'center',
    marginTop: 35,
  },
  cancelButton: {
    width: 150,
    alignSelf: "center",
    backgroundColor: whiteColor,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderColor:purple,
    borderWidth:1
  },
  buttonText: {
    color: blackColor,
    fontSize:14,
    fontFamily:GILROY_MEDIUM,
    textAlign: "center",
  },
  modelStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 10,
    borderRadius: 10,
    gap: 5,
    backgroundColor: whiteColor,
  },
  AddText: {
    color: blackColor,
    fontSize: 16,
    fontWeight: "500",
  },
 
});



