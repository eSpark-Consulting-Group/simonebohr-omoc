import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SCREEN_HEIGHT } from "../../utils";
import { skyBlueColor, whiteColor } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import { back_icon } from "../../utils/images";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { strings } from "../../assets/string/strings";

const AdvancedSettingsScreen = ({ route, navigation }) => {
  const { onReturnCallback } = route.params;
  const [hideLikeViewCount, setHideLikeViewCount] = useState(false);
  const [isCommentingOff, setIsCommentingOff] = useState(false);
  const [isSensitiveContent, setIsSensitiveContent] = useState(false);

  const CommonSwitchView = ({ text, value, onValueChange }) => {
    return (
      <View style={styles.subContainer}>
        <Text style={styles.followingText}>{text}</Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ true: skyBlueColor, false: "red" }}
          style={{
            transform: [{ scaleX: 0.9 }, { scaleY: 0.8 }],
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headertext}>{strings.ADVANCED_SETTING}</Text>
        <TouchableOpacity
          style={styles.backIconView}
          onPress={() => {
            const param = {
              hideLikeViewCount,
              isCommentingOff,
              isSensitiveContent,
            };
            onReturnCallback(param);
            navigation.goBack();
          }}
        >
          <VectorImage source={back_icon} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <CommonSwitchView
        value={hideLikeViewCount}
        onValueChange={setHideLikeViewCount}
        text={strings.HIDE_LIKE_AND_VIEW_COUNTS_ON_THIS_POST}
      />
      <Text style={styles.titleText}>{strings.LOREM_TEXT}</Text>
      <View style={styles.divider} />
      <CommonSwitchView
        value={isCommentingOff}
        onValueChange={setIsCommentingOff}
        text={strings.HIDE_LIKE_AND_VIEW_COUNTS_ON_THIS_POST}
      />
      <View style={styles.divider} />
      <CommonSwitchView
        value={isSensitiveContent}
        onValueChange={setIsSensitiveContent}
        text={strings.HIDE_LIKE_AND_VIEW_COUNTS_ON_THIS_POST}
      />
      <Text style={styles.titleText}>{strings.LOREM_TEXT}</Text>
      <View style={styles.divider} />
    </SafeAreaView>
  );
};

export default AdvancedSettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: whiteColor },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
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
  suggestionText: {
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
    marginTop: 10,
    width: "93%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor:'red'
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
  followingText: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: "#242424",
    lineHeight: 22,
  },
  titleText: {
    textAlign: "justify",
    width: "93%",
    alignSelf: "center",
    marginVertical: 15,
    color: "#9E9E9E",
    fontFamily: GILROY_REGULAR,
  },
  divider: {
    height: 1,
    backgroundColor: "#EDEDED",
    width: "93%",
    alignSelf: "center",
    marginVertical: 12,
  },
});
