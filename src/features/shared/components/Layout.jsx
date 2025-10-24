import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <main className="flex bg-gradient-to-b from-gray-900 to-gray-950 mx-auto justify-center">
        <Outlet />
      </main>
    </>
  );
}
