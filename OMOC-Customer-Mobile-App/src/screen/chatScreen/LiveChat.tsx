import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import {
  grey,
  lightGrey,
  midGray,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import {
  add_circle_icon,
  happy_face_icon,
  phone_icon,
  profileImg,
  send_msg_icon,
} from "../../utils/images";
import VectorImage from "react-native-vector-image";
import FastImage from "react-native-fast-image";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";

const LiveChat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    if (showModal === false) {
      setShowModal(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.LIVE_CHAT}
          rightheadericon={phone_icon}
          navigation={navigation}
        />
      </View>

      <View style={styles.allContainer}>
        <View style={styles.dayMainContainer}>
          <View style={styles.dayContainer}>
            <Text>Today</Text>
          </View>
        </View>
        <View style={styles.chatContainer}>
          <FastImage style={styles.profileImg} source={profileImg} />
          <View>
            <View style={styles.chatBox}>
              <Text>Hi Momon, can i help you today?</Text>
            </View>
            <Text style={styles.showTime}>05:40 pm</Text>
          </View>
        </View>
        <View style={styles.chatContainer2}>
          <FastImage style={styles.profileImg2} source={profileImg} />
          <View style={styles.firstChatView}>
            <View style={styles.chatBox2}>
              <Text style={styles.msgText2}>
                Hi, I have issues with my shipping. Can you help out?
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.chatContainer}>
          <FastImage style={styles.profileImg} source={profileImg} />
          <View>
            <View style={styles.chatBox}>
              <Text>Can you tell me about your problem?</Text>
            </View>
            <Text style={styles.showTime}>05:40 pm</Text>
          </View>
        </View>
        <View style={styles.chatContainer2}>
          <FastImage style={styles.profileImg2} source={profileImg} />
          <View>
            <View style={styles.chatBox2}>
              <Text style={styles.msgText2}>
                My tracker number doesn’t work
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.chatContainer2}>
          <FastImage style={styles.profileImg2} source={profileImg} />
          <View>
            <View style={styles.chatBox2}>
              <Text style={styles.msgText2}>Would you mind taking a look?</Text>
            </View>
            <View>
              <Text style={styles.showTime2}>05:40 pm</Text>
            </View>
          </View>
        </View>
        <View style={styles.chatContainer2}></View>
      </View>

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <VectorImage style={styles.inputIcon} source={happy_face_icon} />
          </TouchableOpacity>
          <TextInput style={styles.input} placeholder="Message" />
          <TouchableOpacity onPress={handleShowModal}>
            <VectorImage style={styles.inputIcon} source={add_circle_icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendContainer}
         onPress={()=> navigation.navigate("RequestLiveVideoBottomSheet")}>
          <VectorImage source={send_msg_icon} />
        </TouchableOpacity>
      </View>
      <View>
        {showModal && (
          <Modal transparent={true}>
            <TouchableWithoutFeedback
              style={{ backgroundColor: "red" }}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <View style={styles.galleryContainer}>
                <View style={styles.boxView}>
                  <TouchableOpacity style={styles.galleryView}>
                    <Text style={styles.galleryText}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.makeGroupView}>
                    <Text style={styles.makeGroupText}>Make Group</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LiveChat;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
    paddingBottom: 20,
  },
  inputContainer: {
    height: 42,
    width: "80%",
    backgroundColor: lightGrey,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 15,
    position: "absolute",
    bottom: 40,
  },
  input: {
    width: "80%",
  },
  inputIcon: {
    width: 18,
    height: 18,
  },
  sendContainer: {
    width: 42,
    height: 42,
    borderRadius: 25,
    backgroundColor: skyBlueColor,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  chatBox: {
    backgroundColor: whiteColor,
    padding: 15,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  profileImg: {
    width: 24,
    height: 24,
    marginVertical: 10,
  },
  chatContainer: {
    flexDirection: "row",
    gap: 15,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  showTime: {
    color: grey,
    marginVertical: 10,
    fontSize: 10,
    marginLeft: 5,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
  dayContainer: {
    height: 33,
    width: "18%",
    backgroundColor: midGray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
  },
  dayMainContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  chatContainer2: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "flex-end",
  },
  profileImg2: {
    width: 24,
    height: 24,
    marginVertical: 10,
    position: "absolute",
  },
  chatBox2: {
    backgroundColor: skyBlueColor,
    padding: 15,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: "80%",
    marginLeft: 20,
  },
  showTime2: {
    color: grey,
    marginVertical: 10,
    justifyContent: "center",
    position: "absolute",
    right: 35,
    fontSize: 10,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
  msgText2: {
    color: whiteColor,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  allContainer: {
    backgroundColor: lightGrey,
    height: "85%",
    paddingTop: 20,
  },
  firstChatView: {
    marginRight: -10,
  },
  galleryContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    marginVertical: "18%",
    width: "100%",
  },
  boxView: {
    height: "14%",
    width: "30%",
    backgroundColor: whiteColor,
    borderRadius: 12,
    marginRight: "27%",
  },
  galleryView: {
    marginHorizontal: 10,
    marginTop: 25,
    left: 10,
  },
  galleryText: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 12,
  },
  makeGroupView: {
    marginHorizontal: 10,
    marginTop: 20,
    left: 10,
  },
  makeGroupText: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 12,
  },
});
