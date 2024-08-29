import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CONTEXT } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";
import VectorImage from "react-native-vector-image";
import { bag_happy_icon, profile } from "../utils/images";

const SubscriptionBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "45%"], []);

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
          <Text style={styles.barcode}>{CONTEXT.SELECT_TYPE}</Text>
        </View>
        <TouchableOpacity style={styles.generalSub}>
          <View style={styles.bagIconView}>
            <VectorImage source={bag_happy_icon} style={styles.bagIcon} />
          </View>
          <View style={styles.viewGenSub}>
            <Text style={styles.textGen}>{CONTEXT.GENERAL_SUBSCRIPTION}</Text>
            <Text style={styles.textPro}>{CONTEXT.TAG_THE_PRODUCT}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.certSub}>
          <View style={styles.bagIconView}>
            <VectorImage source={profile} style={styles.profileIcon} />
          </View>
          <View style={styles.viewCerSell}>
            <Text style={styles.textGen}>{CONTEXT.CERTAIN_SUBSCRIPTION}</Text>
            <Text style={styles.textPro}>{CONTEXT.SELL_NUMEROUS}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default SubscriptionBottomSheet;

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
  viewCerSell: {
    marginHorizontal: 30,
    gap: 10,
  },
  viewtextHeader: {
    marginTop: 25,
  },
  bagIconView: {
    left: 10,
  },
  viewGenSub: {
    marginHorizontal: 20,
    gap: 10,
  },

  barcode: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 24,
    color: Colors.neutralBlack,
  },

  mainView: {
    marginHorizontal: 15,
  },
  generalSub: {
    width: "100%",
    height: 87,
    backgroundColor: Colors.aliceBlue,
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 16,
    borderColor: Colors.lightGrey50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  certSub: {
    width: "100%",
    height: 87,
    backgroundColor: Colors.whiteColor,
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 16,
    borderColor: Colors.lightGrey50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bagIcon: {
    height: 24,
    width: 24,
    tintColor: Colors.skyBlueColor,
  },
  profileIcon: {
    height: 24,
    width: 24,
    tintColor: Colors.codgray,
  },
  textGen: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    color: Colors.midBlack,
  },
  textPro: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.mediumGrey,
  },
});
