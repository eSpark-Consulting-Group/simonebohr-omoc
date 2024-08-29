import { StyleSheet, Text, View, SafeAreaView, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import HeaderTabBar from "../../components/HeaderTabBar";
import { strings } from "../../assets/string/strings";
import {
  blackColor,
  gray88,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { GILROY_REGULAR } from "../../utils/fonts";
import { TouchableOpacity } from "react-native";
import VectorImage from "react-native-vector-image";
import { back_icon, message_edit_icon } from "../../utils/images";
import MessageComponent from "../../components/MessageComponent";
import ApiService from "../../services/api.service";

const MessageScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [personalData, setPersonalData] = useState([]);
  const [supportData, setSupportData] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [type, setType] = useState("personal");

  const buttonTab = [
    {
      label: strings.PERSONAL,
    },
    {
      label: strings.SUPPORT,
    },
  ];

  useEffect(()=>{
    getMessagePopup()
  },[selectedIndex])

  const getMessagePopup = async () => {
    try {
      const response = await ApiService.getMessageStatusPopup(); 
      const responseData = await response?.data?.isChatTourCompleted        
     if(responseData === false){
      setModalVisible(true);
     }   
    } catch (error) {
      console.log(error);
    }
  };

  const updateMessagePopup = async (index) => {
    try {
      const data ={isChatTourCompleted:index}
      const response = await ApiService.statusMessageUpdate(data);    
    } catch (error) {
      console.log(error);
    }
  };

  const getChatList = async () => {
    try {
      const response = await ApiService.getAllChatList(type); 
      const responseData = await response?.data?.chats;
      if (type === "personal") {
        setSupportData(responseData);
      }
      if (type === "support") {
        setSupportData(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatList();
  }, [type]);

  return (
    <SafeAreaView style={styles.backBtn}>
      <View style={styles.btnView}>
        <CustomHeaderShown
          title={strings.DIRECT_MESSAGE}
          style={styles.btn}
          navigation={navigation}
          rightheadericon={message_edit_icon}
          onRightHeaderPress={() => navigation.navigate("NewMessageScreen")}
        />
      </View>
      <View style={styles.mainBtn}>
        <HeaderTabBar
          selectedIndex={selectedIndex}
          buttonTab={buttonTab}
          fullWidth={true}
          onChangeTab={(index) => {
            setSelectedIndex(index);
            const selectedType = index === 0 ? "personal" : "support";
            setType(selectedType);
            if(selectedType){
            updateMessagePopup(true)
           }else{
            updateMessagePopup(true)
          }
          }}
          bgColor={skyBlueColor}
        />
      </View>
      <View style={styles.buttons}>
        <Text style={styles.msgText}>{strings.MESSAGE}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RequestScreen")}>
          <Text style={styles.reqText}>{strings.REQUEST}</Text>
        </TouchableOpacity>
      </View>
      <MessageComponent listData={supportData} />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableOpacity
          onPress={() =>setModalVisible(false)}
          style={styles.modalcontainer}
          activeOpacity={0}
        >
          <View>
            <View
              style={[
                styles.cartView,
                { alignSelf: selectedIndex ? "flex-end" : "flex-start" },
              ]}
            >
              <Text>
                {selectedIndex
                  ? "In this part you will see Customer Support message from OMOC"
                  : "In this part you will see personal message from your friends, people, and shop."}
              </Text>
              <View style={styles.arrowView}>
                <VectorImage
                  source={back_icon}
                  style={[
                    styles.imgVect,
                    { tintColor: selectedIndex ? skyBlueColor : gray88 },
                  ]}
                />
                <Text>{selectedIndex ? 2 : 1}</Text>
                <VectorImage
                  source={back_icon}
                  style={[
                    styles.imgVect,
                    {
                      transform: [{ rotateZ: "180deg" }],
                      tintColor: selectedIndex ? gray88 : skyBlueColor,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  btn: {
    width: "45%",
    height: 49,
    backgroundColor: skyBlueColor,
    borderRadius: 24,
    marginLeft: 2,
  },
  btnText: {
    textAlign: "center",
    padding: 15,
  },
  historyBtn: {
    width: "45%",
    height: 49,
    backgroundColor: skyBlueColor,
    borderRadius: 24,
    marginLeft: 30,
  },
  mainBtn: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  msgText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
  },
  reqText: {
    color: skyBlueColor,
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginHorizontal: 15,
  },
  msgEditIcon: {
    width: 24,
    height: 24,
  },
  editIconView: {
    alignSelf: "flex-end",
    bottom: 22,
  },
  btnView: {
    marginHorizontal: 15,
  },
  modalcontainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  cartView: {
    width: "70%",
    backgroundColor: whiteColor,
    padding: 13,
    marginHorizontal: 18,
    marginTop: "38%",
    borderRadius: 6,
  },
  arrowView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
    alignSelf: "flex-end",
  },
  imgVect: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginHorizontal: 7,
  },
  textStyle: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: blackColor,
  },
});
