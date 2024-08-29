import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { Colors } from "../utils/colors";

const ShopOrderBottomSheet = ({ hideMe }) => {
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
            <Text style={styles.addLegal}>{strings.EDIT_ORDER}</Text>
          </View>
          <View style={styles.viewtext}>
            <Text style={styles.textWould}>{strings.ORDER_NUMBER_START}</Text>
          </View>

          <View style={styles.viewSuffix}>
            <Text style={styles.prefix}>{strings.PREFIX}</Text>
            <View style={styles.viewPrefix}>
              <View style={styles.viewTextInput}>
                <Text style={styles.usd}>#</Text>
              </View>
              <TextInput style={styles.input} />
            </View>
          </View>
          <View style={styles.viewSuffix}>
            <Text style={styles.prefix}>{strings.SUFFIX}</Text>
            <View style={styles.viewPrefix}>
              <TextInput style={styles.inputSuffix} />
            </View>
          </View>
          <Text style={styles.orderId}>{strings.ORDER_ID}</Text>

          <View style={styles.containerBTN}>
            <TouchableOpacity style={styles.buttonViewCreate}>
              <Text style={styles.textButton}>{strings.SAVE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

export default ShopOrderBottomSheet;

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
  viewSuffix: {
    marginTop: 10,
  },
  addLegal: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.neutralBlack,
  },
  viewtextHeader: {
    marginTop: 30,
    marginLeft: 10,
  },
  viewTextInput: {
    flexDirection: "row",
    gap: 15,
    marginTop: 15,
    left: 15,
    height: 18,
    width: 19,
    borderRightWidth: 1,
    borderRightColor: Colors.gray88,
  },
  viewtext: {
    marginTop: 10,
    marginLeft: 10,
  },
  buttonViewCreate: {
    width: "100%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
  },
  orderId: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.grey,
    marginTop: 5,
    left: 5,
  },
  textWould: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.grey,
  },
  viewPrefix: {
    width: "98%",
    height: 51,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray88,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewMainBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "red",
  },
  containerBTN: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },

  containerBTNallType: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },

  textButton: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  textButtonPreview: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    marginTop: 5,
    color: Colors.skyBlueColor,
  },
  textButtonAllType: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  buttonView: {
    width: "49%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonViewAllType: {
    width: 176,
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
    flexDirection: "row",
    justifyContent: "center",
  },
  plusIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 5,
  },
  usd: {
    height: 19,
    width: 10,
    fontFamily: GILROY_REGULAR,
    fontWeight: "600",
    fontSize: 16,
    color: Colors.neutral80,
  },
  input: {
    width: "88%",
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    color: Colors.grey,
  },
  inputSuffix: {
    width: "95%",
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    color: Colors.grey,
    marginLeft: 10,
  },
  prefix: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.neutralBlack,
    left: 10,
  },
});
