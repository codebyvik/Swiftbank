import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import NotFound from "./utils/404_notFound";
import Profile from "./pages/profile/profile";
import AccountInfo from "./pages/accounts/account_info";
import AllAccounts from "./pages/accounts/all_accounts";
import Transactions from "./pages/transactions/view_transactions";
import CustomerDashboard from "./pages/dashboard/customer_dashboard";
import AdminDashboard from "./pages/dashboard/admin_dashboard";
import AddBeneficiary from "./pages/beneficiaries/add_beneficiary";

import Beneficiary from "./pages/beneficiaries/beneficiary";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Sidebar from "./components/sidebar";
import { Box, CssBaseline, ThemeProvider, styled } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import ViewBeneficiaries from "./pages/beneficiaries/view_beneficiaries";
import { useDispatch, useSelector } from "react-redux";

import { createTheme } from "@mui/material";
import { fetchUserStart } from "./redux/auth/auth.slice";
import { SnackbarProvider } from "notistack";
import {
  ProtectedAdminRoute,
  ProtectedCustomerRoute,
  ProtectedRoute,
} from "./utils/protectedRoute";
import SimpleBackdrop from "./utils/backdrop";
import InitiateTransaction from "./pages/transactions/initiate_transaction";
import { toggleDarkMode } from "./redux/config.slice";
import AllBranches from "./pages/branch/view_branches";
import Branch from "./pages/branch/branch";
import AddBranch from "./pages/branch/add_branch";
import Success from "./pages/transactions/__success";
import ResetPassword from "./pages/auth/reset_password";
import ForgotPassword from "./pages/auth/forgot_password";
import ResetPin from "./pages/auth/reset_PIN";

function App() {
  const mode = useSelector((state) => state.config.mode);
  const userMode = localStorage.getItem("mode");
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleDarkMode(userMode));
    return () => dispatch(fetchUserStart());
    // eslint-disable-next-line
  }, [dispatch]);

  const customTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: `${mode === "light" ? "#4774e6" : "#90caf9"}`,
      },
    },
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
    marginTop: 20,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={2000}
        preventDuplicate
      />

      <Router>
        <Box sx={{ display: "flex" }}>
          {user ? (
            <>
              <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
              <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            </>
          ) : (
            <></>
          )}
          <Box
            component="main"
            sx={{ flexGrow: 1, maxWidth: { xs: "80%", md: "100%" }, p: 3, margin: "auto" }}
          >
            {user ? <DrawerHeader /> : <></>}
            {loading && !isAuthenticated ? <SimpleBackdrop open /> : <></>}
            <Routes>
              {/* common  routes */}
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/reset/:id" element={<ResetPassword />}></Route>
              <Route path="/forgot-password" element={<ForgotPassword />}></Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/transactions" element={<Transactions />}></Route>
                <Route path="/account-info/:id" element={<AccountInfo />}></Route>
                <Route
                  path="/"
                  element={user?.user_type === "admin" ? <AdminDashboard /> : <CustomerDashboard />}
                ></Route>
                {/* customer only routes */}
                <Route element={<ProtectedCustomerRoute />}>
                  <Route path="/send-money" element={<InitiateTransaction />}></Route>
                  <Route path="/send-money/success/:id" element={<Success />}></Route>
                  <Route path="/beneficiaries/:id" element={<Beneficiary />}></Route>
                  <Route path="/beneficiaries" element={<ViewBeneficiaries />}></Route>
                  <Route path="/beneficiaries/add" element={<AddBeneficiary />}></Route>
                  <Route path="/reset-pin" element={<ResetPin />}></Route>
                </Route>
                {/* Admin only routes */}
                <Route element={<ProtectedAdminRoute />}>
                  <Route path="/accounts" element={<AllAccounts />}></Route>
                  <Route path="/branch" element={<AllBranches />}></Route>
                  <Route path="/branch-info/:id" element={<Branch />}></Route>
                  <Route path="/branch/add" element={<AddBranch />}></Route>
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
