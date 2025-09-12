import { NavLink } from "react-router-dom";
import logo from '../../assets/img/logos/TimeTrackerLogo-bgDark-400.png'

import './navbar.css'
export default function NavBar() {

  return (
    <header>
      <div className="nav">
        <div className="navbar">
          <ul className="nav-list">
            <li>
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to="/invoices"
                className="nav-link"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#ffa500" : "#c8c8cb",
                  };
                }}
              >
                Invoices
              </NavLink>
            </li>
          </ul>

          <div className="nav-img">
            <img src={logo} alt="Application Logo" />
          </div>
        </div>
      </div>
    </header>
  );
}
