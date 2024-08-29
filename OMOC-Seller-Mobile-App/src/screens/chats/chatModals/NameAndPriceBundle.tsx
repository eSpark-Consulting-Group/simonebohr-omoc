import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,Modal
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Height, Width } from "../../../utils";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../../utils/fonts";
import { Colors } from "../../../utils/colors";
import { CONTEXT } from "../../../utils/string/strings";
import FastImage from "react-native-fast-image";
import {doller, shoes} from '../../../utils/images'
import CustomTwoButton from "../../../component/CustomTwoButton";
import VectorImage from "react-native-vector-image";


const productList = [
  {
    id: 1,
    title: "Nike Air Jordon",
    price: "1.120",
    image: shoes,
    stock: 123,
    status: false,
  },
  {
    id: 2,
    title: "Nike Air Jordon",
    price: "1.120",
    image: shoes,
    stock: 123,
    status: true,
  },
 
];

const NameAndPriceBundle = ({ hideMe,openNameandBundle }) => {
  const [searchText, setSearchText] = useState("");
  const [buttonPress, setbuttonPress] = useState(false);
  const [visibleModel, setModalVisible] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", Height * 11], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      hideMe();
    }
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={2}
        opacity={0.3}
      />
    ),
    []
  );

  const renderItem = (data) => (
    <View key={data.id} style={[styles.flatContainer]}>
      <FastImage source={data.image} style={styles.imageStyle}/>
      <Text style={styles.titleText}>{data.title}</Text>
      <Text style={[styles.descText,{ width: 75,}]}>${data.price}</Text>
      <TouchableOpacity style ={styles.borderPrice} onPress={()=> setModalVisible(true)}>
      <Text style={styles.descText}>120</Text>
      <VectorImage source ={doller} style={styles.dollerStyle}/>
      </TouchableOpacity>
      <Text style={styles.discoText}>{data.stock}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        backdropComponent={renderBackdrop}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleIndicatorStyle={styles.bottomSheetStyle}
        style={{
          backgroundColor: "#F3F3F3",
        }}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.productText}>{CONTEXT.SET_NAMEANDPRICE}</Text>
          <View style={styles.searchBundle}>
            <TextInput
              placeholder={"Name bundling"}
              onChange={(txt) => setSearchText(txt)}
              value={searchText}
              placeholderTextColor={Colors.grey}
              style={styles.textInputStyle}
            />
          </View>
        </View>


        <ScrollView horizontal style={styles.scrollDesign} showsHorizontalScrollIndicator={false}>       
          <View>
          <View style={styles.horizontalView}>
            <Text style={[styles.headText, {width:195}]}>
              {CONTEXT.PRODUCT_NAME}
            </Text>
            <Text style={[styles.headText, { width:80}]}>
              {CONTEXT.PRICE}
            </Text>
            <Text style={[styles.headText, { width: 95}]}>
              {CONTEXT.DISCOUNT}
            </Text>
            <Text style={[styles.headText]}>
              {CONTEXT.STOCK}
            </Text>
          </View>
          <FlatList
          data={productList}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id.toString()}
          />
          </View>
        </ScrollView>

        <View style={styles.totalView}>
            <View>
                <Text style={styles.price}>{CONTEXT.TOTAL_PRICE}</Text>
                <Text style={styles.dollerText}>$2.240</Text>
            </View>
            <View>
                <Text style={styles.price}>{CONTEXT.TOTAL_DISCOUNT}</Text>
                <Text style={styles.dollerText}>$120</Text>
            </View>
        </View>

        <CustomTwoButton firstTitile={CONTEXT.ADD_PRODUCT} secondTitile={CONTEXT.NEXT} onPressSecond = {() =>openNameandBundle()}/>
      </BottomSheet>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModel}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={[styles.centeredView]}>
          <TouchableOpacity
            style={[styles.modelAddproduct]}
            onPress={() => {
              setModalVisible(false), navigation.navigate("AddProduct");
            }}
          >
            <Text style={[styles.reportText, { color: Colors.skyBlueColor }]}>
              Percent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modelContainer}
            onPress={() => setModalVisible(false)}>
            <Text style={[styles.reportText,{ color: Colors.blackColor }]}>Currency</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 665,
  },
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
  },
  listContentView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomColor: Colors.gray88,
    borderBottomWidth: Width * (0.2 / 100),
  },
  imageStyle: {
    width:40,
    height: 24,
    resizeMode: "contain",
    marginHorizontal:8,
  },
  titleText: {
    textAlign:'left',
    width:134,
    fontSize: 13.5,
    fontFamily: GILROY_MEDIUM,
    color:Colors.midBlack,

  },
  descText: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: GILROY_REGULAR,
    color: Colors.lightBlack
  },
  discoText: {
    textAlign: "center",
    width: 110,
    fontSize: 13,
    fontFamily: GILROY_REGULAR,
    color: Colors.lightBlack
  },
  mainContainer: {
    width: "93%",
    marginHorizontal: 4,
    alignSelf: "center",
    marginTop: 18,
  },
  productText: {
    fontSize: 15,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
  },
  horizontalView: {
    flexDirection: "row",
    backgroundColor: Colors.lightGrey,
    marginTop: Height * (3 / 100),
    marginVertical: 7,
    paddingVertical: Width * (3 / 100),
    paddingHorizontal: 10,
    marginHorizontal: 3.6,
    borderRadius: Width * (2 / 100),
    alignSelf: "center",
    justifyContent: "center",
  },
  headText: {
    fontSize: 13,
    fontFamily: GILROY_REGULAR,
    color: Colors.midBlack,
  },
  buttonStyle: {
    backgroundColor: Colors.skyBlueColor,
  },
  textColor: {
    color: Colors.whiteColor,
  },

  searchBundle: {
    width: "93%",
    borderColor: Colors.mediumGrey,
    borderWidth: 0.3,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 23,
  },
  textInputStyle: {
    marginHorizontal: 13,
    color: Colors.mediumGrey,
  },
 
  scrollDesign: {
    flexGrow: 0,
    marginHorizontal: 12,
  },
  dollerStyle:{
    width:26,
    height: 15,
    resizeMode: "contain",
  },
  flatContainer:{
    width:430,
    alignItems:'center',
    flexDirection:"row",
    marginTop:1,
    paddingVertical: 11.9,
    borderBottomColor: Colors.gray88,
    borderBottomWidth:0.8
  },
  totalView:{
    width:230,
    flexDirection:"row",
    justifyContent:'space-between',
    marginTop:23,
    marginLeft:13
},
price:{
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color:Colors.blackColor,
},
dollerText:{
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    color:Colors.blackColor,
    marginVertical:9
},
borderPrice:{
    flexDirection:'row',
    width:60,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:23,
    paddingVertical:6,
    borderColor:Colors.lightGrey50,
    borderWidth:0.5,
    borderRadius:6
},
modelAddproduct: {
  marginVertical: Width * (1/ 100),
  backgroundColor: "#E8F5FF",
  borderRadius:6,
  paddingHorizontal:3,
  paddingVertical: 6,
},
centeredView: {
  width: Width * (30 / 100),
  borderRadius: 9,
  position: "absolute",
  bottom:'32%',
  right: '27%',
  justifyContent: "center",
  alignSelf: "center",
  backgroundColor: Colors.whiteColor,
  paddingHorizontal: Width * (3 / 100),
  paddingVertical: Width * (2 / 100),
  paddingLeft: Width * (5 / 100),
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 5,
},
 modelContainer: {
  marginVertical: Width * (3 / 100),
},
reportText: {
  marginLeft:8,
  fontSize:13,
  fontFamily: GILROY_REGULAR,
}

});

export default NameAndPriceBundle;
