import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { strings } from "../../utils/string/strings";
import { GILROY_REGULAR, GILROY_SEMIBOLD } from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import {
  add_icon,
  plus,
  three_dots_icon,
  user_frame,
} from "../../utils/images";
import SearchTabBar from "../../component/SearchTabBar";
import FastImage from "react-native-fast-image";
import InventoryBottomSheet from "../../component/InventoryBottomSheet";

const data = [
  {
    image: user_frame,
    title: "Hoodie Havana V1",
    status: "Accepted",
    icon: three_dots_icon,
  },
  {
    image: user_frame,
    title: "Hoodie Havana V1",
    status: "Rejected",
    icon: three_dots_icon,
  },
  {
    image: user_frame,
    title: "Hoodie Havana V1",
    status: "Accepted",
    icon: three_dots_icon,
  },
];
const InventoryScreen = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Customheader
          title={strings.INVENTORY}
          showBackIcon={true}
          optionImage={undefined}
          onPress={undefined}
          Containerstyle={undefined}
          rihgtIconStyle={undefined}
        />
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{strings.TRACK_YOUR_CERTIFICATION}</Text>
        <Text style={styles.manageText}>{strings.MANAGE_YOUR_PRODUCT}</Text>
      </View>
      <View style={styles.viewBtn}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleBottomSheet}
        >
          <VectorImage source={add_icon} style={styles.addIcon} />
          <Text style={styles.textApply}>{strings.APPLY_CERTIFICATION}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <SearchTabBar
          placeholder={strings.SEARCH_PRODUCT}
          style={styles.tabBar}
        />
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={styles.viewContainer}>
                <FastImage source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.statusViewContainer}>
                  <View
                    style={[
                      styles.statusView,
                      {
                        backgroundColor:
                          item.status === "Rejected"
                            ? Colors.lightRed
                            : Colors.creamColor,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.status,
                        {
                          color:
                            item.status === "Rejected"
                              ? Colors.dangerRed
                              : Colors.green,
                        },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <VectorImage
                      source={item.icon}
                      style={styles.threeDotsIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
      {showBottomSheet && (
        <InventoryBottomSheet
          hideMe={() => {
            setShowBottomSheet(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 15,
  },
  titleText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 33.6,
    color: Colors.blackColor,
  },
  titleView: {
    marginTop: 40,
    marginLeft: 16,
    width: "70%",
  },
  manageText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.dimGray,
  },
  btnContainer: {
    width: 174,
    height: 49,
    backgroundColor: Colors.skyBlueColor,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.neutralGrey,
    flexDirection: "row",
    alignItems: "center",
  },
  viewBtn: {
    marginTop: 20,
    marginLeft: 16,
  },
  addIcon: {
    tintColor: Colors.whiteColor,
    marginLeft: 10,
  },
  textApply: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.whiteColor,
    alignSelf: "center",
    marginLeft: 5,
  },
  tabBar: {
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.neutralGrey,
    height: 48,
  },
  viewContainer: {
    backgroundColor: Colors.whiteColor,
    width: "95%",
    borderRadius: 12,
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    flex: 1,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 12,
    color: Colors.charcoal,
    marginTop: 30,
    right: 30,
  },
  status: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 14,
    color: Colors.green,
  },
  mainView: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusView: {
    width: 61,
    height: 22,
    backgroundColor: Colors.lightGreen,
    borderRadius: 22,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 25,
  },
  image: {
    width: 48,
    height: 48,
    marginTop: 12,
  },
  threeDotsIcon: {
    tintColor: Colors.blackColor,
    height: 16,
    marginTop: 30,
  },
  statusViewContainer: {
    flexDirection: "row",
    gap: 30,
  },
});
