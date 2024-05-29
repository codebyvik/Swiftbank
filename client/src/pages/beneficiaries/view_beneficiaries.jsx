import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function ViewBeneficiaries() {
  return (
    <div>
      <Typography variant="h4">Beneficiaries</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Bank Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Replace with dynamic data */}
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>XXXX-XXXX-XXXX-1234</TableCell>
              <TableCell>ABC Bank</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
                <Button variant="contained" color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>XXXX-XXXX-XXXX-5678</TableCell>
              <TableCell>XYZ Bank</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  <a href="/beneficiaries/:id">view/edit</a>
                </Button>
                <Button variant="contained" color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" href="/beneficiaries/add">
        Add New Beneficiary
      </Button>
    </div>
  );
}

export default ViewBeneficiaries;
