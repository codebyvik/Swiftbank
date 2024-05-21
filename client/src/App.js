import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import NotFound from "./utils/404_notFound";
import Profile from "./pages/profile/profile";
import AccountInfo from "./pages/accounts/account_info";
import AllAccounts from "./pages/accounts/all_accounts";
import Transaction from "./pages/transactions/transaction";
import AllTransactions from "./pages/transactions/all_transactions";
import CustomerDashboard from "./pages/dashboard/customer_dashboard";
import AdminDashboard from "./pages/dashboard/admin_dashboard";
import AddBenificiary from "./pages/beneficiaries/add_beneficiary";
import AllBeneficiaries from "./pages/beneficiaries/all_beneficiaries";
import Beneficiary from "./pages/beneficiaries/beneficiary";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<CustomerDashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/account" element={<AccountInfo />}></Route>
        <Route path="/account/all" element={<AllAccounts />}></Route>
        <Route path="/admin/accounts" element={<AllAccounts />}></Route>
        <Route path="/transaction" element={<Transaction />}></Route>
        <Route path="/transaction/all" element={<AllTransactions />}></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/beneficiary" element={<Beneficiary />}></Route>
        <Route path="/beneficiary/all" element={<AllBeneficiaries />}></Route>
        <Route path="/beneficiary/add" element={<AddBenificiary />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
