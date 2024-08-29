import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { palceholders, strings } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { Colors } from "../utils/colors";
import SearchTabBar from "./SearchTabBar";
import { friend_image, user_frame } from "../utils/images";
import FastImage from "react-native-fast-image";

const data = [
  {
    image: friend_image,
    name: "Jhon Wick",
  },
  {
    image: friend_image,
    name: "Jhon Wick",
  },
  {
    image: friend_image,
    name: "Jhon Wick",
  },
  {
    image: friend_image,
    name: "Jhon Wick",
  },
  {
    image: friend_image,
    name: "Jhon Wick",
  },
];
const ListEmployeeBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "48%"], []);

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
          <Text style={styles.addLegal}>{strings.LIST_EMPLOYEE}</Text>
        </View>
        <View style={styles.flatlistViewContainer}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.viewBox}>
                  <FastImage source={item.image} style={styles.userImage} />
                  <View style={styles.nameView}>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default ListEmployeeBottomSheet;

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
  nameView: {
    marginTop: 10,
  },
  userImage: {
    height: 32,
    width: 32,
  },
  mainView: {
    flex: 1,
    marginHorizontal: 15,
  },
  addLegal: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  viewtextHeader: {
    marginTop: 30,
  },
  viewBox: {
    width: "100%",
    height: 48,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    gap: 12,
    borderColor: Colors.gray88,
    marginTop: 10,
    flexDirection: "row",
  },
  flatlistViewContainer: {
    marginTop: 20,
  },
  name: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.blackColor,
  },
});
