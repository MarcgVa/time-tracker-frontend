import logo from "../../assets/img/logos/TimeTrackerLogo-bgDark.jpg";

import './logo-css.css'

export default function Logo() {
  return (
    <section className="logo">
      <img src={logo} className="img" alt="Time Tracker" />
    </section>
  );
}
