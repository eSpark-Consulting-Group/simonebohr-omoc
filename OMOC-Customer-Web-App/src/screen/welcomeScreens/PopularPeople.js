import React from "react";
import WelcomeHeader from "../../component/authComponent/WelcomeHeader";
import { strings } from "../../utils/strings";
import FollowingCard from "../../component/appComponent/FollowingCard";
import { Col, Container, Row } from "react-bootstrap";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const PopularPeople = () => {
  return (
    <div className="max-md:mx-2 mx-20  mt-10 ">
      <div>
        <WelcomeHeader
          firstBtn={strings.SKIP}
          secondBtn={strings.FINISH}
          //   onClickSecBtn={() => {
          //     navigate("/PopularPeople");
          //   }}
        />
      </div>
      <div className="mt-16">
        <p className="text-[32px] font-bold w-1/2">{strings.POPULAR_PEOPLE}</p>
      </div>
      <Container fluid>
        <Row>
          {data.map(() => {
            return (
              <Col xl="2" md="3" sm="6">
                <FollowingCard />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default PopularPeople;
