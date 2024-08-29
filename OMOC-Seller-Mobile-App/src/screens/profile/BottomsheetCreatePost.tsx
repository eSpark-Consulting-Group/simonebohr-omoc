import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import VectorImage from "react-native-vector-image";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { CONTEXT } from "../../utils/string/strings";
import { Colors } from "../../utils/colors";
import {radioBtnOff, radioBtnOn} from "../../utils/images";
import CustomButton from "../../component/CustomButton";

const BottomsheetCreatePost = ({ hideMe,postCreate,storyCreate }) => {
  const [modalVisibleOne, setModalVisibleOne] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => ["25%",  "35%"],
    [modalVisibleOne]
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      hideMe();
    }
    return index;
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={2}
        opacity={1.2}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.bottomSheetStyle}
      style={styles.bottomView}>
      <TouchableOpacity
        onPress={() => {
          setModalVisibleOne(!modalVisibleOne) , postCreate()
        }}
        style={styles.regionView}>
        {modalVisibleOne ? (
          <VectorImage source={radioBtnOn} style={styles.arroeIcon} />
        ) : (
          <VectorImage source={radioBtnOff} style={styles.arroeIcon} />
        )}
        <View style={styles.createViewText}>
          <Text style={styles.regionText}>{CONTEXT.CREATE_POST}</Text>
          <Text style={styles.tabUnSelectTexT}>
            Create your post for your audience feeds
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setModalVisibleOne(!modalVisibleOne), storyCreate()
        }}
        style={styles.regionView}
      >
        {modalVisibleOne ? (
          <VectorImage source={radioBtnOff} style={styles.arroeIcon} />
        ) : (
          <VectorImage source={radioBtnOn} style={styles.arroeIcon} />
        )}
         <View style={styles.createViewText}>
          <Text style={styles.regionText}>{CONTEXT.CREATE_STORY}</Text>
          <Text style={styles.tabUnSelectTexT}>
            Create story for 24 hour to announce your product, promo, sale, and
            etc
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.BtnView}>
        <CustomButton
          text={"+ Create"}
          style={styles.button}
          textstyle={styles.btnName}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
  },
  addShipText: {
    fontSize: 19,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    textAlign: "left",
  },
  arroeIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginHorizontal: 7,
  },
  regionView: {
    width: "100%",
    flexDirection: "row",
    borderColor: Colors.grey,
    borderWidth: 0.4,
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },

  regionText: {
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  greyText: {
    fontSize: 14.5,
    fontFamily: GILROY_MEDIUM,
    color: Colors.midBlack,
  },
  button: {
    backgroundColor: Colors.skyBlueColor,
  },
  btnName: {
    color: Colors.whiteColor,
  },
  BtnView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
  },
  bottomView: {
    backgroundColor: "#F3F3F3",
    borderRadius: 70,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  styleRegionlist: {
    flexDirection: "row",
    width: "95%",
    padding: 15,
    alignSelf: "center",
  },
  smallText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 11,
    color: Colors.lightBlack,
    marginTop: 3,
  },
  listView: {
    flex: 1,
    marginBottom: 70,
    borderRadius: 15,
    backgroundColor: Colors.whiteColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.45,
    elevation: 5,
  },
  tabUnSelectTexT: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.lightBlack,
    fontSize: 12.5,
    marginTop:5,
  },
  createViewText:{marginLeft:5, width: "93%",}
});

export default BottomsheetCreatePost;
