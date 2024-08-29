import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import omocLogo from "../../assets/icon/omoc_logo.svg";
import { Icon } from "@iconify/react";
import profile_pic from "../../assets/images/profile_pic.png";
import { useEffect, useState } from "react";
import Notification from "../appComponent/Notification";
import MyProfile from "../appComponent/MyProfile";
import Message from "../appComponent/Message";
import SearchHistory from "../appComponent/SearchHistory";
import Chart from "../appComponent/Chart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";

function Header() {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [showNotification, setShowNotification] = useState(false);
  const { user } = useSelector((state) => state.userData.userDetails);
  const [myProfile, setMyProfile] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [chart, setChart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartLength, setCartLength] = useState();
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [searchData, setSearchData] = useState();
  const navigate = useNavigate();
  const handleNotification = () => {
    setShowNotification(!showNotification);
    setChart(false);
    setShowMessage(false);
    setMyProfile(false);
  };
  const handleMessage = () => {
    setShowMessage(!showMessage);
    setChart(false);
    setShowNotification(false);
    setMyProfile(false);
  };
  const handleMyProfile = () => {
    setMyProfile(!myProfile);
    setChart(false);
    setShowNotification(false);
    setShowMessage(false);
  };
  const handleCart = () => {
    setChart(!chart);
    setShowNotification(false);
    setShowMessage(false);
    setMyProfile(false);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setShowSearchHistory(event.target.value !== "");
  };
  const filteredData = [];
  async function search() {
    const text = searchQuery;
    await ProductSublyApi.serachFeed(token, text).then((response) => {
      setSearchData(response.data);
    });
  }

  return (
    <Navbar expand="lg" className="bg-white">
      <Container fluid>
        <Navbar.Brand href="#">
          <img onClick={() => navigate("/Home")} src={omocLogo} />
        </Navbar.Brand>
        <Nav.Link href="#action1" className="lg:w-[80%] w-[50%] ">
          <input
            className="h-12 border-[1px] rounded-[14px] bg-[#F5F5F5] w-full pl-4"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => {
              handleSearchChange(event);
              search();
            }}
            onFocus={() => setShowSearchHistory(searchQuery !== "")}
            onBlur={() => setShowSearchHistory(false)}
          />
          {showSearchHistory && (
            <SearchHistory data={searchData} searchQuery={searchQuery} />
          )}
        </Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action2">
              <div
                className="bg-[#F5F5F5] h-12	w-12 rounded-full flex justify-center items-center"
                onClick={handleCart}
              >
                <div className="flex relative">
                  <Icon width="24" height="24" icon="solar:bag-5-linear" />
                  <div className="w-3 h-3 rounded-full bg-[#C80000] absolute right-0">
                    <p className="text-[8px] font-medium text-white text-center">
                      {cartLength}
                    </p>
                  </div>
                </div>
              </div>
            </Nav.Link>
            {chart && <Chart cartLength={setCartLength} />}
            <Nav.Link href="#action2">
              <div
                className="bg-[#F5F5F5] h-12	w-12 rounded-full flex justify-center items-center"
                onClick={handleNotification}
              >
                <div className="flex relative">
                  <Icon width="24" height="24" icon="ph:bell-light" />
                  <div className="w-3 h-3 rounded-full bg-[#C80000] absolute right-0">
                    <p className="text-[8px] font-medium text-white text-center">
                      12
                    </p>
                  </div>
                </div>
              </div>
            </Nav.Link>
            {showNotification && <Notification />}
            <Nav.Link>
              <div
                className="bg-[#F5F5F5] h-12	w-12 rounded-full flex justify-center items-center "
                onClick={handleMessage}
              >
                <div className="flex relative">
                  <Icon
                    width="24"
                    height="24"
                    icon="system-uicons:message-writing"
                  />
                  <div className="w-3 h-3 rounded-full bg-[#C80000] absolute right-0">
                    <p className="text-[8px] font-medium text-white text-center">
                      12
                    </p>
                  </div>
                </div>
              </div>
            </Nav.Link>
            {showMessage && <Message />}
            <div className="border-[1px] mx-2 h-12 my-auto" />
            <Nav.Link>
              <div
                className="flex gap-3 items-center"
                onClick={handleMyProfile}
              >
                <img
                  className="rounded-full w-[54px] h-[54px]"
                  src={user?.profileImg}
                />
                <p className="text-lg font-medium">
                  {user?.userName || user?.name}
                </p>
                <Icon width="25px" icon="ep:arrow-up" rotate={2} />
              </div>
            </Nav.Link>
            {myProfile && <MyProfile />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
