import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <Link to="/profile" style={{ padding: 5 }}>
        profile
      </Link>
      <Link to="/account" style={{ padding: 5 }}>
        account
      </Link>
      <Link to="/account/all" style={{ padding: 5 }}>
        all accounts
      </Link>
      <Link to="/admin/accounts" style={{ padding: 5 }}>
        all accounts
      </Link>
      <Link to="/transaction" style={{ padding: 5 }}>
        transaction
      </Link>
      <Link to="/transaction/all" style={{ padding: 5 }}>
        transaction/all
      </Link>
      <Link to="/dashboard" style={{ padding: 5 }}>
        dahsboard
      </Link>
      <Link to="/admin/dashboard" style={{ padding: 5 }}>
        admin dashboard
      </Link>
      <Link to="/beneficiary" style={{ padding: 5 }}>
        beneficary
      </Link>
      <Link to="/beneficiary/all" style={{ padding: 5 }}>
        beneficary/all
      </Link>
      <Link to="/beneficiary/add" style={{ padding: 5 }}>
        add benefciary
      </Link>
      <Link to="/signin" style={{ padding: 5 }}>
        Signin
      </Link>
      <Link to="/signup" style={{ padding: 5 }}>
        Signup
      </Link>
      <Link to="/signout" style={{ padding: 5 }}>
        Signout
      </Link>
    </>
  );
};

export default Sidebar;
