import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CONTEXT, strings } from "../utils/string/strings";
import { GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";

const AddYourProductBottomSheet = ({ hideMe, addProduct, navigation }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "40%"], []);

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
          <Text style={styles.addLegal}>{CONTEXT.ADD_NEW_PRODUCT}</Text>
        </View>

        <TouchableOpacity onPress={addProduct}>
          <View style={styles.productViewBox}>
            <View style={styles.textView}>
              <Text style={styles.addnewProduct}>
                {CONTEXT.ADD_NEW_PRODUCT}
              </Text>
              <Text style={styles.createPhysical}>
                {strings.CREATE_A_PHYSICAL}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

       <TouchableOpacity onPress={()=>  navigation.navigate("AddNewProduct")}>
       <View style={styles.productViewBox}>
          <View style={styles.textView}>
            <Text style={styles.addnewProduct}>
              {strings.ADD_NEW_DIGITAL_PRODUCT}
            </Text>
            <Text style={styles.createPhysical}>
              {strings.CREATE_A_PHYSICAL}
            </Text>
          </View>
        </View>
       </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default AddYourProductBottomSheet;

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
  addLegal: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    color: Colors.neutralBlack,
  },
  viewtextHeader: {
    marginTop: 30,
    marginLeft: 16,
  },
  productViewBox: {
    width: "100%",
    height: 88,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: Colors.lightGrey50,
    alignSelf: "center",
    justifyContent: "center",
  },
  addnewProduct: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    color: Colors.midBlack,
  },
  createPhysical: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.mediumGrey,
  },
  textView: {
    marginHorizontal: 20,
    gap: 10,
  },
});
