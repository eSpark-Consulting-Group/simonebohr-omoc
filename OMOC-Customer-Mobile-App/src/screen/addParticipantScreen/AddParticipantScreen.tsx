import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  whiteColor,
  midGray,
  neutralBlack,
  skyBlueColor,
} from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import SearchTabBar from "../searchScreen/SearchTabBar";
import FastImage from "react-native-fast-image";
import { AddParticipantData } from "../../sampleData/AddParticipantData";
import CustomCheckBox from "../../components/CustomCheckBox";
import { GILROY_REGULAR } from "../../utils/fonts";

const AddParticipantScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.backBtn}>
        <CustomHeaderShown
          navigation={navigation}
          rightheadertext={strings.NEXT}
          title={strings.ADD_PARTICIPANT}
          onRightHeaderPress={() => navigation.navigate("NewGroupScreen")}
        />
        <View style={styles.searchBar}>
          <SearchTabBar placeholder={strings.SEARCH} />
        </View>
      </View>
      <FlatList
        data={AddParticipantData}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity style={styles.container}>
                <View style={styles.imageContainer}>
                  <FastImage style={styles.profileImg} source={item.Image} />
                  <Text style={styles.profileText}>{item.Heading}</Text>
                </View>
                <View style={styles.checkBoxView}>
                  <CustomCheckBox
                    boxType="square"
                    onFillColor={skyBlueColor}
                    onCheckColor={whiteColor}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.border}></View>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default AddParticipantScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  backBtn: {
    marginHorizontal: 15,
  },
  searchBar: {
    marginTop: 25,
  },
  container: {
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 20,
    justifyContent: "space-between",
  },
  profileImg: {
    height: 32,
    width: 32,
  },
  profileText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    fontWeight: "400",
    color: neutralBlack,
    marginHorizontal: 15,
  },
  border: {
    borderBottomWidth: 1,
    marginTop: 18,
    borderColor: midGray,
    height: 2,
    width: "95%",
    marginHorizontal: 10,
  },
  checkBoxView: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 35,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
