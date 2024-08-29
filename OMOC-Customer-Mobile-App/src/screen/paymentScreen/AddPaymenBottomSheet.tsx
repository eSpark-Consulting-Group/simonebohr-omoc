import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { palceholders, strings } from "../../assets/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { grey, skyBlueColor, whiteColor } from "../../utils/colors";
import CustomCheckBox from "../../components/CustomCheckBox";
import CustomButton from "../../components/CustomButton";
import PaymentCard from "../../components/PaymentCard";
import {
  CardBrand,
  CardField,
  useConfirmPayment,
  CardFieldInput,
} from "@stripe/stripe-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddPaymenBottomSheet = ({ hideMe, onSubmit, isEdit, data }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [10, "73%"], []);
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [canPay, setCanPay] = useState(true);
  const [cardDetails, setCardDetails] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setCardDetails(data);
    }
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
      handleIndicatorStyle={styles.bottomSheetStyle}
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <PaymentCard
            data={cardDetails}
            brandFontSize={20}
            onDelete={() => {}}
          />
          <Text style={styles.heading}>{strings.ADD_PAYMENT_METHOD}</Text>
          <Text style={styles.subHeading}>
            {strings.FILL_THE_DETAIL_INFORMATION_ABOUT_YOUR_CARD}
          </Text>
          {/* <TextInput
          value={cardNumber}
          keyboardType="numeric"
          onChangeText={setCardNumber}
          style={styles.inputStyle}
          placeholder="Card Number"
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={cvv}
            style={styles.input}
            placeholder={strings.CVV}
            onChangeText={setCvv}
          />
          <TextInput
            value={exp}
            style={styles.input}
            placeholder={strings.EXP}
            onChangeText={setExp}
          />
        </View> */}

          <CardField
            disabled={!canPay}
            postalCodeEnabled={false}
            autofocus
            // dangerouslyGetFullCardDetails={true}
            placeholders={{
              number: "4242 4242 4242 4242",
              postalCode: "12345",
              cvc: "CVC",
              expiration: "MM|YY",
            }}
            onCardChange={(val) => {
              setCardDetails(val);
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField);
            }}
            cardStyle={inputStyles}
            style={styles.cardField}
            preferredNetworks={[CardBrand.Visa]}
          />

          <View style={styles.checkBoxContainer}>
            <CustomCheckBox
              boxType="square"
              style={styles.checkBox}
              onFillColor={skyBlueColor}
              onCheckColor={whiteColor}
              onSelect={() => {
                setIsDefault(!isDefault);
              }}
            />
            <Text style={{ color: isDefault ? skyBlueColor : grey }}>
              {strings.SET_AS_DEFAULT_CARD}
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <CustomButton
              onPress={() => {
                onSubmit({ cardDetails, isDefault });
              }}
              textstyle={styles.btnText}
              style={styles.btn}
              text={strings.SUBMIT}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </BottomSheet>
  );
};

export default AddPaymenBottomSheet;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 15,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: GILROY_SEMIBOLD,
    marginTop: 20,
  },
  subHeading: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: grey,
    marginTop: 10,
  },
  inputStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 14,
    paddig: 15,
    marginTop: 20,
    paddingLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 14,
    paddig: 15,
    marginTop: 20,
    paddingLeft: 10,
    width: "47%",
  },
  checkBoxContainer: {
    flexDirection: "row",
    gap: 25,
    marginTop: 20,
    alignItems: "center",
  },
  btn: {
    backgroundColor: skyBlueColor,
    width: "100%",
  },
  btnText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  btnContainer: {
    marginTop: 50,
  },
  bottomSheetStyle: { backgroundColor: "#D9D9D9", width: 45 },
  cardField: {
    width: "100%",
    height: 50,
    marginVertical: 30,
  },
});

const inputStyles: CardFieldInput.Styles = {
  borderWidth: 1,
  backgroundColor: "#FFFFFF",
  borderColor: "#000000",
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "Macondo-Regular",
  placeholderColor: "#A020F0",
  textColor: "#0000ff",
};
