import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import VectorImage from "react-native-vector-image";
import {
  grey,
  lightBlack,
  midBlack,
  neutralBlack,
  whiteColor,
} from "../../utils/colors";
import FastImage from "react-native-fast-image";
import {
  add_circle_icon,
  happy_face_iocn,
  heart_icon,
  like_icon,
  profile_pic1,
} from "../../utils/images";
import { GILROY_BOLD, GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { timeAgoPost } from "../../utils";
import { palceholders, strings } from "../../assets/string/strings";
import ApiService from "../../services/api.service";
import Spinner from "../Spinner";
import { TextInput } from "react-native";

const PostCommentsBottomSheet = ({ hideMe, data, userData }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [inputType, setInputType] = useState("comment");
  const [selectedCommentToReply, setSelectedCommentToReply] = useState({});
  const [showSelectedReply, setShowSelectedReply] = useState(null);
  const textInputRef = useRef(null);

  const snapPoints = useMemo(() => {
    return [80, "80%"];
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const postId = data?._id;
        const response = await ApiService.getCommentByPostId(postId);

        setComments(response?.data?.comments);
      } catch (error) {
        console.log("esponse comments error", error?.response?.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, []);

  const onAddComment = async () => {
    try {
      const newComment = {
        _id: "12345678",
        userId: userData?._id,
        entityType: "posts",
        comment: commentInput,
        isDeleted: false,
        likesCount: 0,
        repliesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
        user: {
          _id: userData?._id,
          name: userData.name,
          profileImg: userData.profileImg,
        },
        replies: [],
        isLikedByCurrentUser: false,
      };
      if (!!commentInput.length) {
        setComments([newComment, ...comments]);
      } else {
        return;
      }
      setIsPosting(true);
      const param = {
        postId: data?._id,
        comment: commentInput,
      };
      await ApiService.addCommentByPostId(param);
      setCommentInput("");
    } catch (error) {
      console.log("response comments error", error?.response?.data);
    } finally {
      setIsPosting(false);
    }
  };

  const onReplyToComment = async () => {
    try {
      const newReply = {
        _id: "12345678",
        userId: userData?._id,
        entityType: "posts",
        comment: commentInput,
        isDeleted: false,
        likesCount: 0,
        repliesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
        user: {
          _id: userData?._id,
          name: userData.name,
          profileImg: userData.profileImg,
        },
        replies: [],
        isLikedByCurrentUser: false,
      };
      if (!!commentInput.length) {
        setComments((prev) => {
          const newArray = [];
          prev.map((val) => {
            if (selectedCommentToReply?._id === val._id) {
              val?.replies.push(newReply);
              newArray.push(val);
            } else {
              newArray.push(val);
            }
          });
          return prev;
        });
      } else {
        return;
      }
      setIsPosting(true);
      const param = {
        commentId: selectedCommentToReply?._id,
        comment: commentInput,
      };
      console.log('param',JSON.stringify(param))
      await ApiService.replyToComment(param);
      setCommentInput("");
      setInputType("comment");
    } catch (error) {
      console.log("response reply comments error", error?.response?.data);
    } finally {
      setIsPosting(false);
    }
  };

  const onSubmitEditing = () => {
    if (inputType === "reply") {
      onReplyToComment();
    } else {
      onAddComment();
    }
  };

  const onLikeComment = async (item) => {
    try {
      setComments((prev) => {
        const newCommnetArray = [];
        prev.map((val) => {
          if (item?._id === val?._id) {
            const obj = {
              ...val,
              isLikedByCurrentUser: !val?.isLikedByCurrentUser,
              likesCount: !val?.isLikedByCurrentUser
                ? val?.likesCount + 1
                : val?.likesCount - 1,
            };
            newCommnetArray.push(obj);
          } else {
            newCommnetArray.push(val);
          }
        });
        return newCommnetArray;
      });
      const param = {
        commentId: item._id,
        isLiked: !item.isLikedByCurrentUser,
      };
      await ApiService.likePostCommentByCommentId(param);
    } catch (error) {
      console.log("response like comments error", error?.response?.data);
    }
  };

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
        opacity={1}
      />
    ),
    []
  );

  const renderEmptyCommentsList = () => {
    return (
      <>
        {!isLoading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyContainerText}>No comments yet</Text>
            <Text style={styles.emptySubText}>start the conversation</Text>
          </View>
        ) : null}
      </>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundComponent={() => (
        <View style={[styles.backContainer, { backgroundColor: whiteColor }]} />
      )}
    >
      <View style={styles.contentContainer}>
        <View style={styles.commentListContainer}>
          {!!comments.length ? (
            <FlatList
              data={comments}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={styles.itemContainer}>
                    <FastImage
                      source={{ uri: item?.user?.profileImg }}
                      style={styles.userImage}
                      defaultSource={profile_pic1}
                    />
                    <View style={styles.itemContent}>
                      <View style={styles.userName}>
                        <Text style={styles.userNameText}>
                          {item?.user?.name}
                        </Text>
                        <Text style={styles.commentTime}>
                          {timeAgoPost(item?.createdAt)}
                        </Text>
                      </View>
                      <View style={styles.commentView}>
                        <Text style={styles.commentText}>{item?.comment}</Text>
                        <TouchableOpacity
                          style={styles.likesView}
                          onPress={() => onLikeComment(item)}
                        >
                          <VectorImage
                            source={
                              item?.isLikedByCurrentUser
                                ? like_icon
                                : heart_icon
                            }
                            style={styles.likeIcon}
                          />
                          <Text style={styles.totalLikesText}>
                            {!!item?.likesCount && item?.likesCount}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setCommentInput("@" + item.user.name);
                          textInputRef.current.focus();
                          setInputType("reply");
                          setSelectedCommentToReply(item);
                        }}
                      >
                        <Text style={styles.replyText}>{strings.REPLY}</Text>
                      </TouchableOpacity>
                      {item?.replies?.length > 1 ? (
                        <>
                          {!!showSelectedReply &&
                          showSelectedReply?._id === item?._id ? (
                            <FlatList
                              data={item?.replies}
                              renderItem={(replyItem) => {
                                return (
                                  <View style={styles.itemContainer}>
                                    <FastImage
                                      source={{
                                        uri: replyItem?.item.user?.profileImg,
                                      }}
                                      style={styles.userImage}
                                      defaultSource={profile_pic1}
                                    />
                                    <View style={styles.itemContent}>
                                      <View style={styles.userName}>
                                        <Text style={styles.userNameText}>
                                          {replyItem?.item.user?.name}
                                        </Text>
                                        <Text style={styles.commentTime}>
                                          {timeAgoPost(
                                            replyItem?.item.createdAt
                                          )}
                                        </Text>
                                      </View>
                                      <View style={styles.commentView}>
                                        <Text style={styles.commentText}>
                                          {replyItem?.item.comment}
                                        </Text>
                                        <TouchableOpacity
                                          style={styles.likesView}
                                          onPress={() => onLikeComment(item)}
                                        >
                                          <VectorImage
                                            source={
                                              replyItem?.item
                                                .isLikedByCurrentUser
                                                ? like_icon
                                                : heart_icon
                                            }
                                            style={styles.likeIcon}
                                          />
                                          <Text style={styles.totalLikesText}>
                                            {!!replyItem?.item.likesCount &&
                                              replyItem?.item.likesCount}
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                      <TouchableOpacity
                                        onPress={() => {
                                          setCommentInput("@" + item.user.name);
                                          textInputRef.current.focus();
                                          setInputType("reply");
                                          setSelectedCommentToReply(item);
                                        }}
                                      >
                                        <Text style={styles.replyText}>
                                          {strings.REPLY}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                );
                              }}
                            />
                          ) : null}
                          <TouchableOpacity
                            onPress={() => {
                              if (!showSelectedReply) {
                                setShowSelectedReply(item);
                              } else {
                                setShowSelectedReply(null);
                              }
                            }}
                          >
                            <Text
                              style={{ ...styles.replyText, marginLeft: 10 }}
                            >
                              {!!showSelectedReply &&
                              showSelectedReply?._id === item?._id
                                ? "Hide reply"
                                : `${strings.VIEW_REPLY} (${item?.replies?.length})`}
                            </Text>
                          </TouchableOpacity>
                        </>
                      ) : null}
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            renderEmptyCommentsList()
          )}
        </View>
        <View style={styles.textInputContainer}>
          <View style={styles.addCommetView}>
            <TouchableOpacity>
              <VectorImage source={happy_face_iocn} style={styles.faceIcon} />
            </TouchableOpacity>
            <BottomSheetTextInput
              ref={textInputRef}
              rejectResponderTermination={true}
              clearTextOnFocus={true}
              value={commentInput}
              onChangeText={(text) => {
                setCommentInput(text);
              }}
              style={styles.addCommentInput}
              placeholder={palceholders.MESSAGE}
              onEndEditing={onSubmitEditing}
              onBlur={() => setInputType("comment")}
            />
            <TouchableOpacity onPress={onSubmitEditing}>
              <VectorImage source={add_circle_icon} style={styles.faceIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isLoading && (
        <Spinner animating={true} bgColor="rgba(52, 52, 52, 0.1)" />
      )}
    </BottomSheet>
  );
};

export default PostCommentsBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: "80%",
    gap: 20,
    paddingTop: 20,
  },
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  userImage: { width: 24, height: 24, borderRadius: 16 },
  itemContainer: {
    marginVertical: 10,
    flexDirection: "row",
    gap: 10,
  },
  itemContent: { width: "90%", gap: 6 },
  userName: { flexDirection: "row", gap: 5 },
  commentView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  commentText: {
    width: "79%",
    fontSize: 10,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: midBlack,
  },
  likesView: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  likeIcon: { width: 16, height: 16 },
  totalLikesText: {
    fontSize: 10,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: grey,
  },
  addCommetView: {
    borderRadius: 1000,
    borderWidth: 0.1,
    borderColor: "gray",
    width: "93%",
    padding: 16,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",

    elevation: 5,
  },
  userNameText: {
    fontSize: 10,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    color: neutralBlack,
  },
  commentTime: {
    fontSize: 10,
    fontFamily: GILROY_REGULAR,
    color: grey,
  },
  replyText: {
    fontSize: 10,
    fontFamily: GILROY_MEDIUM,
    color: lightBlack,
  },
  faceIcon: {
    width: 18,
    height: 18,
  },
  addCommentInput: {
    width: "80%",
    height: 18,
    marginRight: 3,
    paddingStart: 1,
  },
  emptyContainer: {
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  emptyContainerText: {
    fontSize: 24,
    fontFamily: GILROY_BOLD,
    color: "#000000",
    textAlign: "center",
  },
  emptySubText: {
    color: "#808080",
    margin: 5,
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    textAlign: "center",
  },
  commentListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "93%",
    alignSelf: "center",
  },
  textInputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 94,
    justifyContent: "center",
  },
});
