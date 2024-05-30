import React, { useEffect, useState } from "react";
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
  Box,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Pagination,
  Card,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBeneficiaryStart,
  fetchAllBeneficiariesStart,
} from "../../redux/beneficiaries/beneficiaries.slice";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import BackButton from "../../utils/__back_button";

dayjs.extend(calendar);

function ViewBeneficiaries() {
  const dispatch = useDispatch();

  const { beneficiaries, totalPages } = useSelector((state) => state.beneficiaries);

  const [payload, setPayload] = useState({
    page: 1,
    sort: "DESC",
    name: "",
  });

  useEffect(() => {
    dispatch(fetchAllBeneficiariesStart(payload));
  }, [dispatch, payload]);

  const handleDelete = (id) => {
    dispatch(deleteBeneficiaryStart({ id: id }));
  };

  const handlePagination = (event, value) => {
    setPayload({ ...payload, page: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value, page: 1 });
  };

  return (
    <Box sx={{ width: { xs: "100%", lg: "70%" }, margin: "auto" }}>
      <BackButton location="/" />
      <Typography color="primary" variant="h4">
        Beneficiaries
      </Typography>

      <Grid container spacing={3} alignItems="center" justifyContent="center" mb={2}>
        <Grid item xs={12} md={8}>
          <TextField
            onChange={handleChange}
            label="Search by name"
            variant="outlined"
            fullWidth
            name="name"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              value={payload.sort}
              label="Sort By"
              onChange={handleChange}
              name="sort"
            >
              <MenuItem value="DESC">Descending</MenuItem>
              <MenuItem value="ASC">Ascending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <Link to="/beneficiaries/add">
            <Button variant="contained" color="primary">
              Add Beneficiary
            </Button>
          </Link>
        </Grid>
      </Grid>

      {beneficiaries?.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ my: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Created on</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beneficiaries &&
                  beneficiaries?.map((beneficiary) => {
                    return (
                      <TableRow key={beneficiary?.beneficiary_id}>
                        <TableCell>
                          {dayjs(beneficiary?.createdAt).calendar(null, {
                            sameElse: "DD/MM/YYYY h:mm A",
                          })}
                        </TableCell>
                        <TableCell> {beneficiary?.name}</TableCell>
                        <TableCell>{beneficiary?.account_number}</TableCell>
                        <TableCell>{beneficiary?.bank_name}</TableCell>
                        <TableCell>
                          <Link to={`/beneficiaries/${beneficiary?.beneficiary_id}`}>
                            <Button sx={{ mr: 1 }} color="primary">
                              view/edit
                            </Button>
                          </Link>

                          <Button
                            onClick={() => handleDelete(beneficiary?.beneficiary_id)}
                            variant="contained"
                            color="error"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <Pagination
              onChange={handlePagination}
              page={payload.page}
              count={totalPages}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Card
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
        >
          <Typography>No benefeciaries found</Typography>
        </Card>
      )}
    </Box>
  );
}

export default ViewBeneficiaries;
