import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    console.log("Role loaded:", storedRole);
    if (storedRole) setRole(storedRole);
  }, []);
  

  return (
    <div className="flex">
      {role && <Sidebar role={role} />}
      <div className="p-4 w-full">{children}</div>
    </div>
  );
  
};

export default DashboardLayout;
