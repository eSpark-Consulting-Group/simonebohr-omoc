import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { skyBlueColor, whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import PaymentCard from "../../components/PaymentCard";
import CustomButton from "../../components/CustomButton";
import { GILROY_MEDIUM } from "../../utils/fonts";
import AddPaymenBottomSheet from "./AddPaymenBottomSheet";
import { createToken } from "@stripe/stripe-react-native";
import ApiService from "../../services/api.service";
import { SCREEN_HEIGHT } from "../../utils";
import Spinner from "../../components/Spinner";

const PaymentMethod = ({ navigation }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [cardsList, setCardsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCardsList = async () => {
      try {
        setLoading(true);
        const res = await ApiService.getPaymentsCardApi();
        setCardsList(res?.data?.cards);
      } catch (error) {
        console.log("get all card error", error);
      } finally {
        setLoading(false);
      }
    };
    getCardsList();
  }, []);

  const onAddNewCard = async (val) => {
    try {
      const { error: tokenError, token } = await createToken({
        type: "Card",
        name: "shivam pandey",
        currency: "usd",
      });
      if (token) {
        const res = await ApiService.addPaymentCardApi({
          token,
          isDefault: val?.isDefault,
        });
        const obj = res?.data?.card;
        setCardsList((prev) => {
          return [obj, ...prev];
        });
      } else {
      }
    } catch (error) {
      console.log("add new card error", error);
    }
  };

  const removeCard = async (item) => {
    try {
      const res = await ApiService.deletePaymentCard(item.paymentId);
      setCardsList((prev) =>
        prev.filter((val) => val?.paymentId != item?.paymentId)
      );
    } catch (error) {
      console.log("remove card error", error?.response);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.PAYMENT_METHOD}
          navigation={navigation}
        />
      </View>
      <View style={{ flex: 1 }}>
        {!!cardsList.length ? (
          <FlatList
            data={cardsList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <PaymentCard
                  data={item}
                  brandFontSize={30}
                  onDelete={() => removeCard(item)}
                />
              );
            }}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ) : (
          <>
            {!loading && (
              <View style={styles.emptyCardView}>
                <Text>No Payments methods found</Text>
              </View>
            )}
          </>
        )}
      </View>
      <View style={styles.addCardButton}>
        <CustomButton
          onPress={() => {
            setShowPayment(true);
          }}
          textstyle={styles.btnText}
          style={styles.btn}
          text={strings.ADD_PAYMENT_METHOD}
        />
      </View>

      {showPayment && (
        <AddPaymenBottomSheet
          hideMe={() => {
            setShowPayment(false);
          }}
          onSubmit={onAddNewCard}
          isEdit={false}
          data={null}
        />
      )}
      {loading && <Spinner animating={true} />}
    </SafeAreaView>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  btn: {
    backgroundColor: skyBlueColor,
  },
  btnText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  addCardButton: {
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
  emptyCardView: {
    marginTop: SCREEN_HEIGHT * 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
});
