import React, { useCallback, useRef, useMemo,} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { CONTEXT} from "../../../utils/string/strings";
import { Colors } from "../../../utils/colors";
import CustomButton from "../../../component/CustomButton";
import { GILROY_MEDIUM , GILROY_REGULAR, GILROY_SEMIBOLD} from "../../../utils/fonts";

const AutoReturnModel = ({ hideMe,}) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => ["25%",  "30%"],
    []
  );

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
      style={styles.bottomView}>
      <TouchableOpacity
        style={styles.regionView}>
      
        <View style={styles.createViewText}>
          <Text style={styles.regionText}>{CONTEXT.RETURN_TEXT}</Text>
        </View>
        
      </TouchableOpacity>

     

      <View style={styles.BtnView}>
        <CustomButton
          text={'Done'}
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
  regionView: {
    width: "100%",
    flexDirection: "row",
    justifyContent:'space-between',
    paddingVertical: 15,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  blueBorder:{
    width: "25%",
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.5,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems:'center'
  },
  regionText: {
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
   lineHeight:25,
    marginBottom:6
  },
  greyText: {
    fontSize: 13,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.skyBlueColor,
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
  createViewText:{marginRight:5, }
});

export default AutoReturnModel;


