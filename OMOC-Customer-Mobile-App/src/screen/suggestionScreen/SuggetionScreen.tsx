import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import FollowingBox from "../favouriteScreen/FollowingBox";
import VectorImage from "react-native-vector-image";
import { sync_icon } from "../../utils/images";
import CustomButton from "../../components/CustomButton";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import Contacts from "react-native-contacts";
import ContactsList from "../favouriteScreen/ContactsList";
import { SafeAreaView } from "react-native";
import {
  grey,
  lightGrey50,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import Spinner from "../../components/Spinner";

const SuggetionScreen = ({ navigation }) => {
  const [isSycn, setIsSycn] = useState(false);
  const [isContact, setIsContact] = useState(true);
  const [loader, setLoader] = useState(false);
  const [showContacts, setShowContacts] = useState([]);
  const [popularUserList, setPopularUserList] = useState([]);
  const [followLoader, setFollowingLoader] = useState(false);

  useEffect(() => {
    getUserSuggestList();
  }, [followLoader]);

  const getUserSuggestList = async () => {
    try {
      setLoader(true);
      const response = await ApiService.getUserSuggestion();
      const data = response?.data?.usersList;
      setPopularUserList(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSycn = () => {
    setIsSycn(true);
  };

  const horizontalLimit = 3;

  const fetchContacts = () => {
    Contacts.checkPermission().then((permission) => {
      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
      if (permission === "undefined") {
        Contacts.requestPermission().then((permission) => {});
      }
      if (permission === "authorized") {
      }
      if (permission === "denied") {
      }
    });
    Contacts.getAll().then((contacts) => {
      setShowContacts(contacts);
      setIsContact(false);
    });
  };

  const handlePostFollow = async (id) => {
    try {
      setFollowingLoader(true);
      const response = await ApiService.postUserFollow({ userId: id });
      const responseData = response.message;
      showMessage({
        message: responseData,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
        position: "center",
      });
      setFollowingLoader(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUnfollow = async (id) => {
    try {
      setFollowingLoader(true);
      const response = await ApiService.postUserUnfollow({ userId: id });
      const responseData = response.message;
      showMessage({
        message: responseData,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
        position: "center",
      });
      setFollowingLoader(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <CustomHeaderShown title="suggestion" navigation={navigation} />
        <ScrollView bounces={false}>
          <View style={styles.container}>
            <Text style={styles.headdingText}>{strings.POPULAR_PEOPLE}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("PopularPeopleScreen")}
            >
              <Text style={styles.btnText}>{strings.SEE_ALL}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={popularUserList}
            renderItem={({ item }) => (
              <FollowingBox
                data={item}
                handlePostFollow={handlePostFollow}
                handleUnfollow={handleUnfollow}
              />
            )}
          />
          <Text style={styles.contactHeadding}>
            {strings.FROM_YOUR_CONTACT}
          </Text>
          {isContact && (
            <View style={styles.contactView}>
              <View style={styles.sycnView}>
                <VectorImage source={sync_icon} style={styles.sycnImg} />
              </View>
              <View style={styles.sycnText}>
                <Text style={styles.headdingText}>
                  {strings.SYNC_YOUR_CONTACT}
                </Text>
                <Text style={styles.subText}>
                  {strings.SYNC_YOUR_CONTACT_RECOMENDATION}
                </Text>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.sycnBtn}
                  onPress={() => {
                    handleSycn();
                    fetchContacts();
                  }}
                >
                  <Text style={styles.sycnBtnText}>{strings.SYNC_NOW}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {isSycn && (
            <FlatList
              data={showContacts.slice(0, horizontalLimit)}
              numColumns={horizontalLimit}
              style={{ flexDirection: "row" }}
              data={showContacts}
              renderItem={({ item }) => <ContactsList data={item} />}
            />
          )}
        </ScrollView>
      </View>
      <View style={styles.btnView}>
        <CustomButton
          onPress={() => {
            navigation.navigate("TabNavigator");
          }}
          text="Finish"
          style={[
            {
              backgroundColor: isSycn ? skyBlueColor : "#E0E0E0",
            },
          ]}
          textstyle={{
            color: isSycn ? whiteColor : lightGrey50,
          }}
        />
      </View>
      {loader && <Spinner animating={loader} />}
    </SafeAreaView>
  );
};

export default SuggetionScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  btnText: {
    color: skyBlueColor,
    fontSize: 12,
    fontWeight: "500",
  },
  headdingText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16.8,
    color: neutralBlack,
  },
  contactHeadding: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 30,
    color: neutralBlack,
  },
  contactView: {
    flexDirection: "row",
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 16,
    gap: 8,
    width: 361,
    height: 74,
    marginTop: 20,
    borderColor: "#EDEDED",
  },
  sycnText: {
    flex: 1,
    justifyContent: "center",
    gap: 3,
  },
  subText: {
    fontSize: 10,
    fontWeight: "400",
    color: grey,
  },
  sycnView: {
    justifyContent: "center",
  },
  sycnImg: {
    width: 30,
    height: 30,
    tintColor: "#0094FF",
    justifyContent: "center",
    marginLeft: 15,
  },
  btnContainer: {
    justifyContent: "center",
  },
  sycnBtn: {
    borderWidth: 1,
    width: 65,
    height: 24,
    borderRadius: 24,
    marginRight: 15,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderColor: "#AADBFF",
  },
  sycnBtnText: {
    fontSize: 10,
    fontWeight: "500",
    color: skyBlueColor,
  },
  subContainer: {
    paddingHorizontal: 15,
  },
  btnView: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignSelf: "center",
  },
});
