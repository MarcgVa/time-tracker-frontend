import logo from "../assets/img/logos/TimeTrackerLogo-bgDark.jpg";


export default function Logo() {
  return (
    <div className="flex justify-center items-center h-[900px] ">
      <div className="p-7 flex justify-center items-center">
        <img
          src={logo}
          className="size-50 sm:size-50 md:size-100 lg:size-150"
          alt="Time Tracker"
        />
      </div>
    </div>
  );
}
