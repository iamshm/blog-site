import { Navigate, Route, Routes } from "react-router-dom";
import AntiAuth from "./components/authorization/Anti-auth";
import RequireAuth from "./components/authorization/Require-auth";
import useAuthenticated from "./hooks/use-authenticated";
import Blog from "./screens/Blog";
import Dashboard from "./screens/Dashboard";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";

const App = () => {
  const { hasToken } = useAuthenticated();
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={hasToken ? "/dashboard" : "/signin"} />}
      />

      <Route element={<AntiAuth />}>
        <Route path="/signup" element={<Signup />} />

        <Route path="/signin" element={<Signin />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/profile" element={<div>My Profile</div>} />
      </Route>
    </Routes>
  );
};

export default App;
