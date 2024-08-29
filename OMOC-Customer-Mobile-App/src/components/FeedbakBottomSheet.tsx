import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { TextInput } from "react-native";
import { grey, lightGrey, lightGrey50, skyBlueColor, whiteColor } from "../utils/colors";
import { GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { palceholders, strings } from "../assets/string/strings";
import CustomButton from "./CustomButton";

const FeedbakBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [10, "43%"], []);
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
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>{strings.OMOC_FEEDBACK}</Text>
        <Text style={styles.subHeading}>{strings.TELL_US_FEEDBACK}</Text>
        <TextInput
          multiline={true}
          placeholder={palceholders.ENTER_YOUR_FEEDBACK}
          numberOfLines={10}
          style={styles.inputArea}
          placeholderTextColor={lightGrey50}
        />
        <CustomButton
          textstyle={styles.textSytle}
          style={styles.btn}
          text={strings.SUBMIT}
        />
      </View>
    </BottomSheet>
  );
};

export default FeedbakBottomSheet;

const styles = StyleSheet.create({
  inputArea: {
    height: "50%",
    borderRadius: 24,
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    borderWidth: 0.8,
    borderColor: lightGrey50,
    marginVertical: 10,
  },
  mainContainer: {
    margin: 15,
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: GILROY_SEMIBOLD,
  },
  subHeading: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    marginVertical: 10,
    color: lightGrey50,
  },
  btn: {
    backgroundColor: skyBlueColor,
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  textSytle: {
    color: whiteColor,
  },
});
