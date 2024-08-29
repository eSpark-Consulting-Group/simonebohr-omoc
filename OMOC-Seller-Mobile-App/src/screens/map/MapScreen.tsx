import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapBottomSheet from "../../component/MapBottomSheet";
import VectorImage from "react-native-vector-image";
import {
  map_minus_icon,
  map_plus_icon,
  map_search_icon,
  maximize_icon,
  select_location_icon,
} from "../../utils/images";
import { Colors } from "../../utils/colors";
import Customheader from "../../component/Customheader";
import { strings } from "../../utils/string/strings";
import { TextInput } from "react-native-gesture-handler";
import { GILROY_REGULAR } from "../../utils/fonts";
import axios from "axios";

const MapScreen = ({ navigation }) => {
  const [searchLocation, setsearchLocation] = useState("");
  const [editAddress, seteditAddress] = useState("");
  const [modelPopup, setmodelPopup] = useState(false);
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState({} || 0);
  const [markers, setMarkers] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLogitude] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
    setLatitude(newRegion.latitude);
    setLogitude(newRegion.longitude);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const apiKey = "AIzaSyB9stNP2UYOkJCJkR2CfnabPiNP6g08UH8";
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );

        if (response.data.results.length > 0) {
          const formattedAddress = response.data.results[0].formatted_address;

          setAddress(formattedAddress);
        } else {
          setAddress("Address not found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error fetching address");
      }
    };
    console.log(address);
    fetchAddress();
  }, [latitude]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 0 }} />
      <StatusBar barStyle={"dark-content"} />

      <MapView
        style={styles.mapView}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={onRegionChange}
      >
        <View>
          <Customheader
            title={strings.CHOOSE_ADDRESS}
            optionImage={undefined}
            showBackIcon={true}
            onPress={undefined}
            Containerstyle={{ marginTop: 10 }}
          />
        </View>
        <View style={styles.viewSearchLocation}>
          <TextInput
            style={styles.inputSearch}
            placeholder={strings.SEARCH_LOCATION}
            placeholderTextColor={Colors.lightBlack}
            keyboardType="default"
            value={searchLocation}
            onChange={(e) => {
              setsearchLocation(e);
            }}
          />
          <VectorImage source={map_search_icon} />
        </View>
        {selectedLocation && (
          <Marker coordinate={selectedLocation}>
            <TouchableOpacity style={styles.selectlocation}>
              <VectorImage
                style={styles.locationImage}
                source={select_location_icon}
              />
            </TouchableOpacity>
          </Marker>
        )}
      </MapView>

      <TouchableOpacity style={styles.location}>
        <VectorImage style={styles.gpsImage} source={maximize_icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.location}>
        <VectorImage style={styles.gpsImage} source={map_plus_icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.location}>
        <VectorImage style={styles.gpsImage} source={map_minus_icon} />
      </TouchableOpacity>

      <MapBottomSheet location={address} hideMe={() => setmodelPopup(false)} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  mapView: {
    width: "100%",
    height: "100%",
  },
  location: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    bottom: "60%",
    paddingRight: 10,
  },
  gpsImage: {
    marginVertical: 4.5,
    height: 32,
    width: 32,
  },
  locationImage: {
    marginBottom: 50,
    height: 75,
    width: 155,
  },
  selectlocation: {
    alignSelf: "center",
    bottom: "80%",
    justifyContent: "center",
  },
  inputSearch: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    width: 280,
    color: Colors.midBlack,
  },
  viewSearchLocation: {
    marginTop: "6%",
    width: "95%",
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: Colors.whiteColor,
    alignSelf: "center",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.neutralGrey,
    gap: 10,
  },
});
