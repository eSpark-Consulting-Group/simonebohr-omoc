import React from "react";
import ReactModal from "react-modal";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";

function InventoryModal({ openInventory, setOpenInventory }) {
  return (
    <>
      <ReactModal
        isOpen={openInventory}
        onRequestClose={() => {
          setOpenInventory(false);
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
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">{strings.INVENTORY}</h3>
            <Icon
              icon="ep:close"
              width="26"
              height="26"
              cursor={"pointer"}
              onClick={() => setOpenInventory(false)}
            />
          </div>
          <div className="flex items-center gap-4 max-md:flex-wrap my-5">
            <input
              type="text"
              className="w-full p-4 border rounded-xl"
              placeholder={placeholder.SKU_STOCK_KEEPING_UNIT}
            />
            <input
              type="text"
              className="w-full p-4 border rounded-xl"
              placeholder={placeholder.BARCODE_ISBN_UPC}
            />
          </div>
          <div className="flex items-center justify-end">
            <button className="py-3 px-10 bg-[#0094FF] text-base font-semibold text-white rounded-3xl">
              {strings.SAVE}
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default InventoryModal;
