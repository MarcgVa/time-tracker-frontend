import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetail";
import Invoices from "./pages/Invoices";
import Login from "./pages/Login";
import InvoiceDetails from "./pages/InvoiceDetails";
import './App.css'



function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route element={<Layout />}></Route>
          <Route index element={<Login />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
                 
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
                
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
