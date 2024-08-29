import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SCREEN_HEIGHT } from "../../utils";
import { skyBlueColor, whiteColor } from "../../utils/colors";
import Spinner from "../../components/Spinner";
import UserListComponent from "../../components/UserListComponent";
import SearchTabBar from "../searchScreen/SearchTabBar";
import { palceholders, strings } from "../../assets/string/strings";
import ApiService from "../../services/api.service";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import CustomHeaderShown from "../../components/CustomHeaderShown";

const TagFriendsScreen = ({ route, navigation }) => {
  const { onPressDone, preSelectedFriends } = route.params;
  const [loading, setLoader] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState(preSelectedFriends);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoader(true);
        const response = await ApiService.getFollowingList();
        setFriendsList(response.followingList);
      } catch (error) {
        console.log(JSON.stringify(error));
      } finally {
        setLoader(false);
      }
    };
    fetchFriends();
  }, []);

  const _onDone = async () => {
    onPressDone(selectedFriends);
    navigation.goBack();
  };

  const _onPress = (item, found) => {
    if (!found) {
      setSelectedFriends((result) => [...result, item._id]);
    } else {
      setSelectedFriends((result) => result.filter((val) => val != item._id));
    }
  };

  const renderFriendsList = ({ item }) => {
    const found = selectedFriends.some((val) => val === item?._id);
    return (
      <UserListComponent
        item={item}
        onSelect={() => _onPress(item, found)}
        isSelected={found}
      />
    );
  };

  const renderEmptyFriendsList = () => {
    return (
      <>
        {!loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyContainerText}>
              Sorry, can't find friends!
            </Text>
          </View>
        ) : null}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeaderShown
          title={strings.SELECT_LOCATION}
          navigation={navigation}
        />
      </View>
      <SearchTabBar
        placeholder={palceholders.WHO_IS_IN_THIS_VIDEO}
        style={styles.searchBar}
      />
      <View style={styles.subContainer}>
        <Text style={styles.followingText}>{strings.FOLLOWING}</Text>
        <TouchableOpacity onPress={() => setSelectedFriends([])}>
          <Text style={styles.clearAll}>{strings.CLEAR_ALL}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={friendsList}
          renderItem={renderFriendsList}
          ListEmptyComponent={renderEmptyFriendsList}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.bottomOptionContainer}>
        <TouchableOpacity onPress={_onDone} style={styles.btnNext}>
          <Text style={styles.doneButtonText}>{strings.DONE}</Text>
        </TouchableOpacity>
      </View>
      {loading && <Spinner animating={loading} textStyle={{}} />}
    </SafeAreaView>
  );
};

export default TagFriendsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: whiteColor },
  headerContainer: { marginHorizontal: 20 },
  btnNext: {
    width: "93%",
    height: 47,
    backgroundColor: skyBlueColor,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 19,
  },
  bottomOptionContainer: {
    bottom: 0,
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingBottom: SCREEN_HEIGHT * 0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  backIconView: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    left: 0,
  },
  backIcon: { width: 6, height: 14, tintColor: "#000000" },
  headertext: {
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    color: "#000000",
  },
  textStyle: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: "#242424",
    lineHeight: 22,
  },
  followingText: {
    fontSize: 16,
    fontFamily: GILROY_SEMIBOLD,
    color: "#242424",
    lineHeight: 22,
  },
  clearAll: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: "#242424",
    lineHeight: 22,
  },
  searchBar: { width: "93%", alignSelf: "center", marginTop: 25, gap: 12 },
  subContainer: {
    marginTop: 25,
    width: "93%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listContainer: { flex: 1, marginTop: 25 },
  emptyContainer: {
    marginTop: 10,
    width: "93%",
    alignSelf: "center",
  },
  emptyContainerText: {
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    color: "red",
  },
});
