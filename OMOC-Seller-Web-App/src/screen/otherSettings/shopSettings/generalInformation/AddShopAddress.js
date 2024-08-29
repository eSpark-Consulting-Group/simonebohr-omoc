import React from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import GoogleMapReact from "google-map-react";

function AddShopAddress({ addAddress, setAddAddress }) {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  return (
    <Modal
      isOpen={addAddress}
      onRequestClose={() => {
        setAddAddress(false);
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
        <h3 className="text-2xl font-semibold">{strings.EDTI_SHOP_ADDRESS}</h3>
        <Icon
          icon="ep:close"
          width="25"
          height="25"
          cursor={"pointer"}
          onClick={() => setAddAddress(false)}
        />
      </div>
      <div className="h-[600px]">
        <input
          type="text"
          className="p-3 border rounded-2xl w-full mt-6 mb-4"
          placeholder={placeholder.WAREHOUSE_NAME}
        />
        <div style={{ height: "400px", width: "100%", borderRadius: "12px" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
        <textarea
          className=" resize-none h-36 w-full p-4 border rounded-xl mt-4"
          placeholder={placeholder.EXAMPLE_SHOE_BRANDNAME_TYPE}
        />
        <div className="flex items-center justify-between py-4 gap-10 max-md:flex-wrap max-md:gap-4">
          <div className="border-[#FACC15] py-2 px-3 rounded-xl flex items-center gap-2 bg-[#FEF5D0] w-[90%] max-md:w-full">
            <Icon
              icon="fluent:warning-24-regular"
              color="#facc15"
              width="24"
              height="24"
            />
            <p className="text-sm font-normal w-[90%]">
              {strings.MAKE_SURE_YOUR_DETAIL_LOCATION}
            </p>
          </div>
          <div className="w-full text-end">
            <button className="py-4 px-10 rounded-[30px] bg-[#0094FF] text-white w-[80%] max-md:w-full">
              {strings.ADD_ADDRESS}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default AddShopAddress;
