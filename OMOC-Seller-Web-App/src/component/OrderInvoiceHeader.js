import React from "react";
import { strings } from "../utils/strings";
import { NavLink } from "react-router-dom";
import "../assets/CommonStyling/CommonStyling.css";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function OrderInvoiceHeader() {
  return (
    <section className="rounded-xl bg-white mb-4 mt-6">
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="invoiceHeader-class">
              <TableCell align="left">
                <p>
                  <NavLink to="/Order/New-order">{strings.NEW_ORDER}</NavLink>
                </p>
              </TableCell>
              <TableCell align="left">
                <p>
                  <NavLink to="/Order/Ready-to-delivery">
                    {strings.READY_TO_DELIVERY}
                  </NavLink>
                </p>
              </TableCell>
              <TableCell align="left">
                <p>
                  <NavLink to="/Order/Delivered">{strings.DELIVERED}</NavLink>
                </p>
              </TableCell>
              <TableCell align="left">
                <p>
                  <NavLink to="/Order/Completed-order">
                    {strings.COMPLETED_ORDER}
                  </NavLink>
                </p>
              </TableCell>
              <TableCell align="left">
                <p>
                  <NavLink to="/Order/Complain">{strings.COMPLAIN}</NavLink>
                </p>
              </TableCell>
              <TableCell align="left">
                <p>
                  <NavLink to="/Order/Invoice">{strings.INVOICE}</NavLink>
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </section>
  );
}

export default OrderInvoiceHeader;
