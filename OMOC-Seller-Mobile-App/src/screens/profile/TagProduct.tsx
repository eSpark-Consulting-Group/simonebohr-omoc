import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_LIGHT,
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import {
  dot_option,
  full_productimage,
  search,
  shoe_image,
  shoes,
  user_frame,
} from "../../utils/images";
import FastImage from "react-native-fast-image";
import CustomButton from "../../component/CustomButton";

const TagProduct = () => {
  const [buttonPress, setbuttonPress] = useState(false);
  const [searchText, setSearchText] = useState("");
  const productList = [
    {
      id: 1,
      name: "Nike Air Jordon",
      code: "1239ul023",
      price: "$1.231",
      stock: "12",
    },
    {
      id: 1,
      name: "Nike Air Jordon",
      code: "1239ul023",
      price: "$1.231",
      stock: "12",
    },
   
  ];

  const taggedList = [
    {
      id: 1,
      name: "Nike Air Jordon",
      code: "1239ul023",
      price: "$1.231",
      stock: "12",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Customheader
        showBackIcon={true}
        optionImage={dot_option}
        title={CONTEXT.TAG_PRODUCT}
      />
      <FastImage source={full_productimage} style={styles.image} />

        <View style={styles.mainContainer}>
          <View style={styles.buttonMainView}>
            <TouchableOpacity
              style={[
                styles.buttonView,
                {
                  backgroundColor: buttonPress
                    ? Colors.skyBlueColor
                    : Colors.lightGrey,
                  borderRadius: buttonPress ? 24 : 24,
                },
              ]}
              onPress={() => setbuttonPress(!buttonPress)}
            >
              <Text
                style={[
                  styles.textButton,
                  {
                    color: buttonPress ? Colors.whiteColor : Colors.blackColor,
                  },
                ]}
              >
                {CONTEXT.TAG_PRODUCT}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttonView,
                {
                  backgroundColor: buttonPress
                    ? Colors.lightGrey
                    : Colors.skyBlueColor,
                  borderRadius: buttonPress ?24 : 24,
                },
              ]}
              onPress={() => setbuttonPress(!buttonPress)}
            >
              <Text
                style={[
                  styles.textButton,
                  {
                    color: buttonPress ? Colors.blackColor : Colors.whiteColor,
                  },
                ]}
              >
                Product Tagged (1)
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.containerSearch]}>
            <TextInput
              style={[styles.searchInput, { marginLeft: 6 }]}
              keyboardType="default"
              placeholder={"Search Product/SKU"}
              placeholderTextColor={Colors.grey}
              onChangeText={(e) => {
                setSearchText(e);
              }}
              value={searchText}
            />
            <VectorImage source={search} style={styles.icon} />
          </View>

          <ScrollView  showsVerticalScrollIndicator={false}>
       {buttonPress === true &&<View style={styles.flatlistView}>
          <FlatList
            data={productList}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.flatView}>
                  <FastImage source={shoes} style={styles.shoeStyle} />
                  <View style={styles.detailView}>
                    <Text style={styles.textButton}>{item.name}</Text>
                    <Text style={[styles.pirceText, { marginVertical: 4 }]}>
                     {item.code}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={[styles.pirceText,{marginRight:15}]}>
                     Price:{item.price}
                    </Text>
                    <Text style={styles.pirceText}>Stak:{item.stock}</Text>
                  </View>
                  </View>
                  <View style={styles.blueView}>
                    <Text
                      style={[styles.pirceText, { color: Colors.skyBlueColor }]}
                    >
                      Tag
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          </View>}

          {buttonPress === false &&
          <View style={styles.flatlistView}>
          <FlatList
            data={taggedList}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.flatView}>
                  <FastImage source={shoes} style={styles.shoeStyle} />
                  <View style={styles.detailView}>
                    <Text style={styles.textButton}>{item.name}</Text>
                    <Text style={[styles.pirceText, { marginVertical: 4 }]}>
                     {item.code}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={[styles.pirceText,{marginRight:15}]}>
                     Price:{item.price}
                    </Text>
                    <Text style={styles.pirceText}>Stak:{item.stock}</Text>
                  </View>
                  </View>
                  <View style={styles.blueView}>
                    <Text
                      style={[styles.pirceText, { color: Colors.skyBlueColor }]}>
                      Remove
                    </Text>
                  </View>
                </View>  
              );
            }}
          />
          </View>}

</ScrollView>
        </View>
        
      <View style={styles.BtnView}>
        <CustomButton
          text={strings.SAVE}
          style={styles.button}
          textstyle={styles.btnName}
        />
      </View>
    </SafeAreaView>
  );
};

export default TagProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ghostWhite,
  },
  mainContainer: {
    width: 390,
    paddingHorizontal: 13,
    alignSelf: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.whiteColor,
    flex: 1,
  },
  image: {
    marginTop: "3%",
    width: 368,
    height: 325,
    resizeMode: "contain",
    alignSelf: "center",
  },
  buttonView: {
    width: "50%",
    backgroundColor: Colors.lightGrey,
    paddingVertical: 15,
    borderRadius: 24,
    alignItems: "center",
  },
  textButton: {
    fontSize: 14.5,
    fontFamily: GILROY_MEDIUM,
  },
  buttonMainView: {
    marginTop: 15,
    flexDirection: "row",
    width: "95%",
    borderRadius: 45,
    alignSelf: "center",
    justifyContent:'center',
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
  },
  searchInput: {
    width: "88%",
    color: Colors.lightBlack,
  },
  pirceText: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color: Colors.lightBlack,
  },
  containerSearch: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 15,
    borderRadius: 45,
    borderColor: "#EDEDED",
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    paddingVertical: 10,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    tintColor:'black'
  },
  shoeStyle: {
    height: 65,
    width: 65,
    resizeMode: "contain",
  },
  flatView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
    backgroundColor:Colors.whiteColor,
    padding: 4,
  },
  detailView: {
    width: "58%",
    marginLeft: 10,
  },
  blueView: {
    width: "20%",
    borderRadius: 20,
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  flatlistView:{
    flex:1,
   marginBottom:'20%',
    marginTop: 10,
  },
  button: {
    width:358,
    backgroundColor: Colors.skyBlueColor,
    
  },
  btnName: {
    color: Colors.whiteColor,
  },
  BtnView: {
    alignItems: "center",
    // marginTop:30,
    position:"absolute",
    bottom:'5%',
    alignSelf:'center'
  },
});
