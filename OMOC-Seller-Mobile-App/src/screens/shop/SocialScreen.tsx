import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { strings } from "../../utils/string/strings";
import { Colors } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import {
  close_circle_icon,
  three_dots_icon,
  tick_circle_icon,
} from "../../utils/images";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Height, Width } from "../../utils";
import ManageScreen from "./ManageScreen";
import SearchTabBar from "../../component/SearchTabBar";
const data = [
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    status: "Approve",
    iconthree_dots: three_dots_icon,
    icon: close_circle_icon,
    icon_two: tick_circle_icon,
  },
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    status: "Pending",
    icon: close_circle_icon,
    icon_two: tick_circle_icon,
    iconthree_dots: three_dots_icon,
  },
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    status: "Pending",
    icon: close_circle_icon,
    icon_two: tick_circle_icon,
    iconthree_dots: three_dots_icon,
  },
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    status: "Pending",
    icon: close_circle_icon,
    icon_two: tick_circle_icon,
    iconthree_dots: three_dots_icon,
  },
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    status: "Pending",
    icon: close_circle_icon,
    icon_two: tick_circle_icon,
    iconthree_dots: three_dots_icon,
  },
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    status: "Pending",
    icon: close_circle_icon,
    icon_two: tick_circle_icon,
    iconthree_dots: three_dots_icon,
  },
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    status: "Pending",
    icon: close_circle_icon,
    icon_two: tick_circle_icon,
    iconthree_dots: three_dots_icon,
  },
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    status: "Pending",
    icon: close_circle_icon,
    icon_two: tick_circle_icon,
    iconthree_dots: three_dots_icon,
  },
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    status: "Pending",
    icon: close_circle_icon,
    icon_two: tick_circle_icon,
    iconthree_dots: three_dots_icon,
  },
];

const SocialScreen = () => {
  const [selectedStatus, setSelectedStatus] = useState("Request");

  const handleSelector = (name) => {
    setSelectedStatus(name);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Customheader
        title={strings.SOCIAL}
        showBackIcon={true}
        Containerstyle={{ marginTop: 15, paddingBottom: 5 }}
      />
      <SearchTabBar
        placeholder={strings.SEARCH_INVOICE}
        style={styles.searching}
      />
      <View style={styles.tabViewContiner}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            style={[
              selectedStatus == "Request"
                ? styles.selectTab
                : styles.unSelectTab,
            ]}
            onPress={() => handleSelector("Request")}
          >
            <Text
              style={[
                selectedStatus == "Request"
                  ? styles.tabSelectTexT
                  : styles.tabUnSelectTexT,
              ]}
            >
              {strings.REQUEST}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              selectedStatus == "Manage Partnerships"
                ? styles.selectTab
                : styles.unSelectTab,
            ]}
            onPress={() => handleSelector("Manage Partnerships")}
          >
            <Text
              style={[
                selectedStatus == "Manage Partnerships"
                  ? styles.tabSelectTexT
                  : styles.tabUnSelectTexT,
              ]}
            >
              {strings.MANAGE_PARTNER}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              selectedStatus == "Comment Settings"
                ? styles.selectTab
                : styles.unSelectTab,
            ]}
            onPress={() => handleSelector("Comment Settings")}
          >
            <Text
              style={[
                selectedStatus == "Comment Settings"
                  ? styles.tabSelectTexT
                  : styles.tabUnSelectTexT,
              ]}
            >
              {strings.COMMENT}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {selectedStatus == "Request" && (
        <>
          <View style={styles.titleView}>
            <Text style={styles.title}>{strings.TITLE}</Text>
            <Text style={styles.title}>{strings.DESCRIPTION}</Text>
            <Text style={styles.title}>{strings.STATUS}</Text>
          </View>
          <View style={styles.flatlist}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => {
                return (
                  <View style={styles.viewBox}>
                    <View style={styles.viewName}>
                      <Text style={styles.textJhon}>{item.name}</Text>
                      <View style={styles.titleNumberView}>
                        <Text numberOfLines={0} style={styles.textBomber}>
                          {item.title}
                        </Text>
                        <Text style={styles.textnumber}>{item.number}</Text>
                      </View>

                      <View
                        style={[
                          styles.viewStatus,
                          {
                            backgroundColor:
                              item.status === "Pending"
                                ? Colors.newyellow
                                : Colors.lightGreen,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.pending,
                            {
                              color:
                                item.status === "Pending"
                                  ? Colors.yellow
                                  : Colors.green,
                            },
                          ]}
                        >
                          {item.status}
                        </Text>
                      </View>

                      <View style={styles.iconView}>
                        {item.status === "Pending" && (
                          <View style={styles.toucableIconView}>
                            <TouchableOpacity style={styles.crossIcon}>
                              <VectorImage
                                source={item.icon}
                                style={{ tintColor: Colors.dangerRed }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.circleRightIcon}>
                              <VectorImage
                                source={item.icon_two}
                                style={styles.iconRight}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                        {item.status === "Approve" && (
                          <TouchableOpacity style={styles.toucableThreeDot}>
                            <VectorImage
                              source={item.iconthree_dots}
                              style={styles.vectorIcon}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </>
      )}
      {selectedStatus == "Manage Partnerships" && <ManageScreen />}
      {selectedStatus == "Comment Settings" && <ManageScreen />}
    </SafeAreaView>
  );
};

export default SocialScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: Colors.whiteColor,
    flex: 1,
  },
  header: {
    marginTop: 15,
  },
  searching: {
    borderRadius: 20,
    paddingVertical: 3,
  },
  pending: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12.5,
    color: Colors.skyBlueColor,
  },
  icon: {
    bottom: 5,
  },
  input: {
    width: "92%",
  },
  textHeader: {
    marginTop: 15,
    left: 16,
    gap: 30,
    flexDirection: "row",
  },
  request: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.skyBlueColor,
  },
  manage: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.lightGrey50,
  },
  titleView: {
    height: 57,
    width: "95%",
    borderRadius: 12,
    backgroundColor: Colors.ghostWhite,
    marginTop: 20,
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
    gap: 53,
    paddingLeft: 20,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 14,
    lineHeight: 15,
    color: Colors.charcoal,
    marginTop: 5,
  },
  tabSelectTexT: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.skyBlueColor,
    fontSize: Width * (3.6 / 100),
  },
  selectTab: {
    marginVertical: Width * (2 / 100),
    paddingVertical: Width * (2 / 100),
    borderBottomColor: Colors.skyBlueColor,
    borderBottomWidth: Width * (0.5 / 100),
    marginHorizontal: 10,
  },
  tabUnSelectTexT: {
    fontFamily: GILROY_REGULAR,
    color: Colors.lightGrey50,
    fontSize: Width * (3.6 / 100),
  },
  unSelectTab: {
    marginVertical: Width * (2 / 100),
    paddingVertical: Width * (2 / 100),
    marginHorizontal: 10,
  },
  tabViewContiner: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    marginHorizontal: 15,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  viewBox: {
    height: 67,
    width: "95%",
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 10,
    alignSelf: "center",
    borderColor: Colors.blackColor,
    marginTop: 15,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.09,
    shadowRadius: 0.1,
    elevation: 3,
  },
  viewName: {
    flexDirection: "row",
    gap: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  iconView: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-end",
    width: "25%",
  },
  textJhon: {
    fontFamily: GILROY_REGULAR,
    fontSize: 13,
    textAlign: "center",
    color: Colors.lightBlack,
  },
  textBomber: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12.5,
    color: Colors.neutralBlack,
  },
  textnumber: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12.5,
    color: Colors.lightBlack,
  },
  viewStatus: {
    left: 30,
    width: 70,
    borderRadius: 22,
    paddingVertical: 4,
    paddingHorizontal: 8,
    lineHeight: 19.6,
  },
  toucableIconView: {
    flexDirection: "row",
  },
  crossIcon: {
    alignSelf: "center",
    marginHorizontal: 10,
  },
  circleRightIcon: {
    alignSelf: "center",
  },
  iconRight: {
    tintColor: Colors.green,
    height: 19,
    width: 19,
  },
  toucableThreeDot: {
    alignSelf: "center",
    left: 18,
  },
  vectorIcon: {
    tintColor: "black",
    height: 14,
    width: 4,
    marginHorizontal: 30,
  },
  titleNumberView: {
    gap: 5,
    left: 14,
    alignSelf: "center",
  },
  flatlist: {
    backgroundColor: Colors.creamColor,
    marginTop: 10,
    paddingBottom: 10,
    flex: 1,
  },
});
