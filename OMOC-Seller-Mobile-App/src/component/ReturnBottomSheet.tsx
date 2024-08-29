import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CONTEXT } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";
import {
  add_icon,
  blank_round_circle,
  blue_round_circle,
} from "../utils/images";
import VectorImage from "react-native-vector-image";

const data = [
  {
    icon: blank_round_circle,
    title: "Returns & Funds ",
    description:
      "I want the buyer to return the item and refund $15 to the buyer",
  },
  {
    icon: blue_round_circle,
    title: "Returns & Funds ",
    description: "I want to refund $15 to the buyer without a return",
  },
  {
    icon: blank_round_circle,
    title: "Refuse Submissions ",
    description: "Reject the application because the item sent is appropriate",
  },
];
const ReturnBottomSheet = ({ hideMe }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["55%", "55%"], []);

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
      <View style={styles.mainView}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <View
                  style={[
                    styles.viewContainer,
                    {
                      backgroundColor:
                        item.description ===
                        "I want to refund $15 to the buyer without a return"
                          ? Colors.aliceBlue
                          : Colors.creamColor,
                    },
                  ]}
                >
                  <View style={styles.iconView}>
                    <VectorImage source={item.icon} />

                    <View style={styles.titleCodeView}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.desc}>{item.description}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.containerBTN}>
          <TouchableOpacity style={styles.buttonViewCreate}>
            <VectorImage source={add_icon} style={styles.plusIcon} />
            <Text style={styles.textButton}>{CONTEXT.CREATE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default ReturnBottomSheet;

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
  titleCodeView: {
    alignSelf: "center",
    gap: 5,
    marginHorizontal: 35,
  },
  iconView: {
    flexDirection: "row",

    marginHorizontal: 20,
  },

  mainView: {
    flex: 1,
    marginHorizontal: 15,
  },

  plusIcon: {
    tintColor: Colors.whiteColor,
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
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },

  containerBTN: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },

  textButton: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  viewContainer: {
    width: "100%",
    height: 102,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGrey50,
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    color: Colors.neutral100,
  },
  desc: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.neutral80,
  },
});
