import {
  FlatList,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import {
  lightGrey50,
  purple,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import AddWhishcart from "../../components/AddWhishcart";
import Spinner from "../../components/Spinner";

interface WishItem {
  count: number;
  id: string;
  name: string;
  thumbnail: string;
}
interface Props {
  hideMe: any;
  ontext?: any;
  onclose: any;
  selectedData: (item: WishItem) => void;
}

const NewCollection: FC<Props> = ({ hideMe, selectedData }: Props) => {
  const [wishListModal, setWishListModal] = useState(false); 
  const [wishCartData, setWishCartData] = useState([]);
  const navigation = useNavigation();
  const [loder, setLoader] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    getCartLists();
  }, []);

  const snapPoints = useMemo(
    () => [10, newData !== [] ? "50%" : "30%"],
    []
  );
 

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


  const getCartLists = async () => {
    try {
      setLoader(true)
      const response = await ApiService.getWishlist();
      setWishCartData(response.data);
      setLoader(false)
    } catch (e) {
      showMessage({
        message: "Internal Server Error",
        duration: 3000,
        backgroundColor: "skyblue",
        type: "danger",
      });
    }
  };

  const newData = [
    ...wishCartData,
    {
      count: 0,
      id: "new collection",
      name: "new collection",
      thumbnail: "",
    },
  ];
  

  const onAddBtn = async (text) => {
    try {
      const obj = {
        name: text,
      };
      const response = await ApiService.addWishlist(obj);
      getCartLists();
      if (status === true){
        showMessage({
          message:response.message,
          duration: 3000,
          backgroundColor: "skyblue",
          type:'success',
        });
      }
    } catch (e) {
      showMessage({
        message: "Internal Server Error",
        duration: 3000,
        backgroundColor: "skyblue",
        type: "danger",
      });
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.bottomSheetStyle}
    >
      <View style={styles.btnContainer}>
        <>
          <FlatList
            numColumns={2}
            data={newData}
            renderItem={({ item }) => {
              return item.name === "new collection" ? (
                <TouchableOpacity style={styles.CollectionView} onPress={()=>setWishListModal(true)}>
                  <Text style={[styles.blueText, { fontSize: 24 }]}> + </Text>
                  <Text style={styles.blueText}>New Collection</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={item.id}
                  style={styles.viewStyle}
                  onPress={() => {
                    hideMe();
                    selectedData(item);
                  }}
                >
                {item?.thumbnail ?  <ImageBackground style={styles.viewCart} source={{uri:item?.thumbnail || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl20Tuf0ZhpbNa24X1Kaw3NgZ1Rhy2bdbkGw&usqp=CAU'}}>
                    <View style={styles.bgText}>
                      <Text style={styles.headingText}>{item?.name}</Text>
                      <Text style={styles.subText}>12 Product</Text>
                    </View>
                  </ImageBackground>
                  :
                  <View style={styles.viewCart}>
                     <View style={styles.bgText}>
                      <Text style={styles.headingText}>{item?.name}</Text>
                      <Text style={styles.subText}>12 Product</Text>
                    </View>
                    </View>}
                </TouchableOpacity>
              );
            }}
          />
          {loder && <Spinner animating={loder} />}
           <Modal visible={wishListModal} animationType="slide" transparent>
        <AddWhishcart
          hideMe={() => setWishListModal(false)}
          ontext={() => {
            setWishListModal(false);
          }}
          onAdded={(data) => {
            onAddBtn(data);
            setWishListModal(false);
          }}
        />
      </Modal>
        </>
      </View>
    </BottomSheet>
  );
};

export default NewCollection;

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 10,
  },
  imageStyle: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: purple,
  },
  btnContainer: {
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  bottomSheetStyle: {
    backgroundColor: "#D9D9D9",
    width: 45,
  },
  viewStyle: {
    margin: 10,
    alignSelf: "center",
  },
  bgText: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 15,
  },
  headingText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    marginTop: 20,
  },
  subText: {
    color: whiteColor,
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    marginBottom: 10,
  },
  viewCart: {
    width: 170,
    height: 100,
    backgroundColor: lightGrey50,
    borderRadius: 10,
  },
  blueText: {
    color: skyBlueColor,
    fontSize: 13,
    fontFamily: GILROY_MEDIUM,
    textAlign: "center",
  },
  CollectionView: {
    borderColor: skyBlueColor,
    borderStyle: "dashed",
    borderWidth: 1.8,
    borderRadius: 5,
    width: 160,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    margin: 10,
    alignSelf: "center",
  },
});
