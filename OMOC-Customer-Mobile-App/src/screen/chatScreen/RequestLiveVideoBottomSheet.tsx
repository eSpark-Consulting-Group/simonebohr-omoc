import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { neutralBlack, skyBlueColor, whiteColor } from "../../utils/colors";
import { brandIcon, face_image } from "../../utils/images";
import FastImage from "react-native-fast-image";
import { strings } from "../../assets/string/strings";
import { GILROY_SEMIBOLD } from "../../utils/fonts";
import CustomButton from "../../components/CustomButton";

const RequestLiveVideoBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [10, "50%"], []);
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
    >
      <View style={styles.allContainer}>
        <View style={styles.imagesView}>
          <FastImage source={brandIcon} style={styles.omocIcon} />
          <FastImage source={face_image} style={styles.faceimg} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textRequest}>{strings.REQUEST_LIVE_VIDEO}</Text>
        </View>
        <View style={styles.btnView}>
          <CustomButton
            textstyle={styles.btnColor}
            style={styles.cancelBtn}
            text="Cancel"
          />
          <CustomButton
            textstyle={styles.requestBtn}
            style={styles.btn}
            text="Request"
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default RequestLiveVideoBottomSheet;

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
    backgroundColor: whiteColor,
    marginHorizontal: 25,
  },
  imagesView: {
    flexDirection: "row",
    marginTop: 40,
  },
  omocIcon: {
    height: 90,
    width: 90,
    alignSelf: "center",
    left: 104,
  },
  btn: {
    backgroundColor: skyBlueColor,
    gap: 10,
    height: 51,
    width: 176,
  },
  faceimg: {
    height: 100,
    width: 100,
    left: 85,
  },
  textRequest: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 28,
    alignItems: "center",
    textAlign: "center",
    color: neutralBlack,
    marginHorizontal: 10,
  },
  textView: {
    marginTop: 50,
    marginHorizontal: 50,
    alignItems: "center",
  },
  btnView: {
    marginTop: 50,
    gap: 8,
    height: 51,
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
  },
  btnColor: {
    color: skyBlueColor,
    backgroundColor: whiteColor,
  },
  requestBtn: {
    color: whiteColor,
  },
  cancelBtn: {
    backgroundColor: whiteColor,
    gap: 10,
    height: 51,
    width: 176,
    borderColor: skyBlueColor,
    borderWidth: 1,
  },
});
