import './navbar.css'
import { NavLink } from "react-router-dom";
import logo from '../../assets/img/logos/TimeTrackerLogo-bgDark-400.png'
import { useDispatch } from "react-redux";
import { logout } from '../../features/auth/authSlice';

export default function NavBar() {
  const dispatch = useDispatch();
  return (
    <header>
      <div className="nav">
        <div className="nav-logo">
          <img src={logo} alt="Application Logo" className='nav-img' />
        </div>
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

          <div>
            <button
              className="oval-button"
              onClick={dispatch(logout)}
            >Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}
