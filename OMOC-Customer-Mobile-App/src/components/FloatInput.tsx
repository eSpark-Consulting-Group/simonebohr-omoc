import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { grey, lightGrey } from "../utils/colors";

const FloatInput = (props) => {
    const [isTextInputEmpty, setIsTextInputEmpty] = useState(false);

    const handleTextChange = (text) => {
      setIsTextInputEmpty(text.length > 0 );
      props.onChangeText(text);
    };
    useEffect(() => {
      //  props.value
      setIsTextInputEmpty(props.value.length > 0);
    }, [props.value]);
    

  return (
    <View style={styles.inputView}>
      {isTextInputEmpty ? (
        <Text style={styles.showText}>{props.placeholder}</Text>
      ) : null}
      <TextInput
        style={[styles.input, props.style]}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        onChangeText={handleTextChange}
        onPressIn={props.onPress}
        keyboardType={props.keyboardType}
      />
    </View>
  );
};

export default FloatInput;

const styles = StyleSheet.create({
  inputView: {
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#EDEDED",
    marginHorizontal: 20,
    marginTop:5,
    gap:3
    
  },
    input: {
    borderRadius: 14,
    width: "92%",
    borderColor: lightGrey,
    paddingVertical: 18,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 14,
    fontWeight: "400",
  },
  showText: {
    marginBottom: -12,
    marginLeft: 15,
    marginTop:10,
    color:grey,
    fontSize:12
  },
});
