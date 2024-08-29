import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";
import VectorImage from "react-native-vector-image";
import { arrow_down } from "../utils/images";

const PaymentBottomSheet = ({ hideMe }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [condition, setCondition] = useState(false);

  const isValid = () => {
    if (
      name != "" ||
      cardNumber != "" ||
      expDate != "" ||
      cvv != "" ||
      countryCode != ""
    ) {
      return false;
    }
    return true;
  };

  const onCountrySelect = (country) => {
    setCountryCode(country.cca2);
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "60%"], []);

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
      <View style={styles.viewtextHeader}>
        <Text style={styles.enterPayment}>{strings.ENTER_PAYMENT}</Text>
      </View>
      <View style={styles.viewInput}>
        <TextInput
          onChangeText={(text) => {
            setName(text);
          }}
          value={name}
          style={styles.input}
          placeholder={strings.NAME_ON_CARD}
        />
      </View>
      <View style={styles.viewInputCardNumber}>
        <TextInput
          onChangeText={(text) => {
            setCardNumber(text);
          }}
          value={cardNumber}
          style={styles.input}
          placeholder={strings.CARD_NUMBER}
        />
      </View>

      <View style={styles.viewExp}>
        <View style={styles.viewExpDate}>
          <TextInput
            onChangeText={(text) => {
              setExpDate(text);
            }}
            value={expDate}
            style={styles.expDateInput}
            placeholder={strings.EXP_DATE}
          />
        </View>
        <View style={styles.viewCvv}>
          <TextInput
            onChangeText={(text) => {
              setCvv(text);
            }}
            value={cvv}
            style={styles.expDateInput}
            placeholder={strings.CVV}
          />
        </View>
      </View>
      <View style={styles.viewInputCOUNTRY}>
        <CountryPicker
          {...{
            countryCode,
            onSelect: onCountrySelect,
            withFlag: true,
            withFilter: true,
            withCountryNameButton: true,
            withAlphaFilter: true,
            withEmoji: true,
            modalProps: {},
          }}
          containerButtonStyle={styles.countryText}
        />
        <TouchableOpacity>
          <VectorImage source={arrow_down} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: isValid() ? Colors.gray88 : Colors.skyBlueColor },
        ]}
      >
        <Text
          style={[
            styles.btnText,
            { color: isValid() ? Colors.lightGrey50 : Colors.whiteColor },
          ]}
        >
          {strings.SAVE_CARD}
        </Text>
      </TouchableOpacity>
    </BottomSheet>
  );
};

export default PaymentBottomSheet;

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
  bottomSheetStyle: {
    backgroundColor: Colors.neutralGrey,
    width: 61,
    height: 4,
  },
  enterPayment: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
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
  viewInputCardNumber: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderColor: Colors.neutralGrey,
    marginTop: 15,
  },
  viewExp: {
    width: "95%",
    marginTop: 15,
    alignSelf: "center",
    flexDirection: "row",
  },
  viewExpDate: {
    width: "48%",
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderColor: Colors.neutralGrey,
  },
  expDateInput: {
    color: Colors.neutralBlack,
  },
  viewCvv: {
    width: "48%",
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderColor: Colors.neutralGrey,
    marginLeft: 15,
  },
  viewInputCOUNTRY: {
    width: "95%",
    alignSelf: "center",
    alignItems:'center',
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
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginTop: "18%",
    marginHorizontal: 10,
  },
  btnText: {
    color: Colors.lightGrey50,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  countryText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 13,
    color: Colors.neutralBlack,
  },
});
