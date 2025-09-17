import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/Layout";
import Logo from "./components/logo/Logo";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetail";
import Invoices from "./pages/Invoices";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import './App.css'
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route element={<Layout />}></Route>
          <Route index element={<Logo />}></Route>
          <Route path="/auth/signup" element={<Signup />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/invoices" element={<ProtectedRoute />}>
            <Route path="/invoices" element={<Invoices />} />
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
