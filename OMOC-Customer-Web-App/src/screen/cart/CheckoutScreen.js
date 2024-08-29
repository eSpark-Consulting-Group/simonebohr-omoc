import { React, useEffect, useState } from "react";
import Header from "../../component/commonComponent/Header";
import VoucherComponent from "../../component/appComponent/VoucherComponent";
import AddNewAddress from "../../component/appComponent/AddNewAddress";
import SelectPayment from "../../component/appComponent/SelectPayment";
import SelectAddress from "../../component/appComponent/SelectAddress";
import ProductSublyApi from "../../helper/ProductApi";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";

const addressData = [
  {
    emoji: "noto:smiling-face-with-heart-eyes",
    houseName: "Grandma House",
    contact: "08123456789",
    address: "Street Juana no.16, California, 45746, USA",
    primary: true,
  },
  {
    emoji: "noto:smiling-face-with-heart-eyes",
    houseName: "Mom & Dad House",
    contact: "08123456789",
    address: "Street Juana no.16, California, 45746, USA",
    primary: false,
  },
  {
    emoji: "openmoji:home-button",
    houseName: "My Home",
    contact: "08123456789",
    address: "Street Juana no.16, California, 45746, USA",
    primary: false,
  },
  {
    emoji: "openmoji:office-building",
    houseName: "Work",
    contact: "08123456789",
    address: "Street Juana no.16, California, 45746, USA",
    primary: false,
  },
];

const CheckoutScreen = () => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [showInfo, setShowInfo] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [voucher, setVoucher] = useState(false);
  const [selectAddress, setSelectAddress] = useState(true);
  const [selectPayment, setSelectPayment] = useState(false);
  const [addressList, setAddressList] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ========Fetch address list API=========
  useEffect(() => {
    async function addressListHandle() {
      setIsLoading(true);
      await ProductSublyApi.fetchAddressList(token).then((response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          setAddressList(response.data);
        }
      });
    }
    addressListHandle();
  }, []);

  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <div className=" px-20 max-md:px-6 bg-[#F8F9FD]">
        {selectAddress && (
          <SelectAddress
            setShowInfo={setShowInfo}
            showInfo={showInfo}
            setNewAddress={setNewAddress}
            ShowAddress={setSelectAddress}
            ShowVoucher={setVoucher}
            addressList={addressList}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutScreen;
