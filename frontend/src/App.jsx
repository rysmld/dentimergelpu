import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the new ProtectedRoute
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ClinicianDashboard from "./pages/ClinicianDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import UserPage from "./pages/UserPage";
import PatientsPage from "./pages/PatientsPage";
import CasesPage from "./pages/CasesPage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import Login from "./pages/Login";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clinician-dashboard"
          element={
            <ProtectedRoute allowedRoles={["clinician"]}>
              <DashboardLayout>
                <ClinicianDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["clinical instructor"]}>
              <DashboardLayout>
                <InstructorDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["admin", "clinical instructor"]}>
              <DashboardLayout>
                <UserPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clinician-patients"
          element={
            <ProtectedRoute allowedRoles={["clinician", "clinical instructor"]}>
              <DashboardLayout>
                <PatientsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clinician-cases"
          element={
            <ProtectedRoute allowedRoles={["clinician"]}>
              <DashboardLayout>
                <CasesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor-cases"
          element={
            <ProtectedRoute allowedRoles={["clinical instructor"]}>
              <DashboardLayout>
                <CasesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["admin", "clinician", "clinical instructor"]}>
              <DashboardLayout>
                <SettingsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute allowedRoles={["admin", "clinician", "clinical instructor"]}>
              <DashboardLayout>
                <HelpPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-All 404 Route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
