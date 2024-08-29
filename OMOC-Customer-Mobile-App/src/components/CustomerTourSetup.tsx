import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop, WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import {
    blackColor,
  lightGrey,
  skyBlueColor,
  whiteColor,
} from "../utils/colors";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
} from "../utils/fonts";
import { palceholders, strings } from "../assets/string/strings";

const CustomerTourSetup = ({ hideMe, onConfirmPayment }) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => {
      return [80, '30%'];
    }, []);
  
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
      enablePanDownToClose={true}
      backgroundComponent={() => (
        <View style={[styles.backContainer, { backgroundColor: whiteColor }]} />
      )}
    >
      <View style={styles.totalprice}>
        <Text style={styles.textTotal}>{palceholders.TAKE_TOUR_TEXt}{'\n'} checkout</Text>
        <Text style={styles.textGuide}>{palceholders.YOUR_WILL_GUIDED}</Text>
      </View>
      <View>
      <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            onConfirmPayment();
          }}
        >
          <Text style={styles.btnText}>{palceholders.START_TOUR}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default CustomerTourSetup;

const styles = StyleSheet.create({
    backContainer: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      },
  totalprice: {
    marginTop: 25,
    marginHorizontal: 25,
    alignSelf:"center"
  },
  textColor: {
    color: whiteColor,
    textAlign: "center",
    marginLeft: 30,
  },
  textTotal: {
    fontSize: 20,
    color:blackColor,
    fontFamily: GILROY_MEDIUM,
    textAlign:'center'
  },
  textGuide: {
    marginTop:25,
    fontSize: 14,
    color:blackColor,
    fontFamily: GILROY_REGULAR,
    textAlign:'center'
  },
  container: {
    paddingTop: 30,
    gap: 30,
    position: "absolute",
    bottom: 6,
    backgroundColor: whiteColor,
    width: "100%",
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    borderRadius:30,
    paddingBottom: 10,
  },
  
  btn: {
    backgroundColor: skyBlueColor,
    color: whiteColor,
    overflow: "hidden",
    alignItems: "center",
  },
  delete: {
    backgroundColor: lightGrey,
    width: 48,
    height: 48,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: skyBlueColor,
    alignItems: "center",
    alignSelf: "center",
    width: '95%',
    paddingVertical: 13,
    borderRadius: 24,
    marginTop: 25,
  },
  btnText: {
    color: whiteColor,
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
});


