import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CONTEXT, strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { Colors } from "../utils/colors";

const ReturnAddressBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["45%", "45%"], []);

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
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.viewtextHeader}>
            <Text style={styles.barcode}>{CONTEXT.RETURN_ADDRESS}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textYouCan}>
              {CONTEXT.SEND_ADDRESS_TO_BUYER}
            </Text>
            <TouchableOpacity>
              <Text style={styles.changeAdd}>{CONTEXT.CHANGE_ADDRESS}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.aryaView}>
            <View style={styles.viewNameAddress}>
              <Text style={styles.arya}>Arya Kurniawan</Text>
              <Text style={styles.address}>{CONTEXT.ADD_ARYA}</Text>
              <Text style={styles.noHp}>No Hp</Text>
              <Text style={styles.arya}>+62 8987690281</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.buttonViewCreate}>
        <Text style={styles.textButton}>{strings.SAVE}</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
};

export default ReturnAddressBottomSheet;

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
  viewNameAddress: {
    gap: 10,
    marginHorizontal: 18,
    marginTop: 10,
  },
  viewtextHeader: {
    marginTop: 25,
  },
  changeAdd: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.skyBlueColor,
  },
  noHp: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    color: Colors.grey,
  },
  arya: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.neutral100,
  },
  address: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.grey,
  },
  aryaView: {
    width: "100%",
    backgroundColor: Colors.whiteColor,
    height: 146,
    borderRadius: 8,
    marginTop: 15,
    borderWidth: 1,
    borderColor: Colors.neutralGrey,
  },
  textView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  barcode: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 20,
    color: Colors.neutralBlack,
  },

  textYouCan: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.neutral100,
  },
  mainView: {
    flex: 1,
    marginHorizontal: 15,
  },

  buttonViewCreate: {
    width: "95%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    borderRadius: 24,
    alignSelf: "center",
    backgroundColor: Colors.skyBlueColor,
    justifyContent: "center",
    gap: 5,
    bottom: 20,
    marginTop: 5,
  },

  textButton: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
    textAlign: "center",
  },
});
