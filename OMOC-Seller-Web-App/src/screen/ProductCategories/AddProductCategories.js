import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../component/SIdeMenuBar";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import shoe from "../../assets/image/shoe-img.png";
import uploadFile from "../../assets/icon/document-upload.svg";
import AddProductCategoriesModal from "./AddProductCategoriesModal";
import trash from "../../assets/icon/trash.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import Loader from "../../utils/Loader";

function AddProductCategories({ isUpdate }) {
  const location = useLocation();
  const navigate = useNavigate;
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [productImage, setProductImage] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState("");
  const { token } = useSelector((state) => state.userData.userDetails);
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const [categorieId, setCategorieId] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const [productId, setProductId] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  /* ------CREATE CATEGORY API -----*/
  async function addCategoryHandle() {
    setIsLoader(true);
    toast.dismiss();
    const productsIds = [];
    selectedProducts &&
      selectedProducts?.map((val) => productsIds.push(val._id));
    const formData = new FormData();
    formData.append("title", title);
    formData.append("productIds", JSON.stringify(productsIds));
    imageFile && formData.append("file", imageFile);

    try {
      const response = await ProductSublyApi.createCategory(
        formData,
        token,
        _id
      );
      setIsLoader(false);
      if (response.statusCode === 200) {
        toast.success(response.message);
        navigate("/Product/Categories");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  /* ------UPDATE CATEGORY API -----*/
  async function upDateCategoryHandle() {
    setIsLoader(true);
    const updateData = new FormData();
    updateData.append("title", title);
    // updateData.append("productIds", JSON.stringify(productIds));
    imageFile && updateData.append("file", imageFile);

    try {
      const response = await ProductSublyApi.updateCategory(
        updateData,
        token,
        _id,
        categorieId
      );
      setIsLoader(false);
      if (response.statusCode === 200) {
        toast.success(response.message);
        navigate("/Product/Categories");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onFileHandle = async (e) => {
    let fileReader,
      isCancel = false;
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      console.log(file);
      if (e.target.files && e.target.files.length > 0) {
        fileReader = new FileReader();
        fileReader.onload = async (e) => {
          const { result } = e.target;
          if (result && !isCancel) {
            await setProductImage([result]);
            console.log(result);
          }
        };
        fileReader.readAsDataURL(file);
      }
    }
  };
  useEffect(() => {
    if (isUpdate === true) {
      const itemData = { upDateCategory: location.state };
      console.log(itemData.upDateCategory.item, "item DATA");
      setTitle(itemData.upDateCategory.item?.title);
      setProductImage(itemData.upDateCategory.item?.image);
      setCategorieId(itemData.upDateCategory.item?.id);
    }
  }, []);

  return (
    <section>
      {isLoader ? <Loader /> : ""}
      <div className={`bg-[#F2F2F2] h-full`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <Grid container spacing={2}>
            <Grid item md={3} xs={12} className="w-full">
              <SideMenuBar />
            </Grid>
            <Grid item md={9} xs={12}>
              <div className="w-full pt-5">
                <div className="bg-[#F2F2F2] h-full">
                  <div className="flex justify-between items-center mb-8 max-sm:flex-wrap">
                    <div>
                      {isUpdate && (
                        <h2 className="text-3xl font-bold mb-1">
                          {strings.EDIT_YOUR_PRODUCT}
                        </h2>
                      )}
                      {!isUpdate && (
                        <h2 className="text-3xl font-bold mb-1">
                          {strings.ADD_YOUR_CATEGORY}
                        </h2>
                      )}

                      <p className="font-normal text-sm text-gray-500">
                        {strings.EDIT_MANAGE_YOUR_PRODUCT}
                      </p>
                    </div>
                    <div
                      className="newInvoice-btn cursor-pointer !gap-1 max-sm:mt-4"
                      onClick={() => {
                        {
                          !isUpdate && addCategoryHandle();
                        }
                        {
                          isUpdate && upDateCategoryHandle();
                        }
                      }}
                    >
                      <p>{strings.SAVE_CHANGE}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl px-6 py-6 my-4">
                    <p className="text-sm text-[#7A7A7A] font-normal">
                      {strings.PICTURE_OF_CATEGORY}
                    </p>
                    {/* ==============Uploding part============== */}
                    <div
                      className={`${
                        productImage
                          ? "my-4 items-center gap-6 hidden"
                          : "my-4 flex items-center gap-6 "
                      }`}
                    >
                      <label
                        htmlFor="upload-product"
                        className="border-dotted border-2 rounded-xl border-[#9E9E9E] flex justify-center items-center w-20 h-20"
                      >
                        <input
                          type="file"
                          id="upload-product"
                          className="hidden"
                          onChange={(e) => {
                            onFileHandle(e);
                          }}
                        />
                        <Icon
                          icon="uil:plus"
                          color="#616161"
                          width="24"
                          height="24"
                        />
                      </label>
                      <p className="text-xs font-normal text-[#C80000] w-44 hidden">
                        size of picture is 300px x300px and 500 kb
                      </p>
                    </div>
                    {/* ================================================== */}
                    <div
                      className={`${
                        productImage
                          ? "flex justify-start items-center"
                          : "justify-start items-center hidden"
                      }`}
                    >
                      <div className="my-4 flex items-center gap-3 rounded-xl bg-[#F5F5F5]">
                        <img
                          src={productImage}
                          alt="product"
                          className="rounded-xl bg-white p-2 w-16 h-16 my-4 ml-4"
                        />
                        <p className="text-xs font-normal w-44 flex justify-between items-center mr-4">
                          {imageFile.name}
                          <img src={uploadFile} alt="upload-icon" />
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[#7A7A7A] font-normal pb-4 pt-1">
                        {strings.TITLE_CATEGORIES}
                      </p>
                      <input
                        type="text"
                        placeholder={placeholder.WRITE_TITLE_CATEGORIE}
                        className="border-2 border-[#EDEDED] rounded-xl px-4 py-3 w-full"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl my-4 px-5 py-5">
                  <div className="flex justify-between items-center bg-white rounded-xl pb-5">
                    <div>
                      <h2 className="text-2xl font-bold text-[#2A2A2A]">
                        {strings.PRODUCT_CHOOSED}
                      </h2>
                      <p className="text-sm font-normal text-[#7A7A7A]">
                        {strings.ADD_YOUR_PRODUCT_CATEGORY}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => setOpenAddProduct(true)}
                        className="rounded-3xl text-[#0094FF] font-base font-semibold py-3 px-4 border-2 border-[#0094FF] flex items-center justify-center gap-2"
                      >
                        {strings.ADD_PRODUCT}
                      </button>
                    </div>
                  </div>
                  <TableContainer>
                    <Table aria-label="simple table">
                      {selectedProducts && (
                        <TableHead className="rounded-xl bg-[#F5F5F5]">
                          <TableRow>
                            <TableCell align="left" width={"45%"}>
                              <p className="text-base font-normal text-[#404040] text-center w-[280px]">
                                {strings.PRODUCT_NAME}
                              </p>
                            </TableCell>
                            <TableCell align="left" width={"30%"}>
                              <p className="text-base font-normal text-[#404040] text-center w-[100px]">
                                {strings.PRICE}
                              </p>
                            </TableCell>
                            <TableCell align="left" width={"25%"}>
                              <p className="text-base font-normal text-[#404040] text-center w-[145px]">
                                {strings.SOLD}
                              </p>
                            </TableCell>
                            <TableCell align="left" width={"20%"}>
                              <p className=" w-[135px]"></p>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      )}
                      <TableBody>
                        {selectedProducts &&
                          selectedProducts?.map((product) => {
                            console.log(product, "productList");
                            // setProductId(product._id);
                            return (
                              <TableRow>
                                <TableCell align="right" scope="row">
                                  <div className="flex items-center justify-start gap-6  max-md:gap-5">
                                    <span className="border rounded-xl w-[72px] h-[72px]">
                                      <img
                                        src={product.images[0].url}
                                        alt="product"
                                        className="w-full h-full rounded-xl"
                                      />
                                    </span>
                                    <div className="!text-start">
                                      <p className="text-base font-semibold ">
                                        {product.name}
                                      </p>
                                      <p className="text-sm font-normal text-[#7A7A7A] text-start">
                                        {product._id}
                                      </p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell align="right">
                                  <p className="text-base font-normal text-[#757575] text-center">
                                    {product.price}
                                  </p>
                                </TableCell>
                                <TableCell align="right">
                                  <p className="text-base font-normal text-[#757575] text-center">
                                    {product.soldCount}
                                  </p>
                                </TableCell>
                                <TableCell align="right">
                                  <p className="flex justify-around">
                                    <span></span>
                                    <img
                                      src={trash}
                                      alt="trash"
                                      className="cursor-pointer"
                                    />
                                  </p>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {/* <TableRow>
                          <TableCell align="right" scope="row">
                            <div className="flex items-center justify-start gap-12 max-md:gap-5">
                              <img
                                src={shoe}
                                alt="product"
                                className="border rounded-xl w-16 p-2"
                              />
                              <div>
                                <p className="text-base font-semibold ">
                                  Nike Air Jordan
                                </p>
                                <p className="text-sm font-normal text-[#7A7A7A] text-start">
                                  1239u1023
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            <p className="text-base font-normal text-[#757575] text-center">
                              $1.120
                            </p>
                          </TableCell>
                          <TableCell align="right">
                            <p className="text-base font-normal text-[#757575] text-center">
                              123
                            </p>
                          </TableCell>
                          <TableCell align="right">
                            <p className="flex justify-around">
                              <span></span>
                              <img
                                src={trash}
                                alt="trash"
                                className="cursor-pointer"
                              />
                            </p>
                          </TableCell>
                        </TableRow> */}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <AddProductCategoriesModal
        setOpenAddProduct={setOpenAddProduct}
        openAddProduct={openAddProduct}
        setSelectedProducts={setSelectedProducts}
        setProductId={selectedProducts._id}
        setIsLoader={setIsLoader}
      />
    </section>
  );
}

export default AddProductCategories;
