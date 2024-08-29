import React from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";

function AddLegalPolicies({ addPoliciesModal, setAddPoliciesModal }) {
  return (
    <Modal
      isOpen={addPoliciesModal}
      onRequestClose={() => {
        setAddPoliciesModal(false);
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
        <h3 className="text-2xl font-semibold">
          {strings.ADD_LEGAL_POLICIES_AND_LANGUAGE}
        </h3>
        <Icon
          icon="ep:close"
          width="25"
          height="25"
          cursor={"pointer"}
          onClick={() => setAddPoliciesModal(false)}
        />
      </div>
      <div className="mt-6">
        <textarea
          className="resize-none h-96 w-full p-4 border rounded-xl"
          placeholder={placeholder.ENTER_A_LEGAL_POLICE}
        />
        <p className="text-[#9E9E9E] text-sm font-medium">
          {strings.EXAMPLE_WHAT_DOES_THIS}
        </p>
      </div>
      <div className="flex items-center justify-end mt-10">
        <button className="text-white bg-[#0094FF] rounded-3xl py-3 px-8">
          {strings.SAVE}
        </button>
      </div>
    </Modal>
  );
}

export default AddLegalPolicies;
