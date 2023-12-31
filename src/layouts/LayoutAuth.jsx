import { Navigate, useLocation } from "react-router-dom";

const LayoutAuth = ({ auth, children }) => {
  const { token, user } = auth;
  const location = useLocation();

  const isPage = ["/login", "/register"].includes(location.pathname);

  // ROLE ADMIN
  if (user.role && ["admin"].includes(user.role.name)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (isPage) return children;
    return <Navigate to="/login" replace />;
  }

  if (!token) {
    if (isPage) return children;

  }
  if (token && isPage) return <Navigate to="/" replace />;

  return children;
};

export default LayoutAuth;
