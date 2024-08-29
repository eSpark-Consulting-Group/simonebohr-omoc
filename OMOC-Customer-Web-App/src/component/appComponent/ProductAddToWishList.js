// import React, { useEffect, useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import { Icon } from "@iconify/react";
// import { strings } from "../../utils/strings";
// import WishListCard from "../commonComponent/WishListCard";
// import { Col, Container, Row } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import ProductSublyApi from "../../helper/ProductApi";
// import { toast } from "react-toastify";
// import { AddWishListModal } from "../../screen/wshlist/WishlistScreen";

// const ProductAddToWishList = ({ show, handleClose, clickBtn }) => {
//   const { token } = useSelector((state) => state.userData.userDetails);
//   const [wishCategory, setWishCategory] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [wishId, setWishId] = useState("");
//   const [name, setName] = useState("");

//   // ============fetching wish list API=============
//   useEffect(() => {
//     async function fetchWishItem() {
//       await ProductSublyApi.fetchWishCategory(token).then((response) => {
//         if (response.statusCode == 200) {
//           setWishCategory(response.data);
//         }
//         console.log(response);
//       });
//     }
//     fetchWishItem();
//   }, [showModal]);

//   // ================API FOR CREATING WISH LIST CATEGORY==============
//   async function addWishCategoryHandle() {
//     const requestData = { name: name };
//     await ProductSublyApi.addWishCategory(requestData, token).then(
//       (response) => {
//         console.log(response);
//         if (response.statusCode == 200) {
//           toast.success(response.message);
//           setShowModal(false);
//           setName("");
//         } else {
//           toast.error(response.data.message);
//         }
//       }
//     );
//   }

//   return (
//     <div>
//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//         centered={true}
//       >
//         <Modal.Header className="!justify-between border-0 py-1 px-4 gap-2">
//           {/* <Icon
//             icon="lets-icons:add-duotone"
//             width="48"
//             height="48"
//             style={{ color: "#0094FF", cursor: "pointer" }}
//             onClick={() => {
//               setShowModal(true);
//             }}
//           /> */}
//           <Modal.Title>
//             <p className="text-4xl my-3">{strings.ADD_TO_WISHLIST}</p>
//           </Modal.Title>
//           <div>
//             <Icon
//               width={20}
//               height={20}
//               icon="radix-icons:cross-2"
//               onClick={handleClose}
//               cursor="pointer"
//             />
//           </div>
//         </Modal.Header>
//         <Modal.Body className="py-1 px-4 overflow-scroll h-72 overflow-x-hidden ">
//           <div className="mb-3">
//             {/* <input
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//               }}
//               className="bg-[#F5F5F5] pl-8 rounded-[14px] w-full h-[56px] py-2"
//               placeholder="Wishlist Name"
//             /> */}
//             <Container>
//               <Row>
//                 {wishCategory?.length > 0
//                   ? wishCategory.map((val, index) => {
//                       return (
//                         <Col md="6" key={index}>
//                           <WishListCard
//                             productName={val.name}
//                             count={val.count}
//                             id={val.id}
//                             image={val.thumbnail}
//                             isDetail={true}
//                             setWishId={setWishId}
//                             activeClass={wishId == val.id && "active"}
//                           />
//                         </Col>
//                       );
//                     })
//                   : ""}
//               </Row>
//             </Container>
//           </div>
//         </Modal.Body>
//         <Modal.Footer className="justify-center">
//           <button
//             onClick={() => {
//               clickBtn(wishId);
//             }}
//             className="bg-[#0094FF] w-full rounded-[24px] py-[14px]"
//           >
//             <p className="text-white font-medium">{strings.SAVE}</p>
//           </button>
//         </Modal.Footer>
//       </Modal>
//       {showModal && (
//         <AddWishListModal
//           handleClose={() => {
//             setShowModal(false);
//           }}
//           show={showModal}
//           setName={setName}
//           name={name}
//           clickEvent={addWishCategoryHandle}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductAddToWishList;
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import WishListCard from "../commonComponent/WishListCard";
import { Col, Container, Row } from "react-bootstrap";
import { auto } from "@popperjs/core";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import { toast } from "react-toastify";
import CreateWishList from "./CreateWishList";
const customStyles = {
  content: {
    left: auto,
    right: "27%",
    width: "46%",
  },
};
const ProductAddToWishList = ({ show, handleClose, clickBtn }) => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [wishCategory, setWishCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [wishId, setWishId] = useState("");
  const [name, setName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // ============fetching wish list API=============
  useEffect(() => {
    async function fetchWishItem() {
      await ProductSublyApi.fetchWishCategory(token).then((response) => {
        if (response.statusCode == 200) {
          setWishCategory(response.data);
        }
        console.log(response);
      });
    }
    fetchWishItem();
  }, [showModal]);

  // ================API FOR CREATING WISH LIST CATEGORY==============
  // async function addWishCategoryHandle() {
  //   const requestData = { name: name };
  //   await ProductSublyApi.addWishCategory(requestData, token).then(
  //     (response) => {
  //       console.log(response);
  //       if (response.statusCode == 200) {
  //         toast.success(response.message);
  //         setShowModal(false);
  //         setName("");
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     }
  //   );
  // }
  return (
    <div>
      <Modal isOpen={show} style={customStyles}>
        <div className="flex justify-between items-center">
          {" "}
          <p className="text-4xl my-3">{strings.ADD_TO_WISHLIST}</p>
          <Icon
            width={20}
            height={20}
            icon="radix-icons:cross-2"
            onClick={handleClose}
            cursor="pointer"
          />
        </div>
        <div>
          <Container fluid>
            <Row>
              {wishCategory?.length > 0
                ? wishCategory.map((val, index) => {
                    return (
                      <Col md="3" key={index}>
                        <WishListCard
                          productName={val.name}
                          count={val.count}
                          id={val.id}
                          image={val.thumbnail}
                          isDetail={true}
                          setWishId={setWishId}
                          activeClass={wishId == val.id && "active"}
                          isCheck={true}
                          // isPrivate={true}
                        />
                      </Col>
                    );
                  })
                : ""}
              <Col md="3">
                <div
                  className="border-2 border-[#0094FF] rounded-xl	border-dashed h-[200px] mt-3 flex justify-center items-center"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <div className="">
                    <Icon
                      width={40}
                      height={40}
                      icon="fluent:add-16-filled"
                      color="#0094FF"
                      className="mx-auto"
                    />
                    <p className="text-[#0094FF] text-xl	font-medium	">
                      {strings.NEW_WISHLIST}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <button
            className="float-right bg-[#E0E0E0] px-6 py-2 rounded-3xl	mt-5"
            onClick={() => {
              clickBtn(wishId);
            }}
          >
            <p className="text-[#C2C2C2] font-medium">
              {strings.ADD_TO_WISHLIST}
            </p>
          </button>
        </div>
      </Modal>
      <CreateWishList
        openModal={openModal}
        handleClose={() => {
          setOpenModal(false);
        }}
      />
    </div>
  );
};

export default ProductAddToWishList;
