import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import VectorImage from "react-native-vector-image";
import { dangerRed, skyBlueColor, whiteColor } from "../../utils/colors";

import { delete_icon, eye_view } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";
import { strings } from "../../assets/string/strings";

const StoryMoreBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => {
    return [80, "20%"];
  }, []);

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
      enablePanDownToClose={true}
      backgroundComponent={() => (
        <View style={[styles.backContainer, { backgroundColor: whiteColor }]} />
      )}
    >
      <View style={styles.container}>
        <View style={styles.userConatiner}>
          <TouchableOpacity style={styles.sendView}>
            <VectorImage source={eye_view} style={styles.eyeIcon} />
          </TouchableOpacity>
          <Text style={styles.itemText}>{strings.SHARE_STORY}</Text>
        </View>
        <View style={styles.userConatiner}>
          <TouchableOpacity style={styles.deleteView}> 
            <VectorImage source={delete_icon} style={styles.deleteIcon} />
          </TouchableOpacity>
          <Text style={styles.itemText}>{strings.DELETE_STORY}</Text>
        </View>
      </View>
    </BottomSheet>
  );
};

export default StoryMoreBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: "80%",
    paddingHorizontal: 20,
    gap: 20,
    paddingVertical: 20,
  },
  container: {
    marginVertical: 10,
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  userImage: { width: 32, height: 32 },
  userConatiner: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    gap: 15,
  },
  deleteIcon: {
    tintColor: dangerRed,
    width: 16,
    height: 16,
  },
  eyeIcon: {
    tintColor: skyBlueColor,
    width: 16,
    height: 16,
  },
  deleteView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F4CCCC",
    alignItems: "center",
    justifyContent: "center",
  },
  sendView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E8F5FF",
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
});
