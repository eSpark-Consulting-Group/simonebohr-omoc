import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { strings } from "../../assets/string/strings";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { whiteColor, midGray, neutralBlack } from "../../utils/colors";
import { Switch } from "react-native-paper";
import VectorImage from "react-native-vector-image";
import { next_icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";

const CustomNotificationScreen = ({ navigation }) => {
  const [switchOn, setSwitchOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shopArray, setShopArray] = useState([]);

  useEffect(() => {
    getData()
  }, [])
  
  const getData = async () => {
    try {
      const response = await ApiService.notifySetting();
      const data=response.data
      setSwitchOn(data.shopsNotification)
      setShopArray(data.selectedShops)
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.CUSTOM_NOTIFICATION}
          navigation={navigation}
        />
      </View>
      <View style={styles.toggleView}>
        <Text style={styles.listText}>{strings.SHOPS_NOTIFICATION}</Text>
        <Switch
          trackColor={{ true: "#0094FF" }}
          value={switchOn}
          onValueChange={() => {
            setSwitchOn(!switchOn);
          }}
        />
      </View>
      <View style={styles.toggleView}>
        <Text style={styles.listText}>{strings.SELECT_CUSTOM_SHOPS}</Text>
        <VectorImage style={styles.victorimage} source={next_icon} />
      </View>
    </SafeAreaView>
  );
};

export default CustomNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  space: {
    marginTop: 15,
  },
  header: {
    marginHorizontal: 15,
    marginBottom: 30,
  },
  toggleView: {
    flexDirection: "row",
    paddingBottom: 12,
    marginBottom: 25,
    paddingHorizontal: 8,
    marginHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: midGray,
  },
  victorimage: {
    height: 13,
    width: 5,
    tintColor: neutralBlack,
  },
  listText: {
    color: neutralBlack,
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
});
