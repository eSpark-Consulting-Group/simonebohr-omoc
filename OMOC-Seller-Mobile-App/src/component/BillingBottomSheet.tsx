import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import VectorImage from "react-native-vector-image";
import {
  blank_round_circle,
  blue_add_icon,
  blue_round_circle,
  card_logo_icon,
  paypal_logo_icon,
} from "../utils/images";

const BillingBottomSheet = ({ hideMe, onAddCard }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "48%"], []);

  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleBottomSheet = () => {
    setShowBottomSheet(false);
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
      backdropComponent={renderBackdrop}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.bottomSheetStyle}
      backgroundComponent={() => (
        <View
          style={[styles.backContainer, { backgroundColor: Colors.whiteColor }]}
        />
      )}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.textPaymentMethod}>{strings.PAYMENT_METHOD}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.viewPaypal}>
            <VectorImage
              source={blue_round_circle}
              style={styles.iconBlueRound}
            />
            <View style={styles.viewTitle}>
              <Text style={styles.paypal}>{strings.PAYPAL_MASTERCARD}</Text>
              <Text style={styles.credit}>{strings.CREDIT}</Text>
            </View>
            <VectorImage source={paypal_logo_icon} style={styles.payIcon}/>
          </View>
          <View style={styles.viewbankCard}>
            <VectorImage source={blank_round_circle} style={styles.blankIcon} />
            <View style={styles.viewText}>
              <Text style={styles.paypal}>{strings.BANK_CARD}</Text>
              <Text style={styles.credit}>{strings.CREDIT}</Text>
            </View>
            <VectorImage source={card_logo_icon} />
          </View>
          <View style={styles.viewToucable}>
            <TouchableOpacity
              style={styles.toucableIcon}
              onPress={() => onAddCard()}
            >
              <VectorImage source={blue_add_icon} style={styles.addIcon} />
              <Text style={styles.addCard}>{strings.ADD_CARDS}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.btnText}>{strings.CONTINUE}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};
export default BillingBottomSheet;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: "80%",
    paddingHorizontal: 15,
    gap: 15,
    paddingVertical: 20,
  },
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  textPaymentMethod: {
    fontSize: 24,
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    color: Colors.neutralBlack,
  },
  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginTop: "10%",
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  iconBlueRound: {
    right: 10,
    height:25,
    width:25,
    resizeMode:'contain'
  },
  payIcon:{
    height:25,
    width:25,
    resizeMode:'contain'
  },
  bottomSheetStyle: {
    backgroundColor: Colors.neutralGrey,
    width: 61,
    height: 4,
  },
  blankIcon: { right: 10 },
  viewPaypal: {
    width: "93%",
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.3,
    paddingVertical: 16,
    marginBottom:14,
    borderColor: Colors.neutralGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf:'center',alignItems:'center'
  },
  viewbankCard: {
    width: "93%",
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.3,
    paddingVertical: 16,
    marginBottom:14,
    flexDirection: "row",
    alignSelf:'center',
    alignItems:'center',
    justifyContent: "space-between",
  },
  addCard: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.skyBlueColor,
  },
  paypal: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.blackColor,
  },
  credit: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.spanishGrey,
    marginTop: 12,
  },
  addIcon: {
    marginHorizontal:8
  },
  toucableIcon: {
    flexDirection: "row",
    alignItems:'center'
  },
  viewToucable: {
    flexDirection: "row",
    marginTop: 15
  },
  viewText: {
    right: 75,
  },
  viewTitle: {
    right: 60,
  },
});
