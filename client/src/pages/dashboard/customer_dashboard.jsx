import {
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  Table,
  TableHead,
  Box,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStart } from "../../redux/accounts/account.slice";
import { Add, ArrowForward, CurrencyRupee, Groups, SendToMobile } from "@mui/icons-material";
import Title from "../../utils/Page_title";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { Link } from "react-router-dom";
import AddMoney from "../transactions/__add_money";

const CustomerDashboard = () => {
  Title("Dashboard");
  const { user } = useSelector((state) => state.user);
  const { account } = useSelector((state) => state.accounts);
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDashboardStart());
  }, [dispatch]);

  // format date
  dayjs.extend(calendar);

  dayjs().calendar();

  const [AddModal, setAddModal] = useState(false);

  const handleModal = () => {
    setAddModal(true);
  };
  return (
    <Box sx={{ width: { xs: "100%", lg: "70%" }, margin: "auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography color="primary" variant="h5">
                      Account Balance:
                    </Typography>
                    <CurrencyRupee color="primary" />
                    <Typography color="primary" variant="h5">
                      {account?.balance}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "flex-start", md: "flex-end" },
                  }}
                  item
                  xs={12}
                  md={3}
                >
                  <Button startIcon={<Add />} onClick={handleModal} variant="contained">
                    Add money
                  </Button>

                  <AddMoney openModal={AddModal} setopenModel={setAddModal} />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Link to={`/account-info/${user?.id}`}>
                    <Button endIcon={<ArrowForward />} variant="text">
                      View account info
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography color="primary" variant="h5" my={2}>
                Recent Transactions
              </Typography>
              {/* Replace with dynamic data */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="center">Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>From</TableCell>
                      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>To</TableCell>
                      <TableCell>Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Replace with dynamic data */}
                    {transactions?.map((transaction) => {
                      return (
                        <TableRow key={transaction.transaction_id}>
                          <TableCell>
                            {dayjs(transaction.createdAt).calendar(null, {
                              sameElse: "DD/MM/YYYY h:mm A",
                            })}
                          </TableCell>
                          <TableCell align="center" width="400px">
                            {transaction.description}
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" alignItems="center" gap={1}>
                              <CurrencyRupee /> {transaction.amount_transferred}
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                            {`${transaction?.From_account_id?.user?.first_name} 
                          ${transaction?.From_account_id?.user?.last_name}`}
                          </TableCell>
                          <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                            {`${transaction?.To_account_id?.user?.first_name} 
                          ${transaction?.To_account_id?.user?.last_name}`}
                          </TableCell>
                          <TableCell>
                            {transaction.from_account_id === transaction.to_account_id
                              ? "Deposit"
                              : user.id === transaction?.From_account_id?.user_id &&
                                user.id !== transaction?.To_account_id?.user_id
                              ? "Debit"
                              : "Credit"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography textAlign="end" my={2}>
                <Link to="/transactions">
                  <Button endIcon={<ArrowForward />} variant="text" color="primary">
                    View all Transactions
                  </Button>
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Link to="/send-money">
            <Button startIcon={<SendToMobile />} variant="contained" color="primary" sx={{ mr: 2 }}>
              Send Money
            </Button>
          </Link>

          <Link to="/beneficiaries">
            <Button startIcon={<Groups />} sx={{ mr: 2 }} variant="contained">
              View Beneficiaries
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerDashboard;
