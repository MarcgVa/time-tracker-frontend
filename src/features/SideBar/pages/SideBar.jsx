import { NavLink } from "react-router-dom";
import { useDispatch} from "react-redux";
import { logout } from "../../Auth/routes/authSlice";
import { useLogoutMutation } from "../routes/logoutApi";
import { clearInvoice } from "../../Invoices/routes/invoiceSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderBlank,
  faHome,
  faClock,
  faUser,
  faFile,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/img/logos/navbar-logo-dark.png";

const navigation = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: faHome,
  },
  {
    title: "Projects",
    to: "/projects",
    icon: faFolderBlank,
  },
  {
    title: "Invoices",
    to: "/invoices",
    icon: faFile,
  },
  {
    title: "Time Tracker",
    to: "/time",
    icon: faClock,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: faUser,
  },
];

export default function SideBar() {
   const dispatch = useDispatch();
    const [logoutApi] = useLogoutMutation();
  
    const handleLogout = async () => {
      const results = await logoutApi().unwrap();
      console.log('results------  ',results);
      dispatch(clearInvoice());
      dispatch(logout());
    };
  
  return (
    <div className="relative rounded-tl-2xl rounded-bl-2xl">
      <div className="relative flex h-16 pr-4 shrink-0 items-center justify-center">
        <img
          alt="Your Company"
          src={logo}
          className="h-10 w-auto justify-center rounded-full"
        />
      </div>
      <div className="pr-4 h-full w-full flex flex-col justify-between">
        <div className="">
          <ul role="list" className="flex flex-1 flex-col gap-y-7 p-1">
            {navigation.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 text-sm flex gap-3"
                      : "text-gray-300 text-sm flex gap-3"
                  }
                  onClick={item.action ? item.action : null}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    aria-hidden="true"
                    className="size-6 shrink-0"
                  />
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <ul role="list" className="flex flex-1 flex-col gap-y-7 p-1">
            <li>
              <NavLink
                to="/home"
                onClick={handleLogout}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400 text-sm flex gap-3"
                    : "text-gray-300 text-sm flex gap-3"
                }
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
