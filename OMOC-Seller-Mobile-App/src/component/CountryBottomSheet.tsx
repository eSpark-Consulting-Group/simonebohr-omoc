import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import { CONTEXT, strings } from "./../utils/string/strings";
import { country_list } from "../utils/sampleData/CountryName";
import SearchTabBar from "./SearchTabBar";
import { Colors } from "../utils/colors";

const CountryBottomSheet = ({ hideMe, language, setLanguage }) => {
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
    >
      <View style={{ marginTop: 20 }}>
        <Text style={styles.headingText}>{CONTEXT.COUNTRY}</Text>
      </View>
      <View>
        <SearchTabBar placeholder={strings.SEARCH} style={styles.searchBar} />
      </View>
      <Picker
        selectedValue={language}
        onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
      >
        {country_list.map((country_list) => {
          return (
            <Picker.Item
              label={country_list.label}
              value={country_list.value}
            />
          );
        })}
      </Picker>
    </BottomSheet>
  );
};

export default CountryBottomSheet;

const styles = StyleSheet.create({
  headingText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: Colors.neutralBlack,
  },
  icon: {
    width: 24,
    height: 24,
  },
  searchBar: {
    width: "95%",
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    backgroundColor: Colors.lightGrey,
    borderColor: Colors.neutralGrey,
  },
});
