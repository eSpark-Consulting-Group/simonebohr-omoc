import React, { useEffect, useState } from "react";
import { placeholder, strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import Modal from "react-modal";
import OtherSettngSublyApi from "../../../../helper/OtherSettingsApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function EditShippingRegion({ addShipping, setAddShipping, item }) {
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [region, setRigion] = useState();
  const [price, setPrice] = useState(item.minPrince);
  const [day, setDay] = useState();
  const [tax, setTax] = useState(item.tax);
  const [shippingRegion, setShippingRegion] = useState();

  console.log("-----DAY", item);
  // async function ShopSetting() {
  //   const shopData = {
  //     region: region,
  //     tax: 20,
  //     minPrince: price,
  //     ...JSON.parse(day),
  //     shippingRange:day,
  //   };
  //   await OtherSettngSublyApi.postShopSetting(token, _id, shopData).then(
  //     (response) => {
  //       if (response.statusCode == 200) {
  //         toast.success(response.message);
  //       } else {
  //         toast.error(response.massage);
  //       }
  //     }
  //   );
  // }
  async function editRegion() {
    const shopData = {
      region: region,
      tax: 20,
      minPrince: price,
      shippingRange: day,
      // ...JSON.parse(day),
    };
    const id = item._id;
    const shopId = _id;
    await OtherSettngSublyApi.editShopSetting(token, shopData, id, shopId).then(
      (response) => {
        if (response.statusCode == 200) {
          toast.success(response.message);
          window.location.reload();
        } else {
          toast.error(response.massage);
        }
      }
    );
  }
  useEffect(() => {
    async function getShippingRegion() {
      await OtherSettngSublyApi.shippingRegion(token).then((response) => {
        setShippingRegion(response.data);
      });
    }
    getShippingRegion();
  }, []);
  return (
    <Modal
      isOpen={addShipping}
      onRequestClose={() => {
        setAddShipping(false);
      }}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          borderRadius: "15px",
        },
      }}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-xl font-semibold">
          {/* {strings.ADD_SHIPPING_REGION} */}
          Edit Shipping region
        </h3>
        <Icon
          icon="ep:close"
          width="24"
          height="24"
          cursor={"pointer"}
          onClick={() => setAddShipping(false)}
        />
      </div>
      <div className="mt-6">
        <select
          className="p-3 w-full rounded-xl border mb-5"
          value={region}
          onChange={(e) => {
            setRigion(e.target.value);
          }}
        >
          <option> {item.region}</option>;
          {/* {shippingRegion?.regions?.map((item) => {
            return 
          })} */}
          {shippingRegion?.regions?.map((item) => {
            return <option> {item}</option>;
          })}
        </select>
        <div className="flex items-center gap-4 flex-wrap mb-5">
          {[1, 2, 3].map(() => (
            <p className="rounded-3xl flex items-center gap-2 text-sm font-medium border-2 border-[#EDEDED] py-2.5 px-4">
              London
              <Icon icon="gg:close-o" color="#101010" width="18" height="18" />
            </p>
          ))}
        </div>
        <p className="flex items-center gap-2 text-[#616161] text-base my-5 font-semibold w-full p-3 rounded-xl border">
          USD
          <input
            className="border-l-2 text-base font-normal pl-2 w-full"
            type="text"
            placeholder={placeholder.INPUT_MINIMUM_PRICE}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </p>
        <p className="flex items-center gap-2 text-[#616161] text-base my-5 font-semibold w-full p-3 rounded-xl border">
          TAX
          <input
            className="border-l-2 text-base font-normal pl-2 w-full"
            type="text"
            placeholder={placeholder.TAX}
            value={tax}
            onChange={(e) => {
              setTax(e.target.value);
            }}
          />
        </p>
        <select
          className="p-3 w-full rounded-xl border mb-5"
          value={day}
          onChange={(e) => {
            setDay(e.target.value);
          }}
        >
          <option>
            {item.minShippingTime}-{item.maxShippingTime} Days
          </option>

          {shippingRegion?.shippingTimes?.map((item) => {
            return <option> {item}</option>;
          })}
        </select>
        <select className="p-3 w-full rounded-xl border mb-4">
          <option>Select Warehouse</option>
        </select>
        <div className="flex justify-end">
          <button
            className="text-white rounded-3xl bg-[#0094FF] py-3 px-6 text-base font-semibold"
            onClick={() => {
              editRegion();
            }}
          >
            {strings.ADD_REGION}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditShippingRegion;
