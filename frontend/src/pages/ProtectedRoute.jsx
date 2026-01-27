import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import API from "../services/axiosInstance";
const ProtectedRoute = ({ roles }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
    API.get("/users/me")
      .then(res => {setUser(res.data);
      setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) 
    return <div>Loading...</div>;
  if (!user) 
    return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
