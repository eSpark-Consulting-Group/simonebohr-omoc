import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  Alert,
} from "react-native";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import {
  add_circle_icon,
  face_icon,
  send_icon,
  warn_notify,
} from "../../utils/images";
import {
  lightGrey,
  neutralBlack,
  whiteColor,
  skyBlueColor,
  grey,
  blackColor,
  dangerRed,
  lightGrey50,
  purpleColor,
  red,
} from "../../utils/colors";
import AnimatedView, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LogBox } from "react-native";
import CustomChatHeader from "../../components/CustomChatHeader";
import InvitationModal from "./RequestModal/InvitationModal";
import ApiService from "../../services/api.service";
import StorageService from "../../services/storage.service";
import { formattedDate } from "../../utils";
import { showMessage } from "react-native-flash-message";
import io from "socket.io-client";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { strings } from "../../assets/string/strings";

LogBox.ignoreAllLogs();

const { Width } = Dimensions.get("window");
const { Height } = Dimensions.get("window");

const chatMessages = [
  {
    id: 1,
    name: "Yeete West",
    isSender: true,
    messageText: "Hi, I have issues with my shipping. Can you help out?",
  },
  {
    id: 2,
    name: "Yeete West",
    isSender: false,
    messageText: "Hi Momon, can i help you today?",
  },
];
// ---- receiver mssg start-------
let lastPrintedDate = "";

const RenderMessages = ({ item }: any) => {
  const isNewDate = lastPrintedDate !== formattedDate(item.createdAt);
  if (isNewDate) {
    lastPrintedDate = formattedDate(item.createdAt);
  }
  return (
    <>
      {isNewDate && <Text style={styles.dayStatusText}>{lastPrintedDate}</Text>}
      <View style={styles.allContainer}>
        <View style={item.isSender ? styles.sendBubble : styles.receiveBubble}>
          <View
            style={{ alignItems: item.isSender ? "flex-start" : "flex-end" }}
          >
            <View style={item.isSender ? styles.chatBox : styles.chatBox2}>
              <Text
                style={
                  item.isSender
                    ? styles.senderMessageText
                    : styles.reciverMessageText
                }
              >
                {item.message ? item.message.trim() : ""}
              </Text>
            </View>
            <Text style={styles.showTime}>{formattedDate(item.createdAt)}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

// / ---- receiver mssg end-------

const ChatScreen = ({ navigation, route }) => {
  const { item } = route?.params;
  const chatId = route?.params?.UserId;
  const Users = route?.params?.Users;
  const { IniviteStatus } = route?.params;
  const [selectBtn, setSelectBtn] = useState(1);
  const [rejectModal, setRejectModal] = useState(false);
  const [isKeyBoardOpen, setIsKeyBoardOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [CurrentId, setUserCurrentId] = useState("");
  const optionsListStylesValue = useSharedValue(0);
  const sendMeassageInputViewValue = useSharedValue(0);
  const [fetching, setFetching] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const flatListRef = useRef();

  // -------- scoket Api calling --------

  useEffect(() => {
    const newSocket = io("http://13.49.17.24:4000");
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("chat-message", (msg) => {
      if (msg.chatId._id === chatId) {
        const updatedData = {
          ...msg,
          isSender: msg.sender.userId._id !== CurrentId,
        };
        setChatMessages((prevState) => [...prevState, updatedData]);
        setMessage("");
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      newSocket.disconnect(); // Disconnect from the server when the component unmounts
    };
  }, []);

  useEffect(() => {
    const newSocket = io("http://13.49.17.24:4000");
    newSocket.emit("setup", { _id: CurrentId }); // Setup with user ID
    newSocket.emit("join chat", chatId); // Join the chat
  }, []);

  const getAllMssg = async () => {
    try {
      setFetching(true);
      const response = await ApiService.getAllmessge(chatId);
      const data = response.data;
      setFetching(false);
      console.log("data------:", response);
      if (response?.statusCode === 200) {
        const localUserData = await StorageService.getUser();
        const userDetails = JSON.parse(localUserData);
        const currentUserId = userDetails.user._id;
        setUserCurrentId(currentUserId);
       
        const filteredMessages = data.map((item) => {
          // Map over users array to extract statuses
          const statuses = item.users
            ? item.users.map((user) => user.status)
            : [];

          const isSender =
            item.sender &&
            item.sender.userId &&
            item.sender.userId._id === currentUserId;
          return {
            ...item,
            isSender: isSender,
          };
        });
        const isPending = data?.find(
          (chat) =>
            chat?.chatId?._id === chatId 
        )?.chatId?.users?.find((user)=>user?.userId === currentUserId && user?.status === "pending");

        console.log("isPending:", JSON.stringify(isPending,null,3)); // Log the value of isPending

        // Open modal if any status is "pending"
        if (isPending) {
          setShowInvitation(true);
        }

        setChatMessages(filteredMessages);
      }
    } catch (error) {
      showMessage({
        message: "Failed to retrieve messages",
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
      console.error("Error:", error);
    }
  };

  const sendMessage = async () => {
    try {
      const data = {
        status: message,
      };
      const response = await ApiService.sendmessge(chatId, data);
    } catch (error) {
      console.error("Error:------", JSON.stringify(error));
    }
  };

  const acceptApi = async (text) => {
    try {
      const data = {
        chatId: chatId,
        status: text,
      };
      const response = await ApiService.statusUpdate(data);
      console.log('Update status----',response)
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getAllMssg();
    Users.forEach((item) => {
      if (item.userId?._id === CurrentId && item.status === "pending") {
        setShowInvitation(true);
      }
    });
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyBoardOpen(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyBoardOpen(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      const lastIndex = chatMessages && chatMessages?.length - 1;
      flatListRef?.current?.scrollToIndex({ index: lastIndex, animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const optionsListStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        optionsListStylesValue.value,
        [0, 0.5, 1],
        [0, 0.5, 1]
      ),
    };
  });
  const footerViewStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        optionsListStylesValue.value,
        [0, 0.5, 1],
        [isKeyBoardOpen ? 70 : 100, 200, Height * 0.5]
      ),
    };
  });

  const sendMessgeViewStyle = useAnimatedStyle(() => {
    return {
      // paddingBottom: interpolate(
      //   sendMeassageInputViewValue.value,
      //   [0, 0.5, 1],
      //   [25, 10, 0]
      // ),
      // backgroundColor: interpolateColor(
      //   sendMeassageInputViewValue.value,
      //   [0, 0.5, 1],
      //   ['red', 'green', 'yellow']
      // ),
    };
  });

  const toggleModal = () => {
    setShowInvitation(!showInvitation);
  };

  const getItemLayout = (chatMessages, index) => ({
    length: 100, // Height of each item
    offset: 100 * index, // Offset of the item from the top
    index,
  });

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.safeContainer}>
        <CustomChatHeader item={item} navigation={navigation} />

        {chatMessages && chatMessages.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={chatMessages}
            getItemLayout={getItemLayout}
            renderItem={({ item }) => {
              return <RenderMessages item={item} />;
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.textContainer}
          />
        ) : null}
        {/* ------ chatbar textinput ------- */}
        <AnimatedView.View style={[styles.sendMessgeView, footerViewStyle]}>
          <AnimatedView.View
            style={[styles.footerContainer, sendMessgeViewStyle]}
          >
            <View style={styles.inputContainer}>
              <TouchableOpacity>
                <VectorImage style={styles.inputIcon} source={face_icon} />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Message"
                autoFocus={false}
                value={message}
                onChangeText={(e) => setMessage(e)}
                onSubmitEditing={sendMessage}
                onFocus={() => {
                  if (optionsListStylesValue.value === 1) {
                    optionsListStylesValue.value = withTiming(0, {
                      duration: 200,
                    });
                  }
                }}
              />
            </View>
            <TouchableOpacity
              onPress={sendMessage}
              style={styles.sendContainer}
              disabled={!message.length}
            >
              <VectorImage
                source={send_icon}
                style={{ tintColor: whiteColor }}
              />
            </TouchableOpacity>
          </AnimatedView.View>
        </AnimatedView.View>
        <Modal
          visible={showInvitation}
          animationType="fade"
          onRequestClose={() => setShowInvitation(!showInvitation)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.contentContainer}>
              <View style={styles.imgTextStyle}>
                <VectorImage style={styles.imageStyle} source={warn_notify} />
                <Text style={styles.productText}>
                  This Group was sent from outside your contacts, do you approve
                  this message?
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={
                    selectBtn === 1 ? styles.activeBtn : styles.deactiveBtn
                  }
                  onPress={() => {
                    setSelectBtn(1), setShowInvitation(false);
                    acceptApi("accepted");
                  }}
                >
                  <Text
                    style={
                      selectBtn === 1 ? styles.activeText : styles.deactiveText
                    }
                  >
                    {strings.ACCEPT}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectBtn === 2 ? styles.activeBtn : styles.deactiveBtn
                  }
                  onPress={() => {
                    setShowInvitation(false);
                    setRejectModal(true);
                  }}
                >
                  <Text
                    style={
                      selectBtn === 2 ? styles.activeText : styles.deactiveText
                    }
                  >
                    {strings.DENY}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectBtn === 3 ? styles.activeBtn : styles.deactiveBtn
                  }
                  onPress={() => {
                    setSelectBtn(3), setShowInvitation(false);
                    acceptApi("blocked");
                  }}
                >
                  <Text
                    style={
                      selectBtn === 3 ? styles.activeText : styles.deactiveText
                    }
                  >
                    {strings.BLOCK}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={rejectModal}
          animationType={"fade"}
          onRequestClose={() => setRejectModal(!rejectModal)}
        >
          <View style={styles.modalView}>
            <View style={styles.cartModalView}>
              <Text style={styles.rejectText}>Reject Group invitation</Text>
              <Text style={styles.invitationText}>
                You can't repeat this action, are you sure {"\n"}you want to
                decline the group invitation?
              </Text>
              <View style={styles.horizontalStyle}>
                <TouchableOpacity onPress={() => setRejectModal(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setRejectModal(false);
                    acceptApi("rejected");
                  }}
                >
                  <Text style={styles.rejectTextStyle}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default ChatScreen;
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
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  footerContainer: {
    paddingTop: 15,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
    gap: 5,
  },
  input: {
    width: "86%",
  },
  inputIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  sendContainer: {
    width: 42,
    height: 42,
    borderRadius: 25,
    backgroundColor: skyBlueColor,
    justifyContent: "center",
    alignItems: "center",
  },
  chatBox: {
    width: 300,
    backgroundColor: skyBlueColor,
    padding: 15,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  profileImg: {
    width: 24,
    height: 24,
    marginVertical: 10,
  },
  showTime: {
    color: grey,
    marginVertical: 10,
    fontSize: 10,
    marginLeft: 5,
    fontFamily: GILROY_REGULAR,
  },
  chatBox2: {
    backgroundColor: whiteColor,
    padding: 15,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  allContainer: {
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  keyboard: { flex: 1 },
  textContainer: {
    flexGrow: 1,
    backgroundColor: lightGrey,
    paddingBottom: "18%",
  },
  chatMain: {
    maxWidth: "80%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sendBubble: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  receiveBubble: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  reciverMessageText: {
    color: blackColor,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    lineHeight: 19.6,
  },
  senderMessageText: {
    color: whiteColor,
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 19.6,
  },
  dayStatusText: {
    color: neutralBlack,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    lineHeight: 16.6,
    textAlign: "center",
    margin: 20,
  },
  sendMessgeView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: whiteColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 10,
  },
  optionsList: {
    backgroundColor: "#EDEDED",
    justifyContent: "center",
    height: Width * 0.2,
    width: Width * 0.2,
    marginHorizontal: 8,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 22,
    gap: 8,
  },
  optionsContainer: { flex: 1, alignItems: "center", width: "100%" },
  optionType: {
    fontSize: 10,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    color: neutralBlack,
    textAlign: "center",
    width: "80%",
  },
  // ------ MODAL ---------
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  imgTextStyle: {
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    marginVertical: 18,
    justifyContent: "space-between",
  },
  contentContainer: {
    backgroundColor: whiteColor,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    position: "absolute",
    bottom: 1,
    paddingBottom: 35,
  },
  imageStyle: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginBottom: 10,
  },
  productText: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color: blackColor,
    marginLeft: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "98%",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  activeBtn: {
    backgroundColor: purpleColor,
    padding: 9,
    paddingHorizontal: 37,
    borderRadius: 20,
  },
  deactiveBtn: {
    backgroundColor: whiteColor,
    borderColor: lightGrey50,
    borderWidth: 0.8,
    padding: 9,
    paddingHorizontal: 37,
    borderRadius: 20,
  },
  activeText: {
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    color: whiteColor,
  },
  deactiveText: {
    fontSize: 13,
    fontFamily: GILROY_MEDIUM,
    color: grey,
  },

  modalView: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cartModalView: {
    width: "80%",
    backgroundColor: whiteColor,
    borderRadius: 20,
    paddingVertical: 19,
    alignContent: "center",
  },
  rejectText: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: blackColor,
    textAlign: "center",
  },
  invitationText: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color: blackColor,
    marginTop: 15,
    lineHeight: 20,
    textAlign: "center",
  },
  horizontalStyle: {
    marginTop: 15,
    borderColor: lightGrey50,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancelText: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: skyBlueColor,
    marginTop: 15,
    borderRightColor: lightGrey50,
    borderRightWidth: 1,
  },
  rejectTextStyle: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: red,
    marginTop: 15,
  },
});
