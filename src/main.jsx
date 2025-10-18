import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store.js";
import App from "./App.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import NavBar from "./features/Navbar/pages/NavBar.jsx";
import SideBar from "./features/SideBar/pages/SideBar.jsx";
//import './index.css'

if (import.meta.env.VITE_ENV === "production") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
