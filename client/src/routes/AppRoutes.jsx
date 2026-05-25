import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "../pages/public/LandingPage";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";

// Client Pages
import ClientDashboard from "../pages/client/Dashboard";
import MyTherapist from "../pages/client/MyTherapist";

// Therapist Pages
import TherapistDashboard from "../pages/therapist/Dashboard";
import Clients from "../pages/therapist/Clients";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
import TherapistLayout from "../layouts/TherapistLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Client Routes */}
        <Route path="/client" element={<ClientLayout />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="my-therapist" element={<MyTherapist />} />
        </Route>

        {/* Therapist Routes */}
        <Route path="/therapist" element={<TherapistLayout />}>
          <Route path="dashboard" element={<TherapistDashboard />} />
          <Route path="clients" element={<Clients />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;