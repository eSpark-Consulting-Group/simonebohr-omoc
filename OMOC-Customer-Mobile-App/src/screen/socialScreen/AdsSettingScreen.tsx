import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import { Switch } from "react-native-paper";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { next_icon } from "../../utils/images";
import { GILROY_BOLD, GILROY_REGULAR } from "../../utils/fonts";
import { neutralBlack, grey, whiteColor } from "../../utils/colors";

const AdsSettingScreen = ({ navigation }) => {
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.ADS_SETTINGS}
          navigation={navigation}
        />
      </View>
      <View style={styles.mainView}>
        <View style={styles.personalizedView}>
          <Text style={styles.textAds}>{strings.PERSONALIZED_ADS}</Text>
          <Switch
            trackColor={{ true: "#0094FF" }}
            value={switchOn}
            onValueChange={() => {
              setSwitchOn(!switchOn);
            }}
          />
        </View>
        <View>
          <Text style={styles.loremText}>{strings.LOREM_TEXT}</Text>
        </View>
          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.textData}>{strings.SEE_YOUR_DATA}</Text>
            <VectorImage style={styles.victorImage} source={next_icon} />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdsSettingScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  header: {
    marginHorizontal: 15,
  },
  mainView: {
    marginTop: 30,
    gap: 12,
    marginHorizontal: 15,
  },
  personalizedView: {
    borderRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textAds: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22.4,
    fontFamily: GILROY_REGULAR,
    color: neutralBlack,
  },
  loremText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 21.6,
    color: grey,
  },
  textData: {
    fontFamily: GILROY_BOLD,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22.4,
    color: neutralBlack,
  },
  victorImage: {
    height: 9,
    width: 5,
  },
  touchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
});
