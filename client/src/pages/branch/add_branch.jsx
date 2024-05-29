import { useState } from "react";
import { Button, TextField, Grid, Typography, Box, FormControl, Divider } from "@mui/material";
import { Done } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import Title from "../../utils/Page_title";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import AlertUser from "../../utils/show_alert";
import { addBranchStart } from "../../redux/branches/branches.slice";

const AddBranch = () => {
  Title(`Add branch`);

  const dispatch = useDispatch();

  const [phoneNo, setPhoneNo] = useState("");
  const [branchDetails, setBranchDetails] = useState({
    branch_name: "",
    email: "",
    phone_pin: "",
    phone_number: "",
    city: "",
    street: "",
    state: "",
    country: "",
    pincode: "",
    IFSC: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranchDetails({ ...branchDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = await verifyNewData();

    if (updatedFields) {
      dispatch(addBranchStart(branchDetails));
    }
  };

  const verifyNewData = async () => {
    // check updated fields and create new object with new data
    for (const value in branchDetails) {
      // check if fields are empty
      if (!branchDetails[value]) {
        AlertUser("Fields can't be empty", "error");
        return null;
      }
    }
    if (branchDetails.pincode.length !== 6) {
      AlertUser("Enter correct pincode", "error");
      return null;
    }

    if (!matchIsValidTel(`+${branchDetails.phone_pin}${branchDetails.phone_number}`)) {
      AlertUser("Enter valid telephone number", "error");
      return null;
    }
    return true;
  };

  return (
    <Box
      sx={{
        maxWidth: { sm: "100%", md: "80%" },
        marginX: "auto",
        mt: -3,
        padding: 2,
      }}
    >
      <Typography color="primary" mb={4} variant="h4">
        Add Branch
      </Typography>

      {/* PROFILE DETAILS */}
      <Box sx={{ boxShadow: 2, padding: 2 }}>
        <form noValidate onSubmit={handleSubmit}>
          <Divider sx={{ mb: 2 }}>Branch details</Divider>
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={12} md={6}>
              {/* Email */}
              <TextField
                variant="outlined"
                required
                id="branch_name"
                label="Branch Name"
                name="branch_name"
                type="text"
                value={branchDetails.branch_name}
                onChange={handleChange}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Email */}
              <TextField
                variant="outlined"
                required
                id="IFSC"
                label="IFSC Code"
                name="IFSC"
                type="text"
                value={branchDetails.IFSC}
                onChange={handleChange}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiTelInput
                value={phoneNo}
                onChange={(value, info) => {
                  setPhoneNo(value);
                  branchDetails.phone_pin = parseInt(info.countryCallingCode);
                  branchDetails.phone_number = info.nationalNumber;
                }}
                name="phone_number"
                label="Phone Number"
                placeholder="+91 1234567890"
                required
                id="phone_number"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Email */}
              <TextField
                variant="outlined"
                required
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={branchDetails.email}
                onChange={handleChange}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }}>Address</Divider>

          <FormControl sx={{ width: "100%" }}>
            {/* Address */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  sx={{ width: "100%" }}
                  name="street"
                  label="street"
                  type="text"
                  id="street"
                  value={branchDetails.street}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: "100%" }}
                  name="city"
                  label="city"
                  type="text"
                  id="city"
                  value={branchDetails.city}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: "100%" }}
                  name="state"
                  label="state"
                  type="text"
                  id="state"
                  value={branchDetails.state}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: "100%" }}
                  name="country"
                  label="country"
                  type="text"
                  id="country"
                  value={branchDetails.country}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: "100%" }}
                  name="pincode"
                  label="pincode"
                  type="number"
                  id="pincode"
                  value={branchDetails.pincode}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <Grid container justifyContent="center" alignItems="center" spacing={3}>
              <Grid item>
                <Button
                  sx={{ my: 3, width: { xs: "100%", md: "200px" } }}
                  type="submit"
                  variant="contained"
                  color="success"
                  startIcon={<Done />}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default AddBranch;
