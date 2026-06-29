import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import LandingPage from "../pages/public/LandingPage";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin Pages
import AdminDashboard from "../pages/admin/adminDashboard";
import AdminTherapists from "../pages/admin/adminTherapists";
import AdminClients from "../pages/admin/adminClients";
import AdminIntakeForms from "../pages/admin/adminIntakeForms";

// Client Pages
import ClientDashboard from "../pages/client/clientDashboard";
import ClientMyTherapist from "../pages/client/clientMyTherapist";
import ClientSessions from "../pages/client/clientSessions";

// Therapist Pages
import TherapistDashboard from "../pages/therapist/therapistDashboard";
import TherapistClients from "../pages/therapist/therapistClients";
import TherapistSessions from "../pages/therapist/therapistSessions";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
import TherapistLayout from "../layouts/TherapistLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute role="admin"> <AdminLayout /> </ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="therapists" element={<AdminTherapists />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="/admin/intake-forms" element={<AdminIntakeForms />} />
        </Route>

        {/* Client */}
        <Route path="/client" element={<ProtectedRoute role="client"> <ClientLayout /> </ProtectedRoute>}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="my-therapist" element={<ClientMyTherapist />} />
          <Route path="sessions" element={<ClientSessions />} />
        </Route>

        {/* Therapist */}
        <Route path="/therapist" element={<ProtectedRoute role="therapist"> <TherapistLayout /> </ProtectedRoute>}>
          <Route path="dashboard" element={<TherapistDashboard />} />
          <Route path="clients" element={<TherapistClients />} />
          <Route path="sessions" element={<TherapistSessions />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;