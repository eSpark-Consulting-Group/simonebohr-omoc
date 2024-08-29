import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CONTEXT } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";

const ReceiptBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "35%"], []);

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
        <View style={styles.viewtextHeader}>
          <Text style={styles.barcode}>{CONTEXT.CONFIRM_RECEIPT}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.textYouCan}>{CONTEXT.WANT_TO_GIVE}</Text>
        </View>
        <View style={styles.containerBTN}>
          <TouchableOpacity style={styles.buttonViewCreate}>
            <Text style={styles.textButton}>
              {CONTEXT.YES_ACCEPT_THE_SOLUTIONS}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerBTNCancel}>
          <TouchableOpacity style={styles.buttonViewCancel}>
            <Text style={styles.textButtonCancel}>{CONTEXT.CANCEL}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default ReceiptBottomSheet;

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
  viewtextHeader: {
    marginTop: 25,
    marginLeft: 10,
  },
  textView: {
    marginTop: 15,
    marginHorizontal: 45,
  },
  barcode: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 20,
    color: Colors.neutralBlack,
    textAlign: "center",
  },
  textYouCan: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.grey,
    lineHeight: 20,
    textAlign: "center",
  },
  mainView: {
    flex: 1,
    marginHorizontal: 15,
  },

  buttonViewCreate: {
    width: "100%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  buttonViewCancel: {
    width: "100%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },

  containerBTN: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: "30%",
  },
  containerBTNCancel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 25,
  },

  textButton: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  textButtonCancel: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.skyBlueColor,
  },
});
