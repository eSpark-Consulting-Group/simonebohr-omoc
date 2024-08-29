import React from "react";
import { strings } from "../../utils/strings";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Icon } from "@iconify/react";

function AddFAQ() {
  return (
    <>
      <div>
        <div className="flex justify-between items-center gap-5 flex-wrap mt-6 mb-7">
          <div className="w-2/3 max-sm:w-full">
            <p className="text-2xl font-semibold">{strings.ADD_FAQ}</p>
            <p className="text-sm text-[#404040] font-medium">
              {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
            </p>
          </div>
          <button className="border-2 border-[#0094FF] text-[#0094FF] text-base font-semibold rounded-3xl py-2.5 px-4">
            {strings.ADD_PRODUCT_FAQ}
          </button>
        </div>
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-[#F5F5F5]">
                  <TableCell
                    align="center"
                    className="rounded-s-xl !text-sm !font-semibold"
                  >
                    #
                  </TableCell>
                  <TableCell align="center" className="!text-sm !font-semibold">
                    {strings.ANSWER}
                  </TableCell>
                  <TableCell align="center" className="!text-sm !font-semibold">
                    {strings.QUESTION}
                  </TableCell>
                  <TableCell className="rounded-e-xl"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 2, 3, 4].map(() => (
                  <TableRow>
                    <TableCell
                      style={{
                        boxShadow: "0px 10px 4px -1px rgba(0, 0, 0, 0.05)",
                      }}
                      className="rounded-s-xl"
                    >
                      <Icon icon="icon-park:drag" width="24" height="24" />
                    </TableCell>
                    <TableCell
                      style={{
                        boxShadow: "0px 10px 4px -1px rgba(0, 0, 0, 0.05)",
                      }}
                      className="!text-sm !font-medium"
                    >
                      <p>
                        Tingkatkan performance bisnismu dengan strategi yang
                        tepat dan akurat, serta dapatkan profit yang lebih baik.
                      </p>
                    </TableCell>
                    <TableCell
                      style={{
                        boxShadow: "0px 10px 4px -1px rgba(0, 0, 0, 0.05)",
                      }}
                      className="!text-sm !font-medium"
                    >
                      <p>
                        Tingkatkan performance bisnismu dengan strategi yang
                        tepat dan akurat, serta dapatkan profit yang lebih baik.
                      </p>
                    </TableCell>
                    <TableCell
                      style={{
                        boxShadow: "0px 10px 4px -1px rgba(0, 0, 0, 0.05)",
                      }}
                      className="rounded-e-xl "
                    >
                      <Icon
                        icon="mingcute:more-2-fill"
                        width="24"
                        height="24"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default AddFAQ;
