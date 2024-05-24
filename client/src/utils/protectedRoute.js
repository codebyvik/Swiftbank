import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// export const ProtectedRoute = ({ children }) => {
//   const user = useSelector((state) => state.user.user);
//   // if user not signed in
//   if (!user) {
//     <Navigate to="/signin" />;
//   }

//   return children;
// };

export const ProtectedRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return isAuthenticated && user ? <Outlet /> : <Navigate to="signin" />;
};
