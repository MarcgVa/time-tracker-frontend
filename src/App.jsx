import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./features/Shared/components/ProtectedRoute";
import Layout from "./features/Shared/components/Layout";
import Dashboard from "./features/Projects/pages/ProjectPage";
import ProjectDetailsPage from "./features/Projects/pages/ProjectDetailsPage";
import InvoicePage from "./features/Invoices/pages/InvoicePage";
import InvoiceDetails from "./features/Invoices/pages/InvoiceDetails";
import Profile from "./features/Users/pages/ProfilePage";
import HelpPage from "./features/PublicPages/pages/HelpPage";
import HomePage from "./features/PublicPages/pages/HomePage";
import AboutPage from "./features/PublicPages/pages/AboutPage";
import ContactPage from "./features/PublicPages/pages/ContactPage";
import LoginSignupPage from "./features/Auth/pages/LoginSignupPage";
import DashboardPage from "./features/Dashboard/pages/DashboardPage";
import { AppLayout } from "./features/Shared/components/AppLayout";
import { TimeEntryPage } from "./features/TimeEntry/pages/TimeEntryPage";

function App() {
  return (
    <Routes>
      /* Public Routes */
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginSignupPage />} />
        <Route path="/signup" element={<LoginSignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      /* Protected Routes */
      <Route element={<AppLayout />}>
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
        <Route path="/time" element={<ProtectedRoute />}>
          <Route path="/time" element={<TimeEntryPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
