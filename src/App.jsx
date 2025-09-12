import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/Layout";
import Logo from "./components/logo/Logo";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Login from "./pages/Login";


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route element={<Layout />}></Route>
          <Route index element={<Logo />}></Route>
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<Dashboard />}></Route>
          </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/invoices" element={<ProtectedRoute />}>
            <Route index element={<Invoices />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
