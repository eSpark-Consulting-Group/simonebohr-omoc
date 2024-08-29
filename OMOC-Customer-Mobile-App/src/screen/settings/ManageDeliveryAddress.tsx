import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React,{useEffect, useState} from "react";
import { skyBlueColor, whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { AddressData } from "../../sampleData/AddressData";
import CustomButton from "../../components/CustomButton";
import ManageDeliveryAddressData from "../../components/settingComponent/ManageDeliveryAddressData";
import { useIsFocused } from "@react-navigation/native";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import en from "../../assets/string/en";

const ManageDeliveryAddress = ({ navigation }) => {
  const [addressList, setAddressList] = useState(null);
  const isFacused = useIsFocused();
  useEffect(() => {
    getYourAddress();
  }, [isFacused]);

  const getYourAddress = async () => {
    try {
      const response = await ApiService.GetAllAddresses();
      console.log('response====123',response.data)
      if (response?.status) {
        setAddressList(response?.data || []);
      } else {
        setAddressList(null);
      }
    } catch (e) {
      setAddressList(null);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        type: "danger",
      });
    }
  };

  


  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.MANAGE_DELIVERY_ADDRESS}
          navigation={navigation}
        />
      </View>
      <FlatList
        data={addressList}
        renderItem={({ item }) => (
          <ManageDeliveryAddressData data={item} navigation={navigation} />
        )}
      />
      <View style={styles.buttonView}>
        <CustomButton
          textstyle={styles.btnText}
          style={styles.btn}
          text={strings.ADD_ADDRESS}
          onPress={() => navigation.navigate("AddNewAddress")}
        />
      </View>
    </SafeAreaView>
  );
};

export default ManageDeliveryAddress;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: skyBlueColor,
  },
  btnText: {
    color: whiteColor,
  },
  buttonView: { position: "absolute", bottom: 30, width: "100%" },
});
