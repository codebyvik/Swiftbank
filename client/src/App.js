import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import NotFound from "./utils/404_notFound";
import Profile from "./pages/profile/profile";
import AccountInfo from "./pages/accounts/account_info";
import AllAccounts from "./pages/accounts/all_accounts";
import Transaction from "./pages/transactions/transaction";
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
import { ProtectedRoute } from "./utils/protectedRoute";
import SimpleBackdrop from "./utils/backdrop";

function App() {
  const mode = useSelector((state) => state.config.mode);
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(fetchUserStart());
  }, [dispatch]);

  const customLightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#4774e6",
      },
    },
  });
  const customDarkTheme = createTheme({
    palette: {
      mode: "dark",
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
    <ThemeProvider theme={mode === "light" ? customLightTheme : customDarkTheme}>
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
        <Box sx={{ transition: "all 0.3s linear", display: "flex" }}>
          {user ? (
            <>
              <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
              <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            </>
          ) : (
            <></>
          )}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {user ? <DrawerHeader /> : <></>}
            {loading && !isAuthenticated ? <SimpleBackdrop open /> : <></>}
            <Routes>
              {/* common  routes */}
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/transactions" element={<Transactions />}></Route>
                <Route path="/transactions/:id" element={<Transaction />}></Route>
                <Route path="/account/info" element={<AccountInfo />}></Route>
                <Route path="/" element={<CustomerDashboard />}></Route>
              </Route>

              {/* customer only routes */}

              <Route path="/beneficiaries/:id" element={<Beneficiary />}></Route>
              <Route path="/beneficiaries" element={<ViewBeneficiaries />}></Route>
              <Route path="/beneficiaries/add" element={<AddBeneficiary />}></Route>

              {/* Admin only routes */}
              <Route path="/accounts" element={<AllAccounts />}></Route>
              <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
