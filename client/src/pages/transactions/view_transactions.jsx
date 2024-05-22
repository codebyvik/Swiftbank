import React from "react";
import {
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function Transactions() {
  return (
    <div>
      <Typography variant="h4">Transactions</Typography>
      <TextField label="Search" variant="outlined" fullWidth margin="normal" />
      {/* Add filters here */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Replace with dynamic data */}
            <TableRow>
              <TableCell>2024-05-22</TableCell>
              <TableCell>Grocery Store</TableCell>
              <TableCell>-$50.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2024-05-21</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>+$2,000.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Transactions;
