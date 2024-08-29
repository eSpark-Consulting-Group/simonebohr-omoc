import React, { useEffect, useState } from "react";

import { strings } from "../../utils/strings";
import WelcomeHeader from "../../component/authComponent/WelcomeHeader";
import FavoriteCard from "../../component/appComponent/FavoriteCard";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthSublyApi from "../../helper/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const FavoriteSelect = () => {
  const navigate = useNavigate();
  const [chipsData, setChipsData] = useState([]);
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const { token } = useSelector((state) => state.userData.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavoriteList = async () => {
      try {
        const response = await AuthSublyApi.getIntrest(token);
        const data = response.data;
        const seletedData = data.interests.selected;
        const unSeletedData = data.interests.otherCategories;
        const array3 = seletedData.concat(unSeletedData);
        var finalArray = [];
        array3.map((val) => {
          const foundInSelected = seletedData.some(
            (item) => item._id === val._id
          );
          const foundInUnSelected = unSeletedData.some(
            (item) => item._id === val._id
          );
          if (foundInSelected) {
            finalArray.push({ ...val, isSelected: true });
          } else {
            finalArray.push({ ...val, isSelected: false });
          }
        });
        setChipsData(finalArray);
      } catch (error) {
        console.error("Error fetching favorite list:", error);
      }
    };

    fetchFavoriteList();
  }, [token]);

  const handleSelect = (selectedData) => {
    const id = selectedData?._id;
    setSelectedFavorites((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id); // Remove from array if already selected
      } else {
        return [...prevSelected, id]; // Add to array if not already selected
      }
    });

    setChipsData((prevData) => {
      return prevData.map((data) =>
        data._id === id ? { ...data, isSelected: !data.isSelected } : data
      );
    });
  };
  useEffect(() => {
    if (chipsData.some((category) => category.isSelected)) {
      const dataItem = chipsData;
      const selectedID = dataItem
        .filter((data) => data.isSelected)
        .map((data) => data._id);
      console.log("selectedID--->", selectedID);
      setSelectedFavorites(selectedID);
    }
  }, [chipsData]);

  const handleSaveInterests = async () => {
    try {
      const response = await AuthSublyApi.updateInterest(
        token,
        selectedFavorites
      );
      if (selectedFavorites.length === 0) {
        toast.error("Please select at least one favorite.");
      } else {
        navigate("/Suggetion");
      }
    } catch (error) {
      console.error("Error updating interests:", error);
    }
  };

  return (
    <div className="max-md:mx-2 mx-20  mt-10 ">
      <WelcomeHeader
        firstBtn={strings.SKIP}
        secondBtn={strings.NEXT}
        onClickSecBtn={handleSaveInterests}
      />
      <div className="mt-16">
        <p className="text-[32px] font-bold w-1/2">
          {strings.HELP_TO_KNOW_YOUR_SHOPPONG_FAVORITE}
        </p>
      </div>
      <div className="mt-4">
        <Container fluid>
          <Row>
            {chipsData.map((val, index) => {
              return (
                <Col md="3" className="my-2">
                  <FavoriteCard
                    onSelect={handleSelect}
                    text={val.text}
                    isSelected={val.isSelected}
                    key={val.id}
                    data={val}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default FavoriteSelect;
