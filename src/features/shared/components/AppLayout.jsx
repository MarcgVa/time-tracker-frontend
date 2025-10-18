import { Outlet } from "react-router-dom";

import React from "react";
import SideBar from "../../SideBar/pages/SideBar";

export const AppLayout = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="relative flex justify-center items-center p-6 bg-black/60 rounded-2xl">
        <div
          className="relative flex border rounded-2xl p-1
        min-w-7xl max-w-7xl min-h-200 max-h-200"
        >
          {/* SideBar */}
          <div className="relative flex mr-2 px-2 pb-19 rounded-xl  bg-blue-900/10">
            <SideBar />
          </div>

          {/* App Pages */}
          <div className="relative flex grow-1 overflow-hidden rounded-xl bg-blue-900/10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
