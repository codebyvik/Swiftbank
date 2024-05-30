import React, { useEffect, useState } from "react";
import { Avatar, Button, TextField, Typography, Card, CardContent, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import logo from "../../assets/logo-transparent.png";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import Title from "../../utils/Page_title";
import AlertUser from "../../utils/show_alert";
import { resetpassword } from "../../redux/auth/auth.slice";

const ResetPassword = () => {
  Title("Frogot password");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  useEffect(() => {
    if (user) {
      navigate(location.state?.fromLocation || "/");
    }
  }, [user, navigate, location]);

  const [credentials, setCredentials] = useState({
    new_password: "",
    confirm_password: "",
    OTP: "",
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.new_password !== credentials.confirm_password) {
      return AlertUser("New Password and confirm password don't match", "error");
    }
    if (!credentials.OTP || credentials.OTP.length < 4 || credentials.OTP.length > 4) {
      return AlertUser("Enter 4 Digit OTP", "error");
    }

    const payload = {
      id: params.id,
      credentials,
    };

    dispatch(resetpassword(payload));
  };

  return (
    <Box sx={{ width: "500px", marginX: "auto", mt: 15 }}>
      <Card sx={{ padding: 4 }}>
        <CardContent>
          <Box>
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
                Reset Password
              </Typography>
            </Box>

            <form noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="text"
                id="otp"
                label="Enter OTP"
                name="OTP"
                value={credentials.OTP}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="New Password"
                name="new_password"
                autoFocus
                value={credentials.new_password}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="Confirmpassword"
                label="Confirm password"
                name="confirm_password"
                value={credentials.confirm_password}
                onChange={handleChange}
              />

              <Button sx={{ my: 3 }} type="submit" fullWidth variant="contained" color="primary">
                Save changes
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResetPassword;
