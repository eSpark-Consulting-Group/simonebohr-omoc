import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState,useEffect } from "react";
import VectorImage from "react-native-vector-image";
import { midGray, neutralBlack, whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { drop_up_icon, dropdown_icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import Spinner from "../../components/Spinner";

const YourNews = ({ navigation }) => {
  const [showShopNotification, setShowShopNotification] = useState(false);
  const [showImg, setShowImg] = useState(dropdown_icon);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  getData()
}, [])


  const handleShopNotification = () => {
    if (showShopNotification === true) {
      setShowShopNotification(false);
      setShowImg(dropdown_icon);
    } else {
      setShowShopNotification(true);
      setShowImg(drop_up_icon);
    }
  };
  const [switches, setSwitches] = useState({
    omocNewsLetterByEmail: false,
    newProductNotification: false,
    eventsNotification: false,
    saleNotification: false,
  });


  const getData = async () => {
    try {
      setLoading(true);
      const response = await ApiService.newsletter();
      const data=response.data
      setSwitches(data);
      setLoading(false);
    } catch (e) {
      showMessage({
        message: "Internal Server Error",
        duration: 3000,
        backgroundColor: "skyblue",
        type: "danger",
      });
    }
    setLoading(false);
  };

  const handleSwitch = async (switchName) => {
    try {
      const updatedSwitches = {
        [switchName]: !switches[switchName],
      };
      setSwitches(updatedSwitches);
      const response = await ApiService.newsletterPost(updatedSwitches);
      const data=response.data
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


  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown title={strings.YOUR_NEWS} navigation={navigation} />
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.textone}>
          <Text style={styles.textStyle}>{strings.NEWSLETTER_BY_OMOC}</Text>
           <Switch
              value={switches.omocNewsLetterByEmail}
              onValueChange={() => handleSwitch("omocNewsLetterByEmail")}
              trackColor={{ true: "#0094FF", false: "grey" }}
            />
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.textone}
          onPress={handleShopNotification}
        >
          <Text style={styles.textStyle}>{strings.SHOPS_NOTIFICATION}</Text>
          <View>
            <VectorImage style={styles.iconImg} source={showImg} />
          </View>
        </TouchableOpacity>
      </View>
      {showShopNotification && (
        <View>
          <View style={styles.viewText}>
            <View style={styles.textone}>
              <Text style={styles.textStyle}>
                {strings.NOTIFICATION_FOR_NEW_PRODUCT}
              </Text>
              <Switch
              value={switches.newProductNotification}
              onValueChange={() => handleSwitch("newProductNotification")}
              trackColor={{ true: "#0094FF", false: "grey" }}
            />
            </View>
          </View>
          <View style={styles.viewText}>
            <View style={styles.textone}>
              <Text style={styles.textStyle}>
                {strings.NOTIFICATION_FOR_EVENT}
              </Text>
              <Switch
              value={switches.eventsNotification}
              onValueChange={() => handleSwitch("eventsNotification")}
              trackColor={{ true: "#0094FF", false: "grey" }}
            />
            </View>
          </View>
          <View style={styles.viewText}>
            <View style={styles.textone}>
              <Text style={styles.textStyle}>
                {strings.NOTIFICATION_FOR_SALE}
              </Text>
              <Switch
              value={switches.saleNotification}
              onValueChange={() => handleSwitch("saleNotification")}
              trackColor={{ true: "#0094FF", false: "grey" }}
            />
            </View>
          </View>
        </View>
      )}
       {loading && <Spinner animating={loading} />}
    </SafeAreaView>
  );
};

export default YourNews;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  viewText: {
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    paddingVertical: 12,
    width: "92%",
    alignSelf: "center",
    paddingHorizontal: 8,
  },
  viewContainer: {
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    marginTop: 25,
    width: "92%",
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  textone: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    marginTop: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "92%",
    alignSelf: "center",
    paddingHorizontal: 8,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: neutralBlack,
  },
  iconImg: {
    width: 9,
    height: 5,
  },
});
