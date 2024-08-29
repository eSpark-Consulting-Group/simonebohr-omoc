import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CONTEXT, strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";
import {  calendar_icon } from "../utils/images";
import VectorImage from "react-native-vector-image";

const FilterByTimesBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "50%"], []);

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
          <Text style={styles.addLegal}>{CONTEXT.FILTER_BY_TIME}</Text>
          <TouchableOpacity style={styles.btnReset}>
            <Text style={styles.reset}>{CONTEXT.RESET}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewmainCalender}>
          <View style={styles.calenderView}>
            <Text style={styles.nextBill}>{CONTEXT.FROM}</Text>
            <View style={styles.dateView}>
              <TextInput
                style={styles.inputDate}
                placeholder={CONTEXT.DD_MM_YY}
              />

              <TouchableOpacity>
                <VectorImage source={calendar_icon} style={styles.calIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.calenderViewTwo}>
            <View style={styles.dateView}>
              <TextInput
                style={styles.inputDate}
                placeholder={CONTEXT.DD_MM_YY}
              />

              <TouchableOpacity>
                <VectorImage source={calendar_icon} style={styles.calIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.btnText}>{CONTEXT.APPLY_FILTERS}</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
};

export default FilterByTimesBottomSheet;

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
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 24,
    color: Colors.neutralBlack,
  },
  reset: {
    fontFamily: GILROY_REGULAR,
    fontSize: 10,
    color: Colors.skyBlueColor,
  },
  viewtextHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginHorizontal: 10,
    position: "absolute",
    bottom: "15%",
    alignSelf: "center",
    width: "95%",
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  btnReset: {
    width: 60,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: Colors.skyBlueColor,
  },
  calenderView: {
    width: "49%",
    height: 91,
    marginTop: 10,
  },
  calenderViewTwo: {
    width: "49%",
    height: 91,
    marginTop: 25,
  },
  dateView: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderColor: Colors.neutralGrey,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextBill: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.neutralBlack,
  },
  inputDate: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.grey,
  },
  calIcon: {
    tintColor: Colors.grey,
    height: 24,
    width: 24,
  },
  viewmainCalender: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
