import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { CONTEXT, palceholders, strings } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import { friend_image, three_dots_icon } from "../../utils/images";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import FastImage from "react-native-fast-image";
import AddReasonBottomSheet from "../../component/AddReasonBottomSheet";
import ListEmployeeBottomSheet from "../../component/ListEmployeeBottomSheet";

const data = [
  {
    image: friend_image,
    title: "1. Certain product offerings are not available",
    status: "Accepted",
    icon: three_dots_icon,
  },
  {
    image: friend_image,
    title: "2. Product prices don't match",
    status: "Rejected",
    icon: three_dots_icon,
  },
  {
    image: friend_image,
    title: "3. Invalid product discount",
    status: "Accepted",
    icon: three_dots_icon,
  },
];
const Setup = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };
  return (
    <MenuProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Customheader
            title={strings.SOCIAL}
            showBackIcon={true}
            optionImage={undefined}
            onPress={undefined}
            Containerstyle={undefined}
            rihgtIconStyle={undefined}
          />
        </View>
        <View style={styles.mainContainerView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{strings.SETUP_VIDEO_HELP}</Text>
            <Text style={styles.manageText}>{palceholders.MANAGE_SHOP}</Text>
          </View>
          <View style={styles.reasonView}>
            <View style={styles.titleBoxView}>
              <Text style={styles.Reason}>{strings.REASON}</Text>
              <Text style={styles.Reason}>{strings.EMPLOYEE}</Text>
            </View>
          </View>
          <View>
            <FlatList
              data={data}
              renderItem={({ item }) => {
                return (
                  <View style={styles.flatlistView}>
                    <View style={styles.viewContainer}>
                      <View style={styles.textTitleView}>
                        <Text style={styles.title}>{item.title}</Text>
                      </View>
                      <View style={styles.imageView}>
                        <FastImage source={item.image} style={styles.image} />
                        <FastImage source={item.image} style={styles.image} />
                        <FastImage source={item.image} style={styles.image} />
                        <View style={styles.plusfiveView}>
                          <Text style={styles.five}>+5</Text>
                        </View>
                      </View>
                      <Menu>
                        <MenuTrigger>
                          <VectorImage
                            source={item.icon}
                            style={styles.threeDotsIcon}
                          />
                        </MenuTrigger>
                        <MenuOptions
                          optionsContainerStyle={styles.modalContent}
                        >
                          <MenuOption
                            onSelect={handleBottomSheet}
                            style={styles.viewRemove}
                          >
                            <Text style={styles.remove}>
                              {CONTEXT.EDIT_REASON}
                            </Text>
                          </MenuOption>
                          <MenuOption
                            onSelect={() => Alert.alert(`Delete`)}
                            style={styles.viewBan}
                          >
                            <Text style={styles.banUser}>
                              {CONTEXT.DELETE_PRODUCT}
                            </Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
        {showBottomSheet && (
          <AddReasonBottomSheet
            hideMe={() => {
              setShowBottomSheet(false);
            }}
          />
        )}
      </SafeAreaView>
    </MenuProvider>
  );
};

export default Setup;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 15,
  },
  mainContainerView: {
    marginHorizontal: 15,
  },
  plusfiveView: {
    backgroundColor: Colors.skyBlueColor,
    height: 18,
    width: 18,
    borderRadius: 20,
    borderColor: Colors.GraylightRed,
    borderWidth: 0.75,
    marginLeft: -5,
    justifyContent: "center",
    alignItems: "center",
  },
  five: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 7.2,
    color: Colors.whiteColor,
  },
  flatlistView: {
    marginTop: 15,
  },
  imageView: {
    flexDirection: "row",
    right: 10,
    height: 18,
    width: 63,
    borderWidth: 0.75,
    borderColor: Colors.GraylightRed,
  },
  titleBoxView: {
    flexDirection: "row",
    justifyContent: "space-around",
    right: 40,
  },
  textTitleView: {
    width: "39%",
  },
  modalContent: {
    marginLeft: 10,
    alignSelf: "center",
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
  },
  viewRemove: {
    width: 162,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.aliceBlue,
  },
  remove: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.skyBlueColor,
  },
  banUser: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.blackColor,
  },
  viewBan: {
    width: 162,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.whiteColor,
    marginTop: 15,
  },
  titleText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 33.6,
    color: Colors.blackColor,
  },
  Reason: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 12,
    fontWeight: "700",
    color: Colors.charcoal,
  },
  titleView: {
    marginTop: 40,
    width: "70%",
  },
  manageText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.dimGray,
  },
  reasonView: {
    width: "100%",
    height: 57,
    backgroundColor: Colors.ghostWhite,
    borderRadius: 12,
    marginTop: "15%",
    justifyContent: "center",
  },

  viewContainer: {
    backgroundColor: Colors.whiteColor,
    height: 66,
    width: "100%",
    borderRadius: 12,
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 16,
    alignSelf: "center",
    flexDirection: "row",
    flex: 1,
    bottom: 5,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.84,

    elevation: 6,
  },
  title: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 12,
    color: Colors.neutralBlack,
  },
  image: {
    width: 18,
    height: 18,
    borderRadius: 20,
    borderColor: Colors.GraylightRed,
    borderWidth: 0.75,
    marginLeft: -5,
  },
  threeDotsIcon: {
    tintColor: Colors.blackColor,
    height: 16,
    right: 10,
  },
});
