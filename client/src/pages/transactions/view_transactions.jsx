import { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Collapse,
  IconButton,
  Card,
  Button,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { CurrencyRupee, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Title from "../../utils/Page_title";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { fetchTransactionStart } from "../../redux/transactions/transactions.slice";
import BackButton from "../../utils/__back_button";

function Row(props) {
  const { user, transaction } = props;
  const [open, setOpen] = useState(false);

  // format date
  dayjs.extend(calendar);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {dayjs(transaction.createdAt).calendar(null, {
            sameElse: "DD/MM/YYYY h:mm A",
          })}
        </TableCell>
        <TableCell
          align="center"
          sx={{ textOverflow: "ellipsis", display: { xs: "none", sm: "table-cell" } }}
        >
          {transaction.description}
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center" gap={1}>
            <CurrencyRupee /> {transaction.amount_transferred}
          </Stack>
        </TableCell>
        <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
          {`${transaction?.From_account_id?.user?.first_name} 
                          ${transaction?.From_account_id?.user?.last_name}`}
        </TableCell>
        <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
          {`${transaction?.To_account_id?.user?.first_name} 
                          ${transaction?.To_account_id?.user?.last_name}`}
        </TableCell>
        {user && user.user_type === "admin" ? (
          <TableCell>
            {transaction.from_account_id === transaction.to_account_id
              ? "Self Transfer"
              : "Credit/Debit"}
          </TableCell>
        ) : (
          <TableCell>
            {transaction.from_account_id === transaction.to_account_id
              ? "Self Transfer"
              : user.id === transaction?.From_account_id?.user_id &&
                user.id !== transaction?.To_account_id?.user_id
              ? "Debit"
              : "Credit"}
          </TableCell>
        )}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                More Details
              </Typography>
              <Table size="small" aria-label="more-details">
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>From Account</TableCell>
                    <TableCell align="right">To Account</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={transaction.transaction_id}>
                    <TableCell component="th" scope="row">
                      {transaction.transaction_id}
                    </TableCell>

                    <TableCell>{transaction?.From_account_id?.account_number}</TableCell>
                    <TableCell align="right">
                      {transaction?.To_account_id?.account_number}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Table
                sx={{ display: { xs: "table", sm: "none" } }}
                size="small"
                aria-label="more-details"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>From </TableCell>
                    <TableCell>To </TableCell>
                    <TableCell width="400px" align="right">
                      Descritption
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={transaction.transaction_id}>
                    <TableCell component="th" scope="row">
                      {`${transaction?.From_account_id?.user?.first_name} 
                          ${transaction?.From_account_id?.user?.last_name}`}
                    </TableCell>
                    <TableCell>
                      {`${transaction?.To_account_id?.user?.first_name} 
                          ${transaction?.To_account_id?.user?.last_name}`}
                    </TableCell>
                    <TableCell width="400px" align="right">
                      {transaction.description}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function Transactions() {
  Title("transactions");
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    page: 1,
    transactionType: "",
    sort: "DESC",
  });

  useEffect(() => {
    dispatch(fetchTransactionStart(payload));
  }, [dispatch, payload]);

  const { user } = useSelector((state) => state.user);
  const { transactions, totalPages } = useSelector((state) => state.transactions);

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
        Transactions
      </Typography>

      <Grid container spacing={3} my={2}>
        <Grid item>
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
        <Grid item>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={payload.transactionType}
              label="Age"
              onChange={handleChange}
              name="transactionType"
              sx={{ width: "200px" }}
            >
              <MenuItem value="">All transaction</MenuItem>
              <MenuItem value="debit">Debit</MenuItem>
              <MenuItem value="credit">Credit</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {transactions?.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ maxWidth: "100%", mt: 3 }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Date</TableCell>
                  <TableCell align="center" sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    Description
                  </TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>From</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>To</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions?.map((transaction) => (
                  <Row key={transaction.transaction_id} user={user} transaction={transaction} />
                ))}
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
          <Typography>No transactions found</Typography>
          {user && user.user_type === "customer" ? (
            <Button variant="text" href="/send">
              click here to send money
            </Button>
          ) : (
            <></>
          )}
        </Card>
      )}
    </Box>
  );
}

export default Transactions;
