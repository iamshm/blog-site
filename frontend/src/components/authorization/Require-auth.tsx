import useAuthenticated from "@/hooks/use-authenticated";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RequireAuth = () => {
  const { hasToken } = useAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasToken) {
      navigate("/signin");
    }
  }, [hasToken, navigate]);

  return <Outlet />;
};

export default RequireAuth;
