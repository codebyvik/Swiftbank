import React, { useEffect, useState } from "react";
import { Avatar, Button, TextField, Typography, Card, CardContent, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import logo from "../../assets/logo-transparent.png";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import Title from "../../utils/Page_title";
import AlertUser from "../../utils/show_alert";
import { sendresetLink } from "../../redux/auth/auth.slice";

const ForgotPassword = () => {
  Title("Swiftbank | Frogot password");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (user) {
      navigate(location.state?.fromLocation || "/");
    }
  }, [user, navigate, location]);

  const [credentials, setCredentials] = useState({ email: "" });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email) {
      return AlertUser("Enter email", "error");
    }
    dispatch(sendresetLink(credentials));
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
                Forgot password
              </Typography>
            </Box>

            <form noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={credentials.email}
                onChange={handleChange}
              />

              <Button sx={{ my: 3 }} type="submit" fullWidth variant="contained" color="primary">
                Send Reset Link
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
