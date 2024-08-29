import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { Colors } from "../utils/colors";

const LegalPoliciesBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "80%"], []);

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
        <View
          style={[styles.backContainer, { backgroundColor: Colors.whiteColor }]}
        />
      )}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.viewtextHeader}>
          <Text style={styles.addLegal}>{strings.ADD_LEGAL_POLICIES}</Text>
        </View>
        <View style={styles.viewInput}>
          <TextInput style={styles.input} placeholder={strings.COUNTRY_NAME} />
        </View>
        <View style={styles.inputLegalPolicy}>
          <TextInput placeholder={strings.ENTER_LEGAL} multiline={true} />
        </View>
        <Text style={styles.textExample}>{strings.EXAMPLE}</Text>

        <View style={styles.inputLegalPolicy}>
          <TextInput placeholder={strings.ENTER_LANGUAGE} multiline={true} />
        </View>
        <Text style={styles.textExample}>{strings.EXAMPLE}</Text>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.btnText}>{strings.SAVE}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default LegalPoliciesBottomSheet;

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
  addLegal: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  viewtextHeader: {
    marginTop: 30,
    marginLeft: 16,
  },
  viewInput: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderColor: Colors.neutralGrey,
    marginTop: 20,
  },
  input: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.neutralBlack,
  },

  viewInputCOUNTRY: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderColor: Colors.neutralGrey,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.whiteColor,
  },

  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignSelf:'center',
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    width:'95%',
    position:'absolute',
    bottom:40,
    zIndex:0,
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  countryText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.neutralBlack,
    marginTop: 5,
  },
  inputLegalPolicy: {
    width: "95%",
    height: "25%",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    borderColor: Colors.gray88,
    marginTop: 15,
    alignSelf: "center",
  },
  textExample: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.grey,
    marginTop: 15,
    marginLeft: 15,
  },
});
