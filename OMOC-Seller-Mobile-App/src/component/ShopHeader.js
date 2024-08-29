import React from "react";
import {  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GILROY_MEDIUM } from "../utils/fonts";
import VectorImage from "react-native-vector-image";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { add_icon, search, setting_whiteicon, share_icon } from "../utils/images";


const ShopHeader = ({ title, onAddPress,onSearchPress,onSettingPress,mainStyle }) => {
    const navigation = useNavigation();
    return (
      <View style={[styles.container,mainStyle]}>      
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={onAddPress} 
           style={[styles.leftIcon]}
          >
            <VectorImage source={add_icon} style={styles.icon} tintColor={Colors.whiteColor} />
          </TouchableOpacity>
          <TouchableOpacity
             style={[styles.leftIcon]}
            onPress={onSearchPress}>
            <VectorImage source={search} style={styles.backIcon} tintColor={Colors.whiteColor} />
          </TouchableOpacity>
          <TouchableOpacity
             style={[styles.leftIcon]}
            onPress={onSettingPress}>
            <VectorImage source={setting_whiteicon} style={styles.backIcon} />
          </TouchableOpacity>
          </View>
      </View>
    );
  };
  
  export default ShopHeader;
  
  const styles = StyleSheet.create({
    container: {
      width: "95%",
      paddingVertical:5,
      alignItems:'flex-end',
      alignSelf:"center",
      justifyContent:'space-around'
    },
    text: {
      fontSize: 20,
      fontFamily: GILROY_MEDIUM,
      color: Colors.whiteColor,
    },
    icon: {
      height: 22,
      width: 22,
      resizeMode:'contain'
    },
    backIcon: {
      height: 22,
      width: 22,
      resizeMode:"contain",
    },
    leftIcon: {
      width: 48,
      height: 48,
      backgroundColor: Colors.midBlack,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal:8
    },
  });
  
  

