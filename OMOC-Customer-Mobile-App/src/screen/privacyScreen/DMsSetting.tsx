import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import { grey, midGray, neutralBlack, whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { next_icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";

const DMsSetting = ({ navigation }) => {
  const [switchOn, setSwitchOn] = useState(false);
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.DMS_SETTING}
          navigation={navigation}
        />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.headingText}>{strings.AUTO_REPLY_CHAT}</Text>
          <Switch
            trackColor={{ true: "#0094FF" }}
            value={switchOn}
            onValueChange={() => {
              setSwitchOn(!switchOn);
            }}
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subText}>{strings.DMS_SETTING_SUB_TEXT}</Text>
          <TouchableOpacity>
            <VectorImage source={next_icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.headingText}>{strings.TEMPLATE_CHAT}</Text>
          <TouchableOpacity>
            <VectorImage source={next_icon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DMsSetting;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  mainContainer:{
    marginVertical:30
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: "center"
  },
  headingText: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color:neutralBlack
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    alignItems: "center",
    marginTop:5,
  },
  subText: {
    fontSize: 12,
    fontWeight: "400",
    color: grey,
    lineHeight: 21,
    width: "85%",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 15,
    marginTop:10
  },
});
