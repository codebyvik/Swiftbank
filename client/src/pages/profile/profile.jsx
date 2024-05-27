import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  styled,
  Divider,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { UpdateUserStart } from "../../redux/auth/auth.slice";

import Title from "../../utils/Page_title";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

import AlertUser from "../../utils/show_alert";
import SimpleBackdrop from "../../utils/backdrop";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  Title(`${user?.first_name} ${user?.last_name}`);

  const [phoneNo, setPhoneNo] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_pin: "",
    avatar: "",
    phone_number: "",
    user_gender: "",
    nationality: "",
    user_dateOfBirth: "",
    user_profession: "",
    user_maritalStatus: "",
    city: "",
    street: "",
    state: "",
    country: "",
    pincode: "",
    curr_password: "",
    new_password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: `http://localhost:8000/users/avatars/${user.avatar}`,
        email: user.email,
        phone_pin: user.phone_pin,
        phone_number: user.phone_number,
        user_gender: user.user_gender,
        nationality: user.nationality,
        user_dateOfBirth: dayjs(user.user_dateOfBirth),
        user_profession: user.user_profession,
        user_maritalStatus: user.user_maritalStatus,
        city: user.city,
        street: user.street,
        state: user.state,
        country: user.country,
        pincode: user.pincode,
      });
      setPhoneNo(`+${user.phone_pin}${user.phone_number}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setNewAvatar(e.target.files[0]);
      const cachedFile = URL.createObjectURL(e.target.files[0]);

      profile.avatar = cachedFile;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = await verifyNewData();

    if (!!updatedFields.entries().next().value) {
      dispatch(UpdateUserStart({ id: user.id, updatedFields }));
    }
  };

  const verifyNewData = async () => {
    // check updated fields and create new object with new data

    let newData = new FormData();

    for (const value in profile) {
      if (profile[value] === user[value]) {
        continue;
      }

      if (value === "avatar") {
        newData.append(value, newAvatar);
        continue;
      }

      if (value === "user_dateOfBirth") {
        if (dayjs(profile[value]).format() === user[value]) {
          continue;
        }
      }

      // check if the field is password related
      if (value === "curr_password" || value === "new_password" || value === "confirmPassword") {
        // if any of the password field is there then check if all are filled and new password === confirm password

        if (profile.curr_password && profile.new_password && profile.confirmPassword) {
          if (profile.new_password !== profile.confirmPassword) {
            AlertUser("New Password and Confirm password doesn't match ", "error");
            return null;
          } else if (profile.new_password.length < 8) {
            AlertUser("Password should be more than 8 characters", "error");
            return false;
          }
        } else if (profile.curr_password || profile.new_password || profile.confirmPassword) {
          AlertUser("Current Password , New Password and Confirm password is required ", "error");
          return null;
        } else {
          continue;
        }
      }

      // check if fields are empty
      if (!profile[value]) {
        AlertUser("Fields can't be empty", "error");
        return null;
      }

      newData.append(value, profile[value]);
    }

    if (newData.pincode) {
      if (newData.pincode.length !== 6) {
        AlertUser("Enter correct pincode", "error");
        return null;
      }
    }

    if (newData.phone_pin || newData.phone_number)
      if (!matchIsValidTel(`+${newData.phone_pin}${newData.phone_number}`)) {
        AlertUser("Enter valid telephone number", "error");
        console.log("new", newData);
        return null;
      }

    return newData;
  };

  return (
    <>
      {!user ? (
        <SimpleBackdrop open />
      ) : (
        <Box
          sx={{
            maxWidth: { sm: "sm", md: "100%" },
            marginX: "auto",
            mt: -3,
            padding: 2,
          }}
        >
          <Typography mb={4} textAlign="center" variant="h4">
            Profile
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* AVATAR AND UPLOAD AVATAR */}
            <Box
              sx={{
                boxShadow: 1,
                flex: 3,
                margin: { xs: "0 0 10px 0 ", md: "-400px 0 0 30px" },
                padding: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                src={profile?.avatar}
                sx={{
                  width: { xs: "100px", md: "200px" },
                  height: { xs: "100px", md: "200px" },
                  fontSize: { xs: "24px", md: "64px" },
                  my: 3,
                }}
                alt="profile image"
              >
                {user?.first_name.charAt(0)}
              </Avatar>

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
                onChange={handleAvatarChange}
              >
                Upload file
                <VisuallyHiddenInput type="file" accept="image/png, image/jpeg " />
              </Button>
            </Box>

            {/* PROFILE DETAILS */}
            <Box sx={{ boxShadow: 1, flex: 9, padding: 2 }}>
              <form noValidate onSubmit={handleSubmit}>
                <Box sx={{ display: { xs: "block", md: "flex" }, justifyContent: "space-between" }}>
                  <Box sx={{ flex: 6 }}>
                    <Divider sx={{ my: 4 }}>Basic details </Divider>

                    {/* USER NAME */}
                    <Grid container spacing={2} marginTop={1}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="First Name"
                          value={profile.first_name}
                          onChange={handleChange}
                          id="first_name"
                          name="first_name"
                          required
                          sx={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Last Name"
                          value={profile.last_name}
                          onChange={handleChange}
                          name="last_name"
                          id="last_name"
                          required
                          sx={{ width: "100%" }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="user_gender_label">Gender</InputLabel>
                          <Select
                            labelId="user_gender_label"
                            id="user_gender"
                            value={profile.user_gender}
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
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="nationality_label">Nationality</InputLabel>
                          <Select
                            labelId="nationality_label"
                            id="nationality"
                            value={profile.nationality}
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
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl sx={{ width: "100%" }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              onChange={(e) => {
                                profile.user_dateOfBirth = dayjs(e.$d).format();
                              }}
                              name="user_dateOfBirth"
                              value={profile.user_dateOfBirth ? profile.user_dateOfBirth : null}
                              label="Date of birth"
                              sx={{ width: "100%" }}
                              format="DD-MM-YYYY"
                              maxDate={dayjs(Date.now())}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="user_profession_label">Profession</InputLabel>
                          <Select
                            labelId="user_profession_label"
                            id="user_profession"
                            value={profile.user_profession}
                            name="user_profession"
                            label="Profession"
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
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="user_maritalStatus_label">Marital status</InputLabel>
                          <Select
                            labelId="user_maritalStatus_label"
                            id="user_maritalStatus"
                            value={profile.user_maritalStatus}
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
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={{ flex: 5, marginLeft: 2 }}>
                    <Divider sx={{ my: 4 }}>Update contact information </Divider>
                    <Grid container spacing={2} marginTop={1}>
                      <Grid item xs={12}>
                        {/* Telephone number */}
                        <MuiTelInput
                          value={phoneNo}
                          onChange={(value, info) => {
                            setPhoneNo(value);
                            profile.phone_pin = parseInt(info.countryCallingCode);
                            profile.phone_number = info.nationalNumber;
                          }}
                          name="phone_number"
                          label="Phone Number"
                          placeholder="+91 1234567890"
                          required
                          id="phone_number"
                          sx={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {/* Email */}
                        <TextField
                          variant="outlined"
                          required
                          id="email"
                          label="Email Address"
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={handleChange}
                          sx={{ width: "100%" }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                <Divider sx={{ my: 4 }}>Update Address</Divider>

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
                        value={profile.street}
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
                        value={profile.city}
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
                        value={profile.state}
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
                        value={profile.country}
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
                        value={profile.pincode}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                  </Grid>

                  {/* Password */}
                  <Divider sx={{ my: 4 }}>Change Password</Divider>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        name="curr_password"
                        label="Current Password"
                        type="password"
                        id="current_password"
                        value={profile.curr_password}
                        onChange={handleChange}
                        sx={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        name="new_password"
                        label="New Password"
                        type="password"
                        id="new_password"
                        value={profile.new_password}
                        onChange={handleChange}
                        sx={{ width: "100%" }}
                      />
                      <TextField
                        required
                        name="confirmPassword"
                        label="confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={profile.confirmPassword}
                        onChange={handleChange}
                        sx={{ width: "100%", mt: 2 }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container justifyContent="center" alignItems="center">
                    <Button
                      sx={{ my: 3, width: { xs: "100%", md: "500px" } }}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Update
                    </Button>
                  </Grid>
                </FormControl>
              </form>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Profile;
