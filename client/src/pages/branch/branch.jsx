import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  FormControl,
  Divider,
  Card,
} from "@mui/material";
import { Delete, Done } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

import Title from "../../utils/Page_title";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import AlertUser from "../../utils/show_alert";
import SimpleBackdrop from "../../utils/backdrop";
import { fetchbranchStart, updateBranchStart } from "../../redux/branches/branches.slice";
import { useParams } from "react-router-dom";
import DeleteModal from "./delete_branch_modal";
import BackButton from "../../utils/__back_button";

const Branch = () => {
  const { branch } = useSelector((state) => state.branches);

  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(fetchbranchStart({ id: params.id }));
  }, [dispatch, params.id]);

  Title(`${branch?.branch_name}`);

  const [openModal, setopenModel] = useState(false);
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

  useEffect(() => {
    if (branch) {
      setBranchDetails({
        ...branchDetails,
        branch_name: branch.branch_name,
        email: branch.email,
        phone_pin: branch.phone_pin,
        phone_number: branch.phone_number,
        city: branch.city,
        street: branch.street,
        state: branch.state,
        country: branch.country,
        pincode: branch.pincode,
        IFSC: branch.IFSC,
      });
      setPhoneNo(`+${branch.phone_pin}${branch.phone_number}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBranchDetails({ ...branchDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = await verifyNewData();

    const payload = {
      id: params.id,
      updatedFields,
    };

    if (updatedFields) {
      return dispatch(updateBranchStart(payload));
    }
  };

  const verifyNewData = async () => {
    // check updated fields and create new object with new data

    let newData = {};

    for (const value in branchDetails) {
      if (branchDetails[value] === branch[value]) {
        continue;
      }

      // check if fields are empty
      if (!branchDetails[value]) {
        AlertUser("Fields can't be empty", "error");
        return null;
      }

      newData[value] = branchDetails[value];
    }

    if (newData.pincode) {
      if (newData.pincode.length !== 6) {
        AlertUser("Enter correct pincode", "error");
        return null;
      }
    }

    if (newData.phone_pin || newData.phone_number)
      if (!matchIsValidTel(`+${branchDetails.phone_pin}${branchDetails.phone_number}`)) {
        AlertUser("Enter valid telephone number", "error");
        return null;
      }

    if (Object.keys(newData).length > 0) {
      return newData;
    }

    AlertUser("Nothing to update", "warning");

    return null;
  };

  const handleDelete = () => {
    console.log("click");
    setopenModel(true);
  };

  return (
    <>
      {!branch ? (
        <SimpleBackdrop open />
      ) : (
        <Box
          sx={{
            maxWidth: { sm: "100%", md: "80%" },
            marginX: "auto",
            mt: -3,
            padding: 2,
          }}
        >
          <BackButton location="/branch" />
          <Typography color="primary" mb={4} variant="h4">
            Branch
          </Typography>
          {openModal ? <DeleteModal openModal={openModal} setopenModel={setopenModel} /> : <></>}

          {/* PROFILE DETAILS */}
          <Card>
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
                    <Grid item>
                      <Button
                        sx={{ my: 3, width: { xs: "100%", md: "200px" } }}
                        type="button"
                        variant="contained"
                        color="error"
                        startIcon={<Delete />}
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </FormControl>
              </form>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Branch;
