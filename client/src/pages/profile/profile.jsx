import React, { useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(profile);
  };

  return (
    <div>
      <Typography variant="h4">Profile</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Change Password</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Current Password"
            name="currentPassword"
            value={profile.currentPassword}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="New Password"
            name="newPassword"
            value={profile.newPassword}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            value={profile.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
