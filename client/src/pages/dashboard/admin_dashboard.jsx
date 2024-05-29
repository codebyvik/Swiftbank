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
import { AccountTree, ArrowForward, CurrencyRupee } from "@mui/icons-material";
import Title from "../../utils/Page_title";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  Title("Admin Dashboard");
  const { user } = useSelector((state) => state.user);
  const { accounts } = useSelector((state) => state.accounts);
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDashboardStart());
  }, [dispatch]);

  // format date
  dayjs.extend(calendar);

  dayjs().calendar();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" my={2}>
              All accounts
            </Typography>
            {/* Replace with dynamic data */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Account Number</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Replace with dynamic data */}
                  {accounts?.map((account) => {
                    return (
                      <TableRow key={account.account_id}>
                        <TableCell>
                          {dayjs(account.createdAt).calendar(null, {
                            sameElse: "DD/MM/YYYY h:mm A",
                          })}
                        </TableCell>
                        <TableCell>{account.account_number}</TableCell>
                        <TableCell>{account.branch.branch_name}</TableCell>

                        <TableCell>{account.account_type}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography textAlign="end" my={2}>
              <Link to="/accounts">
                <Button variant="text" color="primary">
                  View all Accounts <ArrowForward />
                </Button>
              </Link>
            </Typography>
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
        <Link to="/branches">
          <Button startIcon={<AccountTree />} variant="contained" color="primary" sx={{ mr: 2 }}>
            view branches
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
