import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import { filter_icon, salePost, wishlist_color } from "../../utils/images";
import FastImage from "react-native-fast-image";
import { CONTEXT, strings } from "../../utils/string/strings";
import { Colors } from "../../utils/colors";
import SearchTabBar from "../../component/SearchTabBar";
import FilterByTimesBottomSheet from "../../component/FilterByTimesBottomSheet";
import { showMessage } from "react-native-flash-message";
import ApiService from "../../services/api.service";
import Spinner from "../../component/Spinner";
import { useNavigation } from "@react-navigation/native";
import StorageService from "../../services/storage.service";

const Chats = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [chatAllDeatil, setChatAllDeatil] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    setHeader();
    getData();
  }, [navigation]);

  function setHeader() {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={styles.leftHeaderView}>
            <Text style={styles.headerText}>{strings.CHAT}</Text>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View>
            <TouchableOpacity onPress={() => setModalVisible(true)} >
              <VectorImage source={filter_icon} />
            </TouchableOpacity>
          </View>
        );
      },
      title: "",
    });
  }

  const handleBottomSheet = () => {
    setModalVisible(false)
    setShowBottomSheet(true);
  };

  const getData = async () => {
    try {
      setFetching(true);
      const data = await ApiService.getChatApi();
      if (data?.statusCode === 200) {
        const localUserData = await StorageService.getUser();
        const userDetails = JSON.parse(localUserData);
        currentId = userDetails.user._id;
      }
      setFetching(false);
      const response = data?.data?.chats;
      setChatAllDeatil(response);
      const userIdData = response.flatMap((item) =>
        item.users.map((user) => user.userId)
      );
      const userIds = userIdData.map((item) => item._id);
    } catch (error) {
      showMessage({
        message: "Not Found data",
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchTabBar placeholder={strings.SEARCH} style={styles.searchBar} />

      <View style={styles.listContainer}>
        {chatAllDeatil.length > 0 ? (
          chatAllDeatil.map((chat) => (
            <View key={chat._id}>
              {chat.users.map((item) => {
                if (item.userId._id !== currentId) {
                  return (
                    <TouchableOpacity
                      style={styles.inboxListContainer}
                      onPress={() => {
                        navigation.navigate("ChatWindow", {
                          item: item.userId,
                          UserId: chat._id,
                        });
                      }}
                      key={item.userId._id} // Add key here to avoid React warning
                    >
                      <FastImage
                        source={
                          item.userId.profileImg
                            ? { uri: item.userId.profileImg }
                            : salePost
                        }
                        style={styles.userImage}
                      />
                      <View style={styles.subView}>
                        <Text style={styles.userNameText}>
                          {item.userId.name}
                        </Text>
                        <Text numberOfLines={1} style={styles.messageText}>
                          {chat?.latestMessage?.message}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
                return null;
              })}
            </View>
          ))
        ) : (
          <Text style={styles.noMSSGText}>No messages found</Text>
        )}
      </View>

      {showBottomSheet && (
        <FilterByTimesBottomSheet
          hideMe={() => {
            setShowBottomSheet(false);
          }}
        />
      )}
      {fetching && <Spinner animating={fetching} />}

      <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.viewRemove}>
                <Text style={styles.remove}>{CONTEXT.UNREAD}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.viewBan}>
                <Text style={styles.banUser}>{CONTEXT.NEWEST}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>setModalVisible(false)} style={styles.viewBan}>
                <Text style={styles.banUser}>{CONTEXT.OLDEST}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBottomSheet} style={styles.viewBan}>
                <Text style={styles.banUser}>{CONTEXT.FILTER_BY_TIME}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

    </SafeAreaView>
  );
};
export default Chats;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  leftHeaderView: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 20,
    color: Colors.blackColor,
  },
  listContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    height: "100%",
  },
  inboxListContainer: {
    marginBottom: 8,
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: "contain",
    borderColor: Colors.lightGrey50,
    borderWidth: 0.5,
  },
  subView: { gap: 5 },
  userNameText: {
    color: Colors.neutralBlack,
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    lineHeight: 22.4,
  },
  messageText: {
    color: "#9E9E9E",
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    lineHeight: 16.8,
  },
  searchBar: {
    width: "95%",
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    backgroundColor: Colors.lightGrey,
  },
  modalContainer:{
    flex:1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    width: 186,
    height: 204,
    padding: 12,
    backgroundColor: Colors.whiteColor,
    alignSelf:'flex-end',
    alignItems: "center",
    borderRadius: 16,
    marginTop: '16%',
    marginRight: '13%',


  },
  viewRemove: {
    width: 162,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.aliceBlue,
  },
  viewBan: {
    width: 162,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.whiteColor,
    marginTop: 10,
  },
  remove: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 14,
    lineHeight: 17,
    color: Colors.skyBlueColor,
  },
  banUser: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    lineHeight: 17,
    color: Colors.blackColor,
  },
  noMSSGText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.blackColor,
    textAlign: "center",
    marginTop:20
  },
});
