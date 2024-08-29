import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import {
  midGray,
  whiteColor,
  lightGrey,
  grey,
  neutralBlack,
} from "../../utils/colors";
import { GILROY_REGULAR } from "../../utils/fonts";
import FastImage from "react-native-fast-image";
import { group_icon } from "../../utils/images";
import SearchTabBar from "../searchScreen/SearchTabBar";
import VectorImage from "react-native-vector-image";
import { messageData } from "../../sampleData/MessageData";

const NewMessageScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.backBtn}>
      <View style={styles.btnView}>
        <CustomHeaderShown
          title={strings.NEW_MESSAGE}
          navigation={navigation}
        />
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.searchTabView}>
          <SearchTabBar placeholder={strings.SEARCH_FRIENDS} />
        </View>
        <TouchableOpacity
        onPress={()=>navigation.navigate("AddParticipantScreen")}
        style={styles.viewImage}>
          <VectorImage style={styles.groupIcon} source={group_icon} />
          <Text style={styles.newGroupText}>{strings.NEW_GROUP}</Text>
        </TouchableOpacity>
        <View style={styles.viewOmoc}>
          <Text style={styles.followingText}>{strings.FOLLOWING_ON_OMOC}</Text>
          <View style={styles.viewFlat}>
            <FlatList
              style={styles.flatList}
              showsVerticalScrollIndicator={false}
              data={messageData}
              contentContainerStyle={{
                paddingBottom: 150,
              }}
              renderItem={({ item }) => {
                return (
                  <View style={styles.flatlistView}>
                    <View style={styles.viewFastImage}>
                      <FastImage
                        style={styles.directImage}
                        source={item.image}
                      />
                    </View>
                    <View style={styles.viewText}>
                      <Text style={styles.textYeete}>{item.name}</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewMessageScreen;

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  btnView: {
    marginHorizontal: 17,
    marginTop: 10,
  },
  mainView: {},
  searchTabView: {
    marginTop: 30,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 14,
    color: lightGrey,
  },
  viewImage: {
    borderRadius: 32,
    gap: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    paddingVertical: 8,
  },
  newGroupText: {
    marginTop: 8,
  },
  followingText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: grey,
  },
  viewOmoc: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  flatlistView: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderColor: midGray,
    width: "99%",
    alignSelf: "center",
    flexDirection: "row",
  },
  viewFastImage: {
    marginTop: 15,
  },
  directImage: {
    height: 32,
    width: 32,
  },
  flatList: {
    marginBottom: 100,
  },
  viewText: {
    height: 60,
    width: "80%",
    gap: 4,
    marginHorizontal: 15,
  },
  textYeete: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22.4,
    color: neutralBlack,
    marginTop: 18,
  },
  groupIcon: {
    height: 36,
    width: 36,
  },
  viewContainer: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  viewFlat: {
    paddingBottom: 150,
  },
});
