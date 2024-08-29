import React, { useState } from "react";
import Modal from "react-modal";
import { auto } from "@popperjs/core";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import { Col, Container, Row } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import LikesModal from "./LikesModal";
import proflie from "../../assets/images/profile_pic.png";
import ProductSublyApi from "../../helper/ProductApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const customStyles = {
  content: {
    left: auto,
    right: "27%",
    width: "46%",
  },
};

const CreateWishList = ({ openModal, handleClose }) => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [wishListType, setWishListType] = useState("");
  const [invite, setInvite] = useState(false);
  const [wishlistName, setWishlistName] = useState("");

  async function addWishCategoryHandle() {
    const requestData = { name: wishlistName };
    await ProductSublyApi.addWishCategory(requestData, token).then(
      (response) => {
        //  console.log("--------WISHLIST",response);
        if (response.statusCode == 200) {
          toast.success(response.message);
          handleClose();
          setWishlistName("");
        } else {
          toast.error(response.data.message);
        }
      }
    );
  }
  return (
    <div>
      <Modal style={customStyles} isOpen={openModal}>
        <div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold my-3">
              {strings.ADD_TO_WISHLIST}
            </p>
            <Icon
              width={20}
              height={20}
              icon="radix-icons:cross-2"
              onClick={handleClose}
              cursor="pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center flex-wrap">
              <p>{strings.NAME_WISHLIST}</p>
              <input
                className="border-[1px] rounded-lg w-[80%] p-2 my-2"
                placeholder={placeholder.PRE_ORDER_NOW}
                value={wishlistName}
                onChange={(e) => {
                  setWishlistName(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-between items-center flex-wrap">
              <p>{strings.TYPE_WISHLIST}</p>
              <select
                className="border-[1px] rounded-lg w-[80%] p-2 my-2"
                onChange={(e) => setWishListType(e.target.value)}
              >
                <option value="Individual">Individual</option>
                <option value="Group">Group wishlist</option>
              </select>
            </div>
            {wishListType === "Group" && (
              <div className="flex justify-between items-center flex-wrap cursor-pointer">
                <p>{strings.INVITE_FRIENDS}</p>
                <div
                  className="border-[1px] rounded-lg w-[80%] p-2 my-2 flex justify-between items-center"
                  onClick={() => {
                    setInvite(true);
                    handleClose();
                  }}
                >
                  <p>Choose</p>
                  <Icon
                    width={20}
                    height={20}
                    icon="radix-icons:cross-2"
                    onClick={handleClose}
                    cursor="pointer"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-between items-center flex-wrap ">
              <p>{strings.PRIVATE}</p>
              <div className="rounded-lg w-[80%] p-2 my-2 items-center">
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
                <p className="text-[#9E9E9E] mt-2">
                  You can set privacy for your wishlist private or not.
                </p>
              </div>
            </div>
            <div>
              <button
                className="bg-[#0094FF] rounded-[30px] px-10 py-2 float-right mt-5"
                onClick={addWishCategoryHandle}
              >
                <p className="text-white text-lg font-semibold">
                  {strings.CREATE}
                </p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <InviteModal
        isOpen={invite}
        closeModal={() => {
          setInvite(false);
        }}
      />
    </div>
  );
};

export default CreateWishList;

const InviteModal = ({ isOpen, closeModal }) => {
  const data = [1, 2, 3, 4, 5, 6];
  const [invited, setInvited] = useState("Invite");
  const handleButton = () => {
    if (invited === "Invite") {
      setInvited("Invited");
    } else {
      setInvited("Invite");
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} style={customStyles}>
        <div className="flex items-center w-[425px] z-50">
          <p className="text-2xl font-semibold">
            {strings.INVITE_WISHLIST_GROUP}
          </p>
          <div className="absolute right-5">
            <Icon
              className="cursor-pointer"
              width={24}
              height={24}
              style={{ float: "right" }}
              icon="radix-icons:cross-2"
              onClick={() => {
                closeModal();
              }}
            />
          </div>
        </div>
        <div className="flex relative mt-4">
          <div className="absolute left-2 top-3">
            <Icon className="" icon="carbon:search" />
          </div>
          <input
            className="bg-[#F5F5F5] pl-8 rounded-[14px] w-full py-2"
            placeholder={placeholder.SEARCH}
          />
        </div>
        {data.map(() => {
          return (
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1 items-center">
                <img className="w-8 h-8" src={proflie} />
                <Icon icon="bitcoin-icons:verify-filled" color="#3d9ffb" />
                <p className="text-sm font-medium">John Wick</p>
              </div>
              <button
                className={`${
                  invited === "Invite"
                    ? "bg-[#0094FF] text-white"
                    : "bg-[#F5F5F5] text-[#9E9E9E]"
                } rounded-3xl px-3 py-2`}
                onClick={handleButton}
              >
                <p className="text-[10px] ">{invited}</p>
              </button>
            </div>
          );
        })}
      </Modal>
    </div>
  );
};
