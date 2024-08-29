import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { Colors } from "../utils/colors";
import { cross_icon, user_frame } from "../utils/images";
import VectorImage from "react-native-vector-image";
import FastImage from "react-native-fast-image";

const AddReasonBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "60%"], []);

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
      <View style={styles.mainView}>
        <View style={styles.viewtextHeader}>
          <Text style={styles.addLegal}>{strings.ADD_REASON}</Text>
        </View>

        <View style={styles.inputLegalPolicy}>
          <TextInput placeholder={strings.WRITE_A_REASON} multiline={true} />
        </View>
        <Text style={styles.textExample}>{strings.EXAMPLE_CERTAIN}</Text>

        <View style={styles.viewTag}>
          <Text style={styles.tagText}>{strings.TAG_EMPLOYEES}</Text>
          <View style={styles.imageBoxView}>
            <View style={styles.imageView}>
              <FastImage source={user_frame} style={styles.userImage} />
              <Text style={styles.name}>Gloria Hany</Text>
              <TouchableOpacity>
                <VectorImage source={cross_icon} style={styles.crossIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.imageView}>
              <FastImage source={user_frame} style={styles.userImage} />
              <Text style={styles.name}>Jack Daniel</Text>
              <TouchableOpacity>
                <VectorImage source={cross_icon} style={styles.crossIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.onlyTagged}>{strings.ONLY_TAGGED}</Text>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.btnText}>{strings.SAVE}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default AddReasonBottomSheet;

const styles = StyleSheet.create({
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  userImage: {
    height: 25,
    width: 25,
  },
  bottomSheetStyle: {
    backgroundColor: Colors.neutralGrey,
    width: 61,
    height: 4,
  },
  mainView: {
    flex: 1,
    marginHorizontal: 15,
  },
  onlyTagged: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 10,
    color: Colors.yellow,
    marginTop: 10,
  },
  name: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.neutralBlack,
  },
  tagText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.midBlack,
  },
  imageBoxView: {
    flexDirection: "row",
    gap: 11,
  },
  crossIcon: {
    height: 18,
    width: 18,
  },

  addLegal: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  imageView: {
    width: 150,
    height: 32,
    backgroundColor: Colors.lightGrey,
    borderRadius: 106,
    paddingVertical: 3.56,
    paddingHorizontal: 10.68,
    gap: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
  viewTag: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 25,
    borderColor: Colors.gray88,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  inputLegalPolicy: {
    width: "100%",
    height: "25%",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    borderColor: Colors.gray88,
    marginTop: 25,
    alignSelf: "center",
  },
  textExample: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.grey,
    marginTop: 15,
  },
  viewtextHeader: {
    marginTop: 30,
  },
  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginTop: "11%",
    marginHorizontal: 10,
    position: "absolute",
    bottom: "8%",
    alignSelf: "center",
    width: "100%",
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
});
