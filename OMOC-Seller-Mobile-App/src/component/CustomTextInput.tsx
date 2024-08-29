import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../utils/colors";
import VectorImage from "react-native-vector-image";
import { eye_view, hide } from "../utils/images";

const CustomTextInput = (props) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={[styles.input, props.style]}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        
      />
   {props.optional &&<TouchableOpacity onPress={props.onPress}>
        {props.showpasswod ?<VectorImage source={eye_view} style={styles.iconStyle}/> :
        <VectorImage  source={hide} style={styles.iconStyle} tintColor={'black'}/>}
      </TouchableOpacity>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputView: {
    // justifyContent: "center",
    // alignItems: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 0.09,
    height: 56,
    borderRadius: 24,
    padding: 10,
    backgroundColor: Colors.lightGrey,
    width: "92%",
    justifyContent:'space-between',
    alignSelf: "center",
  },
  input: {
   
    borderRadius: 24,
    // width: "92%",
    flex:1,
    borderColor: Colors.lightGrey,
    paddingVertical: 18,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 14,
    fontWeight: "400",
  },
  iconStyle:{width: 25,height: 19,}
});
