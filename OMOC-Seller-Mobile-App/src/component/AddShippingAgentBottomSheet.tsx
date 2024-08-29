import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CONTEXT } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";
import VectorImage from "react-native-vector-image";
import { arrow_down } from "../utils/images";
import CustomButton from "./CustomButton";

const AddShippingAgentBottomSheet = ({ hideMe }) => {
  const [trackingNumber, setTrackingNumber] = useState("");

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
        <View style={styles.viewtextHeader}>
          <Text style={styles.scan}>{CONTEXT.ADD_SHIPPING_AGENT}</Text>
        </View>

        <View style={styles.viewSuffix}>
          <TouchableOpacity style={styles.ChooseCategories}>
            <Text style={styles.textChoose}>
              {CONTEXT.SELECT_SHIPPING_AGENT}
            </Text>
            <VectorImage source={arrow_down} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewinput}>
          <TouchableOpacity style={styles.ChooseCategories}>
            <TextInput
              style={styles.textNumber}
              placeholder={CONTEXT.TRACKING_NUMBER}
              onChangeText={(newText) => setTrackingNumber(newText)}
            />
          </TouchableOpacity>
        </View>

        <CustomButton
          text={
            trackingNumber === ""
              ? CONTEXT.REQUEST_TO_PICKUP
              : CONTEXT.REQUEST_TO_PICKUP
          }
          style={[
            styles.btn,
            {
              backgroundColor:
                trackingNumber === "" ? Colors.lightGrey : Colors.skyBlueColor,
            },
          ]}
          textstyle={{
            color:
              trackingNumber === "" ? Colors.lightGrey50 : Colors.whiteColor,
          }}
          onPress={() => hideMe()}
        />
      </View>
    </BottomSheet>
  );
};

export default AddShippingAgentBottomSheet;

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
  mainView: {
    flex: 1,
    marginHorizontal: 15,
  },
  textView: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  viewSuffix: {
    marginTop: 30,
  },
  viewinput: {
    marginTop: 10,
  },
  scan: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "500",
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  viewtextHeader: {
    marginTop: 30,
    marginLeft: 10,
  },

  ChooseCategories: {
    width: "100%",
    height: 57,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: Colors.gray88,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textChoose: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.neutralBlack,
    width: "92%",
  },
  textNumber: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.neutralBlack,
    width: "92%",
  },
  btn: {
    marginTop: 50,
    width: "100%",
  },
});
