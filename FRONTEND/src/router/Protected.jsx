import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FullLoader from "../fallback/FullLoader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullLoader/>
  }

  else if (!user) {
    return <Navigate to="/" replace />;
  }

  else{
  return children;
    }
};

export default ProtectedRoute;
