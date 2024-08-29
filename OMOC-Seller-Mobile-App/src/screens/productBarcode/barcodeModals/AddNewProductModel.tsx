import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CONTEXT } from "../../../utils/string/strings";
import { Colors } from "../../../utils/colors";
import CustomButton from "../../../component/CustomButton";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../../utils/fonts";
import VectorImage from "react-native-vector-image";
import { radioBtnOff, radioBtnOn } from "../../../utils/images";

const AddNewProductModel = ({ hideMe }) => {
  const [selectedStatus, setSelectedStatus] = useState(1);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "80%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      hideMe();
    }
    return index;
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={2}
        opacity={1.2}
      />
    ),
    []
  );
  const onSelected = (number) => {
    setSelectedStatus(number);
  };

  return (
    <BottomSheet
      ref={sheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.bottomSheetStyle}
      style={styles.bottomView}
    >
      <TouchableOpacity style={styles.regionView}>
        <View style={styles.createViewText}>
          <Text style={styles.regionText}>{CONTEXT.ADD_NEW_PRODUCT}</Text>

          <TouchableOpacity
            style={styles.rowView}
            onPress={() => onSelected(1)}
          >
            {selectedStatus === 1 ? (
              <VectorImage source={radioBtnOn} style={styles.checkImag} />
            ) : (
              <VectorImage source={radioBtnOff} style={styles.checkImag} />
            )}
            <Text style={styles.greyText}>Scam</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => onSelected(2)}
          >
            {selectedStatus === 2 ? (
              <VectorImage source={radioBtnOn} style={styles.checkImag} />
            ) : (
              <VectorImage source={radioBtnOff} style={styles.checkImag} />
            )}
            <Text style={styles.greyText}>
              {CONTEXT.CONTENT_CONTAINS_RACISM}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => onSelected(3)}
          >
            {selectedStatus === 3 ? (
              <VectorImage source={radioBtnOn} style={styles.checkImag} />
            ) : (
              <VectorImage source={radioBtnOff} style={styles.checkImag} />
            )}
            <Text style={styles.greyText}>Other</Text>
          </TouchableOpacity>
        {selectedStatus === 3 && <View style={styles.blueBorder}>
            <TextInput
              placeholder="Write the reason here..."
              placeholderTextColor={Colors.grey}
              style={styles.greyText}
              maxLength={20}
            />
          </View>}
          {selectedStatus === 3 && <Text style={styles.pinkText}>Charater min 0/20</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.BtnView}>
        <CustomButton
          text={"Report Now"}
          style={styles.button}
          textstyle={styles.btnName}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
  },
  regionView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  blueBorder: {
    marginTop: 10,
    borderColor: Colors.gray88,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  regionText: {
    fontSize: 23,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    marginBottom: 6,
  },
  greyText: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
  },
  button: {
    backgroundColor: Colors.skyBlueColor,
  },
  btnName: {
    color: Colors.whiteColor,
  },
  BtnView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 40,
  },
  bottomView: {
    backgroundColor: "#F3F3F3",
    borderRadius: 70,
    alignSelf: "center",
    paddingHorizontal: 10,
  },

  tabUnSelectTexT: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.skyBlueColor,
    fontSize: 12.5,
    marginTop: 5,
  },
  createViewText: {
    marginTop: 15,
  },
  checkImag: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    marginRight: 15,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  pinkText: {
    color: "#9039FF",
    fontFamily: GILROY_REGULAR,
    fontSize: 12.8,
    alignSelf: "flex-end",
    marginTop: 6,
  },
});

export default AddNewProductModel;
