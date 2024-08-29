import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { blackColor, lightGrey, purple, whiteColor } from "../utils/colors";
import { GILROY_REGULAR } from "../utils/fonts";
const HeaderTabBar = ({ selectedIndex, buttonTab, onChangeTab, fullWidth,bgColor }) => {
  const [isSelect, setIsSelect] = useState(selectedIndex);
 console.log('isSelect---->',isSelect);
 
  useEffect(() => {
    setIsSelect(selectedIndex);
  }, [selectedIndex]);
  return (
    <View
      style={fullWidth ? fullWidthStyles.btnContainer : styles.btnContainer}
    >
      {buttonTab.map((buttonTab, index = Math.floor(Math.random() * (1000 + 1))) => (
        <TouchableOpacity
          key={index}
          style={[
            fullWidth ? fullWidthStyles.btn : styles.btn,
            {
              backgroundColor: index === isSelect ? bgColor : "transparent",
            },
          ]}
          onPress={() => onChangeTab(index)}
        >
          <Text
            style={[
              fullWidth ? fullWidthStyles.btnText : styles.btnText,
              {
                color: index === isSelect ? 'white' : 'black',
              },
            ]}
          >
            {buttonTab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HeaderTabBar;

const fullWidthStyles = StyleSheet.create({
  btnContainer: {
    // backgroundColor: lightGrey,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 24,
  },
  btn: {
    // backgroundColor: purple,
    backgroundColor: "#9039FF",
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  btnText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
});

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor:  "#F5F5F5",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 24,
    marginTop: 20,
    padding: 5,
    width: "73%",
    alignSelf:'center',
  },
  btn: {
    backgroundColor: "#9039FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    flex: 1,
    padding: 15,  
  },
  btnText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
});
