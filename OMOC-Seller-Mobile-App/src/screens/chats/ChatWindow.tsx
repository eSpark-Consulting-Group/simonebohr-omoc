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
import * as ImagePicker from "react-native-image-picker";
import {
  add_circle_icon,
  face_icon,
  gallery_icon,
  order_icon,
  receipt_icon,
  refresh_square_icon,
  send_icon,
  tag_icon,
  video_icon,
} from "../../utils/images";
import CustomChatHeader from "./CustomChatHeader";
import { Colors } from "../../utils/colors";
import ProductModal from "./chatModals/ProductModal";
import AnimatedView, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Height, Width, formattedDate, formattedTime } from "../../utils";
import TabProductModel from "./chatModals/TagProductModal";
import SearchInvoiceModal from "./chatModals/SearchInvoiceModal";
import { LogBox } from "react-native";
import BundleProduct from "./chatModals/BundleProduct";
import NameAndPriceBundle from "./chatModals/NameAndPriceBundle";
import Bundling from "./chatModals/Bundling";
import SetDiscount from "./chatModals/SetDiscount";
import { showMessage } from "react-native-flash-message";
import ApiService from "../../services/api.service";
import StorageService from "../../services/storage.service";
import Spinner from "../../component/Spinner";
import io from "socket.io-client";

LogBox.ignoreAllLogs();

const { height } = Dimensions.get("window");

const chatOptions = [
  { id: 1, type: "Product", image: order_icon },
  { id: 2, type: "Image", image: gallery_icon },
  { id: 3, type: "Video Call", image: video_icon },
  { id: 4, type: "Product Return", image: refresh_square_icon },
  { id: 5, type: "Invoice", image: receipt_icon },
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
        <View
          style={item.isSender ? styles.sendBubble : styles.receiveBubble}
        >
          <View
            style={{ alignItems: !item.isSender ? "flex-start" : "flex-end" }}
          >
            <View style={item.isSender ? styles.chatBox2 : styles.chatBox}>
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
            <Text style={styles.showTime}>{formattedTime(item.createdAt)}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
// / ---- receiver mssg end-------

const ChatWindow = ({ navigation, route }) => {
  const { item } = route?.params;
  const chatId = route?.params?.UserId;
  const [isKeyBoardOpen, setIsKeyBoardOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [message, setMessage] = useState("");
  const [openTagProductModal, setopenTagProductModal] = useState(false);
  const [openSearchInvoice, setOpenSearchInvoice] = useState(false);
  const [openBundleProductModal, setopenBundleProductModal] = useState(false);
  const [openNameandBundleModal, setopenNameandBundleModal] = useState(false);
  const [openBundlingModel, setopenBundlingModel] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [openDiscountProductModal, setopenDiscountProductModal] =
    useState(false);
  const optionsListStylesValue = useSharedValue(0);
  const sendMeassageInputViewValue = useSharedValue(0);
  const [fetching, setFetching] = useState(false);
  const flatListRef = useRef();
  const [CurrentUserId, setUserCurrentId] = useState("");


  useEffect(() => {
    getAllMssg();
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

    // -------- scoket Api calling --------

    useEffect(() => {
      const newSocket = io("http://13.49.17.24:4000");
      newSocket.on("connect", () => {
        console.log("Connected to server");
      });
  
      newSocket.on("chat-message", (msg) => {
        if (msg.chatId._id === chatId) {
          const isSender = msg.sender.userId._id !== CurrentUserId;
          console.log("isSender:", isSender);
          const updatedData = {
            ...msg,
            isSender: isSender,
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
      newSocket.emit("setup", { _id: CurrentUserId }); // Setup with user ID
      newSocket.emit("join chat", chatId); // Join the chat
    }, []);

    const getAllMssg = async () => {
      try {
        setFetching(true);
        const response = await ApiService.getAllmessge(chatId);
        const data = response.data;
        setFetching(false);
  
        if (response?.statusCode === 200) {
          const localUserData = await StorageService.getUser();
          const userDetails = JSON.parse(localUserData);
          const currentUserId = userDetails.user._id;
          setUserCurrentId(currentUserId);
         
          const filteredMessages = data.map((item) => {
            const isSender =
              item.sender &&
              item.sender.userId &&
              item.sender.userId._id === currentUserId;
            return {
              ...item,
              isSender: isSender,
            };
          });  
          setChatMessages(filteredMessages);
        }
      } catch (error) {
        showMessage({
          message: "Failed to retrieve messages",
          duration: 3000,
          backgroundColor:Colors.skyBlueColor,
          type: "danger",
        });
        console.error("Error:", error);
      }
    };

  const sendMessage = async () => {
    try {
      const data = {
        message: message,
      };
      const response = await ApiService.sendmessge(chatId, data);     
    } catch (error) {
      console.error("Error:---", JSON.stringify(error));
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      const lastIndex = chatMessages && chatMessages?.length - 1;
      flatListRef?.current?.scrollToIndex({ index: lastIndex, animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const onGalleryPress = React.useCallback(() => {
    const includeExtra = true;
    const options = {
      selectionLimit: 0,
      mediaType: "photo",
      includeBase64: false,
      includeExtra,
    };
    ImagePicker.launchImageLibrary(options, (res) => {
      console.log("image gallery response", JSON.stringify(res));
    });
  }, []);
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
              <TouchableOpacity
                onPress={() => {
                  if (isKeyBoardOpen) {
                    Keyboard.dismiss();
                    setIsKeyBoardOpen(false);
                  }
                  if (optionsListStylesValue.value === 0) {
                    optionsListStylesValue.value = withTiming(1, {
                      duration: 500,
                    });
                  } else {
                    optionsListStylesValue.value = withTiming(0, {
                      duration: 500,
                    });
                  }
                }}
              >
                <VectorImage
                  style={styles.inputIcon}
                  source={add_circle_icon}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.sendContainer}
              onPress={sendMessage}
            >
              <VectorImage source={send_icon} />
            </TouchableOpacity>
          </AnimatedView.View>
          <AnimatedView.View
            style={[styles.optionsContainer, optionsListStyles]}
          >
            <FlatList
              data={chatOptions}
              numColumns={4}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.optionsList}
                    onPress={() => {
                      optionsListStylesValue.value = withTiming(0, {
                        duration: 500,
                      });
                      if (item.type === "Product") {
                        optionsListStylesValue.value = withTiming(0, {
                          duration: 500,
                        });
                        setIsProductModalOpen((prev) => !prev);
                      } else if (item.type === "Invoice") {
                        setOpenSearchInvoice((prev) => !prev);
                      } else {
                        onGalleryPress();
                      }
                    }}
                  >
                    <VectorImage source={item.image} />
                    <Text style={styles.optionType}>{item.type}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </AnimatedView.View>
        </AnimatedView.View>

        {!!isProductModalOpen && (
          <TouchableWithoutFeedback
            onPress={() => {
              setIsProductModalOpen(false);
            }}
          >
            <Modal visible={isProductModalOpen} transparent>
              <ProductModal
                hideMe={() => {
                  setIsProductModalOpen(false);
                }}
                onSelectProduct={(val) => {
                  if (val == "Tag Product") {
                    setSelectedProduct(val);
                    setopenTagProductModal(true);
                  } else if (val == "Bundling Product") {
                    setSelectedProduct(val);
                    setopenBundleProductModal(true);
                  } else {
                    setSelectedProduct(val);
                    setopenDiscountProductModal(true);
                  }
                  setIsProductModalOpen(false);
                }}
              />
            </Modal>
          </TouchableWithoutFeedback>
        )}
        {!!openSearchInvoice && (
          <TouchableWithoutFeedback
            onPress={() => {
              setOpenSearchInvoice(false);
            }}
          >
            <Modal visible={openSearchInvoice} transparent>
              <SearchInvoiceModal
                hideMe={() => {
                  setOpenSearchInvoice(false);
                }}
              />
            </Modal>
          </TouchableWithoutFeedback>
        )}
        {openTagProductModal && (
          <TabProductModel
            product={selectedProduct}
            hideMe={() => {
              setopenTagProductModal(false);
            }}
          />
        )}
        {openBundleProductModal && (
          <BundleProduct
            hideMe={() => {
              setopenBundleProductModal(false);
            }}
            openNameandBundle={() => {
              setopenBundleProductModal(false);
              setopenNameandBundleModal(true);
            }}
          />
        )}

        {openNameandBundleModal && (
          <NameAndPriceBundle
            hideMe={() => {
              setopenNameandBundleModal(false);
            }}
            openNameandBundle={() => {
              setopenNameandBundleModal(false);
              setopenBundlingModel(true);
            }}
          />
        )}

        {openBundlingModel && (
          <Bundling
            hideMe={() => {
              setopenBundlingModel(false);
            }}
          />
        )}
        {!!openDiscountProductModal && (
          <SetDiscount
            hideMe={() => {
              setopenDiscountProductModal(false);
            }}
          />
        )}
        {fetching && <Spinner animating={fetching} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default ChatWindow;
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
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
    backgroundColor: Colors.skyBlueColor,
    justifyContent: "center",
    alignItems: "center",
  },
  chatBox: {
    backgroundColor: Colors.whiteColor,
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
    color: Colors.grey,
    marginVertical: 10,
    fontSize: 10,
    marginLeft: 5,
    fontFamily: GILROY_REGULAR,
  },
  chatBox2: {
    backgroundColor: Colors.skyBlueColor,
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
    backgroundColor: Colors.lightGrey,
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
    color: Colors.neutralBlack,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    lineHeight: 19.6,
  },
  senderMessageText: {
    color: Colors.whiteColor,
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 19.6,
  },
  dayStatusText: {
    color: Colors.neutralBlack,
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    textAlign: "center",
    // position: "absolute",
    // right: 145,
    // top: -28,
    // width: 80,
    marginVertical: 10,
  },
  sendMessgeView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: Colors.whiteColor,
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
    color: Colors.neutralBlack,
    textAlign: "center",
    width: "80%",
  },
});
