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
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStart } from "../../redux/accounts/account.slice";
import { ArrowForward, CurrencyRupee, Groups, Payments } from "@mui/icons-material";
import Title from "../../utils/Page_title";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { Link } from "react-router-dom";

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

  console.log("account", account);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5">
                  Account Balance: <CurrencyRupee /> {account?.balance}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                item
                xs={12}
                md={6}
              >
                <Link to="/account/info">
                  <Button variant="text">
                    View account info <ArrowForward />
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
            <Typography variant="h5" my={2}>
              Recent Transactions
            </Typography>
            {/* Replace with dynamic data */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
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
                        <TableCell width="400px">{transaction.description}</TableCell>
                        <TableCell>
                          <CurrencyRupee /> {transaction.amount_transferred}
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
                            ? "Self Transfer"
                            : user.id === transaction.from_account_id &&
                              user.id !== transaction.to_account_id
                            ? "Credit"
                            : "Debit"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography textAlign="end" my={2}>
              <Link to="/transactions">
                <Button variant="text" color="primary">
                  View all Transactions <ArrowForward />
                </Button>
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Link to="/send-mony">
          <Button startIcon={<Payments />} variant="contained" color="primary" sx={{ mr: 2 }}>
            Send Money
          </Button>
        </Link>

        <Link to="/add-beneficiary">
          <Button sx={{ mr: 2 }} variant="contained">
            <Groups />
            View Beneficiaries
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default CustomerDashboard;
