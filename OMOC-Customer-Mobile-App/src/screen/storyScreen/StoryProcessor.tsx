import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  RotationGestureHandler,
  RotationGestureHandlerGestureEvent,
  State,
  TextInput,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  uploadSuperImages,
  Timestamp,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../utils";
import TextGradient from "./components/TextGradient";
import { useKeyboardStatus } from "./hooks/useKeyboardStatus";
import { neutralBlack, skyBlueColor } from "../../utils/colors";
import EmojiBottomSheet from "./components/EmojiBottomSheet";
import VectorImage from "react-native-vector-image";
import {
  back_icon,
  brush_icon,
  cross_icon,
  download_icon,
  edit_blank,
  multi_colors_icon,
} from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";
import CustomSlider from "../../components/CustomSlider";
import SongsListBottomSheet from "./components/SongsListBottomSheet";
import RNFetchBlob from "rn-fetch-blob";
import ApiService from "../../services/api.service";
import { useDispatch, useSelector } from "react-redux";
import { myStoriesSuccess } from "../../redux/slice/getMyStoriesSlice";

const textColors = [
  "#242424",
  "#fff",
  "#318bfb",
  "#6cc070",
  "#ffcc00",
  "#f37121",
  "#c70039",
  "#512b58",
  "#ff926b",
  "#fff3cd",
  "#ffe277",
  "#4d3e3e",
  "#3f3f44",
];
export const emojiList = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "😗",
  "😙",
  "😚",
  "☺",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🙄",
  "😏",
  "😣",
  "😥",
  "😮",
  "🤐",
  "😯",
  "😪",
  "😫",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
  "😒",
  "😓",
  "😔",
  "😕",
  "🙃",
  "🤑",
  "😲",
  "🙁",
  "😖",
  "😞",
  "😟",
  "😤",
  "😢",
  "😭",
  "😦",
  "😧",
  "😨",
  "😩",
  "🤯",
  "😬",
  "😰",
  "😱",
  "😳",
  "🤪",
  "😵",
  "😡",
  "😠",
  "🤬",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "😇",
  "🤠",
  "🤡",
  "🤥",
  "🤫",
  "🤭",
  "🧐",
  "🤓",
  "🤪",
];
const StoryProcessor = ({ route, navigation }) => {
  const [showEmojiBottomSheet, setShowEmojiBottomSheet] = useState(false);
  const [showSongsListBottomSheet, setShowSongsListBottomSheet] =
    useState(false);
  const { images } = route.params;
  const keyboard = useKeyboardStatus();
  const [state, setState] = useState<object>({});
  const [currentImageIndex, setCurrentIndex] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [draggingLabel, setDraggingLabel] = useState<boolean>(false);
  const [showLabelOptions, setShowLabelOptions] = useState<boolean>(false);
  const [showTextColorsOptions, setShowTextColorsOptions] =
    useState<boolean>(false);
  const [textColor, setTextColor] = useState<string>("#fff");
  const [textAlign, setTextAlign] = useState<
    "flex-start" | "center" | "flex-end"
  >("center");
  const [textFontSize, setTextFontSize] = useState(20);
  const [textBg, setTextBg] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState("");
  const dispatch = useDispatch();
  const myStories = useSelector((state) => state.myStory.data);
  const _animRatioTrashCan = React.useMemo(() => new Animated.Value(1), []);
  const _hScrollRef = useRef<ScrollView>(null);
  const _rotationRefList = [...images].map((img) =>
    useRef<RotationGestureHandler>(null)
  );
  const _pinchRefList = [...images].map((img) =>
    useRef<PinchGestureHandler>(null)
  );
  /**
   * mode
   * 1: general
   * 2: TextEdit
   * 3: Metion Label
   * 4: Hashtag Label
   */
  const [mode, setMode] = useState(1);
  const _scaleAnimList = [...images].map((img) =>
    React.useMemo(() => new Animated.Value(SCREEN_WIDTH / img.width), [])
  );
  const _rotateAnimList = [...images].map((img) =>
    React.useMemo(() => new Animated.Value(0), [])
  );
  const _translateXAnimList = [...images].map((img) =>
    React.useMemo(() => new Animated.Value(0), [])
  );
  const _translateYAnimList = [...images].map((img) =>
    React.useMemo(() => new Animated.Value(0), [])
  );
  const _labeLWrapperYAnim = React.useMemo(() => new Animated.Value(0), []);
  const [enableGesture, setEnableGesture] = useState<boolean>(true);
  const ref = useRef({
    processImages: [...images].map((img) => {
      return {
        filename: img.filename,
        type: img.type,
        base64: img.base64,
        extension: img.extension,
        uri: img.uri,
        width: img.width,
        height: img.height,
        ratio: SCREEN_WIDTH / img.width,
        translateX: 0,
        translateY: 0,
        rotateDeg: 0,
        texts: [],
        labels: [],
      };
    }),
    textWidth: 0,
    textHeight: 0,
    trashCanX: (SCREEN_WIDTH - 44) / 2,
    trashCanY: SCREEN_HEIGHT - 62,
    zoomTrashCan: false,
    labelContainerY: 0,
  });
  useEffect(() => {
    _hScrollRef.current?.scrollTo({
      x: SCREEN_WIDTH * currentImageIndex,
      y: 0,
      animated: true,
    });
  }, [currentImageIndex]);
  useEffect(() => {
    if (!keyboard) {
      setMode(1);
    }
  }, [keyboard]);
  const _onEndDrag = ({
    nativeEvent: {
      contentOffset: { x },
    },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const tabIndex = Math.floor(x / SCREEN_WIDTH);
    const percentOffset = (x - tabIndex * SCREEN_WIDTH) / SCREEN_WIDTH;
    let nextTabIndex = 0;
    if (percentOffset > 0.5) {
      nextTabIndex = tabIndex + 1;
    } else {
      nextTabIndex = tabIndex;
    }
    _hScrollRef.current?.scrollTo({
      x: nextTabIndex * SCREEN_WIDTH,
      y: 0,
      animated: true,
    });
    setCurrentIndex(nextTabIndex);
  };
  //Translate processor
  const _onTranslateHandler = ({
    nativeEvent: { translationX, translationY },
  }: PanGestureHandlerGestureEvent) => {
    _translateXAnimList[currentImageIndex].setValue(
      ref.current.processImages[currentImageIndex].translateX + translationX
    );
    _translateYAnimList[currentImageIndex].setValue(
      ref.current.processImages[currentImageIndex].translateY + translationY
    );
  };
  const _onTranslateStateChange = ({
    nativeEvent: { translationX, translationY, state },
  }: PanGestureHandlerGestureEvent) => {
    if (state === State.END) {
      ref.current.processImages[currentImageIndex].translateX += translationX;
      ref.current.processImages[currentImageIndex].translateY += translationY;
    }
  };
  //Zoom processor
  const _onZoomHandler = ({
    nativeEvent: { scale },
  }: PinchGestureHandlerGestureEvent) => {
    _scaleAnimList[currentImageIndex].setValue(
      ref.current.processImages[currentImageIndex].ratio * scale
    );
  };
  const _onZoomStateChange = ({
    nativeEvent: { scale, state },
  }: PinchGestureHandlerGestureEvent) => {
    if (state === State.END) {
      ref.current.processImages[currentImageIndex].ratio *= scale;
    }
  };
  //Rotation processor
  const _onRotateHandler = ({
    nativeEvent: { rotation },
  }: RotationGestureHandlerGestureEvent) => {
    _rotateAnimList[currentImageIndex].setValue(
      ref.current.processImages[currentImageIndex].rotateDeg + rotation
    );
  };
  const _onRotateStateChange = ({
    nativeEvent: { rotation, state },
  }: RotationGestureHandlerGestureEvent) => {
    if (state === State.END) {
      ref.current.processImages[currentImageIndex].rotateDeg += rotation;
    }
  };

  const _onText = () => {
    setMode(2);
    refreshTextState();
  };
  const refreshTextState = () => {
    setText("");
    setTextAlign("center");
    setTextBg(false);
    setTextColor("#fff");
  };
  const _onChangeTextAlign = () => {
    if (textAlign === "center") setTextAlign("flex-start");
    else if (textAlign === "flex-start") setTextAlign("flex-end");
    else if (textAlign === "flex-end") setTextAlign("center");
  };
  const _onDoneText = () => {
    if (text.length > 0) {
      const offsetX =
        textAlign === "center"
          ? (SCREEN_WIDTH - ref.current.textWidth) / 2
          : textAlign === "flex-start"
          ? 15
          : SCREEN_WIDTH - ref.current.textWidth - 15;
      const textZindexList = ref.current.processImages[
        currentImageIndex
      ].texts.map((x) => x.zIndex);
      const labelZindexList = ref.current.processImages[
        currentImageIndex
      ].labels.map((x) => x.zIndex);
      let maxlabelZindex = Math.max(...textZindexList.concat(labelZindexList));
      maxlabelZindex = maxlabelZindex !== -Infinity ? maxlabelZindex : 0;
      const storyText = {
        zIndex: maxlabelZindex + 1,
        color: textColor,
        fontSize: textFontSize,
        text,
        textAlign,
        textBg,
        x: offsetX,
        y: (SCREEN_HEIGHT - ref.current.textHeight) / 2,
        animX: new Animated.Value(offsetX),
        animY: new Animated.Value((SCREEN_HEIGHT - ref.current.textHeight) / 2),
        height: ref.current.textHeight,
        width: ref.current.textWidth,
        ratio: 1,
        animRatio: new Animated.Value(1),
      };
      ref.current.processImages[currentImageIndex].texts.push(storyText);
    }
    setMode(1);
  };
  //Label translate processor
  const _onTextLabelTranslateHandler = (
    index: number,
    {
      nativeEvent: { translationX, translationY },
    }: PanGestureHandlerGestureEvent
  ) => {
    if (!draggingLabel) setDraggingLabel(true);
    const label = ref.current.processImages[currentImageIndex].texts[index];

    if (
      Math.abs(
        (label.y + translationY + label.height) * label.ratio -
          ref.current.trashCanY
      ) < 50
    ) {
      if (!ref.current.zoomTrashCan) {
        Animated.spring(_animRatioTrashCan, {
          toValue: 1.5,
          useNativeDriver: true,
        }).start(() => (ref.current.zoomTrashCan = true));
      }
    } else {
      if (ref.current.zoomTrashCan) {
        Animated.spring(_animRatioTrashCan, {
          toValue: 1,
          useNativeDriver: true,
        }).start(() => (ref.current.zoomTrashCan = false));
      }
    }
    label.animX.setValue((label.x + translationX) * label.ratio);
    label.animY.setValue((label.y + translationY) * label.ratio);
  };
  const _onTextLabelTranslateChangeState = (
    index: number,
    {
      nativeEvent: { translationX, translationY, state },
    }: PanGestureHandlerGestureEvent
  ) => {
    setDraggingLabel(false);
    if (state === State.END) {
      const label = ref.current.processImages[currentImageIndex].texts[index];
      label.x += translationX;
      label.y += translationY;
      if (
        Math.abs(
          (label.y + label.height) * label.ratio - ref.current.trashCanY
        ) < 50
      ) {
        ref.current.processImages[currentImageIndex].texts.splice(index, 1);
        setState({});
      }
      ref.current.zoomTrashCan = false;
    }
  };
  //Label zoom processor
  const _onTextLabelZoomHandler = (
    index: number,
    { nativeEvent: { scale } }: PinchGestureHandlerGestureEvent
  ) => {
    const label = ref.current.processImages[currentImageIndex].texts[index];
    label.animRatio.setValue(label.ratio * scale);
  };
  const _onTextLabelZoomChangeState = (
    index: number,
    { nativeEvent: { scale, state } }: PinchGestureHandlerGestureEvent
  ) => {
    if (state === State.END) {
      const label = ref.current.processImages[currentImageIndex].texts[index];
      label.ratio *= scale;
    }
  };
  //Label Options Wrapper Translate processor

  const _onLabelOptionsContainerTranslate = ({
    nativeEvent: { translationY },
  }: PanGestureHandlerGestureEvent) => {
    if (mode !== 1) return;
    if (
      ref.current.labelContainerY + translationY <
        -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50) ||
      ref.current.labelContainerY + translationY > 0
    )
      return;
    if (!showLabelOptions) setShowLabelOptions(true);
    _labeLWrapperYAnim.setValue(ref.current.labelContainerY + translationY);
  };
  const _onLabelOptionsContainerTranslateChangeState = ({
    nativeEvent: { translationY, state },
  }: PanGestureHandlerGestureEvent) => {
    if (state === State.END) {
      if (
        ref.current.labelContainerY + translationY <
        -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50) / 2
      ) {
        Animated.timing(_labeLWrapperYAnim, {
          duration: 250,
          toValue: -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50),
          useNativeDriver: true,
        }).start();
        ref.current.labelContainerY = -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50);
      } else {
        Animated.timing(_labeLWrapperYAnim, {
          duration: 250,
          toValue: 0,
          useNativeDriver: true,
        }).start(() => setShowLabelOptions(false));
        ref.current.labelContainerY = 0;
        Keyboard.dismiss();
      }
    }
  };
  const _showLabelOptionsContainer = () => {
    setShowEmojiBottomSheet(true);
  };
  const _hideLabelOptionsContainer = () => {
    Animated.timing(_labeLWrapperYAnim, {
      duration: 250,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => setShowLabelOptions(false));
    ref.current.labelContainerY = 0;
    Keyboard.dismiss();
  };
  //Label processor
  const _onLabelTranslateHandler = (
    index: number,
    {
      nativeEvent: { translationX, translationY },
    }: PanGestureHandlerGestureEvent
  ) => {
    if (!draggingLabel) setDraggingLabel(true);
    const label = ref.current.processImages[currentImageIndex].labels[index];

    if (
      Math.abs(
        (label.y + translationY + label.height) * label.ratio -
          ref.current.trashCanY
      ) < 50
    ) {
      if (!ref.current.zoomTrashCan) {
        Animated.spring(_animRatioTrashCan, {
          toValue: 1.5,
          useNativeDriver: true,
        }).start(() => (ref.current.zoomTrashCan = true));
      }
    } else {
      if (ref.current.zoomTrashCan) {
        Animated.spring(_animRatioTrashCan, {
          toValue: 1,
          useNativeDriver: true,
        }).start(() => (ref.current.zoomTrashCan = false));
      }
    }
    label.animX.setValue((label.x + translationX) * label.ratio);
    label.animY.setValue((label.y + translationY) * label.ratio);
  };
  const _onLabelTranslateChangeState = (
    index: number,
    {
      nativeEvent: { translationX, translationY, state },
    }: PanGestureHandlerGestureEvent
  ) => {
    setDraggingLabel(false);
    if (state === State.END) {
      const label = ref.current.processImages[currentImageIndex].labels[index];
      label.x += translationX;
      label.y += translationY;
      if (
        Math.abs(
          (label.y + label.height) * label.ratio - ref.current.trashCanY
        ) < 50
      ) {
        ref.current.processImages[currentImageIndex].labels.splice(index, 1);
        setState({});
      }
      ref.current.zoomTrashCan = false;
    }
  };
  //Label zoom processor
  const _onLabelZoomHandler = (
    index: number,
    { nativeEvent: { scale } }: PinchGestureHandlerGestureEvent
  ) => {
    const label = ref.current.processImages[currentImageIndex].labels[index];
    label.animRatio.setValue(label.ratio * scale);
  };
  const _onLabelZoomChangeState = (
    index: number,
    { nativeEvent: { scale, state } }: PinchGestureHandlerGestureEvent
  ) => {
    if (state === State.END) {
      const label = ref.current.processImages[currentImageIndex].labels[index];
      label.ratio *= scale;
    }
  };
  const _onSelectedAddressLabel = (address) => {
    const textZindexList = ref.current.processImages[
      currentImageIndex
    ].texts.map((x) => x.zIndex);
    const labelZindexList = ref.current.processImages[
      currentImageIndex
    ].labels.map((x) => x.zIndex);
    let maxlabelZindex =
      Math.max(...textZindexList.concat(labelZindexList)) || 0;
    maxlabelZindex = maxlabelZindex !== -Infinity ? maxlabelZindex : 0;
    const addressLabel = {
      zIndex: maxlabelZindex + 1,
      address_id: address.id,
      animRatio: new Animated.Value(1),
      animX: new Animated.Value((SCREEN_WIDTH - 350) / 2),
      animY: new Animated.Value((SCREEN_HEIGHT - 60) / 2),
      x: (SCREEN_WIDTH - 350) / 2,
      y: (SCREEN_HEIGHT - 60) / 2,
      fontSize: 40,
      height: 60,
      width: 350,
      ratio: 1,
      text: address.place_name || "",
      type: "address",
    };
    ref.current.processImages[currentImageIndex].labels.push(addressLabel);
    setState({});
  };
  const _onSelectedEmoji = (emoji: string) => {
    const textZindexList = ref.current.processImages[
      currentImageIndex
    ].texts.map((x) => x.zIndex);
    const labelZindexList = ref.current.processImages[
      currentImageIndex
    ].labels.map((x) => x.zIndex);
    let maxlabelZindex =
      Math.max(...textZindexList.concat(labelZindexList)) || 0;
    maxlabelZindex = maxlabelZindex !== -Infinity ? maxlabelZindex : 0;
    const addressLabel = {
      zIndex: maxlabelZindex + 1,
      animRatio: new Animated.Value(1),
      animX: new Animated.Value((SCREEN_WIDTH - 55) / 2),
      animY: new Animated.Value((SCREEN_HEIGHT - 55) / 2),
      x: (SCREEN_WIDTH - 55) / 2,
      y: (SCREEN_HEIGHT - 55) / 2,
      fontSize: 40,
      height: 55,
      width: 55,
      ratio: 1,
      text: emoji,
      type: "emoji",
    };
    ref.current.processImages[currentImageIndex].labels.push(addressLabel);
    setState({});
  };
  const _onDoneLabel = () => {
    if (text.length < 2) return setMode(1);
    const textZindexList = ref.current.processImages[
      currentImageIndex
    ].texts.map((x) => x.zIndex);
    const labelZindexList = ref.current.processImages[
      currentImageIndex
    ].labels.map((x) => x.zIndex);
    let maxlabelZindex =
      Math.max(...textZindexList.concat(labelZindexList)) || 0;
    maxlabelZindex = maxlabelZindex !== -Infinity ? maxlabelZindex : 0;
    const label = {
      zIndex: maxlabelZindex + 1,
      animRatio: new Animated.Value(1),
      animX: new Animated.Value(
        (SCREEN_WIDTH - (ref.current.textWidth + 10)) / 2
      ),
      animY: new Animated.Value((SCREEN_HEIGHT - 64) / 2),
      x: (SCREEN_WIDTH - (ref.current.textWidth + 10)) / 2,
      y: (SCREEN_HEIGHT - 64) / 2,
      fontSize: 40,
      height: 64,
      width: ref.current.textWidth + 10,
      ratio: 1,
      text,
      type: "people",
    };
    if (mode === 4) {
      label.type = "hashtag";
    }
    ref.current.processImages[currentImageIndex].labels.push(label);
    setMode(1);
  };
  const _onSelectLabel = (
    type: "address" | "people" | "hashtag" | "emoji",
    value?: string
  ) => {
    setShowEmojiBottomSheet(false);
    switch (type) {
      case "address":
        // navigation.navigate('LocationChooser', {
        //     onDone: _onSelectedAddressLabel
        // })
        break;
      case "people":
        refreshTextState();
        setMode(3);
        break;
      case "hashtag":
        refreshTextState();
        setMode(4);
        break;
      case "emoji":
        _onSelectedEmoji(value as string);
        break;
      default:
        throw new Error();
    }
    _hideLabelOptionsContainer();
  };
  const _validateLabelText = (txt: string) => {
    if (txt[0]) {
      if (mode === 3 && txt[0] !== "@") return setText("@" + txt);
      if (mode === 4 && txt[0] !== "#") return setText("#" + txt);
    }
    if (mode === 3 && /^((\@(\w|\.)+)|\@)$/g.test(txt)) setText(txt);
    if (mode === 4 && /^((\#\w+)|\#)$/g.test(txt)) setText(txt);
  };
  const _onNext = async () => {
    const formDataParam = new FormData();
    for (var i = 0; i < images.length; i++) {
      formDataParam.append("file", {
        uri: images[i].uri,
        type: `${images[i].type}/${images[i].extension}`,
        name: images[i].filename,
        filename: images[i].filename,
      });
    }
    ApiService.uploadMultipleImages(formDataParam)
      .then((res) => {
        upLoadStory(res);
      })
      .catch((err) => {
        console.log("image Upload error", JSON.stringify(err.response));
      });
    await Promise.all(uploadSuperImages(ref.current.processImages));
  };

  const upLoadStory = async (imageData) => {
    const storyParams = [];
    for (var i = 0; i < images.length; i++) {
      storyParams.push({
        ...ref.current.processImages[i],
        url: imageData?.data[i].url,
        thumbnail: imageData?.data[i].url,
      });
    }
    ApiService.createStory({
      storyData: storyParams,
      isPublished: false,
      sharedWith: "public",
    })
      .then((response) => {
        const stories = [...myStories, ...response?.data];
        // dispatch(myStoriesSuccess(stories));
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("story upload error", JSON.stringify(error));
      });
  };
  const _onFastUpload = async () => {
    const superImagesList = await Promise.all(
      uploadSuperImages(ref.current.processImages)
    );

    navigation.navigate("HomeIndex");
  };

  useEffect(() => {
    return () => {
      if (imagePath) {
        RNFetchBlob.fs.unlink(imagePath);
      }
    };
  }, [imagePath]);

  const checkPermission = async () => {
    if (Platform.OS === "ios") {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "App needs access to your storage to repost videos",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Storage Permission Granted.");
          downloadImage();
        } else {
          Alert.alert("Storage Permission Not Granted");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getExtension = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const downloadImage = () => {
    // setLoading(true);
    let date = new Date();
    let image_URL = "https://legacy.reactjs.org/logo-og.png";
    let ext = getExtension(image_URL);
    ext = "." + ext[0];

    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      appendExt: ".png",
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          "/image_" +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: "omoc File",
      },
    };
    config(options)
      .fetch("GET", image_URL)
      .then((res) => {
        // setLoading(false);
        setImagePath(res.path());
        let shareOptions = {
          title: "Check out my post",
          message: "Check out my post!",
          url: res.path(),
          subject: "Check out my post!",
        };
        setTimeout(() => {
          Share.share(shareOptions)
            .then((res: any) => console.log("res:", res))
            .catch((err: any) => console.log("err", err));
        }, 500);
      })
      .catch((error) => {
        // setLoading(false);
        console.log("Error saving image", error);
      });
  };
  return (
    <PanGestureHandler
      onHandlerStateChange={_onLabelOptionsContainerTranslateChangeState}
      onGestureEvent={_onLabelOptionsContainerTranslate}
    >
      <View>
        {mode === 1 && !draggingLabel && !showLabelOptions && (
          <>
            <TouchableOpacity
              onPress={() => setShowSongsListBottomSheet(true)}
              style={styles.addSoundButton}
            >
              <Ionicons
                name="musical-notes-outline"
                size={18}
                color={"#FFFFFF"}
              />
              <Text style={styles.addSongButtontext}>Add Sound</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backIconView}
              onPress={() => navigation.goBack()}
            >
              <VectorImage source={back_icon} style={styles.backIcon} />
            </TouchableOpacity>
            <View style={styles.topOptionsWrapper}>
              <TouchableOpacity onPress={_onText} style={styles.btnTopOption}>
                <Fontisto name="font" size={16} color="#fff" />
                <Text style={{ color: "#FFFFFF" }}>Text</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={_showLabelOptionsContainer}
                style={styles.btnTopOption}
              >
                <Icon name="sticker-emoji" size={30} color="#fff" />
                <Text style={{ color: "#FFFFFF" }}>Stickers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.btnTopOption}
              >
                <FastImage
                  source={edit_blank}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={{ color: "#FFFFFF" }}>Draw</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => checkPermission()}
                style={styles.btnTopOption}
              >
                <FastImage
                  source={download_icon}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={{ color: "#FFFFFF" }}>Download</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {mode === 2 && (
          <KeyboardAvoidingView
            behavior="height"
            style={styles.textToolWrapper}
          >
            <View style={styles.textTopOptions}>
              <TouchableOpacity
                onPress={() => setMode(1)}
                style={styles.btnTopOption}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: GILROY_REGULAR,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={_onDoneText}
                style={{
                  ...styles.btnTopOption,
                  width: 60,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: GILROY_REGULAR,
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <CustomSlider onFontSizeChange={(val) => setTextFontSize(val)} />
            <View
              style={{
                ...styles.textWrapper,
                justifyContent: textAlign,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor:
                    textBg === true ? textColor : "rgba(0,0,0,0)",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <TextInput
                  placeholder="Add Text"
                  placeholderTextColor="#FFFFFF99"
                  onContentSizeChange={(e) => {
                    ref.current.textHeight = e.nativeEvent.contentSize.height;
                    ref.current.textWidth = e.nativeEvent.contentSize.width;
                  }}
                  selectionColor="#FFFFFF"
                  multiline={true}
                  autoFocus={true}
                  autoCapitalize="none"
                  value={text}
                  onChangeText={setText}
                  style={{
                    textAlign:
                      textAlign === "flex-start"
                        ? "left"
                        : textAlign === "flex-end"
                        ? "right"
                        : "center",
                    fontSize: textFontSize,
                    color: textBg ? "#000" : textColor,
                    maxWidth: SCREEN_WIDTH - 30,
                    fontFamily: GILROY_REGULAR,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.textBottompOptions}>
              {!showTextColorsOptions ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    style={styles.circleSelectedColor}
                    onPress={() => {
                      setShowTextColorsOptions((prev) => !prev);
                    }}
                  >
                    <FastImage
                      source={multi_colors_icon}
                      style={{ width: 20, height: 20, borderRadius: 100 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={setTextBg.bind(null, !textBg)}
                    style={styles.btnTopOption}
                  >
                    <Icon
                      name={textBg ? "alpha-a-box" : "alpha-a"}
                      size={30}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.circleSelectedColor}
                    onPress={() => {
                      setShowTextColorsOptions((prev) => !prev);
                    }}
                  >
                    <VectorImage
                      source={cross_icon}
                      style={{ width: 24, height: 24 }}
                      tintColor="#FFFFFF"
                    />
                  </TouchableOpacity>
                  <View style={styles.circleSelectedColor}>
                    <FastImage
                      source={brush_icon}
                      style={{ width: 14, height: 14 }}
                    />
                  </View>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    style={{
                      width: SCREEN_WIDTH - 50,
                    }}
                    keyboardShouldPersistTaps="always"
                    horizontal={true}
                  >
                    {textColors.map((tColor, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setTextColor(tColor)}
                        style={{
                          ...styles.circleTextColor,
                          backgroundColor: tColor,
                        }}
                      ></TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              )}
            </View>
          </KeyboardAvoidingView>
        )}
        {(mode === 3 || mode === 4) && (
          <KeyboardAvoidingView
            behavior="height"
            style={{
              ...styles.textToolWrapper,
            }}
          >
            <View
              style={{
                ...styles.textTopOptions,
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={_onDoneLabel}
                style={{
                  ...styles.btnTopOption,
                  width: 60,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#fff",
                    fontSize: 18,
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.textWrapper,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  padding: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 64,
                }}
              >
                <TextInput
                  onSubmitEditing={_onDoneLabel}
                  onContentSizeChange={(e) => {
                    ref.current.textHeight = e.nativeEvent.contentSize.height;
                    ref.current.textWidth = e.nativeEvent.contentSize.width;
                  }}
                  autoFocus={true}
                  autoCapitalize="none"
                  value={text}
                  onChangeText={(txt) => {
                    _validateLabelText(txt);
                  }}
                  style={{
                    opacity: 0,
                    fontSize: 40,
                    fontWeight: "800",
                    maxWidth: SCREEN_WIDTH - 30,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 5,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                    alignItems: "center",
                  }}
                >
                  <TextGradient
                    text={text}
                    style={{
                      fontSize: textFontSize,
                      opacity: text.length === 0 ? 0.5 : 1,
                    }}
                  />
                </View>
              </View>
            </View>
            <View />
          </KeyboardAvoidingView>
        )}
        <ScrollView
          onScrollEndDrag={_onEndDrag}
          showsHorizontalScrollIndicator={false}
          ref={_hScrollRef}
          bounces={false}
          horizontal={true}
          style={styles.scrollView}
        >
          {ref.current.processImages.map((photo, index) => {
            return (
              <ImageBackground
                key={index}
                style={styles.backgroundContainer}
                source={{
                  uri: photo.uri,
                }}
                // blurRadius={10}
              >
                {photo.texts.map((txtLabel, labelIndex) => (
                  <PanGestureHandler
                    key={labelIndex}
                    onGestureEvent={(e) => {
                      _onTextLabelTranslateHandler(labelIndex, e);
                    }}
                    onHandlerStateChange={(e) => {
                      _onTextLabelTranslateChangeState(labelIndex, e);
                    }}
                  >
                    <PinchGestureHandler
                      onGestureEvent={(e) => {
                        _onTextLabelZoomHandler(labelIndex, e);
                      }}
                      onHandlerStateChange={(e) => {
                        _onTextLabelZoomChangeState(labelIndex, e);
                      }}
                    >
                      <Animated.View
                        style={{
                          zIndex: txtLabel.zIndex,
                          backgroundColor: txtLabel.textBg
                            ? txtLabel.color
                            : "rgba(0,0,0,0)",
                          // padding: 5,
                          borderRadius: 5,
                          position: "absolute",
                          top: 0,
                          left: 0,
                          transform: [
                            {
                              translateX: txtLabel.animX,
                            },
                            {
                              translateY: txtLabel.animY,
                            },
                            {
                              scale: txtLabel.animRatio,
                            },
                          ],
                        }}
                      >
                        <Text
                          style={{
                            // width: txtLabel.width,
                            height: txtLabel.height + 5,
                            textAlign:
                              txtLabel.textAlign === "flex-start"
                                ? "left"
                                : txtLabel.textAlign === "flex-end"
                                ? "right"
                                : "center",
                            fontSize: txtLabel.fontSize,
                            color: txtLabel.textBg ? "#000" : txtLabel.color,
                          }}
                        >
                          {txtLabel.text}
                        </Text>
                      </Animated.View>
                    </PinchGestureHandler>
                  </PanGestureHandler>
                ))}
                {photo.labels.map((label, labelIndex) => (
                  <PanGestureHandler
                    key={labelIndex}
                    onGestureEvent={(e) => {
                      _onLabelTranslateHandler(labelIndex, e);
                    }}
                    onHandlerStateChange={(e) => {
                      _onLabelTranslateChangeState(labelIndex, e);
                    }}
                  >
                    <PinchGestureHandler
                      onGestureEvent={(e) => {
                        _onLabelZoomHandler(labelIndex, e);
                      }}
                      onHandlerStateChange={(e) => {
                        _onLabelZoomChangeState(labelIndex, e);
                      }}
                    >
                      <Animated.View
                        style={{
                          zIndex: label.zIndex,
                          backgroundColor:
                            label.type === "emoji" ? "rgba(0,0,0,0)" : "#fff",
                          borderRadius: 5,
                          position: "absolute",
                          width: label.width,
                          height: label.height,
                          justifyContent: "center",
                          alignItems: "center",
                          top: 0,
                          left: 0,
                          transform: [
                            {
                              translateX: label.animX,
                            },
                            {
                              translateY: label.animY,
                            },
                            {
                              scale: label.animRatio,
                            },
                          ],
                        }}
                      >
                        {label.type === "emoji" ? (
                          <Text
                            style={{
                              fontSize: label.fontSize,
                            }}
                          >
                            {label.text}
                          </Text>
                        ) : (
                          <TextGradient
                            {...(label.type === "address"
                              ? {
                                  icon: {
                                    name: "map-marker",
                                    size: label.fontSize,
                                  },
                                }
                              : {})}
                            text={label.text}
                            numberOfLines={1}
                            style={{
                              fontSize: label.fontSize,
                              maxWidth:
                                label.width -
                                (label.type === "address" ? label.fontSize : 0),
                            }}
                          />
                        )}
                      </Animated.View>
                    </PinchGestureHandler>
                  </PanGestureHandler>
                ))}
                <PanGestureHandler
                  enabled={enableGesture}
                  minPointers={2}
                  onHandlerStateChange={_onTranslateStateChange}
                  onGestureEvent={_onTranslateHandler}
                >
                  <RotationGestureHandler
                    enabled={enableGesture}
                    onHandlerStateChange={_onRotateStateChange}
                    ref={_rotationRefList[index]}
                    simultaneousHandlers={_pinchRefList[index]}
                    onGestureEvent={_onRotateHandler}
                  >
                    <PinchGestureHandler
                      enabled={enableGesture}
                      onHandlerStateChange={_onZoomStateChange}
                      ref={_pinchRefList[index]}
                      simultaneousHandlers={_rotationRefList[index]}
                      onGestureEvent={_onZoomHandler}
                    >
                      <Animated.View
                        style={{
                          width: photo.width,
                          height: photo.height,
                          transform: [
                            {
                              scale: _scaleAnimList[index],
                            },

                            {
                              translateX: _translateXAnimList[index],
                            },
                            {
                              translateY: _translateYAnimList[index],
                            },
                          ],
                        }}
                      >
                        {/* <Image
                      resizeMode="contain"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      source={{
                        uri: photo.uri,
                      }}
                    /> */}
                      </Animated.View>
                    </PinchGestureHandler>
                  </RotationGestureHandler>
                </PanGestureHandler>
              </ImageBackground>
            );
          })}
        </ScrollView>
        {ref.current.processImages.length >= 1 &&
          !draggingLabel &&
          !showLabelOptions &&
          !showEmojiBottomSheet &&
          mode !== 2 && (
            <View style={styles.bottomOptionContainer}>
              {ref.current.processImages.length > 1 ? (
                <View style={styles.selectedImagesListContainer}>
                  <ScrollView
                    style={{
                      maxWidth: SCREEN_WIDTH - 100,
                    }}
                    bounces={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {ref.current.processImages.map((photo, index) => (
                      <TouchableOpacity
                        onPress={setCurrentIndex.bind(null, index)}
                        key={index}
                        style={{
                          ...styles.previewImageWrapper,
                          padding: index === currentImageIndex ? 2 : 0,
                        }}
                      >
                        <Image
                          source={{
                            uri: photo.uri,
                          }}
                          style={{
                            ...styles.previewMultiImage,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ) : null}
              <View
                style={{
                  ...styles.selectedImageWrapper,
                }}
              >
                <TouchableOpacity
                  onPress={_onNext}
                  activeOpacity={0.8}
                  style={[styles.btnNext, { backgroundColor: "#FFFFFF" }]}
                >
                  <FontAwesome5
                    name="user-friends"
                    size={18}
                    color={"#000000"}
                  />
                  <Text style={styles.frndsButtonText}>Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={_onNext}
                  activeOpacity={0.8}
                  style={styles.btnNext}
                >
                  <FontAwesome5 name="globe" size={18} color={"#FFFFFF"} />
                  <Text style={styles.publicButtonText}>Public</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        {/* {ref.current.processImages.length === 1 &&
          !draggingLabel &&
          !showLabelOptions && (
            <View style={styles.bottomOptionsWrapper}>
              <TouchableOpacity
                onPress={_onFastUpload}
                style={styles.bottomOption}
              >
                <FastImage
                  source={{
                    uri: "https://images.app.goo.gl/cYxYbBxDTEcU3NUd9",
                  }}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    borderColor: "#fff",
                    borderWidth: 2,
                  }}
                />
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  Your story
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={_onNext}
                activeOpacity={0.8}
                style={{
                  ...styles.btnNext,
                  width: sendToDirect && username ? 200 : 100,
                  marginRight: 0,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Send to
                  <Text
                    style={{
                      color: "#318bfb",
                    }}
                  >
                    {" "}
                    {username}
                  </Text>
                </Text>
                <Icon name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>
          )} */}
        {draggingLabel && (
          <View style={styles.removeMainView}>
            <Animated.View
              style={{
                ...styles.removeContentView,
                transform: [
                  {
                    scale: _animRatioTrashCan,
                  },
                ],
              }}
            >
              <Icon name="trash-can-outline" size={30} color="#fff" />
            </Animated.View>
          </View>
        )}
        <Animated.View
          style={{
            ...styles.labelOptionsWrapper,
            transform: [
              {
                translateY: _labeLWrapperYAnim,
              },
            ],
          }}
        >
          <View style={styles.labelOptionsTitleWrapper}>
            <View style={styles.dragBar} />
            <View style={styles.labelOptionsSearchWrapper}>
              <View style={styles.searchIcon}>
                <Icon name="magnify" size={24} color="#fff" />
              </View>
              <TextInput
                style={styles.labelOptionsSearch}
                placeholder="Search"
                placeholderTextColor="#fff"
              />
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            bounces={false}
            showsVerticalScrollIndicator={true}
          >
            <TouchableOpacity
              onPress={() => _onSelectLabel("address")}
              style={styles.labelItemWrapper}
            >
              <View style={styles.mainLabel}>
                <TextGradient
                  icon={{
                    name: "map-marker",
                    size: 16,
                  }}
                  text="LOCATION"
                  style={{
                    fontSize: 16,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => _onSelectLabel("people")}
              style={styles.labelItemWrapper}
            >
              <View style={styles.mainLabel}>
                <TextGradient
                  text="@MENTION"
                  style={{
                    fontSize: 16,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => _onSelectLabel("hashtag")}
              style={styles.labelItemWrapper}
            >
              <View style={styles.mainLabel}>
                <TextGradient
                  text="#HASHTAG"
                  style={{
                    fontSize: 16,
                  }}
                />
              </View>
            </TouchableOpacity>
            {emojiList.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => _onSelectLabel("emoji", emoji)}
                style={styles.labelItemWrapper}
              >
                <Text
                  style={{
                    fontSize: 40,
                  }}
                >
                  {emoji}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
        {showEmojiBottomSheet && (
          <Modal visible={showEmojiBottomSheet} transparent>
            <EmojiBottomSheet
              emojiList={emojiList}
              hideMe={() => {
                setShowEmojiBottomSheet(false);
              }}
              _onSelectLabel={_onSelectLabel}
            />
          </Modal>
        )}
        {showSongsListBottomSheet && (
          <Modal visible={showSongsListBottomSheet} transparent>
            <SongsListBottomSheet
              emojiList={emojiList}
              hideMe={() => {
                setShowSongsListBottomSheet(false);
              }}
              _onSelectSong={() => {}}
            />
          </Modal>
        )}
      </View>
    </PanGestureHandler>
  );
};

export default StoryProcessor;

const styles = StyleSheet.create({
  backgroundContainer: {
    overflow: "hidden",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  topOptionsWrapper: {
    paddingTop: STATUS_BAR_HEIGHT + SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    right: 10,
    gap: 16,
    zIndex: 1,
  },
  bottomOptionsWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  bottomOption: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  textToolWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "space-between",
  },
  textTopOptions: {
    flexDirection: "row",
    paddingTop: STATUS_BAR_HEIGHT + 40,
    alignItems: "center",
    justifyContent: "space-between",
    width: "93%",
    alignSelf: "center",
  },
  textWrapper: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  textBottompOptions: {
    minHeight: 36,
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    width: "93%",
    alignSelf: "center",
  },
  circleSelectedColor: {
    width: 24,
    marginHorizontal: 5,
    height: 24,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  circleTextColor: {
    height: 22,
    width: 22,
    borderRadius: 24,
    borderColor: "#fff",
    marginHorizontal: 6,
  },
  btnTopOption: {
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImageWrapper: {
    paddingHorizontal: 5,
    width: "100%",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: neutralBlack,
    paddingBottom: SCREEN_HEIGHT * 0.04,
  },
  previewImageWrapper: {
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 54,
    width: 41,
  },
  previewMultiImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 5,
  },
  btnNext: {
    marginRight: 10,
    width: "40%",
    height: 44,
    backgroundColor: skyBlueColor,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 15,
  },
  labelOptionsWrapper: {
    width: "100%",
    height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50,
    position: "absolute",
    top: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
    left: 0,
  },
  labelOptionsTitleWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dragBar: {
    marginTop: 15,
    width: 50,
    height: 3,
    borderRadius: 1,
    backgroundColor: "#fff",
  },
  labelOptionsSearchWrapper: {
    height: 44,
    flexDirection: "row",
    width: SCREEN_WIDTH - 30,
    marginHorizontal: 15,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  labelOptionsSearch: {
    fontSize: 16,
    color: "#fff",
    width: SCREEN_WIDTH - 30 - 44,
  },
  searchIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  labelItemWrapper: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  mainLabel: {
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 36,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  removeMainView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  removeContentView: {
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 44,
    borderColor: "#fff",
    borderWidth: 1,
  },
  frndsButtonText: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: "#000000",
  },
  publicButtonText: {
    fontWeight: "600",
    color: "#FFFFFF",
  },
  bottomOptionContainer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    width: "100%",
    alignItems: "center",
    zIndex: 10,
    gap: 20,
  },
  selectedImagesListContainer: {
    paddingHorizontal: 5,
    width: "100%",
    alignItems: "center",
  },
  backIconView: {
    paddingTop: STATUS_BAR_HEIGHT + SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    paddingHorizontal: 20,
  },
  backIcon: { width: 6, height: 14, tintColor: "#FFFFFF" },
  addSongButtontext: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: "#FFFFFF",
  },
  addSoundButton: {
    backgroundColor: "#12121299",
    top: STATUS_BAR_HEIGHT + SCREEN_HEIGHT * 0.045,
    flexDirection: "row",
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    alignItems: "center",
    gap: 12,
    paddingVertical: 9,
    paddingHorizontal: 24,
    borderRadius: 120,
  },
  backgroundVideo: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    overflow: "hidden",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    // alignItems: "center",

    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0,
  },
});
