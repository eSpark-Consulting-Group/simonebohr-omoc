import React, { useState } from "react";
import { placeholder, strings } from "../utils/strings";
import { Icon } from "@iconify/react";
import ManageOption from "../screen/OrdersScreens/ManageOption";
import { voucherData } from "../utils/mockData";
import ProductSublyApi from "../helper/ProductApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const Manage = ({ deleteVoucher }) => {
  return (
    <div className="rounded-2xl flex justify-end items-end absolute top-12 right-0 bg-red-400 ">
      <div className="bg-white  rounded-2xl z-10">
        <div className=" w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer">
          <p className="text-sm">{strings.PREVIEW}</p>
        </div>
        <div className="w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer">
          <p className="text-sm">{strings.EDIT_VOUCHER}</p>
        </div>
        <div
          className="w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer"
          onClick={() => {
            deleteVoucher();
          }}
        >
          <p className="text-sm">{strings.DELETE_VOUCHER}</p>
        </div>
      </div>
    </div>
  );
};

const VoucherComponentTable = ({
  liveStream,
  Newsletter,
  allVoucher,
  Expired,
  product,
  voucherList,
}) => {
  const [showManage, setShowManage] = useState(false);
  const [manage, setManage] = useState(null);
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  if (!Array.isArray(voucherList)) {
    return (
      <p className="text-center text-sm font-medium text-gray-500 py-3">
        {strings.NO_RECORD_FOUND}
      </p>
    );
  }

  if (voucherList.length === 0) {
    return (
      <p className="text-center text-sm font-medium text-gray-500 py-3">
        {strings.NO_RECORD_FOUND}
      </p>
    );
  }

  /* ------ACTIVE VOUCHER  -----*/

  const isVoucherActive = (startDate, endDate) => {
    const currentDate = new Date();
    return (
      currentDate >= new Date(startDate) && currentDate <= new Date(endDate)
    );
  };

  /* ------DELETE VOUCHER API -----*/

  const deleteVoucher = async (voucherId) => {
    try {
      const response = await ProductSublyApi.deleteVoucher(manage, _id, token);
      if (response.statusCode === 200) {
        toast.success(response.message);
        window.location.reload(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting voucher:", error);
    }
  };
  return (
    <>
      <div className="overflow-auto">
        <table className="w-max">
          <div className="rounded-xl bg-white mb-4 w-full h-24 flex">
            <tr className="flex justify-between items-center w-full mr-5">
              <th className="w-full">
                <p className="w-[180px] text-sm font-bold">
                  {strings.VOUCHER_NAME}
                </p>
              </th>
              <th className="w-full">
                <p className="w-[150px] text-sm"> {strings.TOTAL_VOUCHER}</p>
              </th>
              <th className="w-full">
                <p className="w-[160px] text-sm"> {strings.TYPE}</p>
              </th>
              <th className="w-full">
                <p className="w-[130px] text-sm"> {strings.STATUS}</p>
              </th>
              <th className="w-full">
                <div className="w-[205px]">
                  <input
                    className=" w-full h-12 border-[1px] rounded-[30px] p-3"
                    placeholder={placeholder.SEARCH_VOUCHER}
                  />
                </div>
              </th>
            </tr>
          </div>
          {liveStream &&
            voucherList
              .filter((val) => val.type === "Livestream Voucher")
              .map((val, index) => {
                return (
                  <div className="rounded-xl bg-white mb-4 w-full h-24 flex" key={index}>
                    <tr className="flex justify-between items-center w-full mx-5">
                      <td className="w-full">
                        <p className="text-base font-semibold">{val.name}</p>
                        <p className="text-xs mt-3">{val.code}</p>
                      </td>
                      <td className="w-full">
                        <p className="w-full text-sm text-[#757575] font-semibold text-center">
                          {val.quota}
                        </p>
                      </td>
                      <td className="w-full">
                        <p className="w-full text-sm text-[#757575] font-semibold">
                          {val.type}
                        </p>
                      </td>
                      <td className="w-full">
                        {Expired ? null : (
                          <div className="w-14 h-7 bg-[#22C55E1A] flex items-center   justify-center rounded-[22px]">
                            <p className="w-full text-center text-xs text-[#22C55E]">
                              {strings.ACTIVE}
                            </p>
                          </div>
                        )}
                        {Expired && (
                          <div className="w-14 h-7 bg-[#C800001A] flex items-center   justify-center rounded-[22px]">
                            <p className="w-full text-center text-xs text-[#C80000]">
                              Expired
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="flex justify-end">
                        <div className="w-full relative">
                          <p
                            onClick={() => {
                              setShowManage(!showManage);
                              setManage(val._id);
                            }}
                            className="p-4 border rounded-2xl cursor-pointer w-full text-end flex items-center justify-center gap-4"
                          >
                            Manage{" "}
                            <Icon
                              icon="simple-line-icons:arrow-up"
                              rotate={2}
                              width={12}
                              height={12}
                            />
                          </p>
                          {showManage && manage === val._id && (
                            <Manage
                              deleteVoucher={() => deleteVoucher(val._id)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  </div>
                );
              })}
          {product &&
            voucherList
              .filter((val) => val.type === "Product Voucher")
              .map((val, index) => {
                return (
                  <div className="rounded-xl bg-white mb-4 w-full h-24 flex" key={index}>
                    <tr className="flex justify-between items-center w-full mx-5">
                      <td className="w-full">
                        <p className="text-base font-semibold">{val.name}</p>
                        <p className="text-xs mt-3">{val.code}</p>
                      </td>
                      <td className="w-full">
                        <p className="w-full text-sm text-[#757575] font-semibold text-center">
                          {val.quota}
                        </p>
                      </td>
                      <td className="w-full">
                        <p className="w-full text-sm text-[#757575] font-semibold">
                          {val.type}
                        </p>
                      </td>
                      <td className="w-full">
                        {Expired ? null : (
                          <div className="w-14 h-7 bg-[#22C55E1A] flex items-center   justify-center rounded-[22px]">
                            <p className="w-full text-center text-xs text-[#22C55E]">
                              {strings.ACTIVE}
                            </p>
                          </div>
                        )}
                        {Expired && (
                          <div className="w-14 h-7 bg-[#C800001A] flex items-center   justify-center rounded-[22px]">
                            <p className="w-full text-center text-xs text-[#C80000]">
                              Expired
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="flex justify-end">
                        <div className="w-full relative">
                          <p
                            onClick={() => {
                              setShowManage(!showManage);
                              setManage(val._id);
                            }}
                            className="p-4 border rounded-2xl cursor-pointer w-full text-end flex items-center justify-center gap-4"
                          >
                            Manage{" "}
                            <Icon
                              icon="simple-line-icons:arrow-up"
                              rotate={2}
                              width={12}
                              height={12}
                            />
                          </p>
                          {showManage && manage === val._id && (
                            <Manage
                              deleteVoucher={() => deleteVoucher(val._id)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  </div>
                );
              })}
          {Newsletter &&
            voucherList
              .filter((val) => val.type === "Newsletter Voucher")
              .map((val, index) => {
                return (
                  <div className="rounded-xl bg-white mb-4 w-full h-24 flex" key={index}>
                    <tr className="flex justify-between items-center w-full mx-5">
                      <td className="w-full">
                        <p className="text-base font-semibold">{val.name}</p>
                        <p className="text-xs mt-3">{val.code}</p>
                      </td>
                      <td className="w-full">
                        <p className="w-full text-sm text-[#757575] font-semibold text-center">
                          {val.quota}
                        </p>
                      </td>
                      <td className="w-full">
                        <p className="w-full text-sm text-[#757575] font-semibold">
                          {val.type}
                        </p>
                      </td>
                      <td className="w-full">
                        {Expired ? null : (
                          <div className="w-14 h-7 bg-[#22C55E1A] flex items-center   justify-center rounded-[22px]">
                            <p className="w-full text-center text-xs text-[#22C55E]">
                              {strings.ACTIVE}
                            </p>
                          </div>
                        )}
                        {Expired && (
                          <div className="w-14 h-7 bg-[#C800001A] flex items-center   justify-center rounded-[22px]">
                            <p className="w-full text-center text-xs text-[#C80000]">
                              Expired
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="flex justify-end">
                        <div className="w-full relative">
                          <p
                            onClick={() => {
                              setShowManage(!showManage);
                              setManage(val._id);
                            }}
                            className="p-4 border rounded-2xl cursor-pointer w-full text-end flex items-center justify-center gap-4"
                          >
                            Manage{" "}
                            <Icon
                              icon="simple-line-icons:arrow-up"
                              rotate={2}
                              width={12}
                              height={12}
                            />
                          </p>
                          {showManage && manage === val._id && (
                            <Manage
                              deleteVoucher={() => deleteVoucher(val._id)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  </div>
                );
              })}
          {allVoucher &&
            voucherList.map((val, index) => {
              return (
                <div className="rounded-xl bg-white mb-4 w-full h-24 flex" key={index}>
                  <tr className="flex justify-between items-center w-full mx-5">
                    <td className="w-full">
                      <p className="text-base font-semibold">{val.name}</p>
                      <p className="text-xs mt-3">{val.code}</p>
                    </td>
                    <td className="w-full">
                      <p className="w-full text-sm text-[#757575] font-semibold text-center">
                        {val.quota}
                      </p>
                    </td>
                    <td className="w-full">
                      <p className="w-full text-sm text-[#757575] font-semibold">
                        {val.type}
                      </p>
                    </td>
                    <td className="w-full">
                      {isVoucherActive(val.startDate, val.endDate) ? (
                        <div className="w-14 h-7 bg-[#22C55E1A] flex items-center   justify-center rounded-[22px]">
                          <p className="w-full text-center text-xs text-[#22C55E]">
                            {strings.ACTIVE}
                          </p>
                        </div>
                      ) : (
                        <div className="w-14 h-7 bg-[#C800001A] flex items-center   justify-center rounded-[22px]">
                          <p className="w-full text-center text-xs text-[#C80000]">
                            Expired
                          </p>
                        </div>
                      )}
                    </td>
                    <td className="flex justify-end">
                      <div className="w-full relative">
                        <p
                          onClick={() => {
                            setShowManage(!showManage);
                            setManage(val._id);
                          }}
                          className="p-4 border rounded-2xl cursor-pointer w-full text-end flex items-center justify-center gap-4"
                        >
                          Manage{" "}
                          <Icon
                            icon="simple-line-icons:arrow-up"
                            rotate={2}
                            width={12}
                            height={12}
                          />
                        </p>
                        {showManage && manage === val._id && (
                          <Manage
                            deleteVoucher={() => deleteVoucher(val._id)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                </div>
              );
            })}
          {Expired &&
            voucherList
              .filter((val) => !isVoucherActive(val.startDate, val.endDate))
              .map((val, index) => {
                return (
                  <div className="rounded-xl bg-white mb-4 w-full h-24 flex" key={index}>
                    <tr className="flex justify-between items-center w-full mx-5">
                      <td className="w-full">
                        <p className="text-base font-semibold">{val.name}</p>
                        <p className="text-xs mt-3">{val.code}</p>
                      </td>
                      <td className="w-full">
                        <p className="w-full text-sm text-[#757575] font-semibold text-center">
                          {val.quota}
                        </p>
                      </td>
                      <td className="w-full">
                        <p className="w-full text-sm text-[#757575] font-semibold">
                          {val.type}
                        </p>
                      </td>
                      <td className="w-full">
                        {isVoucherActive(val.startDate, val.endDate) ? (
                          <div className="w-14 h-7 bg-[#22C55E1A] flex items-center   justify-center rounded-[22px]">
                            <p className="w-full text-center text-xs text-[#22C55E]">
                              {strings.ACTIVE}
                            </p>
                          </div>
                        ) : (
                          <div className="w-14 h-7 bg-[#C800001A] flex items-center   justify-center rounded-[22px]">
                            <p className="w-full text-center text-xs text-[#C80000]">
                              Expired
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="flex justify-end">
                        <div className="w-full relative">
                          <p
                            onClick={() => {
                              setShowManage(!showManage);
                              setManage(val._id);
                            }}
                            className="p-4 border rounded-2xl cursor-pointer w-full text-end flex items-center justify-center gap-4"
                          >
                            Manage{" "}
                            <Icon
                              icon="simple-line-icons:arrow-up"
                              rotate={2}
                              width={12}
                              height={12}
                            />
                          </p>
                          {showManage && manage === val._id && (
                            <Manage
                              deleteVoucher={() => deleteVoucher(val._id)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  </div>
                );
              })}
        </table>
      </div>
    </>
  );
};

export default VoucherComponentTable;
