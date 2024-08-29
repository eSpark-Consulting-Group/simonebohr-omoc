import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  SCREEN_HEIGHT,
} from "@gorhom/bottom-sheet";
import { strings } from "../assets/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import {
  gray88,
  grey,
  midGray,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../utils/colors";
import { square_un_checkbox } from "../utils/images";
import VectorImage from "react-native-vector-image";

const ReportBottomSheet = ({ hideMe, handleBottomSheet }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", SCREEN_HEIGHT * 0.68], []);
  const [text, setText] = useState("");

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
      backgroundComponent={() => (
        <View style={[styles.backContainer, { backgroundColor: whiteColor }]} />
      )}
    >
      <BottomSheetScrollView style={{ flex: 1 }}>
        <View style={styles.mainView}>
          <View style={styles.viewReport}>
            <Text style={styles.report}>{strings.REPORT}</Text>
            <Text style={styles.tellUs}>{strings.TELL_US_ABOUT}</Text>
          </View>
          <View style={styles.inputLegalPolicy}>
            <TextInput
              placeholder={strings.LOREM_IPSUM}
              multiline={true}
              value={text}
              onChangeText={(val) => setText(val)}
            />
          </View>
          <View style={styles.viewTextbox}>
            <TouchableOpacity>
              <VectorImage
                source={square_un_checkbox}
                style={styles.checkbox}
              />
            </TouchableOpacity>
            <Text style={styles.alsoBlock}>{strings.ALSO_BLOCK}</Text>
          </View>
        </View>
      </BottomSheetScrollView>
      <View style={styles.button}>
        <TouchableOpacity style={styles.buttonView} onPress={handleBottomSheet}>
          <Text style={styles.btnText}>{strings.SEND_REPORT}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default ReportBottomSheet;

const styles = StyleSheet.create({
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomSheetStyle: {
    backgroundColor: midGray,
    width: 61,
    height: 4,
  },
  viewReport: {
    gap: 10,
    marginTop: 20,
  },
  mainView: {
    marginHorizontal: 20,
    marginBottom: 5,
  },
  report: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 20,
    color: neutralBlack,
  },
  tellUs: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: grey,
  },
  inputLegalPolicy: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.3,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 10,
    borderColor: gray88,
    marginTop: 15,
    alignSelf: "center",
  },
  alsoBlock: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: neutralBlack,
    marginTop: 5,
  },
  buttonView: {
    width: "95%",
    height: 51,
    borderColor: skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: skyBlueColor,
    justifyContent: "center",
  },
  btnText: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: whiteColor,
  },
  checkbox: {
    height: 24,
    width: 24,
  },
  viewTextbox: {
    gap: 10,
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    position: "absolute",
    bottom: 25,
    width: "100%",
    alignItems: "center",
  },
});
