import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "../pages/public/LandingPage";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Therapists from "../pages/admin/Therapists";
import AdminClientsPage from "../pages/admin/Clients";

// Client Pages
import ClientDashboard from "../pages/client/Dashboard";
import MyTherapist from "../pages/client/MyTherapist";
import Sessions from "../pages/client/Sessions";

// Therapist Pages
import TherapistDashboard from "../pages/therapist/Dashboard";
import TherapistClientsPage from "../pages/therapist/Clients";
import TherapistSessions from "../pages/therapist/Sessions";

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
          <Route path="therapists" element={<Therapists />} />
          <Route path="clients" element={<AdminClientsPage />} />
        </Route>

        {/* Client Routes */}
        <Route path="/client" element={<ClientLayout />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="my-therapist" element={<MyTherapist />} />
          <Route path="sessions" element={<Sessions />} />
        </Route>

        {/* Therapist Routes */}
        <Route path="/therapist" element={<TherapistLayout />}>
          <Route path="dashboard" element={<TherapistDashboard />} />
          <Route path="clients" element={<TherapistClientsPage />} />
          <Route path="sessions" element={<TherapistSessions />} />
        </Route>

        


      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;