import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  message_icon,
  printer,
  uncheck_box,
  user_frame,
} from "../utils/images";
import VectorImage from "react-native-vector-image";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";
import FastImage from "react-native-fast-image";
import { strings } from "../utils/string/strings";
const data = [
  {
    check: uncheck_box,
    title: "Hoodie Havana V1",
    code: "CODE123123124124",
    doller: "$799",
    note: "Note: add sticker fragile please thanks",
    name: "Jonny Deep",
    address: "Adresss",
    addname: "8 St Andrew's Pl",
    addeng: "Harrogate HG2 7RW England",
    courier: "Courier",
    dhl: "DHL Express",
    fee: "( $20 Fee )",
    id: "ID : 1230123931",
    total: "Total Price",
  },
  {
    check: uncheck_box,
    title: "Hoodie Havana V1",
    code: "CODE123123124124",
    doller: "$799",
    note: "Note: add sticker fragile please thanks",
    name: "Jonny Deep",
    address: "Adresss",
    addname: "8 St Andrew's Pl",
    addeng: "Harrogate HG2 7RW England",
    courier: "Courier",
    dhl: "DHL Express",
    fee: "( $20 Fee )",
    id: "ID : 1230123931",
    total: "Total Price",
  },
];
const ShopOrderComponent = () => {
  return (
    <ScrollView>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.viewContainer}>
              <View style={styles.newOrderView}>
                <Text style={styles.jonny}>
                  #1001 / 20 Febuary 2023 / Jonny Deep
                </Text>
                <View style={styles.viewOrder}>
                  <Text style={styles.newOrder}>New Order</Text>
                </View>
              </View>
              <View style={styles.viewCheckIcon}>
                <VectorImage source={item.check} style={styles.checkIcon} />
                <FastImage source={user_frame} style={styles.userImage} />
                <View style={styles.viewtitle}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.viewDateTitle}>
                    <Text style={styles.number}>{item.code}</Text>
                  </View>
                  <Text style={styles.total}>{item.doller}</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.note}>{item.note}</Text>
                <Text style={styles.add}>{item.address}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.addname}>{item.addname}</Text>
                <Text style={styles.addname}>{item.addeng}</Text>
                <Text style={styles.add}>{item.courier}</Text>
                <Text style={styles.addname}>{item.dhl}</Text>
                <Text style={styles.addname}>{item.fee}</Text>
                <Text style={styles.addname}>{item.id}</Text>
                <Text style={styles.add}>{item.total}</Text>
                <Text style={styles.doller}>{item.doller}</Text>
              </View>

              <View style={styles.mainViewIcons}>
                <View style={styles.messageIconView}>
                  <TouchableOpacity>
                    <VectorImage source={message_icon} />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <VectorImage source={printer} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.resendBox}>
                  <Text style={styles.resend}>{strings.RESEND}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default ShopOrderComponent;

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: Colors.whiteColor,
    width: "100%",
    borderRadius: 12,
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 20,
    flex: 1,
    paddingBottom: 10,
  },
  messageIconView: {
    flexDirection: "row",
    gap: 10,
  },
  mainViewIcons: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: Colors.grey12,
  },
  textView: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginHorizontal: 45,
    gap: 15,
  },
  userImage: {
    height: 72,
    width: 72,
  },
  viewCheckIcon: {
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "flex-start",
    gap: 20,
  },
  viewOrder: {
    backgroundColor: Colors.lightGreen,
    width: 66,
    height: 20,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  resend: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 10,
    color: Colors.whiteColor,
  },
  resendBox: {
    width: 69,
    height: 28,
    backgroundColor: Colors.skyBlueColor,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  doller: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 20,
    color: Colors.lightBlack,
  },
  add: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 14,
    color: Colors.charcoal,
  },
  name: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.lightBlack,
  },
  addname: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.lightBlack,
  },
  newOrderView: {
    backgroundColor: Colors.whiteColor,
    width: "95%",
    height: 24,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: Colors.grey12,
    paddingBottom: 10,
  },
  checkIcon: {
    height: 24,
    width: 24,
  },
  viewDateTitle: {
    flexDirection: "row",
  },
  newOrder: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 10,
    color: Colors.green,
  },
  viewtitle: {
    gap: 5,
  },
  jonny: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 12,
    color: Colors.charcoal,
  },
  status: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 14,
    color: Colors.green,
  },
  mainView: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusView: {
    width: 37,
    height: 22,
    backgroundColor: Colors.lightGreen,
    borderRadius: 22,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 20,
    bottom: 10,
  },
  number: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
  },
  total: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
  },
  note: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.lightBlack,
  },
});
