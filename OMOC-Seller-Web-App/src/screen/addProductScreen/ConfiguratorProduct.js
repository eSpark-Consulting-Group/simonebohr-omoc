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

function ConfiguratorProduct() {
  return (
    <>
      <div>
        <div className="flex justify-between items-center gap-5 flex-wrap mt-6 mb-7">
          <div className="w-2/3 max-sm:w-full">
            <p className="text-2xl font-semibold">
              {strings.SETUP_YOUR_OWN_CONFIGURATOR}
            </p>
            <p className="text-sm text-[#404040] font-medium">
              {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
            </p>
          </div>
        </div>
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-[#F5F5F5]">
                  <TableCell
                    align="center"
                    width={"50%"}
                    className="rounded-s-xl !text-sm !font-semibold "
                  >
                    <p className="!flex items-center gap-40">
                      #<span>{strings.QUESTION}</span>
                    </p>
                  </TableCell>
                  <TableCell
                    width={"50%"}
                    align="center"
                    className="!text-sm rounded-e-xl !font-semibold"
                  >
                    {strings.ANSWER}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 2, 3, 4].map(() => (
                  <TableRow>
                    <TableCell className="!text-base !font-medium !pt-3 !pb-0">
                      <p className="border-2 rounded-xl p-4 w-full max-md:w-max">
                        What color do you want to choose?
                      </p>
                    </TableCell>
                    <TableCell className="!text-base !font-medium !pt-3 !pb-0">
                      <p className="border-2 rounded-xl p-4 flex justify-between items-center w-full max-md:w-max">
                        <span className="w-[90%]">
                          Color : White, Red, Blue
                        </span>
                        <Icon
                          icon="mingcute:down-line"
                          width="24"
                          height="24"
                        />
                      </p>
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

export default ConfiguratorProduct;
