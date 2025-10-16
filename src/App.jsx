import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./features/shared/components/ProtectedRoute";
import Layout from "./features/shared/components/Layout";
import Dashboard from "./features/Projects/pages/ProjectPage";
import ProjectDetailsPage from "./features/Projects/pages/ProjectDetailsPage";
import InvoicePage from "./features/Invoices/pages/InvoicePage";
import InvoiceDetails from "./features/Invoices/pages/InvoiceDetails";
import Profile from "./features/Users/pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginSignupPage from "./features/Auth/pages/LoginSignupPage";
import DashboardPage from "./features/Dashboard/pages/DashboardPage";

function App() {
  return (
    <Routes>
      /* Public Routes */
      <Route element={<Layout />} />
      <Route index element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginSignupPage />} />
      <Route path="/signup" element={<LoginSignupPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/contact" element={<ContactPage />} />
      /* Protected Routes */
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="/projects" element={<ProtectedRoute />}>
        <Route path="/projects" element={<Dashboard />} />
      </Route>
      <Route path="/invoices" element={<ProtectedRoute />}>
        <Route path="/invoices" element={<InvoicePage />} />
      </Route>
      <Route path="/invoices/:id" element={<ProtectedRoute />}>
        <Route path="/invoices/:id" element={<InvoiceDetails />} />
      </Route>
      <Route path="/projects/:id" element={<ProtectedRoute />}>
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
      </Route>
      <Route path="/profile" element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
