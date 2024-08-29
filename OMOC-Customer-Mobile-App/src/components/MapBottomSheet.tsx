import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { palceholders, strings } from "../assets/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import {
  grey,
  lightGrey,
  neutralBlack,
  whiteColor,
  skyBlueColor,
} from "../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const MapBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => {
    return ["32%", "32%"];
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
      snapPoints={snapPoints}
      backgroundComponent={() => (
        <View style={[styles.backContainer, { backgroundColor: whiteColor }]} />
      )}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.NoteText}>Sumberjaya</Text>
        <Text style={styles.addressText}>
          Street Juana no.16, California, 45746, USA
        </Text>
        <Text style={styles.foundText}>
          Not found?
          <Text style={styles.manuallyText}>{strings.SET_MANUALLY}</Text>
        </Text>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.btnText}>{strings.CONTINUE}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};
export default MapBottomSheet;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: "80%",
    paddingHorizontal: 20,
    gap: 20,
    paddingVertical: 20,
  },
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  NoteText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: GILROY_SEMIBOLD,
    color: neutralBlack,
  },
  continueButton: {
    backgroundColor: skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginTop: "6%",
  },
  btnText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  addressText: {
    color: grey,
    fontWeight: "500",
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
  },
  foundText: {
    color: grey,
    fontWeight: "500",
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    marginTop: "5%",
  },
  manuallyText: {
    color: skyBlueColor,
    fontSize: 12,
  },
});
