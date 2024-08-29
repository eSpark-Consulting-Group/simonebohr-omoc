import React, { useEffect, useState } from "react";
import WelcomeHeader from "../../component/authComponent/WelcomeHeader";
import { strings } from "../../utils/strings";
import FollowingCard from "../../component/appComponent/FollowingCard";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthSublyApi from "../../helper/AuthApi";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";

const SuggetionScreen = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userData.userDetails);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);
      const pageSize = 10;
      await AuthSublyApi.getSuggestion(token, pageSize).then((response) => {
        setIsLoading(false);
        console.log("--------USER", response.data);
        setUserData(response.data.usersList); // Assuming response.data is an array
      });
    }
    getUser();
  }, []);

  return (
    <div className="max-md:mx-2 mx-20 mt-10 ">
      {isLoading ? <Loader /> : ""}
      <div>
        <WelcomeHeader
          firstBtn={strings.SKIP}
          secondBtn={strings.FINISH}
          onClickSecBtn={() => {
            navigate("/Home");
          }}
        />
      </div>
      <div className="mt-16">
        <p className="text-[32px] font-bold w-1/2">{strings.SUGGETION}</p>
      </div>
      <div className="flex justify-between mt-4">
        <p className="font-medium">{strings.POPULAR_PEOPLE}</p>
        <p
          className="text-sm text-[#0094FF] font-medium cursor-pointer"
          onClick={() => {
            navigate("/PopularPeople");
          }}
        >
          {strings.SEE_ALL}
        </p>
      </div>
      <Container fluid>
        <Row>
          {userData?.map((user) => (
            <Col xl="2" md="3" sm="6">
              {" "}
              <FollowingCard user={user} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SuggetionScreen;
