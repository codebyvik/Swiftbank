import { TextField, Grid } from "@mui/material";

const AmountSection = ({ transactionDetails, handleChange }) => {
  return (
    <Grid container spacing={3}>
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
    </Grid>
  );
};

export default AmountSection;
