import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import FavouriteSelect from "./FavouriteSelect";
import { helpFavourite } from "../../sampleData/HelpFavouriteData";
import CustomButton from "../../components/CustomButton";
import { SafeAreaView } from "react-native";
import { neutralBlack, skyBlueColor, whiteColor } from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import StorageService from "../../services/storage.service";
import { showMessage } from "react-native-flash-message";
import en from "../../assets/string/en";
import ApiService from "../../services/api.service";

const HelpFavouriteScreen = ({ navigation, route }) => {
  const { userName, image, bio } = route.params;
  const [chipsData, setChipsData] = useState([]);
  const [getdata, setGetData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    StorageService.getUser().then((res) => {
      const data = JSON.parse(res);
      setGetData(data.user);
      getDeatil();
    });
  }, []);

  const getDeatil = async () => {
    try {
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
    } catch (error) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  };

  const handleSelect = (selectedData) => {
    const id = selectedData?._id;
    setChipsData((prevData) => {
      const updatedData = prevData.map((data) =>
        data._id === selectedData?._id
          ? { ...data, isSelected: !data.isSelected }
          : data
      );
      return updatedData;
    });
  };

  useEffect(() => {
    if (chipsData.some((category) => category.isSelected)) {
      const dataItem = chipsData;
      const selectedID = dataItem
        .filter((data) => data.isSelected)
        .map((data) => data._id);
      setSelectedItems(selectedID);
    }
  }, [chipsData]);

  const handleUpdateProfile = async () => {
    try {
      const newIntrestsList: any[] = [];
      selectedItems.map((val) => newIntrestsList.push(val));
      if (newIntrestsList.length === 0) {
        showMessage({
          message: "Please select your category",
          duration: 3000,
          backgroundColor: skyBlueColor,
          type: "danger",
          position: "center",
        });
      }
      else
     { const formData = new FormData();
      formData.append("name", userName);
      formData.append("bio", bio);
      formData.append("email", getdata?.email);
      formData.append("interests", JSON.stringify(newIntrestsList || []));
      if (image === null) {
        console.log("No image selected");
      } else {
        formData.append("profile", {
          uri: image.path,
          type: image.mime,
          name: image.filename,
          filename: image.filename,
        });
      }
      const response = await ApiService.postUpdateInterest(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSelectedItems([]);
      const responseData = response.message;
      showMessage({
        message: responseData,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
        position: "center",
      });
      if (response?.status) {
        navigation.navigate("SuggetionScreen");
      }}
    } catch (error) {
      console.log("click error", error);
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
      <View style={styles.skipBtn}>
        <Button
          title="Skip"
          onPress={() => {
            navigation.navigate("SuggetionScreen");
          }}
          color={skyBlueColor}
        />
      </View>
      <Text style={styles.headingText}>{strings.FAVORITE_CATEGORIES}</Text>
      <View style={styles.selectView}>
        {chipsData.map((val) => {
          return (
            <FavouriteSelect data={val} onSelect={handleSelect} key={val._id} />
          );
        })}
      </View>
      <View style={styles.Btnview}>
        <CustomButton
          text="Continue"
          style={styles.Btn}
          textstyle={styles.btnText}
          onPress={() => handleUpdateProfile()}
        />
      </View>
    </SafeAreaView>
  );
};

export default HelpFavouriteScreen;

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
    marginTop: 30,
    width: "98%",
    alignSelf: "center",
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
  skipBtn: { alignItems: "flex-end", marginRight: 15, marginTop: 15 },
});
