import React, { useState } from "react";
import { Typography, TextField, Button, MenuItem, Grid, Box } from "@mui/material";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
const steps = ["Select beneciary", "enter amount", "confirm"];

function InitiateTransaction() {
  const [transaction, setTransaction] = useState({
    fromAccount: "",
    toBeneficiary: "",
    amount: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(transaction);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Typography variant="h4">Send Money</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            select
            label="From Account"
            name="fromAccount"
            value={transaction.fromAccount}
            onChange={handleChange}
            fullWidth
          >
            {/* Replace with dynamic data */}
            <MenuItem value="account1">Account 1</MenuItem>
            <MenuItem value="account2">Account 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="To Beneficiary"
            name="toBeneficiary"
            value={transaction.toBeneficiary}
            onChange={handleChange}
            fullWidth
          >
            {/* Replace with dynamic data */}
            <MenuItem value="beneficiary1">John Doe</MenuItem>
            <MenuItem value="beneficiary2">Jane Smith</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Amount"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Remarks"
            name="remarks"
            value={transaction.remarks}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Send Money
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default InitiateTransaction;
