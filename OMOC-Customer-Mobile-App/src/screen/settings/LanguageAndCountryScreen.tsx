import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { whiteColor, midGray, neutralBlack } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import VectorImage from "react-native-vector-image";
import { next_icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";

const LanguageAndCountryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.LANGUAGE_AND_COUNTRY}
          navigation={navigation}
        />
      </View>
      <TouchableOpacity
        style={styles.viewlanguage}
        onPress={() => navigation.navigate("LanguagesScreen")}
      >
        <Text style={styles.text}>{strings.LANGUAGES}</Text>
        <View style={styles.country}>
          <Text style={styles.engsing}>{strings.ENGLISH_SINGAPORE}</Text>
            <VectorImage style={styles.victorimage} source={next_icon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewlanguage}
        onPress={() => navigation.navigate("CountryScreen")}
      >
        <Text style={styles.text}>{strings.COUNTRY}</Text>
        <View style={styles.country}>
          <Text style={styles.engsing}>{strings.SINGAPORE}</Text>
          <View>
            <VectorImage style={styles.victorimage} source={next_icon} />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LanguageAndCountryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  space: {
    marginTop: 15,
  },
  header: {
    marginHorizontal: 15,
    marginBottom:20
  },
  country: {
    flexDirection: "row",
    alignItems: "center",
    gap:15
  },
  engsing: {
    color: "#AEAEAE",
    fontSize: 12,
    fontWeight:'400',
    fontFamily:GILROY_REGULAR
  },
  viewlanguage: {
    marginTop: 10,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    marginHorizontal: 20,
    paddingHorizontal:8
  },
  victorimage: {
    height: 13,
    width: 5,
  },
  text: {
    fontSize: 16,
    color: neutralBlack,
    fontWeight:'400',
    fontFamily:GILROY_REGULAR
  },
});
