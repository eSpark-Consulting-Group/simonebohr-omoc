import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Customheader from "../../component/Customheader";
import { strings } from "../../utils/string/strings";
import SearchTabBar from "../../component/SearchTabBar";
import {
  blank_round_circle,
  blue_round_circle,
  user_frame,
} from "../../utils/images";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import CustomButton from "../../component/CustomButton";

const addProductData = [
  {
    icon: blue_round_circle,
    image: user_frame,
    title: "Hoodie Havana V1",
    number: "1239u1023",
  },

  {
    icon: blank_round_circle,
    image: user_frame,
    title: "Hoodie Havana V1",
    number: "1239u1023",
  },
  {
    icon: blank_round_circle,
    image: user_frame,
    title: "Hoodie Havana V1",
    number: "1239u1023",
  },
  {
    icon: blank_round_circle,
    image: user_frame,
    title: "Hoodie Havana V1",
    number: "1239u1023",
  },
 

];
const AddProductFaqScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <Customheader  title={strings.ADD_PRODUCT_FAQ} showBackIcon={true} />
      
        <SearchTabBar style={styles.searchTab} placeholder={strings.SEARCH_PRODUCT} />
   

      <View style={styles.flatlistView}>
        <FlatList
          data={addProductData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={styles.viewContainer}>
                  <TouchableOpacity>
                    <VectorImage source={item.icon} style={styles.Icon} />
                  </TouchableOpacity>
                  <FastImage source={user_frame} style={styles.userImage} />
                  <View style={styles.viewTitleNumber}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.number}>{item.number}</Text>
                  </View>
                </View>
            );
          }}
        />
      </View>

      <CustomButton style={styles.continueButton} text={strings.CREATE_FAQ} textstyle={styles.btnText} onPress={()=>navigation.navigate('AddGeneralFaqScreen')}/>

    </SafeAreaView>
  );
};

export default AddProductFaqScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.whiteColor
  },
  viewContainer: {
    flexDirection: "row",
    width: "95%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray88,
    paddingVertical: 15,
    alignSelf: "center",
    alignItems:'center'
  },
  Icon: {
    height:25,
    width:25,
    resizeMode:"contain"
  },
  number: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.spanishGrey,
    marginTop: 13,
  },
  titleText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.blackColor,
  },
  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical:18,
    borderRadius: 24,
    width:'95%',
    position:'absolute',
    bottom:0,
    zIndex:0
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
  flatlistView: {
    flex:9,
    marginTop: 15,
    // backgroundColor:"pink",
    marginBottom:'0%',
  },
  userImage: {
    height: 72,
    width: 72,
    marginLeft: 10,
  },
  viewTitleNumber: {
    marginLeft: 20,
  },
  searchTab:{
    marginTop: 35,
    borderRadius:24,
    borderWidth:1,
    borderColor:Colors.neutralGrey,
    backgroundColor:Colors.whiteColor
  }
});
