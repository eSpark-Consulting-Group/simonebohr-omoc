import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import FavouriteSelect from "./FavouriteSelect";
import { helpFavourite } from "../../sampleData/HelpFavouriteData";
import CustomButton from "../../components/CustomButton";
import {
  grey,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { GILROY_MEDIUM } from "../../utils/fonts";
import StorageService from "../../services/storage.service";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import en from "../../assets/string/en";
import Spinner from "../../components/Spinner";

const YourInterestScreen = ({ navigation }) => {
  const [chipsData, setChipsData] = useState([]);
  const [selectId, setSelectId] = useState([]);
  const [loder, setLoader] = useState(false);

  useEffect(() => {
    getDeatil();
  }, []);

  const getDeatil = async () => {
    try {
      setLoader(true);
      const response = await ApiService.GetProfileInterest();
      const data = response.data.data;
      const seletedData = data.interests.selected;
      const unSeletedData = data.interests.otherCategories;
      const array3 = seletedData.concat(unSeletedData);
      var finalArray = [];
      array3.map((val) => {
        const foundInSelected = seletedData.some(
          (item) => item._id === val._id
        );
        const foundInUnSelected = unSeletedData.some(
          (item) => item._id === val._id
        );
        if (foundInSelected) {
          finalArray.push({ ...val, isSelected: true });
        } else {
          finalArray.push({ ...val, isSelected: false });
        }
      });
      setChipsData(finalArray);
      setLoader(false);
    } catch (e) {
      console.log("No deatil error", JSON.stringify(e));
    }
  };

  const handleSelect = (selectedData) => {
    const id = selectedData?._id;
    setChipsData((prevData) =>
      prevData.map((category) => {
        if (category._id === id) {
          return { ...category, isSelected: !category.isSelected };
        } else {
          return category;
        }
      })
    );
  };

  useEffect(() => {
    if (chipsData.some((category) => category.isSelected)) {
      const selectedIds = chipsData
        .filter((category) => category.isSelected)
        .map((category) => category._id);
      setSelectId(selectedIds);
    }
  }, [chipsData]);

  const onContinue = async () => {
    try {
      const requestBody = {
        interests: selectId || [],
      };
      setSelectId([]);
      if (selectId.length === 0) {
        Alert.alert("Please select at least one category");
        return;
      }
      const response = await ApiService.postUpdateInterest(requestBody);
      setSelectId([]);
      const responseData = response.message;
      showMessage({
        message: responseData,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
        position: "center",
      });
    } catch (error) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.YOUR_INTEREST}
          navigation={navigation}
        />
      </View>
      <Text style={styles.subHeadingText}>{strings.LOREM_TEXT}</Text>
      <View style={styles.selectView}>
        {chipsData.map((val, index) => {
          return (
            <FavouriteSelect data={val} onSelect={handleSelect} key={val.id} />
          );
        })}
      </View>
      <View style={styles.Btnview}>
        <CustomButton
          text="Continue"
          style={styles.Btn}
          textstyle={styles.btnText}
          onPress={onContinue}
        />
      </View>
      {loder && <Spinner animating={loder} />}
    </SafeAreaView>
  );
};

export default YourInterestScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: whiteColor,
  },
  headingText: {
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 33.6,
    color: neutralBlack,
    width: "90%",
    marginLeft: 15,
  },
  selectView: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 25,
    marginHorizontal: 15,
  },
  Btn: {
    backgroundColor: skyBlueColor,
  },
  Btnview: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignSelf: "center",
  },
  btnText: { color: whiteColor },
  header: {
    marginHorizontal: 15,
  },
  subHeadingText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_MEDIUM,
    lineHeight: 21,
    marginHorizontal: 15,
    color: grey,
    marginTop: 30,
  },
});
