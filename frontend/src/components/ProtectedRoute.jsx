import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role")?.toLowerCase(); // Normalize to lowercase
  const location = useLocation();

  console.log("ProtectedRoute Check:");
  console.log("Token:", token);
  console.log("User Role:", userRole);
  console.log("Allowed Roles:", allowedRoles);

  if (!token) {
    console.warn("No token found, redirecting to login...");
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.warn(`Unauthorized role (${userRole}), redirecting to default dashboard...`);
    const roleRedirects = {
      admin: "/admin-dashboard",
      clinician: "/clinician-dashboard",
      clinical_instructor: "/instructor-dashboard",
    };

    return <Navigate to={roleRedirects[userRole] || "/"} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
