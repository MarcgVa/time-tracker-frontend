import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import Dashboard from "./pages/ProjectPage";
import ProjectDetails from "./pages/ProjectDetail";
import InvoicePage from "./pages/InvoicePage";
import Authenticate from "./pages/LoginSignupPage";
import InvoiceDetails from "./pages/InvoiceDetails";
import Profile from "./pages/ProfilePage";
import HelpPage from './pages/HelpPage';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from './pages/ContactPage';



function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route element={<Layout />}></Route>
          <Route index element={<HomePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>

          <Route path="/login" element={<Authenticate />}></Route>
          <Route path="/signup" element={<Authenticate />}></Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path='/contact' element={<ContactPage/> }/>
                 
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/invoices" element={<ProtectedRoute />}>
            <Route path="/invoices" element={<InvoicePage />} />
          </Route>
          <Route path="/invoices/:id" element={<ProtectedRoute />}>
            <Route path="/invoices/:id" element={<InvoiceDetails />} />
          </Route>
          <Route path="/projects/:id" element={<ProtectedRoute />}>
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Route>  
          <Route path="/profile" element={<ProtectedRoute />}> 
            <Route path="/profile" element={<Profile />} /> 
          </Route>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
