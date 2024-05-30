import { TextField, Grid } from "@mui/material";

const ConfirmSection = ({ transactionDetails, handleChange }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Beneficiary Name"
          value={transactionDetails?.beneficiary?.name}
          fullWidth
          disabled
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Beneficiary account number"
          value={transactionDetails?.beneficiary?.account_number}
          fullWidth
          disabled
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Amount"
          name="amount"
          value={transactionDetails.amount}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          name="description"
          value={transactionDetails.description}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Transaction PIN"
          name="transaction_PIN"
          value={transactionDetails.transaction_PIN}
          onChange={handleChange}
          fullWidth
          type="password"
        />
      </Grid>
    </Grid>
  );
};

export default ConfirmSection;
