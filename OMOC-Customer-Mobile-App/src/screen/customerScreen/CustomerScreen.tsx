import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import {
  grey,
  midGray,
  neutralBlack,
  lightBlue,
  whiteColor,
} from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import {
  messages_icon,
  next_icon,
  sms_tracking_icon,
} from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";
const screenWidth = Dimensions.get("window").width;
const buttonWidthPercentage = 18;
const screenHeight = Dimensions.get("window").height;
const buttonHeighPercentage = 8;
const CustomerScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.backBtn}>
        <CustomHeaderShown title="Customer Support" navigation={navigation} />
      </View>
      <Text style={styles.loremText}>
        Lorem ipsum dolor sit amet consectetur. Sapien ac sollicitudin egestas
        id eget pellentesque.Lorem ipsum dolor sit amet consectetur. Sapien ac
        sollicitudin egestas id eget pellentesque.
      </Text>
      <View style={styles.allBtn}>
        <TouchableOpacity
          style={styles.firstBtn}
          onPress={() => navigation.navigate("CustomerDetails")}
        >
          <VectorImage source={messages_icon} style={styles.messageIcon} />
          <Text style={styles.firstText}>Frequently Asked Questions</Text>
          <VectorImage source={next_icon} style={styles.nextIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondBtn}>
          <VectorImage source={messages_icon} style={styles.messageIcon} />
          <Text style={styles.secondText}>Contact Live Chat</Text>
          <VectorImage source={next_icon} style={styles.nextIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.smsView}>
        <View style={styles.smsContainer}>
          <VectorImage source={sms_tracking_icon} style={styles.smsIcon} />
        </View>
      </View>

      <Text style={styles.sendText}>Send us an e-mail:</Text>
      <TouchableOpacity style={styles.infoBtn}>
        <Text style={styles.infoText}>info@omoc.com</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomerScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  backBtn: {
    marginHorizontal: 20,
  },
  loremText: {
    marginTop: 30,
    color: grey,
    marginHorizontal: 10,
    lineHeight: 21,
    width:"90%",
    alignSelf:'center'
  },
  messageIcon: {
    height: 24,
    width: 24,
  },
  nextIcon: {
    marginTop: 1,
  },
  firstBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "18%",
    borderBottomWidth:1,
    paddingBottom:16,
    borderColor:"#EDEDED"
  },
  firstText: {
    marginRight: "20%",
    color: neutralBlack,
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
    fontWeight: "400",
  },
  border: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    marginTop: 20,
  },
  secondText: {
    marginRight: "41%",
    color: neutralBlack,
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
    fontWeight: "400",
  },
  secondBorder: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
  secondBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 20,
    borderBottomWidth:1,
    paddingBottom:16,
    borderColor:"#EDEDED"
  },
  smsIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: {
    alignSelf: "center",
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    fontWeight: "400",
    color: grey,
    marginTop: 20,
  },
  infoBtn: {
    alignItems: "center",
    marginTop: 10,
  },
  infoText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "600",
    fontSize: 16,
    color: neutralBlack,
  },
  smsView: {
    justifyContent: "center",
    alignItems: "center",
  },
  smsContainer: {
    backgroundColor: lightBlue,
    width: (screenWidth * buttonWidthPercentage) / 100,
    height: (screenHeight * buttonHeighPercentage) / 100,

    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40%",
  },
  allBtn: {
    width:"90%",
    alignSelf:'center',
  },
});
