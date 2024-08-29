import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import { palceholders, strings } from "../../assets/string/strings";
import { country_list } from "../../sampleData/CountryName";
import SearchTabBar from "../../screen/searchScreen/SearchTabBar";

const CountryBottomSheet = ({ hideMe, language, setLanguage }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [10, "50%"], []);
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
      <Text style={styles.headingText}>{palceholders.LANGUAGE}</Text>
      <View style={styles.searchBar}>
        <SearchTabBar placeholder={strings.SEARCH} />
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
  },
  icon: {
    width: 24,
    height: 24,
  },
  searchBar: {
    marginHorizontal: 15,
    marginTop: 20,
  },
});
