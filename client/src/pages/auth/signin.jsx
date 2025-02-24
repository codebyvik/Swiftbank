import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import logo from "../../assets/logo-transparent.png";
import { useDispatch, useSelector } from "react-redux";
import { SigninUserStart } from "../../redux/auth/auth.slice";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../../utils/Page_title";
import AlertUser from "../../utils/show_alert";

const SignIn = () => {
  Title("Swiftbank |SignIn");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (user) {
      navigate(location.state?.fromLocation || "/");
    }
  }, [user, navigate, location]);

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const item in credentials) {
      if (!credentials[item]) {
        return AlertUser("Both the fields are required", "error");
      }
    }
    dispatch(SigninUserStart(credentials));
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
                Sign In
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleChange}
              />
              <Button sx={{ my: 3 }} type="submit" fullWidth variant="contained" color="primary">
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default SignIn;
