import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import { grey, midGray, neutralBlack, whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { GILROY_REGULAR } from "../../utils/fonts";
import { next_icon } from "../../utils/images";

const dataList = [
  { title: "Request Verification" },
  { title: "Contact Sync" },
  { title: "DMs Settings" },
  { title: "Branded Content" },
  { title: "Your Activity" },
  { title: "Devices" },
  { title: "Feedback" },
  { title: "About Your Data" },
  { title: "Advertising" },
];

const PrivacyScreen = ({ navigation }) => {
  const [switchOn, setSwitchOn] = useState(false);

  const handleNavigation = (item) => {
    let str = item.title.replace(/\s/g, "");
    navigation.navigate(str);
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.PRIVACY_SECURITY}
          navigation={navigation}
        />
      </View>
      <ScrollView>
        <View style={[styles.accountContainer,styles.container]}>
          <Text style={styles.textStyle}>{strings.PRIVATE_ACCOUNT}</Text>
          <Switch
            trackColor={{ true: "#0094FF" }}
            value={switchOn}
            onValueChange={() => {
              setSwitchOn(!switchOn);
            }}
          />
        </View>
        <FlatList
          data={dataList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.accountContainer}
                onPress={() => {
                  handleNavigation(item);
                }}
              >
                <Text style={styles.textStyle}>{item.title}</Text>
                <TouchableOpacity>
                  <VectorImage style={styles.icon} source={next_icon} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  accountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    marginHorizontal: 15,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomColor: "#EDEDED",
    marginTop:10
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color:neutralBlack
  },
  icon: {
    width: 4.5,
    height: 9,
  },
  container:{
    marginTop:20
  },
});
