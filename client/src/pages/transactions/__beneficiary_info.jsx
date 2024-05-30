import { TextField, MenuItem, Grid, FormControl, InputLabel, Select } from "@mui/material";

const BeneficiarySection = ({ transactionDetails, handleChange, beneficiary }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <InputLabel id="beneficiary_label">Select Beneficiary</InputLabel>
          <Select
            labelId="beneficiary_label"
            id="beneficiary"
            label="Select Benficiary"
            name="beneficiary"
            value={transactionDetails?.beneficiary?.account_number || ""}
            onChange={handleChange}
          >
            <MenuItem disabled value="">
              <em>None</em>
            </MenuItem>
            {beneficiary &&
              beneficiary.map((ben) => {
                return (
                  <MenuItem key={ben?.account_number} value={ben?.account_number}>
                    {ben?.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Beneficiary account number"
          value={transactionDetails?.beneficiary?.account_number || ""}
          fullWidth
          disabled
        ></TextField>
      </Grid>
    </Grid>
  );
};

export default BeneficiarySection;
