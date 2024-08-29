import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MapView from "react-native-maps";
import MapBottomSheet from "../../components/MapBottomSheet";
import VectorImage from "react-native-vector-image";
import { gps_icon } from "../../utils/images";
import { LightShadeGray } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";

const MapScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backBtn}>
        <CustomHeaderShown title={strings.CHOOSE_YOUR_ADDRESS} navigation={navigation}/>
      </View>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TouchableOpacity style={styles.location}>
        <VectorImage style={styles.gpsImage} source={gps_icon} />
      </TouchableOpacity>
      <MapBottomSheet />
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    width: "100%",
    height: "100%",
  },
  location: {
    backgroundColor: LightShadeGray,
    height: 48,
    width: 48,
    alignSelf: "flex-end",
    borderRadius: 50,
    bottom: "43%",
    paddingRight: 40,
    marginHorizontal: 15,
  },
  gpsImage: {
    margin: 12,
  },
  backBtn: {
    marginLeft: 5,
  },
});
