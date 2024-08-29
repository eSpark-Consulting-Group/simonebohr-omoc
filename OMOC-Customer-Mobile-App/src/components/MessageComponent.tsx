import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import {
  neutralBlack,
  midBlack,
  whiteColor,
  lightGrey50,
  midGray,
  skyBlueColor,
  grey,
  blackColor,
} from "../utils/colors";
import { GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import FastImage from "react-native-fast-image";
import StorageService from "../services/storage.service";
import { direct_profile_pic1 } from "../utils/images";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MessageComponent = ({ listData }) => {
  const navigation = useNavigation();
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const localUserData = await StorageService.getUser();
      const userDetails = JSON.parse(localUserData);
      setCurrentId(userDetails.user._id);
    };
    fetchData();
  }, [currentId]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.mainView}>
        {listData.length > 0 ? (
          listData.map((data) => (
            <View key={data._id}>
              {data.users.map((item) => {
                if (item.userId._id !== currentId) {
                  return (
                    <TouchableOpacity
                      key={item.userId._id}
                      style={styles.flatlistView}
                      onPress={() => {
                        navigation.navigate("ChatScreen", {
                          item: item.userId,
                          Users: data.users,
                          UserId: data._id,
                          IniviteStatus: item.status,
                        });
                      }}
                    >
                      <View style={styles.viewFastImage}>
                        <FastImage
                          style={styles.directImage}
                          source={
                            item.userId.profileImg
                              ? { uri: item.userId.profileImg }
                              : direct_profile_pic1
                          }
                        />
                      </View>
                      <View style={styles.viewText}>
                        <Text style={styles.textYeete}>{item.userId.name}</Text>
                        <Text
                          style={[
                            styles.boremText,
                            { color: item.message !== 0 ? midBlack : grey },
                          ]}
                        >
                          {data?.latestMessage?.message}
                        </Text>
                      </View>
                      {item.message !== 0 && (
                        <View style={styles.firstIcon}>
                          <Text style={styles.messageChat}>{item.message}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                } else {
                  return null;
                }
              })}
            </View>
          ))
        ) : (
          <View style={styles.noRequestView}>
            <Text style={styles.noMSSGText}>No message requests</Text>
            <Text style={styles.textYeete}>
              You don't have any message request
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  mainView: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  requestText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: "right",
    color: lightGrey50,
  },
  message: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 28.8,
    color: neutralBlack,
  },
  flatlistView: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderColor: midGray,
    width: "99%",
    alignSelf: "center",
    flexDirection: "row",
  },
  textYeete: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22.4,
    color: neutralBlack,
  },
  boremText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16.8,
  },
  firstIcon: {
    justifyContent: "center",
    backgroundColor: skyBlueColor,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  oneIcon: {
    height: 20,
    width: 20,
  },
  viewText: {
    height: 60,
    width: "80%",
    gap: 4,
    marginHorizontal: 15,
  },
  viewFastImage: {
    marginTop: 15,
  },
  directImage: {
    height: 32,
    width: 32,
    borderRadius: 15,
  },
  viewMessageRequest: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  messageChat: {
    color: whiteColor,
    alignSelf: "center",
  },
  flatList: {
    marginBottom: 20,
  },
  noMSSGText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "800",
    fontSize: 22,
    color: blackColor,
  },
  noRequestView: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: "70%",
  },
});
