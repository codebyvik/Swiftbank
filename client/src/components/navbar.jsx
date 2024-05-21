import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ margin: 10 }}>
      <h1>Logo</h1>
      signout btn
      <Link to="/profile" style={{ padding: 5 }}>
        <p>profile icon</p>
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
    </nav>
  );
};

export default Navbar;
