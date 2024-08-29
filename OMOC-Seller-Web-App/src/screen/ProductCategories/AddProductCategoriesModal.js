import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import shoe from "../../assets/image/shoe-img.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ProductSublyApi from "../../helper/ProductApi";
import { useSelector } from "react-redux";

function AddProductCategoriesModal({
  setOpenAddProduct,
  openAddProduct,
  setSelectedProducts,
  setIsLoader,
}) {
  const { shopInfo } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [productList, setProductList] = useState("");
  const [showInventory, setShowInventory] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState("");

  useEffect(() => {
    async function productListHandle() {
      setIsLoader(true);
      await ProductSublyApi.fetchCategoryProductList(
        shopInfo._id,
        1,
        10,
        token
      ).then((response) => {
        setIsLoader(false);
        if (response.statusCode == 200) {
          setProductList(response.data);
        }
      });
    }
    productListHandle();
  }, [shopInfo, showInventory]);
  // console.log(productList, "DATA");

  const handleCheckboxChange = (productId) => {
    // Toggle selected product id
    setSelectedProductIds((prevSelectedIds) =>
      prevSelectedIds.includes(productId)
        ? prevSelectedIds.filter((id) => id !== productId)
        : [...prevSelectedIds, productId]
    );
  };
  const handleAddProducts = () => {
    const selectedProducts = productList.filter((product) =>
      selectedProductIds.includes(product._id)
    );
    setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts,
      ...selectedProducts,
    ]);
    setOpenAddProduct(false);
  };
  return (
    <>
      <Modal
        isOpen={openAddProduct}
        onRequestClose={() => {
          setOpenAddProduct(false);
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
        <div>
          <div className="flex justify-between pb-3">
            <p className="font-bold text-2xl">{strings.ADD_PRODUCT}</p>
            <button
              onClick={() => {
                setOpenAddProduct(false);
              }}
            >
              <Icon icon="ep:close" width="28" height="28" />
            </button>
          </div>
          <div className="searchFieldClass flex justify-between items-center py-3">
            <label
              htmlFor="search"
              className="flex py-2 px-5 justify-between items-center w-1/2 max-md:w-[60%]"
            >
              <input
                className="w-full py-1"
                type="text"
                id="search"
                placeholder={placeholder.SEARCH_PRODUCT_SKU}
              />
              <Icon icon="uil:search" width="24" height="24" />
            </label>
            <label className="rounded-xl border-[#EDEDED] border-2  py-3 px-5 w-[20%] max-md:w-[35%]">
              <select className="w-full">
                <option>XYZ</option>
              </select>
            </label>
          </div>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead className="rounded-xl bg-[#F5F5F5]">
                <TableRow>
                  <TableCell align="left" width={"45%"}>
                    <p className="text-base font-normal text-[#404040] text-center w-[280px]">
                      {strings.PRODUCT_NAME}
                    </p>
                  </TableCell>
                  <TableCell align="left" width={"30%"}>
                    <p className="text-base font-normal text-[#404040] text-center w-[180px]">
                      {strings.PRICE}
                    </p>
                  </TableCell>
                  <TableCell align="left" width={"25%"}>
                    <p className="text-base font-normal text-[#404040] text-center w-[145px]">
                      {strings.SOLD}
                    </p>
                  </TableCell>
                </TableRow>
              </TableHead>
              {productList && productList.length > 0
                ? productList.map((val, index) => {
                    // console.log(val);
                    return (
                      <TableBody>
                        <TableRow className="!border-b-2">
                          <TableCell align="left" scope="row">
                            <div className="flex items-center justify-center gap-6 max-md:gap-5">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                onChange={() => handleCheckboxChange(val._id)}
                              />
                              <div className="flex items-center gap-4">
                                <img
                                  width={54}
                                  height={54}
                                  src={val.images[0].url}
                                  alt="product"
                                  className="rounded-lg"
                                />
                                <div>
                                  <p className="text-base font-semibold ">
                                    {val.name}
                                  </p>
                                  <p className="text-sm font-normal text-[#7A7A7A]">
                                    {val._id}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <p className="text-base font-normal text-[#757575] text-center">
                              {val.price}
                            </p>
                          </TableCell>
                          <TableCell align="left">
                            <p className="text-base font-normal text-[#757575] text-center">
                              {val.soldCount}
                            </p>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    );
                  })
                : ""}
            </Table>
          </TableContainer>
          <div className="mt-4">
            <button
              className="rounded-3xl text-white font-base font-semibold py-2.5 px-4 border-2 bg-[#0094FF] border-[#0094FF] flex items-center justify-center gap-2"
              onClick={handleAddProducts}
            >
              {strings.ADD_PRODUCT}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddProductCategoriesModal;
