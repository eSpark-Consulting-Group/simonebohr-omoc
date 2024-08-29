import { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { data } from "../../components/Data";
import CustomButton from "../../components/CustomButton";
import { darkGrey, skyBlueColor, whiteColor } from "../../utils/colors";
import { GILROY_SEMIBOLD } from "../../utils/fonts";
import FastImage from "react-native-fast-image";

const SliderScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [buttonText, setButtonText] = useState("Next");

  const handleNext = () => {
    if (index < 3) {
      setIndex(index + 1);
    }
    if (index > 1) {
      setButtonText("Lets Started!");
    }
    if (index === 3) {
      navigation.navigate("SetupProfileScreen");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'}/>
      <View style={styles.imageView}>
        <FastImage style={styles.Image} source={data[index]?.image} />
      </View>
      <View style={styles.contentView}>
        <View style={styles.sliderView}>
          {data.map((val, id) => {
            return (
              <View
                style={[
                  styles.view2,
                  {
                    borderColor: id === index ? skyBlueColor : darkGrey,
                  },
                ]}
              />
            );
          })}
        </View>
        <Text style={styles.text1}>{data[index]?.title}</Text>
        <Text style={styles.text2}>{data[index]?.decription}</Text>
      </View>
      <View style={styles.Btnview}>
        <CustomButton
          onPress={handleNext}
          text={buttonText}
          style={[
            {
              backgroundColor: skyBlueColor,
            },
          ]}
          textstyle={{
            color: whiteColor,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SliderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  sliderView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  view2: {
    borderWidth: 1,
    borderColor: "#0096ff",
    margin: 10,
    width: "18%",
  },

  text1: {
    fontSize: 24,
    marginTop: 20,
    textAlign: "center",
    fontFamily: GILROY_SEMIBOLD,
  },
  text2: {
    marginTop: 30,
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 45,
    lineHeight: 25.2,
    color: "#757575",
  },
  text3: {
    marginTop: 10,
    fontSize: 18,
  },
  next: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  appButtonContainer: {
    marginTop: 60,
    backgroundColor: "#0096FF",
    borderRadius: 15,
    paddingVertical: 10,
    width: 400,
    alignSelf: "center",
  },
  Image: {
    height: "90%",
    width: "100%",
    resizeMode:'contain'
  },
  Btnview: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignSelf: "center",
  },
  imageView: {
    height: "60%",
    alignSelf: "center",
    width: "100%",
  },
  contentView: {
    backgroundColor: whiteColor,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
