import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Colors } from "../../utils/colors";
import FastImage from "react-native-fast-image";
import { omoc_image, tickIcon } from "../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { changeShop } from "../../redux/slice/dashboard/ShopSlice";
import VectorImage from "react-native-vector-image";

const ShopsBottomsheet = ({ hideMe, data, onCreateNewShop }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "65%"], []);
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);
  const [selectedShop, setSelectedShop] = useState(currentShop);
  const dispatch = useDispatch<any>();
  const [shopData, setShopData] = useState([]);
  useEffect(() => {
    const filtredShopList = data.filter((val) => val.isVerified);
    setShopData([...shopData, ...filtredShopList]);
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
      backdropComponent={renderBackdrop}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      handleIndicatorStyle={styles.bottomSheetStyle}
      onChange={handleSheetChanges}
    >
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Your Shop</Text>
        <FlatList
          style={{ height: "70%", marginBottom: 10 }}
          showsHorizontalScrollIndicator={false}
          data={shopData}
          renderItem={({ item, index }) => {
            const found = item._id == selectedShop._id;
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(changeShop(item));
                  setSelectedShop(item);
                  hideMe();
                }}
                style={
                  found ? styles.selectedItemContainer : styles.itemContainer
                }
              >
                <View style={styles.imgContainer}>
                  <FastImage style={styles.logo} source={omoc_image} />
                  <Text style={styles.shopName}>{item?.name}</Text>
                </View>
                {found ? <VectorImage source={tickIcon} /> : null}
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity
          style={styles.buttonViewAddProduct}
          onPress={() => onCreateNewShop()}
        >
          <Text>Add new Shop</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default ShopsBottomsheet;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 15,
    paddingBottom: "15%",
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
  },
  logo: {
    width: 44,
    height: 44,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  selectedItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "0094FF0D",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  imgContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  shopName: {
    fontSize: 14,
    fontWeight: "500",
  },
  buttonViewAddProduct: {
    width: "90%",
    alignSelf: "center",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    borderRadius: 24,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
  },
});
