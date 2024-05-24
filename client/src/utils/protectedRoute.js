import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  // if user not signed in
  if (!user) {
    <Navigate to="/signin" />;
  }

  return children;
};
