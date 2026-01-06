import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const AuthGuard = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default AuthGuard;
