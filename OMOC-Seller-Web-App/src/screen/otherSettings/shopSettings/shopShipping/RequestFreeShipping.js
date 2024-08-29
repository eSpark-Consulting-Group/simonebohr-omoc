import React from "react";
import Header from "../../../../component/Header";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SideMenuBar from "../../../../component/SIdeMenuBar";
import ShopShippingHeader from "./ShopShippingHeader";
import { Icon } from "@iconify/react";
import { strings } from "../../../../utils/strings";

function RequestFreeShipping() {
  return (
    <>
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
              <div className="w-full">
                <ShopShippingHeader />
                <div>
                  <TableContainer>
                    <Table className="w-full">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            className="rounded-s-2xl bg-white !text-sm !font-semibold"
                          >
                            {strings.BUYERS_NAME}
                          </TableCell>
                          <TableCell
                            align="center"
                            className="bg-white !text-sm !font-semibold"
                          >
                            {strings.TOTAL_SHOPING}
                          </TableCell>
                          <TableCell
                            align="center"
                            className="bg-white !text-sm !font-semibold"
                          >
                            {strings.REGION}
                          </TableCell>
                          <TableCell
                            align="center"
                            className="bg-white !text-sm rounded-e-2xl !font-semibold"
                          >
                            {strings.ACTION}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[1, 2, 3, 4, 5].map((items, index) => (
                          <TableRow>
                            <TableCell
                              align="center"
                              className="!text-sm !font-medium"
                            >
                              Region Name
                            </TableCell>
                            <TableCell
                              align="center"
                              className="!text-sm !font-normal"
                            >
                              $20,000
                            </TableCell>
                            <TableCell
                              align="center"
                              className="!text-sm !font-normal"
                            >
                              Region Name
                            </TableCell>
                            <TableCell
                              align="center"
                              className="!text-sm !font-normal"
                            >
                              <div className="flex items-center justify-center gap-4">
                                <button className="bg-[#0094FF] text-white rounded-2xl text-sm font-normal px-4 py-3">
                                  {strings.APPROVE}
                                </button>
                                <button className="rounded-2xl text-sm font-normal px-4 py-2.5 text-[#C80000] border border-[#C80000]">
                                  {strings.DECLINE}
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default RequestFreeShipping;
