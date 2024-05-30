import {
  Typography,
  Card,
  Button,
  Grid,
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  Table,
  TableHead,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Pagination,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../utils/Page_title";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { Link } from "react-router-dom";
import { fetchAllbranchesStart } from "../../redux/branches/branches.slice";
import { Add } from "@mui/icons-material";
import BackButton from "../../utils/__back_button";

// format date
dayjs.extend(calendar);

const AllBranches = () => {
  Title("All branches");
  const { branches, totalPages } = useSelector((state) => state.branches);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    page: 1,
    sort: "DESC",
    name: "",
  });

  useEffect(() => {
    dispatch(fetchAllbranchesStart(payload));
  }, [dispatch, payload]);

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
      <Typography color="primary" variant="h5" my={2}>
        Branches
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
          <Link to="/branch/add">
            <Button startIcon={<Add />} variant="contained">
              Add Branch
            </Button>
          </Link>
        </Grid>
      </Grid>

      {branches?.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Branch Name</TableCell>
                  <TableCell>Email </TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>IFSC</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {branches?.map((branch) => {
                  return (
                    <TableRow key={branch.branchId}>
                      <TableCell>
                        {dayjs(branch.createdAt).calendar(null, {
                          sameElse: "DD/MM/YYYY h:mm A",
                        })}
                      </TableCell>
                      <TableCell>{branch.branch_name}</TableCell>
                      <TableCell>{branch.email}</TableCell>
                      <TableCell>{branch.city}</TableCell>

                      <TableCell>{branch.IFSC}</TableCell>
                      <TableCell>
                        <Link to={`/branch-info/${branch.branchId}`}>
                          <Button variant="text">view/edit</Button>
                        </Link>
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
          }}
        >
          <Typography>No Accounts found</Typography>
        </Card>
      )}
    </Box>
  );
};

export default AllBranches;
