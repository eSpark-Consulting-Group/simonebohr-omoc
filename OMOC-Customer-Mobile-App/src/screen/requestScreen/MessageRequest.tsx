import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  grey,
  midBlack,
  whiteColor,
  lightGrey50,
  neutralBlack,
  midGray,
  skyBlueColor,
  blackColor,
} from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import FastImage from "react-native-fast-image";
import { GILROY_REGULAR, GILROY_SEMIBOLD } from "../../utils/fonts";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import ApiService from "../../services/api.service";
import StorageService from "../../services/storage.service";
import { direct_profile_pic1 } from "../../utils/images";

const MessageRequest = ({ navigation }) => {
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getChatList();
  }, []);

  const getChatList = async () => {
    try {
      const response = await ApiService.getRequestChatList(false);  
      if (response.statusCode === 200) {
        const localUserData = await StorageService.getUser();
        const userDetails = JSON.parse(localUserData);
        currentId = userDetails.user._id;
      }
      const responseData = response?.data?.chats;
      setChatData(responseData);
      const userIdData = responseData.flatMap((item) =>
        item.users.map((user) => user.userId)
      );
      const userIds = userIdData.map((item) => item._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backBtn}>
        <CustomHeaderShown title={strings.REQUEST} navigation={navigation} />
      </View>
      <View style={styles.mainView}>
        {chatData.length > 0 ? (
          chatData.map((chat) => (
            <View key={chat._id}>
              {chat.users.map((item) => {
                if (item.userId._id !== currentId) {
                  return (
                    <TouchableOpacity
                      style={styles.flatlistView}
                      onPress={() => {
                        navigation.navigate("ChatScreen", {
                          item: item.userId,
                          Users: chat.users,
                          UserId: chat._id,
                          IniviteStatus: true,
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
                            { color: item.message != 0 ? midBlack : grey },
                          ]}
                        >
                          {chat?.latestMessage?.message}
                        </Text>
                      </View>
                      {item.message != 0 && (
                        <View style={styles.firstIcon}>
                          <Text style={styles.messageChat}>{item.message}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          ))
        ) : (
          <View style={styles.noRequestView}>
          <Text style={styles.noMSSGText}>No message requests</Text>
          <Text style={styles.textYeete}>You don't have any message request</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MessageRequest;

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  backBtn: {
    marginHorizontal: 15,
  },
  mainView: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  requestText: {
    fontFamily: GILROY_REGULAR,
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
    resizeMode: "contain",
    borderRadius: 20,
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
  noMSSGText:{
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "800",
    fontSize: 22,
    color:blackColor,
  },
  noRequestView:{
    alignSelf:'center',
    alignItems:'center',
    marginTop:'70%'
  }
});
