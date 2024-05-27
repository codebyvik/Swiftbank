import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import SimpleBackdrop from "./backdrop";

export const ProtectedAdminRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return isAuthenticated && user ? <Outlet /> : <Navigate to="signin" />;
};

export const ProtectedCustomerRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return isAuthenticated && user ? <Outlet /> : <Navigate to="signin" />;
};

export const ProtectedRoute = () => {
  // const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const location = useLocation();
  const currlocation = location.pathname;
  const isLoggedIn = localStorage.getItem("loggedIn");

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" state={{ fromLocation: currlocation }} />;
};
