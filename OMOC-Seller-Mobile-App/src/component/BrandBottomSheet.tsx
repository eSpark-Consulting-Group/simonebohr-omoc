import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { camera_icon, omoc_image } from "../utils/images";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";

const BrandBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => 
["45%", "45%"], []);

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
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.bottomSheetStyle}
      backgroundComponent={() => (
        <View
          style={[styles.backContainer, { backgroundColor: Colors.whiteColor }]}/>
      )} >
      <View style={styles.contentContainer}>
        <Text style={styles.NoteText}>{strings.EDIT_PROFILE}</Text>

        <View style={styles.imageText}>
        <FastImage source={omoc_image} style={styles.omocImage} />
        <TouchableOpacity style={styles.cameraIcon}>
          <VectorImage style={styles.victorIcon} source={camera_icon} /> 
         </TouchableOpacity>
          <Text style={styles.omoc}>{strings.OMOC_OFFICIAL}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.textomoc}>{strings.OMOC_OFFICIAL}</Text>
        </View>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.btnText}>{strings.SAVE}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};
export default BrandBottomSheet;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: "80%",
    paddingHorizontal: 20,
    gap: 10,
    paddingVertical: 17,
  },
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  NoteText: {
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    color: Colors.neutralBlack,
  },
  input: {
    width: "98%",
    height: "40%",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderColor: Colors.gray88,
  },
  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginTop: "3%",
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  addressText: {
    color: Colors.grey,
    fontWeight: "500",
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
  },
  foundText: {
    color: Colors.grey,
    fontWeight: "500",
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    marginTop: "5%",
  },
  manuallyText: {
    color: Colors.skyBlueColor,
    fontSize: 12,
  },
  bottomSheetStyle: {
    backgroundColor: Colors.neutralGrey,
    width: 61,
    height: 4,
  },
  texticonView: {
    width: "98%",
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.warningYellow,
    borderWidth: 1,
    padding: 10,
    gap: 10,
    flexDirection: "row",
    borderColor: Colors.yellow,
    marginTop: 10,
  },
  textmakeSure: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    marginTop: 5,
    color: Colors.midBlack,
    letterSpacing: 0.9,
  },
  imageText: {
    height: "45%",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  omocImage: {
    height: 80,
    width: 80,
    resizeMode:'contain'
  },
  omoc: {
    marginTop: 20,
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 13,
    color: Colors.neutralBlack,
  },
  box: {
    width: "98%",
    borderRadius: 12,
    borderWidth: 0.7,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderColor: Colors.skyBlueColor,
    marginTop:12,
  },
  textomoc: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 14,
    lineHeight: 19.09,
    color: Colors.neutralBlack,
  },
  cameraIcon: {
    borderRadius: 16,
    position:'absolute',
    bottom:-4,
    left:17 
  },
  victorIcon:{
    
  }

});
