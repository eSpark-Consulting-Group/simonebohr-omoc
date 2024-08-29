import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { CONTEXT, palceholders, strings } from "../../utils/string/strings";
import SearchTabBar from "../../component/SearchTabBar";
import { Colors } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import { Left_icon, arrow_down, arrowleft_icon } from "../../utils/images";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import CountryBottomSheet from "../../component/CountryBottomSheet";

const data = [
  {
    rank: "2949",
    productname: "Gundam HG Barbatos",
    price: "$220",
    country: " United States",
  },
  {
    rank: "1",
    productname: "Gundam HG Barbatos",
    price: "$220",
    country: " United States",
  },
  {
    rank: "2",
    productname: "Gundam HG Barbatos",
    price: "$220",
    country: " United States",
  },
  {
    rank: "3",
    productname: "Gundam HG Barbatos",
    price: "$220",
    country: " United States",
  },

  {
    rank: "3",
    productname: "Gundam HG Barbatos",
    price: "$220",
    country: " United States",
  },

  {
    rank: "4",
    productname: "Gundam HG Barbatos",
    price: "$220",
    country: " United States",
  },
  {
    rank: "5",
    productname: "Gundam HG Barbatos",
    price: "$220",
    country: " United States",
  },
];
const Market = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [language, setLanguage] = useState(false);

  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />

      <Customheader showBackIcon={true} title={strings.MARKET} />
      <View style={styles.mainViewContainer}>
        <View style={styles.searchView}>
          <SearchTabBar
            placeholder={palceholders.SEARCH_YOUR_PRODUCT}
            style={styles.searchBar}
          />
        </View>
        <View style={styles.rankView}>
          <TouchableOpacity style={styles.productView}>
            <Text style={styles.textRank}>{CONTEXT.RANK}</Text>

            <VectorImage source={arrow_down} style={styles.downIcon} />
          </TouchableOpacity>

          <View style={styles.productView}>
            <Text style={styles.textRank}>{CONTEXT.PRODUCT_NAME}</Text>
          </View>
          <TouchableOpacity style={styles.productView}>
            <Text style={styles.textRank}>{CONTEXT.PRICE}</Text>

            <VectorImage source={arrow_down} style={styles.downIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBottomSheet}
            style={styles.productView}
          >
            <Text style={styles.textRank}>{CONTEXT.COUNTRY}</Text>

            <VectorImage source={arrow_down} style={styles.downIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.flatlistView}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              const isHighestRank = item.rank === data[0].rank;

              return (
                <View>
                  <View
                    style={[
                      styles.viewContainer,
                      isHighestRank && styles.highestRankBackground,
                    ]}
                  >
                    <Text style={styles.textTitle}>{item.rank}</Text>

                    <Text style={styles.textProduct}>{item.productname}</Text>

                    <Text style={styles.textTitle}>{item.price}</Text>
                    <Text style={styles.textTitle}>{item.country}</Text>
                  </View>
                  <View style={styles.viewfirstRank}></View>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.mainViewFrameBox}>
          <View style={styles.frameBox}>
            <TouchableOpacity style={styles.leftFrameBox}>
              <VectorImage source={Left_icon} style={styles.leftIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameBoxOne}>
              <Text style={styles.oneBox}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameBoxtwo}>
              <Text style={styles.twoBox}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameBoxtwo}>
              <Text style={styles.threeBox}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightIconView}>
              <VectorImage source={arrowleft_icon} style={styles.rightIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buttonViewAllType}>
            <Text style={styles.textButtonAllType}>{strings.SAVE}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showBottomSheet && (
        <CountryBottomSheet
          setLanguage={setLanguage}
          hideMe={() => {
            setShowBottomSheet(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Market;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainViewContainer: {
    marginHorizontal: 15,
    height: "100%",
  },
  leftIcon: {
    height: 20,
    width: 20,
    tintColor: Colors.gray88,
  },
  mainViewFrameBox: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    backgroundColor: Colors.whiteColor,
  },
  flatlistView: {
    marginBottom: "70%",
  },
  threeBox: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.Gray7,
  },
  rightIconView: {
    height: 36,
    width: 36,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    padding: 8,
    gap: 10,
  },
  leftFrameBox: {
    height: 36,
    width: 36,
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    padding: 8,
    gap: 10,
  },
  rightIcon: {
    height: 20,
    width: 20,
    tintColor: Colors.codgray,
  },
  twoBox: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.Gray7,
  },
  oneBox: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.Gray7,
  },
  searchBar: {
    width: "100%",
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.neutralGrey,
  },
  searchView: {
    marginTop: 30,
  },
  rankView: {
    width: "100%",
    height: 57,
    backgroundColor: Colors.ghostWhite,
    borderRadius: 12,
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
  },
  textRank: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "700",
    fontSize: 12,
    color: Colors.neutralBlack,
  },
  productView: {
    flexDirection: "row",
    alignItems: "center",
  },
  downIcon: {
    height: 16,
    width: 16,
    left: 5,
    resizeMode: "contain",
  },
  viewContainer: {
    width: "100%",
    height: 56,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 23,
    gap: 25,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: Colors.gray88,
  },
  viewfirstRank: {
    width: "95%",
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  textTitle: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 12,
    color: Colors.neutralBlack,
  },
  textProduct: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 12,
    color: Colors.neutralBlack,
    width: 120,
    textAlign: "center",
  },
  frameBox: {
    width: 229,
    alignSelf: "center",
    gap: 12,
    flexDirection: "row",
    marginBottom: 20,
  },
  frameBoxOne: {
    width: 37,
    height: 32,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
    borderColor: Colors.whiteColor,
    alignSelf: "center",
  },
  frameBoxtwo: {
    width: 40,
    height: 32,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
    borderColor: Colors.whiteColor,
    alignSelf: "center",
  },
  buttonViewAllType: {
    width: "100%",
    height: 49,
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
    flexDirection: "row",
    justifyContent: "center",
    // position: "absolute",
    // marginTop: "20%",
    // bottom:10,
    // marginHorizontal:15
  },
  textButtonAllType: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: Colors.whiteColor,
  },
  highestRankBackground: {
    width: "100%",
    height: 56,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 23,
    gap: 25,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 6,
  },
});
