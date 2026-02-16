import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.kycVerified) {
    return <Navigate to="/kyc" />;
  }

  if (!user.bvnVerified) {
    return <Navigate to="/bvn" />;
  }

  return children;
};

export default ProtectedRoute;