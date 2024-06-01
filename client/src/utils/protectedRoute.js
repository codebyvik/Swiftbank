import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import SimpleBackdrop from "./backdrop";

export const ProtectedAdminRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return isAuthenticated && user?.user_type === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedCustomerRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return isAuthenticated && user?.user_type === "customer" ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedRoute = () => {
  const { isAuthenticated, status } = useSelector((state) => state.user);
  const location = useLocation();
  const currlocation = location.pathname;

  if (status === "processed") {
    return isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" state={{ fromLocation: currlocation }} />
    );
  } else {
    if (status === "fetching") {
      return <SimpleBackdrop open />;
    }
  }
};
