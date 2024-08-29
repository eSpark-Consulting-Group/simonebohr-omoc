import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React,{useState} from "react";
import VectorImage from "react-native-vector-image";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { grey, neutralBlack, red, skyBlueColor, whiteColor } from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import SearchTabBar from "../searchScreen/SearchTabBar";
import { gps_icon } from "../../utils/images";
import { GILROY_MEDIUM } from "../../utils/fonts";
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';

const AddNewAddress = ({ navigation }) => {
  const [destination, setDestination] = useState(null);
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setDestination(coordinate);
  };

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyB9stNP2UYOkJCJkR2CfnabPiNP6g08UH8';

  return (
    <SafeAreaView style={styles.safeContainer}>
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {destination && (
          <>
            <Marker coordinate={origin} pinColor="blue" title="Origin" />
            <Marker coordinate={destination} pinColor="red" title="Destination" />
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
            />
          </>
        )}
      </MapView>
  
      <View style={styles.header}>
        <CustomHeaderShown title={strings.ADD_NEW_ADDERSS} navigation={navigation} />
      </View>
      <View style={styles.search}>
        <SearchTabBar placeholder={strings.ENTER_YOUR_ADDRESS} />
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconContainer}>
          <VectorImage style={styles.icon} source={gps_icon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headingText}>{strings.CURRENT_LOCATION}</Text>
          <Text style={styles.subHeadingText}>
            Street Juana no.16, California, 45746, USA
          </Text>
        </View>
      </View>
    </View>
  </SafeAreaView>
  
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  safeContainer: {
    // flex: 1,
    backgroundColor: red,
  },
  header: {
    marginHorizontal: 15,
  },
  search: {
    marginHorizontal: 15,
    marginVertical: 25,
  },
  icon: {},
  iconContainer: {
    backgroundColor: skyBlueColor,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  container: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    marginHorizontal: 15,
  },
  headingText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    color:neutralBlack
  },
  subHeadingText: {
    fontSize: 12,
    fontWeight: "500",
    color: grey,
    marginTop: 10,
  },
});
