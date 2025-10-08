import React from "react";
import DarkLogo from "../assets/img/logos/TimeTrackerLogo-bgDark.jpg";
import LightLogo from "../assets/img/logos/TimeTrackerLogo.jpg";

export const Logo = () => {
  return (
    <div>
      <img
        alt="mgworks.studio's Time Tracker Logo"
        src={LightLogo}
        className="mx-auto size-30 w-auto dark:hidden"
      />

      <img
        alt="mgworks.studio's Time Tracker Logo"
        src={DarkLogo}
        className="mx-auto size-40 w-auto not-dark:hidden"
      />
    </div>
  );
};
