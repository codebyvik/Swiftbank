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
import { fetchAllAccounts } from "../../redux/accounts/account.slice";
import Title from "../../utils/Page_title";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { Link } from "react-router-dom";
import BackButton from "../../utils/__back_button";

// format date
dayjs.extend(calendar);

const AllAccounts = () => {
  Title("Swiftbank | All accounts");
  const { accounts, totalPages } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    page: 1,
    sort: "DESC",
    name: "",
  });

  useEffect(() => {
    dispatch(fetchAllAccounts(payload));
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
        All Accounts
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
        <Grid item xs={12} md={4}>
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
      </Grid>

      {accounts?.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Name </TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts?.map((account) => {
                  return (
                    <TableRow key={account.account_id}>
                      <TableCell>
                        {dayjs(account.createdAt).calendar(null, {
                          sameElse: "DD/MM/YYYY h:mm A",
                        })}
                      </TableCell>
                      <TableCell>{account.account_number}</TableCell>
                      <TableCell>{`${account.user?.first_name} ${account.user?.last_name}`}</TableCell>
                      <TableCell>{account.branch?.branch_name}</TableCell>

                      <TableCell>{account.account_type}</TableCell>
                      <TableCell>
                        <Link to={`/account-info/${account.user_id}`}>
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

export default AllAccounts;
