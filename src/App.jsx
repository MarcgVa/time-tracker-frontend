import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetail";
import Invoices from "./pages/Invoices";
import Authenticate from "./pages/Auth";
import InvoiceDetails from "./pages/InvoiceDetails";
import { Profile } from "./pages/Profile";
import { Help } from './pages/Help';




function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route element={<Layout />}></Route>
          <Route index element={<Authenticate />}></Route>
          <Route path="/auth/login" element={<Authenticate />}></Route>
                 
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/invoices" element={<ProtectedRoute />}>
            <Route path="/invoices" element={<Invoices />} />
          </Route>
          <Route path="/invoices/:id" element={<ProtectedRoute />}>
            <Route path="/invoices/:id" element={<InvoiceDetails />} />
          </Route>
          <Route path="/projects/:id" element={<ProtectedRoute />}>
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Route>
          <Route path="/help" element={<Help />} />
            
          <Route path="/profile" element={<ProtectedRoute />}> 
            <Route path="/profile" element={<Profile />} /> 
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
