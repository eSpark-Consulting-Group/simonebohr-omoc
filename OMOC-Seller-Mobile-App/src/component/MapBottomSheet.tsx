import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { strings } from "../utils/string/strings";
import { GILROY_MEDIUM } from "../utils/fonts";
import { Colors } from "../utils/colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import VectorImage from "react-native-vector-image";
import { danger_icon } from "../utils/images";

const MapBottomSheet = ({ hideMe, location }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "40%"], []);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (text) => {
    setInputValue(text);
  };

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
      snapPoints={snapPoints}
      index={1}
      handleIndicatorStyle={styles.bottomSheetStyle}
      onChange={handleSheetChanges}
      backgroundComponent={() => (
        <View
          style={[styles.backContainer, { backgroundColor: Colors.whiteColor }]}
        />
      )}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.NoteText}>Edit Shop Address 1</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.input}>
            <TextInput
              onChangeText={handleInputChange}
              value={location}
              placeholder={strings.ADDRESS_DEATAIL}
              multiline={true}
            />
          </View>
          <View style={styles.texticonView}>
            <VectorImage source={danger_icon} />
            <Text style={styles.textmakeSure}>{strings.MAKE_SURE}</Text>
          </View>

          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.btnText}>{strings.ADD_ADDRESS}</Text>
          </TouchableOpacity>
        </ScrollView>
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
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    color: Colors.neutralBlack,
  },
  input: {
    width: "98%",
    height: "60%",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    marginBottom: "16%",
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
    marginTop: 12,
    alignItems: "center",
  },
  textmakeSure: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 10.5,
    color: Colors.midBlack,
    letterSpacing: 0.5,
  },
});
