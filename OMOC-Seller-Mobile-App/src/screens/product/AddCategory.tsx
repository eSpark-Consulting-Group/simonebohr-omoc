import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Customheader from "../../component/Customheader";
import { CONTEXT } from "../../utils/string/strings";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Colors } from "../../utils/colors";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import { deleteGrey, document_upload, user_frame } from "../../utils/images";
import FastImage from "react-native-fast-image";
import { launchImageLibrary } from "react-native-image-picker";
import ApiService from "../../services/api.service";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import en from "../../utils/string/en";
import LoaderButton from "../../component/LoaderButton";

const AddCategory = (props) => {
  const [title, setTitle] = useState("");
  const [categoryImage, setCategoryImage] = useState("Upload Image");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);

  useEffect(() => {
    if (props.route.params?.isEdit) {
      const { categoryData } = props.route.params;
      setTitle(categoryData?.title);
      setCategoryImage(categoryData?.image);
    }
  }, []);

  const datalist = [
    { id: 1, cloth: "Hoodle Havana V1", price: "$120", store: "12" },
    { id: 2, cloth: "Hoodle Havana V1", price: "$120", store: "12" },
    { id: 3, cloth: "Hoodle Havana V1", price: "$120", store: "12" },
    { id: 4, cloth: "Hoodle Havana V1", price: "$120", store: "12" },
    { id: 5, cloth: "Hoodle Havana V1", price: "$120", store: "12" },
    { id: 6, cloth: "Hoodle Havana V1", price: "$120", store: "12" },
    { id: 7, cloth: "Hoodle Havana V1", price: "$120", store: "12" },
    { id: 8, cloth: "Hoodle Havana V1", price: "$120", store: "12" },
  ];
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.imageClothView}>
        <FastImage source={user_frame} style={styles.frameIcon} />
        <View style={styles.productDetailView}>
          <View style={styles.hoodieView}>
            <Text style={styles.hoodieText}>{item.cloth}</Text>
            <TouchableOpacity style={styles.dotView}>
              <VectorImage source={deleteGrey} style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.noteText]}>Price: {item.price}</Text>
          <Text style={styles.noteText}>Stock: {item.store}</Text>
        </View>
      </View>
    );
  };

  const onUploadImage = () => {
    try {
      launchImageLibrary(
        {
          mediaType: "photo",
          presentationStyle: "pageSheet",
          selectionLimit: 1,
          quality: 1,
          maxWidth: 1000,
          maxHeight: 1500,
        },
        async (response: any) => {
          const { assets } = response;
          setSelectedImage(assets);
          setCategoryImage(assets[0]?.fileName);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSaveChange = async () => {
    let isFormValid = false;
    if (!title.trim().length) {
      showMessage({
        message: en.CategoryNameError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
      isFormValid = false;
    } else {
      isFormValid = true;
    }
    if (isFormValid) {
      setLoading(true);
      try {
        const shopId = currentShop?._id;
        const formData = new FormData();
        if (!!selectedImage) {
          const file = {
            uri: selectedImage[0]?.uri,
            name: selectedImage[0]?.fileName,
            filename: selectedImage[0]?.fileName,
            type: selectedImage[0]?.type,
          };
          formData.append("file", file);
        }
        formData.append("title", title);
        formData.append(
          "productIds",
          JSON.stringify([
            "65c4d03dbbd45d543fa791bf",
            "65c4d03dbbd45d543fa791bf",
          ])
        );
        if (!props.route.params?.isEdit) {
          const imgResponse = await ApiService.addCategorieApi(
            shopId,
            formData
          );
          setLoading(false);
          showMessage({
            message: "New category added to the shope",
            duration: 3000,
            backgroundColor: Colors.skyBlueColor,
            type: "danger",
          });
          props.navigation.goBack();
        } else {
          const categoryDataId = props.route.params.categoryData.id;
          const imgResponse = await ApiService.editCategorieApi(
            shopId,
            categoryDataId,
            formData
          );
          setLoading(false);
          showMessage({
            message: "category updated",
            duration: 3000,
            backgroundColor: Colors.skyBlueColor,
            type: "danger",
          });
          props.navigation.goBack();
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Customheader
        showBackIcon={true}
        title={
          !props.route.params?.isEdit
            ? CONTEXT.ADD_CATEGORIES
            : "Edit Categories"
        }
        Containerstyle={styles.customHeaderStyle}
      />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.typeView}>
          <Text style={styles.heading}>{CONTEXT.PICTURE_CATEGORY}</Text>
          <TouchableOpacity
            style={styles.imageUploadView}
            onPress={() => onUploadImage()}
          >
            <VectorImage source={document_upload} style={styles.imageStyle} />
            <View style={styles.productView}>
              <Text style={[styles.mediumText, { color: Colors.skyBlueColor }]}>
                {categoryImage}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.smallText}>
            size of picture is 300px x300px and 500 kb
          </Text>
        </View>
        <Text style={styles.titleStyle}>{CONTEXT.TITLE_CATRGORY}</Text>
        <View style={styles.nameView}>
          <TextInput
            value={title}
            placeholder="Name"
            keyboardType="default"
            placeholderTextColor={Colors.grey}
            style={{ textAlign: "left", width: "100%", paddingVertical: 3 }}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.ProductView}>
          <Text style={styles.heading}>{CONTEXT.PRODUCT_CHOOSEN}</Text>
          <Text style={[styles.mediumText, { color: Colors.skyBlueColor }]}>
            + {CONTEXT.ADD_PRODUCT}
          </Text>
        </View>
        <Text style={styles.smallText}>Add your product for this category</Text>
        <View
          style={{
            backgroundColor: Colors.lightGrey,
            paddingBottom: 100,
            marginTop: 5,
          }}
        >
          <FlatList
            data={datalist}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ marginTop: 15 }}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
      <View style={styles.saveButtonView}>
        <LoaderButton
          onButtonPress={() => onSaveChange()}
          buttonText="Save Change"
          bottonStyle={styles.bottonStyle}
          isLoading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 16,
  },
  typeView: {
    marginTop: "8%",
    width: "93%",
    alignSelf: "center",
  },
  heading: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
  },
  imageStyle: {
    height: 25,
    width: 30,
    resizeMode: "contain",
  },
  productView: {
    width: "80%",
    marginLeft: 10,
  },
  titleStyle: {
    fontSize: 14.8,
    fontWeight: "500",
    color: Colors.blackColor,
    marginTop: 24,
    width: "93%",
    alignSelf: "center",
  },
  smallText: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: GILROY_REGULAR,
    color: Colors.grey,
    width: "93%",
    alignSelf: "center",
  },
  mediumText: {
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
    color: Colors.grey,
  },
  nameView: {
    borderColor: Colors.gray88,
    borderWidth: 0.5,
    borderRadius: 9,
    padding: 8,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: "flex-start",
    alignSelf: "center",
    width: "95%",
  },
  imageUploadView: {
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: Colors.gray88,
    borderWidth: 0.5,
    borderRadius: 9,
    padding: 8,
    paddingVertical: 15,
    marginVertical: 15,
    alignSelf: "center",
  },
  ProductView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "93%",
    alignSelf: "center",
    marginBottom: 5,
  },
  frameIcon: {
    height: 100,
    width: "25%",
    marginTop: 3,
    marginLeft: 5,
    borderRadius: 3,
    resizeMode: "contain",
  },
  hoodieText: {
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    fontSize: 14,
  },
  imageClothView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 1,
    padding: 4,
    backgroundColor: Colors.whiteColor,
    width: "95%",
    borderRadius: 5,
    marginTop: 10,
  },
  hoodieView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
  },
  dotView: {
    width: "10%",
    alignItems: "flex-end",
  },
  removeIcon: {
    height: 16,
    width: 16,
  },
  codeText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
    fontSize: 13,
  },
  noteText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
    fontSize: 12,
  },
  bottonStyle: {
    backgroundColor: Colors.skyBlueColor,
    width: "90%",
    borderRadius: 24,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  productDetailView: { marginLeft: 15, gap: 10 },
  customHeaderStyle: { marginTop: 10, paddingBottom: 5 },
  saveButtonView: {
    backgroundColor: Colors.whiteColor,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 30,
  },
});
