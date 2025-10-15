import { Outlet } from "react-router-dom";
import NavBar from "../../Navbar/pages/NavBar";

export default function Layout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="bg-gradient-to-b from-gray-900 to-gray-950">
        <Outlet />
      </main>
    </>
  );
}
