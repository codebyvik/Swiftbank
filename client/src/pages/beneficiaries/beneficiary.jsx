import React, { useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";

function Beneficiary() {
  const [beneficiary, setBeneficiary] = useState({
    name: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    nickname: "",
  });

  const handleChange = (e) => {
    setBeneficiary({ ...beneficiary, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(beneficiary);
  };

  return (
    <div>
      <Typography variant="h4">Edit Beneficiary</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            value={beneficiary.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Account Number"
            name="accountNumber"
            value={beneficiary.accountNumber}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Bank Name"
            name="bankName"
            value={beneficiary.bankName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="IFSC Code"
            name="ifscCode"
            value={beneficiary.ifscCode}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nickname"
            name="nickname"
            value={beneficiary.nickname}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Edit Beneficiary
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Beneficiary;
