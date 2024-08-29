import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  whiteColor,
  midGray,
  neutralBlack,
  blackColor,
} from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import VectorImage from "react-native-vector-image";
import { next_icon } from "../../utils/images";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GILROY_REGULAR } from "../../utils/fonts";
import { Switch } from "react-native";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import Spinner from "../../components/Spinner";

const NotificationScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [switches, setSwitches] = useState({
    omocNotification: false,
    messageNotification: false,
    newPostNotification: false,
    shopsNotification: false,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await ApiService.notifySetting();
      const data = response.data;
      setSwitches(data);
      setLoading(false);
    } catch (e) {
      showMessage({
        message: "Internal Server Error",
        duration: 3000,
        backgroundColor: "skyblue",
        type: "danger",
      });
      setLoading(false);
    }
  };
 

  const handleSwitch = async (switchName) => {
    try {
      const updatedSwitches = {
        [switchName]: !switches[switchName],
      };
      setSwitches(updatedSwitches);
      const response = await ApiService.notificationPost(updatedSwitches);
      const data = response.data;
      setSwitches(data);
    } catch (e) {
      showMessage({
        message: "Internal Server Error",
        duration: 3000,
        backgroundColor: "skyblue",
        type: "danger",
      });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.NOTIFICATION_SETTINGS}
          navigation={navigation}
        />
      </View>
      <View style={styles.viewFlastlist}>
        <View style={styles.viewText}>
          <View style={styles.textone}>
            <Text style={styles.textNameStyle}>Notification from Omoc</Text>
            <Switch
              value={switches.omocNotification}
              onValueChange={() => handleSwitch("omocNotification")}
              trackColor={{ true: "#0094FF", false: "grey" }}
            />
          </View>
        </View>
        <View style={styles.viewText}>
          <View style={styles.textone}>
            <Text style={styles.textNameStyle}>Message Notification</Text>
        
            <Switch
              value={switches.messageNotification}
              onValueChange={() => handleSwitch("messageNotification")}
              trackColor={{ true: "#0094FF", false: "grey" }}
            />
          </View>
        </View>
        <View style={styles.viewText}>
          <View style={styles.textone}>
            <Text style={styles.textNameStyle}>New post Notification</Text>
            <Switch
              value={switches.newPostNotification}
              onValueChange={() => handleSwitch("newPostNotification")}
              trackColor={{ true: "#0094FF", false: "grey" }}
            />
          </View>
        </View>
        <View style={styles.viewText}>
          <View style={styles.textone}>
            <Text style={styles.textNameStyle}>Shops Notification </Text>
            <Switch
              value={switches.shopsNotification}
              onValueChange={() => handleSwitch("shopsNotification")}
              trackColor={{ true: "#0094FF", false: "grey" }}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.victorView}
        onPress={() => navigation.navigate("CustomNotificationScreen")}
      >
        <Text style={styles.textStyle}>
          {strings.CUSTOM_NOTIFICATION_FOR_SHOPS}
        </Text>
        <View>
          <VectorImage style={styles.victorimage} source={next_icon} />
        </View>
      </TouchableOpacity>
      {loading && <Spinner animating={loading} />}
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  victorView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    marginHorizontal: 15,
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  header: {
    marginHorizontal: 15,
  },
  victorimage: {
    height: 13,
    width: 5,
  },
  viewFlastlist: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: neutralBlack,
  },
  viewText: {
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    marginTop: 15,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  textone: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textNameStyle: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: neutralBlack,
  },
});
