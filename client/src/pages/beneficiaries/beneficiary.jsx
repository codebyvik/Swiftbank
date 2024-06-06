import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Grid, Box, Card } from "@mui/material";
import AlertUser from "../../utils/show_alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchBeneficiaryStart,
  updateBeneficiaryStart,
} from "../../redux/beneficiaries/beneficiaries.slice";
import BackButton from "../../utils/__back_button";
import Title from "../../utils/Page_title";

function Beneficiary() {
  const dispatch = useDispatch();
  const params = useParams();
  const { beneficiary } = useSelector((state) => state.beneficiaries);

  const [beneficiaryDetails, setBeneficiaryDetails] = useState({
    name: "",
    bank_name: "SwiftBank",
    account_number: "",
    transfer_limit: "",
  });

  useEffect(() => {
    if (params.id) {
      dispatch(fetchBeneficiaryStart({ id: params.id }));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (beneficiary) {
      setBeneficiaryDetails({
        name: beneficiary.name,
        account_number: beneficiary.account_number,
        transfer_limit: beneficiary.transfer_limit,
      });
    }
  }, [beneficiary]);

  Title(`Swiftbank | ${beneficiary?.name}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBeneficiaryDetails({ ...beneficiaryDetails, [name]: value });
  };

  const handleUpdate = () => {
    // Handle form submission
    let newData = {};
    for (const item in beneficiaryDetails) {
      if (beneficiaryDetails[item] === beneficiary[item]) {
        continue;
      }
      if (!beneficiaryDetails[item]) {
        return AlertUser("Fill all fields", "error");
      }

      newData[item] = beneficiaryDetails[item];
    }

    if (Object.keys(newData).length <= 0) {
      return AlertUser("No changes to update", "warning");
    }

    dispatch(updateBeneficiaryStart({ id: params.id, updatedField: newData }));
  };

  return (
    <Box sx={{ width: { xs: "100%", md: "60%" }, margin: "auto" }}>
      <BackButton location="/beneficiaries" />
      <Typography variant="h4" color="primary" my={3}>
        Beneficiary Details
      </Typography>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Nick Name"
              name="name"
              value={beneficiaryDetails.name}
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
              value={beneficiaryDetails.account_number}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Bank Name"
              name="bank_name"
              value="SwiftBank"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Transfer Limit"
              name="transfer_limit"
              value={beneficiaryDetails.transfer_limit}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default Beneficiary;
