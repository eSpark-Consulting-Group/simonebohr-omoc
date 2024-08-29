import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import LikeShow from "./LikeShow";
import { strings } from "../assets/string/strings";
import { GILROY_MEDIUM } from "../utils/fonts";
import { likeShowData } from "../sampleData/LikeShowData";
import SearchTabBar from "../screen/searchScreen/SearchTabBar";

const LikeBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [10, "60%"], []);
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
      <View style={styles.contentContainer}>
        <Text style={styles.headingText}>{strings.LIKES}</Text>
        <View style={styles.searchView}>
          <SearchTabBar placeholder={strings.SEARCH} />
        </View>
        <FlatList
          data={likeShowData}
          renderItem={({ item }) => <LikeShow data={item} />}
        />
      </View>
    </BottomSheet>
  );
};

export default LikeBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 20,
  },
  headingText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  btnText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  icon: {
    width: 24,
    height: 24,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    marginLeft: 15,
  },
  searchView: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  bottomSheetStyle: { backgroundColor: "#D9D9D9",width:45 },
});
