import { NavLink } from "react-router-dom";


export default function NavBar() {

  return (
     <header>
      <div className="">
        <ul className="">
          <li className="">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-b-[#ffa500] hover:text-[#ffa500]"
                  : "hover:text-[#ffa500] default: border-transparent"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/invoices"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-b-[#ffa500] hover:text-[#ffa500]"
                  : "hover:text-[#ffa500] default: border-transparent"
              }
            >
              Invoices
            </NavLink>
          </li>
        </ul>
        </div>
    </header>
  );
}
