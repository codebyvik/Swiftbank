import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import BackButton from "../../utils/__back_button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AlertUser from "../../utils/show_alert";
import { resetPIN } from "../../redux/auth/auth.slice";
import Title from "../../utils/Page_title";

const ResetPin = () => {
  Title("Swiftbank | Reset PIN");
  const [credentials, setCredentials] = useState({
    current_PIN: "",
    new_PIN: "",
    confirm_PIN: "",
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.new_PIN !== credentials.confirm_PIN) {
      return AlertUser("New PIN and confirm PIN don't match", "error");
    }
    if (!credentials.current_PIN || !credentials.new_PIN || !credentials.confirm_PIN) {
      return AlertUser("All fields are required", "error");
    }
    dispatch(resetPIN(credentials));
  };

  return (
    <Box sx={{ width: { xs: "100%", lg: "70%" }, margin: "auto" }}>
      <BackButton location="/" />
      <Typography variant="h4" color="primary" my={3}>
        Reset PIN
      </Typography>
      <Card sx={{ padding: 4 }}>
        <CardContent>
          <Box>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="current_PIN"
                label="Enter Current PIN"
                name="current_PIN"
                value={credentials.current_PIN}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="new_PIN"
                label="New PIN"
                name="new_PIN"
                autoFocus
                value={credentials.new_PIN}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="confirm_PIN"
                label="Confirm PIN"
                name="confirm_PIN"
                value={credentials.confirm_PIN}
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

export default ResetPin;
