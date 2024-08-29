import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import VectorImage from "react-native-vector-image";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../../utils/fonts";
import { CONTEXT, strings } from "../../../utils/string/strings";
import { Colors } from "../../../utils/colors";
import { arrow_down, checkbox, uncheckbox } from "../../../utils/images";
import CustomButton from "../../../component/CustomButton";

const AddAdmin = ({ hideMe }) => {
  const [modalVisibleOne, setModalVisibleOne] = useState(false);
  const [selectName, setSelectName] = useState("Admin Name");
  const [selectShip, setSelectShip] = useState([]);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => ["50%", modalVisibleOne ? "85%" : "50%"],
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
        opacity={1}
      />
    ),
    []
  );

  const Regiondata = [
    {
      id: 1,
      name: "Manage Orders",
      detail: "Manage order from buyer on order dashboard",
    },
    {
      id: 2,
      name: "Manage Detail Product",
      detail: "Manage detail for product page",
    },
    {
      id: 3,
      name: "Manage Stock",
      check: uncheckbox,
      detail: "Manage product stock/inventory",
    },
    {
      id: 4,
      name: "See Shop Statistic",
      detail: "Manage product stock/inventory",
    },
    {
      id: 5,
      name: "Manage stock",
      detail: "Manage product stock/inventory",
    },
  ];

  const onSelected = (id) => {
    const selectedIndex = selectShip.findIndex((item) => item.id === id);
    if (selectedIndex === -1) {
      setSelectShip([
        ...selectShip,
        { ...Regiondata.find((item) => item.id === id) },
      ]);
    } else {
      const updatedList = [...selectShip];
      updatedList.splice(selectedIndex, 1);
      setSelectShip(updatedList);
    }
  };

  return (
    <BottomSheet
      ref={sheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.bottomSheetStyle}
      style={styles.bottomView}
    >
      <View style={{ marginVertical: 18 }}>
        <Text style={styles.addShipText}>{CONTEXT.ADD_ADMIN_PERMISSION}</Text>
      </View>
      <View style={styles.regionView}>
        <TextInput
          placeholder="Admin Name"
          value={selectName}
          onChange={(e) => {
            setSelectName(e);
          }}
          placeholderTextColor={Colors.lightGrey50}
          style={styles.regionText}
        />
      </View>

      <View style={styles.regionView}>
        <TextInput
          placeholder="Admin OMOC Email"
          placeholderTextColor={Colors.lightGrey50}
          style={styles.regionText}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setModalVisibleOne(!modalVisibleOne);
        }}
        style={styles.regionView}
      >
        <Text style={styles.regionText}>
          {selectShip.length} Access was selected
        </Text>
        <VectorImage source={arrow_down} style={styles.arroeIcon} />
      </TouchableOpacity>

      <View style={styles.listView}>
        {modalVisibleOne && (
          <BottomSheetFlatList
            showsVerticalScrollIndicator={false}
            data={Regiondata}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.styleRegionlist}
                  onPress={() => {
                    onSelected(item.id);
                  }}
                >
                  {selectShip.some((selected) => selected.id === item.id) ? (
                    <VectorImage source={checkbox} style={styles.arroeIcon} />
                  ) : (
                    <VectorImage source={uncheckbox} style={styles.arroeIcon} />
                  )}
                  <View style={{ marginLeft: 20 }}>
                    <Text>{item.name}</Text>
                    <Text numberOfLines={0} style={styles.smallText}>
                      {item.detail}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <View style={styles.BtnView}>
        <CustomButton
          text={CONTEXT.SAVE_ACCESS}
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
  },
  regionView: {
    width: "96%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.grey,
    borderWidth: 0.4,
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },

  regionText: {
    fontSize: 14.5,
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
  usdText: { width: "85%" },
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
});

export default AddAdmin;
