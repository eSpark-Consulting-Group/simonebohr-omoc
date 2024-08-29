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
  import { grey, whiteColor } from "../../utils/colors";
  import { strings } from "../../assets/string/strings";
  import { logout_icon } from "../../utils/images";
  import { GILROY_REGULAR } from "../../utils/fonts";
  
  const loginData = [
    {
      deviceName: "Sukoharjo",
      status: "Active",
      place: "Device name",
      date: "",
    },
    {
      deviceName: "Sukabumi",
      status: "",
      place: "Device name",
      date: "24 jan 2022",
    },
  ];
  
  const LoginActivityScreen = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.header}>
          <CustomHeaderShown title={strings.LOGIN_ACTIVITY} navigation={navigation} />
        </View>
        <View style={styles.container}>
          <FlatList
            data={loginData}
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
  
  export default LoginActivityScreen;
  
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
      borderBottomWidth: 0.3,
      paddingVertical: 15,
      alignItems: "center",
      marginHorizontal: 8,
      paddingHorizontal: 7,
      borderBottomColor: grey,
    },
    container:{
      marginVertical:20
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
    },
    activeText: {
      fontSize: 12,
      fontWeight: "500",
      fontFamily: GILROY_REGULAR,
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
    },
  });
  