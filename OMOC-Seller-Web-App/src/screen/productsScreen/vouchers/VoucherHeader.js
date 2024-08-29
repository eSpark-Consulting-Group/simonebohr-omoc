import React from "react";
import { NavLink } from "react-router-dom";
import "../../../assets/CommonStyling/CommonStyling.css";
import { strings } from "../../../utils/strings";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function VoucherHeader() {
  return (
    <section className="rounded-xl bg-white mb-4 mt-6 p-2">
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="invoiceHeader-class">
              <TableCell align="left">
                <p>
                  <NavLink to="/Product/Vouchers/AllVouchers">
                    {strings.ALL_VOUCHER}
                  </NavLink>
                </p>
              </TableCell>
              <TableCell align="left">
                <p>
                  <NavLink to="/Product/Vouchers/ProductVouchers">
                    {strings.PRODUCT_VOUCHER}
                  </NavLink>
                </p>
              </TableCell>
              <TableCell align="left">
                <p>
                  <NavLink to="/Product/Vouchers/NewsletterVoucher">
                    {strings.NEWSLETTER_VOUCHER}
                  </NavLink>
                </p>
              </TableCell>
              <TableCell align="left">
                <p>
                  <NavLink to="/Product/Vouchers/LiveStreamVoucher">
                    {strings.LIVESTREAM_VOUCHER}
                  </NavLink>
                </p>
              </TableCell>
              <TableCell align="left">
                <p>
                  <NavLink to="/Product/Vouchers/Expired">
                    {strings.EXPIRED}
                  </NavLink>
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <div className="flex justify-around items-center invoiceHeader-class"></div>
    </section>
  );
}

export default VoucherHeader;
