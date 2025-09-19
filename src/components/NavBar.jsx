import { NavLink } from "react-router-dom";
import logo from '../assets/img/logos/TimeTrackerLogo-bgDark-400.png'
import { useDispatch } from "react-redux";
import { logout } from '../features/auth/authSlice';

export default function NavBar() {
  const dispatch = useDispatch();
  return (
    <header>
      <div className="absolute top-0 left-0 w-full flex items-center px-10 space-y-2 bg-zinc-600 ">
        <div className="">
          <img src={logo} alt="Application Logo" className="size-10 rounded-full" />
        </div>
        <div>
          <ul className="flex justify-between space-x-10 mx-10">
            <li>
              <NavLink
                to="/dashboard"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#ffa500" : "#c8c8cb",
                  };
                }}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/invoices"
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
        </div>
        <button onClick={() => dispatch(logout())}
          className='bg-zinc-700 px-3 mr-10 rounded-full absolute right-0 text-zinc-400 hover:bg-orange-300 hover:text-zinc-950
                      text-sm'
        >
          Logout
        </button>
      </div>
    </header>
  );
}
