import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { strings } from "../../utils/strings";
import Rating from "react-rating";
import emptyStar from "../../assets/icon/empty_star.svg";
import Star from "../../assets/icon/star_Icon.svg";
import gallery from "../../assets/icon/gallery-add.svg";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const RatingModal = ({ openModal, closeModal, orderId, setIsLoading }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userData.userDetails);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageId, setImageId] = useState("");

  const onFileHandle = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const images = [...imageFile];
      const id = [...imageId];
      const requestData = new FormData();
      requestData.append("product", file);
      await ProductSublyApi.productImage(requestData, token).then(
        (response) => {
          console.log(response);
          if (response.statusCode == 200) {
            images.push(response.data.url);
            setImageFile(images);
            id.push(response.data.publicId);
            setImageId(id);
          }
        }
      );
    }
  };

  async function removeImage(index) {
    await ProductSublyApi.deleteImage(imageId[index], token).then(
      (response) => {
        if (response.statusCode == 200) {
          const images = [...imageFile];
          const id = [...imageId];
          images.splice(index, 1);
          setImageFile(images);
          id.splice(index, 1);
          setImageId(id);
        }
      }
    );
  }

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  async function submitRating() {
    setIsLoading(true);
    const ratingData = {
      rating: rating,
      comment: feedback,
      orderId: orderId,
      files: imageFile,
    };
    await ProductSublyApi.giveRating(ratingData, token).then((response) => {
      setIsLoading(false);
      if (response.statusCode == 200) {
        toast.success(response.message);
        navigate("/Setting/Your-Ratings/History");
        closeModal();
      } else {
        toast.error(response.data.message);
      }
    });
  }

  return (
    <ReactModal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="flex items-center w-[425px]">
        <p className="text-2xl font-semibold mx-auto">
          {strings.WHAT_IS_YOUR_RATE}
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
      <div className="flex justify-center my-3">
        <Rating
          emptySymbol={<img src={emptyStar} className="icon w-6	h-6 my-2" />}
          fullSymbol={<img src={Star} className="icon w-6 h-6 my-2" />}
          initialRating={rating}
          onChange={handleRatingChange}
        />
      </div>
      <p className="text-center font-medium">
        {strings.SHARE_YOUR_FEEDBACK_ABOUT_PRODUCT}
      </p>
      <textarea
        className="bg-[#F5F5F5] rounded-xl w-full h-36 my-3 p-2"
        value={feedback}
        onChange={handleFeedbackChange}
      />
      <div className="flex gap-2 flex-wrap my-3">
        {imageFile
          ? imageFile.map((item, index) => (
              <div className="relative w-20 h-20 rounded-lg bg-[#F9F9F9]">
                <button
                  onClick={() => {
                    removeImage(index);
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  X
                </button>
                <img className="w-full h-full rounded-lg" src={item} />
              </div>
            ))
          : ""}

        <label
          htmlFor="upload"
          className="w-20 h-20 rounded-lg flex items-center justify-center border-[1px] border-dashed border-[#0094FF]"
        >
          <div>
            <div className="rounded-full bg-[#E8F5FF] w-9	h-9 mx-auto flex items-center justify-center mb-2">
              <img src={gallery} />
            </div>
            <p className="text-xs text-[#0094FF]">{strings.ADD_PHOTO}</p>
          </div>
        </label>
        <input
          onChange={(e) => {
            onFileHandle(e);
          }}
          type="file"
          className="hidden"
          id="upload"
        />
      </div>
      <button
        className="bg-[#0094FF] rounded-[24px] w-full py-3 mt-3"
        onClick={submitRating}
      >
        <p className="text-white font-medium">{strings.SEND_FEEDBACK}</p>
      </button>
    </ReactModal>
  );
};

export default RatingModal;
