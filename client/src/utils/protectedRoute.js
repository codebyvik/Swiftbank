// import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import SimpleBackdrop from "./backdrop";

export const ProtectedAdminRoute = () => {
  const user_type = localStorage.getItem("user_type");
  const isLoggedIn = localStorage.getItem("loggedIn");
  return isLoggedIn && user_type === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedCustomerRoute = () => {
  const user_type = localStorage.getItem("user_type");
  const isLoggedIn = localStorage.getItem("loggedIn");
  return isLoggedIn && user_type === "customer" ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedRoute = () => {
  // const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const location = useLocation();
  const currlocation = location.pathname;
  const isLoggedIn = localStorage.getItem("loggedIn");

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" state={{ fromLocation: currlocation }} />;
};
