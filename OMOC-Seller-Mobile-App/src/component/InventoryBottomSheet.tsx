import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { Colors } from "../utils/colors";
import SearchTabBar from "./SearchTabBar";
import {
  Checkbox,
  three_dots_icon,
  uncheckbox,
  user_frame,
} from "../utils/images";
import VectorImage from "react-native-vector-image";
import FastImage from "react-native-fast-image";

const data = [
  {
    icon: Checkbox,
    image: user_frame,
    title: "Hoodie Havana V1",
    number: "1239u1023",
  },
  {
    icon: Checkbox,
    image: user_frame,
    title: "Hoodie Havana V1",
    number: "1239u1023",
  },
  {
    icon: uncheckbox,
    image: user_frame,
    title: "Hoodie Havana V1",
    number: "1239u1023",
  },
];
const InventoryBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "70%"], []);

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
      <View style={{ flex: 1 }}>
        <View style={styles.viewtextHeader}>
          <Text style={styles.addLegal}>{strings.ADD_A_CERTIFICATION}</Text>
        </View>

        <View style={styles.searchBarView}>
          <SearchTabBar
            placeholder={strings.SEARCH_PRODUCT}
            style={styles.searchTab}
          />
        </View>
        <View style={styles.flatlistViewContainer}>
          <FlatList
            data={data}
            style={styles.flatlist}
            renderItem={({ item }) => {
              return (
                <View style={styles.flatlistView}>
                  <View style={styles.viewBox}>
                    <VectorImage source={item.icon} style={styles.icon} />
                    <FastImage source={user_frame} style={styles.image} />

                    <View style={styles.titleTextView}>
                      <Text style={styles.titleText}>{item.title}</Text>
                      <Text style={styles.number}>{item.number}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.btnText}>{strings.APPLY_CERTIFICATION_BTN}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default InventoryBottomSheet;

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
  addLegal: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  viewtextHeader: {
    marginTop: 30,
    marginLeft: 16,
  },
  viewBox: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: Colors.gray88,
    gap: 10,
    height: 72,
    marginHorizontal: 10,
  },

  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginTop: "11%",
    marginHorizontal: 10,
    position: "absolute",
    bottom: "8%",
    alignSelf: "center",
    width: "92%",
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },

  searchTab: {
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.neutralGrey,
    height: 48,
  },
  titleText: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18.83,
    color: Colors.neutralBlack,
  },
  number: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 13.92,
    color: Colors.mediumGrey,
    marginTop: 5,
  },
  flatlistViewContainer: {
    flex: 1,
    marginBottom: "44%",
  },
  flatlist: {
    marginTop: 10,
  },
  titleTextView: {
    marginTop: 5,
  },
  image: {
    height: 48,
    width: 48,
  },
  icon: {
    marginTop: 15,
    marginLeft: 10,
  },
  flatlistView: {
    flex: 1,
    height: "100%",
  },
  searchBarView: {
    marginTop: 10,
  },
});
