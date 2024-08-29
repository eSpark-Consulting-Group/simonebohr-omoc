import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import VectorImage from "react-native-vector-image";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import {
  dangerRed,
  lightGrey50,
  midGray,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { next_icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";
import CustomButton from "../../components/CustomButton";
import StorageService from "../../services/storage.service";

const ManageYourAccount = ({ navigation }) => {
  const onHandleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            StorageService.setUser(null)
            navigation.navigate('WelcomeScreen')
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.MANAGE_YOUR_ACCOUNT}
          navigation={navigation}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.mainContainer}>
          <Text style={styles.textStyle}>{strings.ADD_ACCOUNT}</Text>
          <VectorImage source={next_icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainContainer}>
          <Text style={[styles.textStyle, styles.deleteText]}>
            {strings.DELETE_YOUR_ACCOUNT}
          </Text>
          <VectorImage source={next_icon} />
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <CustomButton
            textstyle={styles.accTextBtn}
            style={styles.accBtn}
            text={strings.CHANGE_ACCOUNT}
          />
          <CustomButton
            textstyle={styles.logTextBtn}
            style={styles.logBtn}
            text={strings.LOGOUT}
            onPress={()=>onHandleLogout()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageYourAccount;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
    marginTop: 25,
  },
  mainContainer: {
    flexDirection: "row",
    width:'92%',
    alignSelf:'center',
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginTop:10
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color:neutralBlack
  },
  deleteText: {
    color: dangerRed,
  },
  accBtn: {
    borderColor: skyBlueColor,
    borderWidth: 1,
  },
  logBtn: {
    backgroundColor: skyBlueColor,
  },
  accTextBtn: {
    color: skyBlueColor,
  },
  logTextBtn: {
    color: whiteColor,
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    flex: 1,
    width: "100%",
    gap: 10,
  },
});
