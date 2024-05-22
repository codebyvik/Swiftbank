import { Typography, Card, CardContent, Button, Grid } from "@mui/material";

const CustomerDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h4">Account Balance: $X,XXX.XX</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5">Recent Transactions</Typography>
            {/* Replace with dynamic data */}
            <Typography>Date: 2024-05-22, Description: Grocery Store, Amount: -$50.00</Typography>
            <Typography>Date: 2024-05-21, Description: Salary, Amount: +$2,000.00</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" href="/send-money">
          Send Money
        </Button>
        <Button variant="contained" color="secondary" href="/transactions">
          View Transactions
        </Button>
        <Button variant="contained" href="/add-beneficiary">
          Add Beneficiary
        </Button>
        <Button variant="contained" href="/profile">
          Profile
        </Button>
      </Grid>
    </Grid>
  );
};

export default CustomerDashboard;
