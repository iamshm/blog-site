import useAuthenticated from "@/hooks/use-authenticated";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AntiAuth = () => {
  const { hasToken } = useAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (hasToken) {
      navigate("/dashboard");
    }
  }, [hasToken, navigate]);

  return <Outlet />;
};

export default AntiAuth;
