import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, {
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { palceholders, strings } from "../assets/string/strings";
import { GILROY_MEDIUM } from "../utils/fonts";
import { TextInput } from "react-native";
import {
  blackColor,
  grey,
  purple,
  skyBlueColor,
  whiteColor,
} from "../utils/colors";
import { useDispatch } from "react-redux";
import { ADD_WISHLIST } from "../redux/slice/dashboard/CartSlice";
import ApiService from "../services/api.service";

interface Props {
  hideMe: any;
  onAdded: (val: any) => void;
}

const AddWhishcart: FC<Props> = ({ hideMe, onAdded }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [wishText, setWishText] = useState("");
  const dispatch = useDispatch();
  const snapPoints = useMemo(() => [10, "35%"], []);
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

  const handleAddWishlist = () => {
    let obj = {
      name: wishText,
    };
    dispatch(ADD_WISHLIST(obj));
    setWishText("");
  };

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
        <Text style={styles.headingText}>{palceholders.ADD_TO_WISHLIST}</Text>
        <TouchableOpacity style={styles.btnContainer}>
          <TextInput
            placeholder="Enter wishlist item"
            value={wishText}
            onChangeText={(text) => setWishText(text)}
            style={styles.textInput}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onAdded(wishText);
            handleAddWishlist();
          }}
          style={styles.addButton}
        >
          <Text style={styles.buttonText}>{strings.ADD}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default AddWhishcart;

const styles = StyleSheet.create({
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
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
    width: 45,
  },
  textInput: {
    width: 350,
    borderColor: grey,
    borderWidth: 1,
    borderRadius: 9,
    padding: 10,
    marginTop: 30,
    alignSelf: "center",
  },
  addButton: {
    width: 355,
    backgroundColor: purple,
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 35,
  },
  cancelButton: {
    width: 150,
    alignSelf: "center",
    backgroundColor: whiteColor,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderColor: purple,
    borderWidth: 1,
  },
  buttonText: {
    color: whiteColor,
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    textAlign: "center",
  },
  modelStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 10,
    borderRadius: 10,
    gap: 5,
    backgroundColor: whiteColor,
  },
  AddText: {
    color: blackColor,
    fontSize: 16,
    fontWeight: "500",
  },
});
