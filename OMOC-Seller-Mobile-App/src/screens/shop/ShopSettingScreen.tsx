import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
  Alert,
} from "react-native";
import React from "react";
import { Colors } from "../../utils/colors";
import { strings } from "../../utils/string/strings";
import CustomHeader from "../../component/Customheader";
import { arrowleft_icon, logout_icon } from "../../utils/images";
import VectorImage from "react-native-vector-image";
import { GILROY_REGULAR } from "../../utils/fonts";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShopSettingScreen = ({ navigation }) => {
  const DATA = [
    {
      id: 1,
      title: "General Information",
      name: "GeneralInformationScreen",
    },
    {
      id: 2,
      title: "Shipping",
      name: "Shipping",
    },
    {
      id: 3,
      title: "Legal",
      name: "LegalPoliciesScreen",
    },
    {
      id: 4,
      title: "Markets",
      name: "",
    },
    {
      id: 5,
      title: "Newsletter",
      name: "Newsletters",
    },
    {
      id: 6,
      title: "Brand",
      name: "BrandScreen",
    },
    {
      id: 7,
      title: "Taxex & Customs",
      name: "Shipping",
    },
    {
      id: 8,
      title: "Age Restriction",
      name: "AgeRestrictionScreen",
    },
    {
      id: 9,
      title: "Billing",
      name: "BillingScreen",
    },
    {
      id: 10,
      title: "Social",
      name: "SocialScreen",
    },
    {
      id: 11,
      title: "Manage Files",
      name: "ManageFilesScreen",
    },
    {
      id: 12,
      title: "Shop Status",
      name: "ShopStatusScreen",
    },
    {
      id: 13,
      title: "User and Permission",
      name: "UserAndPermission",
    },
    {
      id: 14,
      title: "Faq",
      name: "FaqScreen",
    },
    {
      id: 15,
      title: "Profile",
      name: "ProfileScreen",
    },
  ];

  const onNavigation = (item) => {
    navigation.navigate(item.name);
  };
  const handleLogoutConfirm = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => handleLogoutConfirm(),
      },
    ]);
  };

  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.viewHeader}
        onPress={() => onNavigation(item)}
      >
        <Text style={styles.text}>{item.title}</Text>
        <VectorImage source={arrowleft_icon} style={styles.icon} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.header}>
        <CustomHeader
          title={strings.SHOP_SETTING}
          showBackIcon={true}
          Containerstyle={{ marginTop: 10, paddingBottom: 5 }}
        />
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={DATA}
          contentContainerStyle={styles.flatContainer}
          renderItem={renderList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return (
              <TouchableOpacity
                style={styles.viewHeader}
                onPress={() => handleLogout()}
              >
                <Text style={styles.logOutText}>logout</Text>
                <FastImage
                  source={logout_icon}
                  style={styles.logoutIcon}
                  tintColor="#c22e1d"
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShopSettingScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: Colors.whiteColor,
    flex: 1,
  },
  viewHeader: {
    marginTop: 15,
    borderBottomWidth: 1,
    paddingVertical: 12,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.neutralGrey,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    height: 18,
    width: 6,
    tintColor: Colors.neutralBlack,
  },
  logoutIcon: {
    height: 20,
    width: 20,
  },
  text: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    color: Colors.neutralBlack,
  },
  header: {
    paddingHorizontal: 8,
    marginTop: 10,
  },
  flatlistContainer: {
    flex: 1,
  },
  toucable: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginRight: 10,
  },
  logOutText: {
    color: "red",
  },
});
