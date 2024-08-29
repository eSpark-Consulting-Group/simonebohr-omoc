import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  WINDOW_WIDTH,
} from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import VectorImage from "react-native-vector-image";
import { SCREEN_WIDTH } from "../../../utils";
import { ScrollView } from "react-native";
import { search_icon } from "../../../utils/images";
import { neutralBlack } from "../../../utils/colors";

const EmojiBottomSheet = ({ hideMe, emojiList, _onSelectLabel }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [10, "70%"], []);
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
      <View style={styles.labelOptionsTitleWrapper}>
        <View style={styles.dragBar} />
        <View style={styles.labelOptionsSearchWrapper}>
          <View style={styles.searchIcon}>
            <VectorImage source={search_icon}/>
          </View>
          <TextInput
            style={styles.labelOptionsSearch}
            placeholder="Search sticker..."
            placeholderTextColor={neutralBlack}         />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        bounces={false}
        showsVerticalScrollIndicator={true}
      >
        {emojiList.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => _onSelectLabel("emoji", emoji)}
            style={styles.labelItemWrapper}
          >
            <Text
              style={{
                fontSize: WINDOW_WIDTH * 0.2,
              }}
            >
              {emoji}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BottomSheet>
  );
};

export default EmojiBottomSheet;

const styles = StyleSheet.create({
  dragBar: {
    marginTop: 15,
    width: 50,
    height: 3,
    borderRadius: 1,
    backgroundColor: "#fff",
  },
  labelOptionsSearchWrapper: {
    height: 44,
    flexDirection: "row",
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#F8F8F8",
    width: "95%",

  },
  labelOptionsSearch: {
    fontSize: 16,
    color: "#000000",
    width: "95%",
  },
  searchIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  labelItemWrapper: {
    width: SCREEN_WIDTH / 3,
    marginTop:20,
    justifyContent: "center",
    alignItems: "center",
  },
  labelOptionsTitleWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetStyle: { backgroundColor: "#D9D9D9", width: 45 },
});
