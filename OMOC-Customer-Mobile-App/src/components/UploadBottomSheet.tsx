import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import VectorImage from "react-native-vector-image";
import { strings } from "../assets/string/strings";
import { GILROY_MEDIUM } from "../utils/fonts";
import {
  grid_icon,
  radio_icon,
  story_icon,
  video_added_icon,
} from "../utils/images";

const UploadBottomSheet = ({ hideMe, onPressUpload }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [10, "40%"], []);
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
        <Text style={styles.headingText}>{strings.UPLOAD}</Text>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            onPressUpload("Story");
            hideMe();
          }}
        >
          <VectorImage source={story_icon} style={styles.icon} />
          <Text style={styles.btnText}>{strings.UPLOAD_STORY}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            onPressUpload("Video");
            hideMe();
          }}
        >
          <VectorImage source={video_added_icon} style={styles.icon} />
          <Text style={styles.btnText}>{strings.UPLOAD_VIDEO}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            onPressUpload("Post");
            hideMe();
          }}
        >
          <VectorImage source={grid_icon} style={styles.icon} />
          <Text style={styles.btnText}>{strings.UPLOAD_POST}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            hideMe();
          }}
        >
          <VectorImage source={radio_icon} style={styles.icon} />
          <Text style={styles.btnText}>{strings.LIVE_STREAM}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default UploadBottomSheet;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 24,
    // backgroundColor: "grey",
  },
  contentContainer: {
    marginTop: 10,
  },
  headingText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: GILROY_MEDIUM,
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
  bottomSheetStyle: { backgroundColor: "#D9D9D9", width: 45 },
});
