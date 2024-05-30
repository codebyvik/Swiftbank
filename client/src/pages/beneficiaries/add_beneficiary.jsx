import React, { useState } from "react";
import { Typography, TextField, Button, Grid, Box, Card } from "@mui/material";
import AlertUser from "../../utils/show_alert";
import { useDispatch } from "react-redux";
import { addBeneficiaryStart } from "../../redux/beneficiaries/beneficiaries.slice";

function AddBeneficiary() {
  const dispatch = useDispatch();
  const [beneficiary, setBeneficiary] = useState({
    name: "",
    bank_name: "SwiftBank",
    account_number: "",
    transfer_limit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBeneficiary({ ...beneficiary, [name]: value });
  };

  const handleSubmit = () => {
    for (const item in beneficiary) {
      if (!beneficiary[item]) {
        return AlertUser("Fill all fields", "error");
      }
    }
    dispatch(addBeneficiaryStart(beneficiary));
  };

  return (
    <Box sx={{ width: { xs: "100%", md: "60%" }, margin: "auto" }}>
      <Typography variant="h4" color="primary" my={3}>
        Add Beneficiary
      </Typography>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Nick Name"
              name="name"
              value={beneficiary.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Account Number"
              name="account_number"
              maxLength={12}
              value={beneficiary.account_number}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Bank Name" value={beneficiary.bank_name} fullWidth disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Transfer Limit"
              name="transfer_limit"
              value={beneficiary.transfer_limit}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add Beneficiary
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default AddBeneficiary;
