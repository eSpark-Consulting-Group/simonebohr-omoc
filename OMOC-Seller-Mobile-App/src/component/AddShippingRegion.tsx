import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import VectorImage from "react-native-vector-image";
import { Height } from "../utils";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { CONTEXT, strings } from "../utils/string/strings";
import { Colors } from "../utils/colors";
import { arrow_down } from "../utils/images";
import CustomButton from "./CustomButton";
import ApiService from "../services/api.service";
import Spinner from "./Spinner";

const AddShippingRegion = ({ hideMe, onAddSave }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modelShip, setModelShip] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectText, setSelectText] = useState("Select Region");
  const [selectShip, setSelectShip] = useState("Select estimate shipping time");
  const sheetRef = useRef<BottomSheet>(null);
  const [RegionData, setRegionData] = useState([]);
  const [price, setPrice] = useState('');
  const [shipData, setShipdata] = useState([]);
  const snapPoints = useMemo(
    () => ["40%", modalVisible || modelShip ? "75%" : "45%"],
    [modelShip, modalVisible]
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

  useEffect(() => {
    GetAllData();
  }, []);

  const GetAllData = async () => {
    try {
      setLoader(true);
      const response = await ApiService.getListOfShip();
      const regiondata = response?.data?.regions;
      const shippingTime = response?.data?.shippingTimes;
      setLoader(false);
      setRegionData(regiondata);
      setShipdata(shippingTime);
    } catch (error) {
      console.log(error.response.data);
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
        <Text style={styles.addShipText}>{CONTEXT.ADD_SHIPPING_REGION}</Text>
      </View>
      <TouchableOpacity
        style={styles.regionView}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Text style={styles.regionText}>{selectText}</Text>
        <VectorImage source={arrow_down} style={styles.arroeIcon} />
      </TouchableOpacity>

      <View style={{ height: modalVisible ? "45%" : 0 }}>
        {modalVisible && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={RegionData}
            contentContainerStyle={{}}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.styleRegionlist}
                  onPress={() => {
                    setSelectText(item), setModalVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <View style={[styles.usdView]}>
        <Text style={styles.greyText}>USD | </Text>
        <TextInput
          placeholder="Enter price"
          placeholderTextColor={Colors.midBlack}
          value={price}
          onChangeText={(e) => setPrice(e)}
          style={styles.usdText}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setModelShip(!modelShip);
        }}
        style={styles.regionView}
      >
        <Text style={styles.regionText}>{selectShip} days</Text>
        <VectorImage source={arrow_down} style={styles.arroeIcon} />
      </TouchableOpacity>
      <View>
        {modelShip && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={shipData}
            contentContainerStyle={{ marginBottom: 30 }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.styleRegionlist}
                  onPress={() => {
                    setSelectShip(item), setModelShip(false);
                  }}
                >
                  <Text>{item} days</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <View style={styles.BtnView}>
        <CustomButton
          text={strings.SAVE}
          style={styles.button}
          textstyle={styles.btnName}
          onPress={() =>
            onAddSave({
              region: selectText,
              tax: 20,
              minPrince: price,
              shippingRange: selectShip,
            })
          }
        />
      </View>
      {loader && <Spinner animating={loader} />}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
  },
  addShipText: {
    fontSize: 19,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
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
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.4,
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginVertical: 3,
    alignItems: "center",
  },
  usdView: {
    width: "96%",
    flexDirection: "row",
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.4,
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginVertical: 6,
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
    bottom: 40,
  },
  bottomView: {
    backgroundColor: "#F3F3F3",
    borderRadius: 70,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  styleRegionlist: {
    width: "80%",
    borderBottomColor: Colors.skyBlueColor,
    borderBottomWidth: 0.4,
    paddingVertical: 15,
    alignSelf: "center",
  },
  usdText: { width: "85%" },
});

export default AddShippingRegion;
