import React, { useEffect, useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { strings } from "../../../utils/strings";
import FavoriteCard from "../../../component/appComponent/FavoriteCard";
import AuthSublyApi from "../../../helper/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../utils/Loader";
const YourInterestScreen = () => {
  const [chipsData, setChipsData] = useState([]);
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.userData.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavoriteList = async () => {
      setIsLoading(true);
      try {
        const response = await AuthSublyApi.getIntrest(token);
        setIsLoading(false);
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
      setSelectedFavorites(selectedID);
    }
  }, [chipsData]);

  const handleSaveInterests = async () => {
    setIsLoading(true);
    try {
      const response = await AuthSublyApi.updateInterest(
        token,
        selectedFavorites
      );
      setIsLoading(false);
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error updating interests:", error);
    }
  };
  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <div className="mx-20 max-md:mx-6 ">
        <Header />
      </div>
      <div className="bg-[#F8F9FD] py-5">
        <div className="px-20 max-md:px-6 pt-3">
          <p className="text-[32px] font-bold">{strings.SETTINGS}</p>
          <Container className="py-4" fluid>
            <Row>
              <Col md="3">
                <SettingsSideBar />
              </Col>
              <Col md="9">
                <div className="bg-white rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-medium">
                      {strings.YOUR_INTEREST}
                    </p>
                    <button
                      className="bg-[#0094FF] px-4 py-2 rounded-[32px]"
                      onClick={handleSaveInterests}
                    >
                      <p className="text-white text-xs">{strings.SAVE}</p>
                    </button>
                  </div>

                  <Container className="mt-3" fluid>
                    <Row>
                      {chipsData.map((val, index) => {
                        return (
                          <Col md="3" className="my-2">
                            <FavoriteCard
                              onSelect={handleSelect}
                              isSelected={val.isSelected}
                              data={val}
                            />
                          </Col>
                        );
                      })}
                    </Row>
                  </Container>
                  <p className="text-[#9E9E9E] text-xs leading-6 ml-3 w-2/3">
                    {strings.LOREM_TEXT}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default YourInterestScreen;
