import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop, WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import {
  grey,
  lightGrey,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { palceholders, strings } from "../../assets/string/strings";

const AddNoteBottomSheet = ({ hideMe, onConfirmPayment }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => {
    return [80, WINDOW_HEIGHT*0.5];
  }, []);

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
      enablePanDownToClose={true}
      backgroundComponent={() => (
        <View style={[styles.backContainer, { backgroundColor: whiteColor }]} />
      )}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.addNoteText}>{strings.ADD_NOTE}</Text>
        <TextInput
          multiline={true}
          placeholder={palceholders.ADD_NOTE}
          numberOfLines={10}
          style={styles.inputArea}
          placeholderTextColor={grey}
        />
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            onConfirmPayment();
          }}
        >
          <Text style={styles.btnText}>{strings.CONFIRM_PAYMENT}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default AddNoteBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    height: WINDOW_HEIGHT*0.5,
    paddingHorizontal: 20,
    gap: 20,
    paddingVertical: 20,
  },
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  addNoteText: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: GILROY_SEMIBOLD,
    color: neutralBlack,
  },
  inputArea: {
    backgroundColor: lightGrey,
    height: "50%",
    borderRadius: 12,
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
  confirmButton: {
    backgroundColor: skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginTop: 15,
  },
  btnText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
});
