import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CONTEXT, strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { Colors } from "../utils/colors";
import { add_icon, } from "../utils/images";
import VectorImage from "react-native-vector-image";

const ConfirmReceiptBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "70%"], []);

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
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.viewtextHeader}>
            <Text style={styles.addLegal}>{CONTEXT.CONFIRM_RECEIPT}</Text>
          </View>

          <View style={styles.inputLegalPolicy}>
            <TextInput placeholder={strings.WRITE_MESSAGE} multiline={true} />
          </View>
          <Text style={styles.textExample}>{strings.EXAMPLE}</Text>

          <View style={styles.viewtextProof}>
            <Text style={styles.proof}>{strings.PROOF}</Text>
            <Text style={styles.textVideo}>{strings.UPLOAD_PHOTO_VIDEO}</Text>
          </View>

          <View style={styles.imagetextContainer}>
            <View style={styles.subImageView}>
              <VectorImage source={add_icon} style={styles.photoAdd} />
            </View>
            <View style={styles.viewtextVideo}>
              <Text style={styles.textPhoto}>.{strings.PHOTO_FORMAT}</Text>
              <Text style={styles.textPhoto}>.{strings.VIDEO_FORMAT}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.btnText}>{strings.SAVE}</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
};

export default ConfirmReceiptBottomSheet;

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
  imagetextContainer: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  mainView: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 90,
  },
  addLegal: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  viewtextVideo: {
    marginHorizontal: 30,
  },
  subImageView: {
    width: 72,
    height: 72,
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 12,
    justifyContent: "center",
  },
  textPhoto: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 10,
    color: Colors.dangerRed,
    lineHeight: 12,
  },
  photoAdd: {
    height: 24,
    width: 24,
    tintColor: Colors.neutral80,
    resizeMode: "contain",
  },

  viewtextHeader: {
    marginTop: 30,
  },
  viewtextProof: {
    marginTop: 30,
    gap: 15,
  },

  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginHorizontal: 10,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: "95%",
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },

  proof: {
    color: Colors.neutralBlack,
    fontSize: 20,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  textVideo: {
    color: Colors.grey,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    lineHeight: 15,
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
});
