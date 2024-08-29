import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import VectorImage from "react-native-vector-image";
import { group_request_icon, message_request_icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";
import {
  neutralBlack,
  midBlack,
  midGray,
  grey,
  whiteColor,
} from "../../utils/colors";

const RequestScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.allScreen}>
      <View style={styles.backBtn}>
        <CustomHeaderShown title={strings.REQUEST} navigation={navigation} />
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("RequestDetails")}
        >
          <View style={styles.groupIconView}>
            <VectorImage source={group_request_icon} style={styles.groupIcon} />
          </View>
          <View style={styles.reqText}>
            <Text style={styles.groupText}>{strings.GROUP_REQUEST}</Text>
            <Text style={styles.messageReqText}>{strings.YOU_CAN_FIND}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.border}></View>
      <TouchableOpacity style={styles.secondContainer} onPress={() => navigation.navigate("MessageRequest")}>
        <View style={styles.groupIconView}>
          <VectorImage source={message_request_icon} style={styles.groupIcon} />
        </View>
        <View style={styles.reqText}>
          <Text style={styles.groupText}>{strings.MESSAGE_REQUEST}</Text>
          <Text style={styles.messageReqText}>
            {strings.SEE_MESSAGE_REQUEST_DESCRIIPTION}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.border}></View>
    </SafeAreaView>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  backBtn: {
    marginHorizontal: 15,
  },
  allScreen: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  container: {
    flexDirection: "row",
    marginTop: 40,
    marginHorizontal: 5,
  },
  groupIcon: {
    height: 32,
    width: 32,
  },
  reqText: {
    marginLeft: 20,
  },
  groupText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
    fontWeight: "400",
    color: neutralBlack,
  },
  groupIconView: {
    marginTop: 8,
  },
  groupInviteText: {
    marginTop: 8,
    color: midBlack,
  },
  border: {
    borderBottomWidth: 0.8,
    marginHorizontal: 15,
    marginTop: 15,
    borderColor: midGray,
  },
  secondContainer: {
    flexDirection: "row",
    marginTop: 25,
    marginHorizontal: 20,
    width: "80%",
  },
  messageReqText: {
    marginTop: 8,
    color: grey,
  },
});
