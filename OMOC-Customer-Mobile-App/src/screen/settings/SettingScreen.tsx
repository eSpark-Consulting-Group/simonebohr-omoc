import {
  Alert,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import SettingComponent from "../../components/settingComponent/SettingComponent";
import { AccountData } from "../../sampleData/SettingData";
import { dangerRed, grey, midGray, red, whiteColor } from "../../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";

const SettingScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        hidden={false}
        barStyle="dark-content"
      />
      <View style={styles.headerComponent}>
        <CustomHeaderShown title={strings.SETTINGS} navigation={navigation} />
      </View>
      <SectionList
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        sections={AccountData}
        renderSectionHeader={({ section: { heading } }) => (
          <Text style={styles.headding}>{heading}</Text>
        )}
        renderItem={({ item }) => (
          <SettingComponent data={item} navigation={navigation} />
        )}
        contentContainerStyle={{paddingBottom:50}}
    
      />
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  headerComponent: {
    marginHorizontal: 15,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  accountList: {
    marginTop: 20,
  },
  headding: {
    fontSize: 12,
    color: grey,
    marginTop: 20,
    marginHorizontal: 10,
    fontFamily:GILROY_MEDIUM
  },
  containerLogout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderBottomColor: midGray,
    paddingHorizontal:5,
    marginTop:8
  },
  textStyle: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    color:dangerRed
  },
  iconStyle: {
    width: 25,
    height: 25,
    resizeMode:'contain',
    tintColor:dangerRed
  },
  update: {
    height: 10,
    width: 10,
    backgroundColor: red,
    borderRadius: 20,
  },
  rightContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
