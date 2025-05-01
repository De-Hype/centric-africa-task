// components/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import getAccessToken from "../lib/cookies/getAccessToken";
import { useUserStore } from "../lib/store/userStore";
import { FetchMyAccountAPI } from "../lib/services/userService";

const ProtectedRoute = () => {
  const token = getAccessToken();
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      if (!token) return setLoading(false);
      try {
        const userData = await FetchMyAccountAPI(); 
        console.log(userData.data, "This is user data")
        setUser(userData.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateUser();
  }, [token, setUser]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!token || !user) return <Navigate to="/sign-in" />;

  return <Outlet />;
};

export default ProtectedRoute;
