import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import logo from "../../assets/logo-transparent.png";
import { useDispatch, useSelector } from "react-redux";
import { SignUpUserStart } from "../../redux/auth/auth.slice";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../../utils/Page_title";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

import AlertUser from "../../utils/show_alert";
import { fetchAllbranchesStart } from "../../redux/branches/branches.slice";

const SignUp = () => {
  Title("Swiftbank | Signup");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { branches } = useSelector((state) => state.branches);

  // eslint-disable-next-line
  const [payload, setPayload] = useState({
    page: 1,
    sort: "DESC",
    name: "",
  });

  useEffect(() => {
    dispatch(fetchAllbranchesStart(payload));
  }, [dispatch, payload]);

  useEffect(() => {
    if (user) {
      navigate(location.state?.fromLocation || "/");
    }
  }, [user, navigate, location]);

  const [phoneNo, setPhoneNo] = useState("");
  const [credentials, setCredentials] = useState({
    user_type: "",
    first_name: "",
    account_type: "",
    last_name: "",
    email: "",
    phone_pin: "",
    phone_number: "",
    user_gender: "",
    nationality: "",
    user_dateOfBirth: "",
    user_occupation: "",
    user_maritalStatus: "",
    city: "",
    street: "",
    state: "",
    country: "",
    pincode: "",
    password: "",
    confirmPassword: "",
    branch_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verificationStatus = await verifyCredentials();
    if (verificationStatus) {
      const userCredentials = {
        credentials,
      };

      dispatch(SignUpUserStart(userCredentials));
    }
  };

  const verifyCredentials = async () => {
    for (const value in credentials) {
      if (value === "account_type") {
        if (credentials.user_type === "admin") {
          continue;
        }
      }
      if (value === "branch_id") {
        if (credentials.user_type === "admin") {
          continue;
        }
      }
      if (!credentials[value]) {
        AlertUser("Fill all required * fields", "error");
        return false;
      }
    }

    if (credentials.password.length < 8) {
      AlertUser("Password should be more than 8 characters", "error");
      return false;
    }

    if (credentials.password !== credentials.confirmPassword) {
      AlertUser("password and confirm password doesn't match", "error");
      return false;
    }

    if (credentials.pincode.length !== 6) {
      AlertUser("Enter correct pincode", "error");
      return false;
    }

    if (!matchIsValidTel(`+${credentials.phone_pin}${credentials.phone_number}`)) {
      AlertUser("Enter valid telephone number", "error");
      return false;
    }

    return true;
  };

  return (
    <Box sx={{ width: "500px", marginX: "auto" }}>
      <Card sx={{ padding: 4 }}>
        <CardContent>
          <Box>
            {/* header and logo */}
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <img src={logo} alt="Logo" width="200px" />

              <Typography
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 5 }}
                component="h1"
                variant="h5"
              >
                <Avatar sx={{ mr: 2 }}>
                  <LockOutlinedIcon />
                </Avatar>
                Sign Up
              </Typography>
            </Box>

            {/* form */}
            <form noValidate onSubmit={handleSubmit}>
              <FormControl sx={{ width: "100%" }}>
                {/* Account Type */}
                <InputLabel id="user_type_label">User Type</InputLabel>
                <Select
                  labelId="user_type_label"
                  id="user_type"
                  value={credentials.user_type}
                  name="user_type"
                  label="User Type *"
                  onChange={handleChange}
                >
                  <MenuItem disabled value="">
                    <em>Select user type</em>
                  </MenuItem>
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>

                {credentials.user_type === "customer" ? (
                  <>
                    <FormControl sx={{ mt: 2 }}>
                      <InputLabel id="account_type_label">Account Type</InputLabel>
                      <Select
                        labelId="account_type_label"
                        id="account_type"
                        value={credentials.account_type}
                        name="account_type"
                        label="Account Type *"
                        onChange={handleChange}
                      >
                        <MenuItem disabled value="">
                          <em>Select account type</em>
                        </MenuItem>
                        <MenuItem value="savings">Savings</MenuItem>
                        <MenuItem value="current">current</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 2 }}>
                      <InputLabel id="branch_name_label">Select Branch</InputLabel>
                      <Select
                        labelId="branch_name_label"
                        id="branch_name"
                        value={credentials.branch_id}
                        name="branch_id"
                        label="Select Branch *"
                        onChange={handleChange}
                      >
                        <MenuItem disabled value="">
                          <em>Select Branch </em>
                        </MenuItem>
                        {branches?.length > 0 ? (
                          branches.map((branch) => {
                            return (
                              <MenuItem key={branch.branchId} value={branch.branchId}>
                                {branch.branch_name}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem disabled value="">
                            <em>No branches available </em>
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </>
                ) : (
                  <></>
                )}

                {/* USER NAME */}
                <Box sx={{ my: 2, display: "flex", justifyContent: "space-between" }}>
                  <TextField
                    label="First Name"
                    value={credentials.first_name}
                    onChange={handleChange}
                    id="first_name"
                    name="first_name"
                    required
                  />
                  <TextField
                    label="Last Name"
                    value={credentials.last_name}
                    onChange={handleChange}
                    name="last_name"
                    id="last_name"
                    required
                  />
                </Box>
                {/* Telephone number */}
                <MuiTelInput
                  value={phoneNo}
                  onChange={(value, info) => {
                    setPhoneNo(value);
                    credentials.phone_pin = info.countryCallingCode;
                    credentials.phone_number = info.nationalNumber;
                  }}
                  name="phone_number"
                  label="Phone Number"
                  placeholder="+91 1234567890"
                  required
                  id="phone_number"
                />
                {/* Email */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                />
                {/* gender , nationality , DOB ,user_occupation */}
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                  <FormControl sx={{ width: "45%", my: 1 }}>
                    <InputLabel id="user_gender_label">Gender</InputLabel>
                    <Select
                      labelId="user_gender_label"
                      id="user_gender"
                      value={credentials.user_gender}
                      name="user_gender"
                      label="Gender *"
                      onChange={handleChange}
                    >
                      <MenuItem disabled value="">
                        <em>Select Gender</em>
                      </MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="others">others</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "45%", my: 1 }}>
                    <InputLabel id="nationality_label">Nationality</InputLabel>
                    <Select
                      labelId="nationality_label"
                      id="nationality"
                      value={credentials.nationality}
                      name="nationality"
                      label="Nationality"
                      onChange={handleChange}
                    >
                      <MenuItem disabled value="">
                        <em>Select Nationality</em>
                      </MenuItem>
                      <MenuItem value="indian">Indian</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "45%", my: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={(e) => {
                          credentials.user_dateOfBirth = dayjs(e.$d).format();
                        }}
                        name="user_dateOfBirth"
                        value={credentials.user_dateOfBirth ? credentials.user_dateOfBirth : null}
                        label="Date of birth"
                        sx={{ width: "100%" }}
                        format="DD-MM-YYYY"
                        maxDate={dayjs(Date.now())}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl sx={{ width: "45%", my: 1 }}>
                    <InputLabel id="user_occupation_label">Occupation</InputLabel>
                    <Select
                      labelId="user_occupation_label"
                      id="user_occupation"
                      value={credentials.user_occupation}
                      name="user_occupation"
                      label="Occupation"
                      onChange={handleChange}
                    >
                      <MenuItem disabled value="">
                        <em>Select profession</em>
                      </MenuItem>
                      <MenuItem value="salaried">Salaried</MenuItem>
                      <MenuItem value="self employed">Self Employed</MenuItem>
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="unemployed">unemployed</MenuItem>
                      <MenuItem value="others">others</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Marital status */}
                <FormControl sx={{ width: "100%", mt: 1 }}>
                  <InputLabel id="user_maritalStatus_label">Marital status</InputLabel>
                  <Select
                    labelId="user_maritalStatus_label"
                    id="user_maritalStatus"
                    value={credentials.user_maritalStatus}
                    name="user_maritalStatus"
                    label="Marital status"
                    onChange={handleChange}
                  >
                    <MenuItem disabled value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="unmarried">Unmarried</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </Select>
                </FormControl>

                {/* Address */}
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                  <TextField
                    sx={{ mt: 2, width: "100%" }}
                    name="street"
                    label="street"
                    type="text"
                    id="street"
                    value={credentials.street}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    name="city"
                    label="city"
                    type="text"
                    id="city"
                    value={credentials.city}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    name="state"
                    label="state"
                    type="text"
                    id="state"
                    value={credentials.state}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    name="country"
                    label="country"
                    type="text"
                    id="country"
                    value={credentials.country}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    name="pincode"
                    label="pincode"
                    type="number"
                    id="pincode"
                    value={credentials.pincode}
                    onChange={handleChange}
                    required
                  />
                </Box>

                {/* Password */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
                <TextField
                  required
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  value={credentials.confirmPassword}
                  onChange={handleChange}
                />
                <Button sx={{ my: 3 }} type="submit" fullWidth variant="contained" color="primary">
                  Sign Up
                </Button>
              </FormControl>

              <Grid container>
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
