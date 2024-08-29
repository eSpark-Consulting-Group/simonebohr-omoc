import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState } from "react";
import { strings } from "../../utils/string/strings";
import Customheader from "../../component/Customheader";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import {
  arrow_down,
  calendar_icon,
  map_search_icon,
  search,
  arrowleft_icon,
  map_plus_icon,
  blue_add_icon,
} from "../../utils/images";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import LegalPoliciesBottomSheet from "../../component/LegalPoliciesBottomSheet";
import LegalPoliciesDetailsScreen from "./LegalPoliciesDetailsScreen";

const data = [
  {
    countryName: "Singapore",
    icon: arrowleft_icon,
  },
  {
    countryName: "Singapore",
    icon: arrowleft_icon,
  },
  {
    countryName: "Singapore",
    icon: arrowleft_icon,
  },
  {
    countryName: "Singapore",
    icon: arrowleft_icon,
  },
  {
    countryName: "Singapore",
    icon: arrowleft_icon,
  },
  {
    countryName: "Singapore",
    icon: arrowleft_icon,
  },
];

const LegalPoliciesScreen = ({ navigation }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      
        <Customheader title={strings.LEGAL_POLICIES} showBackIcon={true} />
      <View style={styles.searchInput}>
        <TouchableOpacity>
          <VectorImage source={search} style={styles.icon} />
        </TouchableOpacity>
        <TextInput placeholder={strings.SEARCH_COUNTRY} style={styles.input} />
      </View>

      <FlatList
        style={styles.flatlist}
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.boxView}>
              <TouchableOpacity
                style={styles.toucable}
                onPress={() =>
                  navigation.navigate("LegalPoliciesDetailsScreen")
                }>
                <Text style={styles.textCountryName}>{item.countryName}</Text>
                <VectorImage source={arrowleft_icon} style={styles.iconLeft} />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleBottomSheet}
      >
        <VectorImage source={blue_add_icon} style={styles.iconBlueAdd} />
        <Text style={styles.btnText}>{strings.ADD_LEGAL}</Text>
      </TouchableOpacity>

      {showBottomSheet && (
        <LegalPoliciesBottomSheet
          hideMe={() => {
            setShowBottomSheet(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default LegalPoliciesScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex:1,
    backgroundColor: Colors.whiteColor,
  },
  searchInput: {
    width: "92%",
    height: 48,
    borderColor: Colors.neutralGrey,
    left: 16,
    marginTop: 25,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 12,
    flexDirection: "row",
  },
  inputSearch: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    width: 280,
    color: Colors.midBlack,
  },
  icon: {
    bottom: 5,
  },
  input: {
    width: "92%",
  },
  boxView: {
    width: "95%",
    backgroundColor: Colors.ghostWhite,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginTop: 15,
  },
  textCountryName: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.charcoal,
  },
  toucable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center'
  },
  iconLeft: {
    tintColor: "black",
  },
  flatlist: {
    backgroundColor: Colors.whiteColor,
    marginTop: 10,
    paddingBottom: 10,
  },
  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    width:'95%',
    position:'absolute',
    bottom:40,
    zIndex:0,
    flexDirection: "row",
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  iconBlueAdd: {
    tintColor: Colors.whiteColor,
    marginRight: 15,
  },
});
