import { useEffect } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { AccountBalance, CurrencyRupee, LockReset } from "@mui/icons-material/";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAccountStart, toggleAccountStart } from "../../redux/accounts/account.slice";
import dayjs from "dayjs";

import calendar from "dayjs/plugin/calendar";
import BackButton from "../../utils/__back_button";

// format date
dayjs.extend(calendar);

function AccountInfo() {
  const { user } = useSelector((state) => state.user);
  const { account } = useSelector((state) => state.accounts);
  const params = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccountStart({ id: params.id }));
  }, [dispatch, params]);

  const handleUserStatusToggle = (e) => {
    const payload = { id: account.user.id, isActive: account.user.isActive ? "false" : "true" };

    dispatch(toggleAccountStart(payload));
  };

  return (
    <Container component="main" sx={{ width: { xs: "100%", lg: "70%" }, margin: "auto" }}>
      {user && user?.user_type === "admin" ? (
        <BackButton location="/accounts" />
      ) : (
        <BackButton location="/" />
      )}
      <Stack alignItems="center" direction="row" gap={2} sx={{ my: 2 }}>
        <AccountBalance color="primary" />
        <Typography color="primary" variant="h4">
          Account Summary
        </Typography>
      </Stack>
      <Card>
        {account ? (
          <CardContent>
            {user && user.user_type === "admin" ? (
              <Box>
                <Divider sx={{ mb: 2 }}>User Details </Divider>
                <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                  <Typography variant="h6">User name :</Typography>
                  <Typography variant="subtitle" component="p" fontSize={18}>
                    {account.user.first_name} {account.user.last_name}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                  <Typography variant="h6">Email :</Typography>
                  <Typography variant="body">{account.user.email}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                  <Typography variant="h6"> Phone No: </Typography>
                  <Typography variant="subtitle" component="p" fontSize={18}>
                    {`+${account.user.phone_pin} ${account.user.phone_number}`}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                  <Typography variant="h6">Address : </Typography>
                  <Typography variant="subtitle" component="p" fontSize={18}>
                    {` ${account.user.street} , ${account.user.city} ,
                ${account.user.state} - ${account.user.pincode}`}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                  <Typography variant="h6"> DOB : </Typography>
                  <Typography variant="subtitle" component="p" fontSize={18}>
                    {dayjs(account.user.user_dateOfBirth).format("MM/DD/YYYY")} (DD/MM/YYYY)
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                  <Typography variant="h6"> Occupation : </Typography>
                  <Typography variant="subtitle" component="p" fontSize={18}>
                    {account.user.user_occupation}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                  <Typography variant="h6"> Marriage Status : </Typography>
                  <Typography variant="subtitle" component="p" fontSize={18}>
                    {account.user.user_maritalStatus}
                  </Typography>
                </Stack>
              </Box>
            ) : (
              <></>
            )}
            <Divider sx={{ my: 4 }}>Account Details </Divider>
            <Box>
              <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                <Typography variant="h6">Account Type :</Typography>
                <Typography variant="subtitle" component="p" fontSize={18}>
                  {account.account_type}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                <Typography variant="h6">Account Balance :</Typography>
                <CurrencyRupee />
                <Typography variant="body">{account.balance}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                <Typography variant="h6"> Account created on : </Typography>
                <Typography variant="subtitle" component="p" fontSize={18}>
                  {dayjs(account.createdAt).format("LLL")}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                <Typography variant="h6">Account Number : </Typography>
                <Typography variant="subtitle" component="p" fontSize={18}>
                  {account.account_number}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                <Typography variant="h6"> IFSC : </Typography>
                <Typography variant="subtitle" component="p" fontSize={18}>
                  {account.branch.IFSC}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                <Typography variant="h6">Account Status :</Typography>

                {user && user.user_type === "admin" ? (
                  <>
                    <Typography
                      variant="subtitle"
                      component="p"
                      color={account?.user?.isActive ? "green" : "red"}
                    >
                      {account?.user?.isActive ? "Active" : "Deactive"}
                    </Typography>
                    <Button
                      onClick={handleUserStatusToggle}
                      variant="contained"
                      color={account?.user?.isActive ? "error" : "success"}
                    >
                      {account?.user?.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </>
                ) : (
                  <Typography
                    variant="subtitle"
                    component="p"
                    color={user?.isActive ? "green" : "red"}
                  >
                    {user?.isActive ? "Active" : "Deactive"}
                  </Typography>
                )}
              </Stack>
            </Box>
            <Divider sx={{ my: 4 }}>Branch Details </Divider>

            <Box>
              <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                <Typography variant="h6">Branch Name : </Typography>
                <Typography variant="subtitle" component="p" fontSize={18}>
                  {account.branch.branch_name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                <Typography variant="h6">phone-no : </Typography>
                <Typography variant="subtitle" component="p" fontSize={18}>
                  {` +${account.branch.phone_pin} ${account.branch.phone_number}`}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                <Typography variant="h6">email: </Typography>
                <Typography variant="subtitle" component="p" fontSize={18}>
                  {account.branch.email}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2} sx={{ my: 2 }}>
                <Typography variant="h6">Address :</Typography>
                <Typography variant="subtitle" component="p" fontSize={18}>
                  {` ${account.branch.street} , ${account.branch.city} ,
                ${account.branch.state} - ${account.branch.pincode}`}
                </Typography>
              </Stack>
            </Box>

            {user && user?.user_type === "customer" ? (
              <Link
                to="/reset-pin"
                style={{ display: "flex", justifyContent: "flex-end", textDecoration: "none" }}
              >
                <Button
                  startIcon={<LockReset />}
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Reset PIN
                </Button>
              </Link>
            ) : (
              <></>
            )}
          </CardContent>
        ) : (
          <>
            <Typography variant="h6">Account details not found</Typography>
          </>
        )}
      </Card>
      {/* ACTIONS */}
    </Container>
  );
}

export default AccountInfo;
