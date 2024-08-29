import React, { useEffect, useState } from "react";
import { placeholder, strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import Modal from "react-modal";
import OtherSettngSublyApi from "../../../../helper/OtherSettingsApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function AddShippiingRegion({ addShipping, setAddShipping }) {
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [region, setRigion] = useState();
  const [price, setPrice] = useState();
  const [day, setDay] = useState();
  const [tax, setTax] = useState();
  const [shippingRegion, setShippingRegion] = useState();
  // console.log("-----DAY", day);
  async function ShopSetting() {
    const shopData = {
      region: region,
      tax: 20,
      minPrince: price,
      shippingRange: day,
      // ...JSON.parse(day),
    };
    console.log("🚀 ~ ShopSetting ~ shopData:", shopData);

    await OtherSettngSublyApi.postShopSetting(token, _id, shopData).then(
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
        // console.log("-------", response);
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
        <h3 className="text-xl font-semibold">{strings.ADD_SHIPPING_REGION}</h3>
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
          {/* {shippingRegion.regions.map((item) => {
            <option>{item}</option>;
          })} */}
          {shippingRegion?.regions?.map((item) => {
            return <option> {item}</option>;
          })}
          {/* <option> Africa</option>
          <option>Asia.</option>
          <option>South America.</option>
          <option>North America.</option>
          <option>Pacific</option> */}
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
          {shippingRegion?.shippingTimes?.map((item) => {
            return <option> {item}</option>;
          })}
          {/* <option>Select estimate shipping time</option>
          <option
            value={JSON.stringify({ minShippingTime: 1, maxShippingTime: 3 })}
          >
            1-3 Days
          </option>
          <option
            value={JSON.stringify({ minShippingTime: 1, maxShippingTime: 5 })}
          >
            1-5 Days
          </option>
          <option
            value={JSON.stringify({ minShippingTime: 1, maxShippingTime: 9 })}
          >
            1-9 Days
          </option> */}
        </select>
        <select className="p-3 w-full rounded-xl border mb-4">
          <option>Select Warehouse</option>
        </select>
        <div className="flex justify-end">
          <button
            className="text-white rounded-3xl bg-[#0094FF] py-3 px-6 text-base font-semibold"
            onClick={() => {
              ShopSetting();
            }}
          >
            {strings.ADD_REGION}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddShippiingRegion;
