import { NavLink } from "react-router-dom";
import logo from '../assets/img/logos/TimeTrackerLogo-bgDark-400.png'
import { useDispatch } from "react-redux";
import { logout } from '../routes/auth/authSlice';
import { clearInvoice } from "../routes/invoices/invoiceSlice";
import { Dropdown } from "./shared/Dropdown/Dropdown";
import { DropdownItem } from "./shared/Dropdown/DropdownItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


export default function NavBar() {
  const dispatch = useDispatch();
  

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearInvoice());
    localStorage.clear();
  }
  const dropDownList = [<a href="/profile">Profile</a>, <a href="/help">Help</a>, <a onClick={handleLogout}>Logout</a>];

  return (
    <header className="fixed top-0 left-0 right-0 z-999">
      <div className="w-full flex items-center px-10 space-y-2 bg-gray-950 shadow-md shadow-gray-600">
        <div className="">
          <img
            src={logo}
            alt="Application Logo"
            className="size-10 rounded-full"
          />
        </div>
        <div>
          <ul className="flex justify-between space-x-10 mx-10">
            <li>
              <NavLink
                to="/dashboard"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#4aa2ca" : "#c8c8cb",
                  };
                }}
              >
                Projects
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/invoices"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#4aa2ca" : "#c8c8cb",
                  };
                }}
              >
                Invoices
              </NavLink>
            </li>
            <li className="hidden">
              <NavLink
                to="/company"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#4aa2ca" : "#c8c8cb",
                  };
                }}
              >
                Company
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="absolute right-6 mr-6 w-fit rounded-md flex items-center justify-center bg-gray-950">
          <Dropdown
            buttonText={<FontAwesomeIcon icon={faBars} className="text-lg text-gray-300 hover:text-gray-100 cursor-pointer" />}
            content={
              <>
                {dropDownList.map((item) => (
                  <div
                    key={item}
                    className="p-2 hover:bg-gray-200 cursor-pointer rounded-md "
                  >
                    <DropdownItem key={item}>{item}</DropdownItem>
                  </div>
                ))}
              </>
            }
          />
        </div>
      </div>
    </header>
  );
}
