import { Navigate } from "react-router-dom";
const protectedRoute = ({ children }) => {
  // if user not signed in
  if (!user) {
    <Navigate to="/signin" />;
  }

  return children;
};
