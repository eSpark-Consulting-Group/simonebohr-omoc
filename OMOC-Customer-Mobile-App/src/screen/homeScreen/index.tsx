import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import SearchTabBar from "../searchScreen/SearchTabBar";
import VectorImage from "react-native-vector-image";
import {
  bag_icon,
  menImage,
  menu_icon,
  message_icon,
} from "../../utils/images";
import { lightGrey, skyBlueColor, whiteColor } from "../../utils/colors";
import CardHome from "../../components/CardHome";
import CompanyName from "../../components/CompanyName";
import ClothingCategoryList from "../../components/ClothingCategoryList";
import ImageList from "../../components/ImageList";
import { strings } from "../../assets/string/strings";
import ApiService from "../../services/api.service";
import en from "../../assets/string/en";
import { showMessage } from "react-native-flash-message";
import Spinner from "../../components/Spinner";
import FilterBottomSheet from "../../components/FilterBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import {
  profileFailure,
  profileRequest,
  profileSuccess,
} from "../../redux/slice/getProfileSlice";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const Home = ({ navigation }) => {
  const [shopProduct, setShopProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();



  const [showBottomShet, setShowBottomShet] = useState(false);
  const handleShowBottomSheet = () => {
    setShowBottomShet(true);
  };

  useEffect(() => {
    getYourProducts();
    getUserDeatil();
  }, []);

  const getUserDeatil = async () => {
    try {
      dispatch(profileRequest());
      const response = await ApiService.GetProfileInterest();
      const data = response.data.data;
      dispatch(profileSuccess(data));
    } catch (e) {
      dispatch(profileFailure(e?.response?.message));
      console.log("No deatil error", JSON.stringify(e));
    }
  };

  const getYourProducts = async () => {
    try {
      setFetching(true);
      const response = await ApiService.getHomeBanner();
      setShopProduct(response?.data);
      setProduct(response?.data?.productDetails);
      setFetching(false);
    } catch (e) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <SearchTabBar style={styles.searchInput} placeholder={strings.SEARCH} />
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={handleShowBottomSheet}
        >
          <VectorImage source={menu_icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => {
            navigation.navigate("CartItemCard");
          }}
        >
          <VectorImage source={bag_icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => {
            navigation.navigate("MessageScreen");
          }}
        >
          <VectorImage source={message_icon} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <CardHome
            text={"Get Attractive\nDiscount Of The\nYears Here."}
            menImage={menImage}
            companyName={
              <CompanyName
                logoSource={require("../../assets/companyName.png")}
                title={"OmocOfficial"}
                buttText={"Buy Now"}
                rating={""}
              />
            }
          />
        </View>
        <ClothingCategoryList />
        <ImageList navigation={navigation} listData={product} />
        <View style={styles.card}>
          <CardHome
            menImage={{ uri: shopProduct?.imageUrl }}
            companyName={
              <CompanyName
                logoSource={require("../../assets/companyName.png")}
                // logoSource={{uri:shopProduct?.shopDetails?.logo}}
                Verify={shopProduct?.shopDetails?.isVerified}
                title={shopProduct?.shopDetails?.name}
                buttText={"Shop Now"}
                rating={shopProduct?.shopDetails?.rating}
              />
            }
          />
        </View>
      </ScrollView>
      {showBottomShet && (
        <Modal transparent={true} visible={showBottomShet}>
          <FilterBottomSheet
            hideMe={() => {
              setShowBottomShet(false);
            }}
          />
        </Modal>
      )}
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: whiteColor },
  menuIcon: {
    backgroundColor: lightGrey,
    height: 48,
    width: 48,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignSelf: "center",
    gap: 10,
    marginTop: 20,
    alignItems: "center",
    width: "93%",
  },
  searchInput: {
    flex: 1,
  },
  card: {
    alignSelf: "center",
    marginVertical: 20,
    marginTop: 25,
    borderRadius: 17,
    backgroundColor: skyBlueColor,
    width: "93%",
  },
});
