import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import VectorImage from "react-native-vector-image";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { grey, midGray, neutralBlack, whiteColor } from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import { next_icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";

const YourData = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown title={strings.YOUR_DATA} navigation={navigation} />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.decText}>{strings.LOREM_TEXT}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("SafetySettings")}
          >
            <Text style={styles.textStyle}>{strings.SAFTEY_SETTINGS}</Text>
            <TouchableOpacity>
              <VectorImage style={styles.icon} source={next_icon} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <Text style={styles.textStyle}>{strings.PRIVACY_POLICY}</Text>
            <TouchableOpacity>
              <VectorImage style={styles.icon} source={next_icon} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <Text style={styles.textStyle}>{strings.TERMS_CONDITIONS}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <Text style={styles.textStyle}>{strings.COOKIES_SETTING}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default YourData;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  mainContainer: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  decText: {
    lineHeight: 21,
    color: grey,
    marginHorizontal: 5,
  },
  container: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    paddingVertical: 12,
    paddingHorizontal:1
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color:neutralBlack
  },
  icon: {
    marginHorizontal: 10,
  },
  btnContainer: {
    marginVertical: 20,
  },
});
