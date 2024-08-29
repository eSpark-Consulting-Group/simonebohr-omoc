import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import {
  blackColor,
  gray88,
  grey,
  lightBlack,
  lightGrey,
  neutralBlack,
  neutralGrey,
  whiteColor,
} from "../utils/colors";
import { palceholders, strings } from "../assets/string/strings";

const FilterBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "70%"], []);

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
        <View style={[styles.backContainer, { backgroundColor: whiteColor }]} />
      )}
    >
      <View style={styles.mainView}>
        <View>
          <Text style={styles.filters}>{strings.FILTERS}</Text>
        </View>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.sortView}>
            <Text style={styles.sortBy}>{strings.SORT_BY}</Text>
            <View style={styles.netwestView}>
              <TouchableOpacity style={styles.hpView}>
                <Text style={styles.highest}>{strings.HIGHEST_PRICE}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.lpView}>
                <Text style={styles.highest}>{strings.LOWEST_PRICE}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.newestView}>
                <Text style={styles.highest}>{strings.NEWEST}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.categoryView}>
            <Text style={styles.category}>{strings.CATEGORY}</Text>
            <TouchableOpacity>
              <Text style={styles.category}>{strings.SEE_ALL}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menfashionView}>
            <TouchableOpacity style={styles.lpView}>
              <Text style={styles.highest}>{strings.MEN_FASHION}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wfView}>
              <Text style={styles.highest}>{strings.WOMAN_FASHION}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.kidView}>
              <Text style={styles.highest}>{strings.KID_FASHION}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.kidFashionView}>
            <TouchableOpacity style={styles.kidView}>
              <Text style={styles.highest}>{strings.KID_FASHION}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryView}>
            <Text style={styles.category}>{palceholders.PRICE}</Text>
            <TouchableOpacity>
              <Text style={styles.category}>{strings.SEE_ALL}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.priceView}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder={strings.LOWEST}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder={strings.HIGHEST}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <View style={styles.sortView}>
            <Text style={styles.sortBy}>{strings.PRODUCT_TYPE}</Text>
            <View style={styles.netwestView}>
              <TouchableOpacity style={styles.PyView}>
                <Text style={styles.highest}>{strings.PYSICAL_PRODUCT}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dpView}>
                <Text style={styles.highest}>{strings.DIGITAL_PRODUCT}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceView}>
                <Text style={styles.highest}>{strings.SERVICES}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sortView}>
            <Text style={styles.sortBy}>{strings.RATING}</Text>
            <View style={styles.netwestView}>
              <TouchableOpacity style={styles.rateView}>
                <Text style={styles.highest}>4+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sortView}>
            <Text style={styles.sortBy}>{strings.OTHERS}</Text>
            <View style={styles.netwestView}>
              <TouchableOpacity style={styles.PreView}>
                <Text style={styles.highest}>{strings.PREORDER}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.stockView}>
                <Text style={styles.highest}>{strings.READY_STOCK}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomSheetStyle: {
    backgroundColor: neutralGrey,
    width: 61,
    height: 4,
  },
  mainView: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  filters: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 20,
    color: neutralBlack,
  },
  sortBy: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    color: blackColor,
  },
  sortView: {
    marginTop: 30,
  },
  netwestView: {
    gap: 8,
    marginTop: 20,
    flexDirection: "row",
  },
  hpView: {
    width: 90,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gray88,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: whiteColor,
  },
  PyView: {
    width: 101,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gray88,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: whiteColor,
  },
  PreView: {
    width: 67,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gray88,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: whiteColor,
  },
  rateView: {
    width: 36,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gray88,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: whiteColor,
  },
  stockView: {
    width: 87,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gray88,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: whiteColor,
  },
  highest: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 10,
    color: lightBlack,
  },
  lpView: {
    width: 87,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gray88,
    justifyContent: "center",
    alignItems: "center",
  },
  wfView: {
    width: 104,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gray88,
    justifyContent: "center",
    alignItems: "center",
  },
  kidView: {
    width: 82,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gray88,
    justifyContent: "center",
    alignItems: "center",
  },
  dpView: {
    width: 100,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gray88,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: whiteColor,
  },
  newestView: {
    width: 61,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gray88,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: whiteColor,
  },
  serviceView: {
    width: 66,
    height: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gray88,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: whiteColor,
  },
  categoryView: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    fontWeight: "500",
    color: blackColor,
  },
  priceView: {
    gap: 12,
    marginTop: 15,
    flexDirection: "row",
  },
  inputView: {
    width: "49%",
    height: 56,
    borderRadius: 24,
    backgroundColor: lightGrey,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  input: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color: grey,
  },
  menfashionView: {
    gap: 8,
    marginTop: 20,
    flexDirection: "row",
  },
  kidFashionView: {
    marginTop: 10,
  },
  scrollView: {
    marginBottom: 40,
  },
});
