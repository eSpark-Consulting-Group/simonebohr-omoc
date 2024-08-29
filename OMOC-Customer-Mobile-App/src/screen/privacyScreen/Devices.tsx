import {
  FlatList,
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
import { logout_icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";

const deviceData = [
  {
    deviceName: "Desktop",
    status: "Active",
    place: "Sukabumi",
    date: "",
  },
  {
    deviceName: "Macbook Pro 13",
    status: "",
    place: "Sukabumi",
    date: "24 jan 2022",
  },
];

const Devices = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown title={strings.DEVICES} navigation={navigation} />
      </View>
      <View style={styles.container}>
        <FlatList
          data={deviceData}
          renderItem={({ item }) => {
            return (
              <View style={styles.mainContainer}>
                <View>
                  <Text style={styles.heading}>{item.deviceName}</Text>
                  <View style={styles.subTextContainer}>
                    <Text style={styles.activeText}>{item.status}</Text>
                    <Text style={styles.place}>{item.date}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.place}>{item.place}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <VectorImage style={styles.icon} source={logout_icon} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Devices;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 12,
    alignItems: "center",
    width:'92%',
    alignSelf:'center',
    paddingHorizontal: 8,
    borderBottomColor: midGray,
    marginTop:1
  },
  container:{
    marginVertical:20,
    flex:1
  },
  subTextContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  heading: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    marginVertical: 10,
    color:neutralBlack
  },
  activeText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_REGULAR,
    color:neutralBlack
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: grey,
    borderRadius: 5,
  },
  place: {
    fontSize: 12,
    fontWeight: "400",
    color: grey,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor:neutralBlack
  },
});
