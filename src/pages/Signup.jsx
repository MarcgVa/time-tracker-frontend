import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../routes/auth/authApi";
import { setCredentials } from "../routes/auth/authSlice";
import DarkLogo from "../assets/img/logos/TimeTrackerLogo-bgDark.jpg";
import LightLogo from "../assets/img/logos/TimeTrackerLogo.jpg";
import Button from "../components/Button";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return "Weak";
  if (score === 3 || score === 4) return "Medium";
  return "Strong";
};

export default function Signup() {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }),
    [token, navigate];

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(emailRegex.test(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const data = await signup({name,email,password}).unwrap();
      dispatch(setCredentials(data));
      navigate("/dashboard");
    } catch (err) {
      //TODO:: Add Toast Notification for failure
      console.error("Signup failed", err);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-40">
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
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  required
                  autoComplete="name"
                  onChange={handleNameChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
                {!emailValid && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    Invalid email format
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mt-2">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                >
                  Password
                </label>
                <div className="test-sm hidden">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div className="mt-2 flex min-w-full items-center gap-2">
                <div className="flex-grow">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    required
                    autoComplete="current-password"
                    onChange={handlePasswordChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                </div>
                <div className="">
                  <Button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    isLoading={false}
                    className="cursor-pointer bg-white/0 dark:bg-black/0"
                    title={showPassword ? "🙈" : "👁️"}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  />
                </div>
              </div>
              {password && (
                <div
                  style={{
                    fontSize: 12,
                    color:
                      passwordStrength(password) === "Strong"
                        ? "green"
                        : passwordStrength(password) === "Medium"
                        ? "orange"
                        : "red",
                  }}
                >
                  Strength: {passwordStrength(password)}
                </div>
              )}
            </div>

            <div>
              <Button
                isLoading={false}
                onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold dark:text-white shadow-xs bg-indigo-600 
                hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500 cursor-pointer"
                title="Sign Up"
              />
            </div>
          </form>
          <p className="mt-10 text-center test-sm/6 text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              SignIn
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
