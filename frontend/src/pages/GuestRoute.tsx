import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../lib/store/userStore";
import getAccessToken from "../lib/cookies/getAccessToken";


const GuestRoute = () => {
  const token = getAccessToken();
  const user = useUserStore((state) => state.user);

  if (token && user) return <Navigate to="/" />;

  return <Outlet />;
};

export default GuestRoute;
