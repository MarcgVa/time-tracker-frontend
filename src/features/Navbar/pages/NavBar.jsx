import { NavLink } from "react-router-dom";
import logo from "../../../assets/img/logos/navbar-logo-dark.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../routes/logoutApi";
import { clearInvoice } from "../../Invoices/routes/invoiceSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../components/Dropdown";
import { logout, selectCurrentToken } from "../../Auth/routes/authSlice";


export default function NavBar() {
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const token = useSelector(selectCurrentToken);

  const handleLogout = async () => {
    await logoutApi().unwrap();
    dispatch(clearInvoice());
    dispatch(logout());
  };
  const dropDownMenuOptions = [
    {
      id: "profile",
      title: "Profile",
      to: "/profile",
    },
    {
      id: "help",
      title: "Help",
      to: "/help",
    },
    {
      id: "about",
      title: "About",
      to: "/about",
    },
    {
      id: "logout",
      title: "Logout",
      to:"/home",
      action: handleLogout,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-999">
      <div className="w-full flex items-center px-10 space-y-2 bg-gray-950 shadow-md shadow-gray-600">
        <div className="">
          <NavLink to="/home">
            <img
              src={logo}
              alt="Application Logo"
              className="size-10 rounded-full"
            />
          </NavLink>
        </div>
        <div className="relative flex items-center justify-between w-full">
          <div className="flex">
            <ul className="flex justify-between space-x-10 mx-10">
              <li>
                <NavLink
                  to={ token ? "/welcome" : "/home"}
                  className={({ isActive }) =>
                    isActive ? "text-blue-400" : "text-gray-300"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400" : "text-gray-300"
                  }
                >
                  Projects
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/invoices"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400" : "text-gray-300"
                  }
                >
                  Invoices
                </NavLink>
              </li>
              <li className="hidden">
                <NavLink
                  to="/company"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400" : "text-gray-300"
                  }
                >
                  Company
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex absolute items-center right-10">
            <Dropdown
              title={
                <FontAwesomeIcon icon={faBars} className="text-blue-300" />
              }
              className="relative"
            >
              {dropDownMenuOptions.map((menu) => (
                <div
                  key={menu.id}
                  className="p-2 cursor-pointer rounded-md text-xs"
                >
                  {menu.action ? (
                    <a onClick={menu.action} href={menu.to} className="hover:text-blue-400">
                      {menu.title}
                    </a>
                  ) : (
                    <a href={menu.to} className="hover:text-blue-400">
                      {menu.title}
                    </a>
                  )}
                </div>
              ))}
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}
