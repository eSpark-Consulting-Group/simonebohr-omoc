import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CONTEXT,  strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR,  } from "../utils/fonts";
import { Colors } from "../utils/colors";
import FastImage from "react-native-fast-image";
import { Frame } from "../utils/images";

const BarcodeBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["55%", "55%"], []);

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
      index={1}
      handleIndicatorStyle={styles.bottomSheetStyle}
      onChange={handleSheetChanges}
    >
      <View style={styles.mainView}>
        <View style={styles.imageView}>
          <FastImage source={Frame} style={styles.image} />
        </View>
        <View style={styles.viewtextHeader}>
          <Text style={styles.barcode}>{CONTEXT.THE_BARCODE_MATCH}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.textYouCan}>
            {CONTEXT.THE_BARCODE_THE_PRODUCT}
          </Text>
        </View>

        <View style={styles.containerBTN}>
          <TouchableOpacity style={styles.buttonViewCreate}>
            <Text style={styles.textButton}>{strings.SAVE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default BarcodeBottomSheet;

const styles = StyleSheet.create({
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomSheetStyle: {
    backgroundColor: Colors.neutralGrey,
    width: 61,
    height: 4,
  },
  imageView: {
    alignItems: "center",
    marginTop: 25,
  },
  mainView: {
    flex: 1,
    marginHorizontal: 15,
  },
  image: {
    width: 120,
    height: 120,
  },
  textView: {
    marginTop: 15,
    marginHorizontal: 30,
  },
  barcode: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 24,
    color: Colors.neutralBlack,
    textAlign: "center",
  },
  viewtextHeader: {
    marginTop: 25,
    marginLeft: 10,
  },
  textYouCan: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.dimGray,
    lineHeight: 20,
    textAlign: "center",
  },
  buttonViewCreate: {
    width: "100%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
  },
  containerBTN: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  textButton: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
});
