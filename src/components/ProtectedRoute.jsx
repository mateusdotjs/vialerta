import { useContext } from "react";
import { userContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loggedIn, loading } = useContext(userContext);

  if (loading == true || loading == undefined) {
    return "Carregando...";
  } else {
    if (loggedIn) return children;
    else return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
