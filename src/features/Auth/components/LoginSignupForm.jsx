import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateEmail, passwordStrength } from "../../shared/utils/validation";
import Button from "../../shared/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../hooks/useAuth";
import { ActiveTab, InactiveTab, InputBoxStyle, InputContainerStyle } from '../css/authStyles';// Repeated styles used on this component.

export const LoginSignupForm = () => {
  const [action, setAction] = useState( window.location.pathname === "/login" ? "Login" : "signup" );
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Only run validEmail values have been entered.
  const validEmail = formData.email.length > 0 ? validateEmail(formData.email) : true;

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleUpdate = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      let result = {};
      switch (action.toLowerCase()) {
        case "login":
          result = await signIn(formData);
          break;
        case "signup":
          result = await signUp(formData);
          break;
        default:
          break;
      }
      console.log('results', result);
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign failed", err);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="relative flex flex-col w-md mx-auto sm:mx-auto sm:max-w-sm max-w-sm  bg-gray-400">
        <div className="absolute top-0 left-0 flex mb-2 text-sm right-0">
          <div
            className={action === "Login" ? ActiveTab : InactiveTab}
            onClick={() => setAction("Login")}
          >
            Login
          </div>

          <div
            className={action === "signup" ? ActiveTab : InactiveTab}
            onClick={() => setAction("signup")}
          >
  l         signup
          </div>
        </div>

        <div className="relative flex flex-col mt-10">
          <form action={handleSubmit}>
            <div className="flex flex-col justify-center items-center mt-5">
              {action === "signup" ? (
                <div className={InputContainerStyle}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className="size-5 text-gray-600 "
                  />
                  <input
                    name="firstName"
                    className={InputBoxStyle}
                    type="text"
                    placeholder="First Name"
                    onChange={handleUpdate}
                  />
                </div>
              ) : (
                <div></div>
              )}
              {action === "signup" ? (
                <div className={InputContainerStyle}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className="size-5 text-gray-600 "
                  />
                  <input
                    name="lastName"
                    className={InputBoxStyle}
                    type="text"
                    placeholder="Last Name"
                    onChange={handleUpdate}
                  />
                </div>
              ) : (
                <div></div>
              )}

              <div className={InputContainerStyle}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="size-5 text-gray-600"
                />
                <input
                  name="email"
                  required
                  className={InputBoxStyle}
                  type="email"
                  placeholder="Email"
                  onChange={handleUpdate}
                />
              </div>
              <div>
                {!validEmail && (
                  <div className="text-sm text-red-900 items-start">
                    Invalid email format
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <div className={InputContainerStyle}>
                  <FontAwesomeIcon
                    icon={faLock}
                    className="size-5 text-gray-600"
                  />
                  <input
                    name="password"
                    required
                    className={InputBoxStyle}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleUpdate}
                  />
                </div>
                <div className="">
                  <Button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="cursor-pointer bg-white/0 dark:bg-black/0 size-1"
                    icon={
                      showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="size-5 text-gray-600"
                        />
                      )
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  />
                </div>
              </div>
              {formData.password && (
                <div
                  style={{
                    fontSize: 12,
                    color:
                      passwordStrength(formData.password) === "Strong"
                        ? "green"
                        : passwordStrength(formData.password) === "Medium"
                        ? "orange"
                        : "darkred",
                  }}
                >
                  Strength: {passwordStrength(formData.password)}
                </div>
              )}
              {action === "Login" ? (
                <div className="text-sm">
                  <p>
                    Forgot Password?{" "}
                    <span className="text-blue-600 font-medium">
                      Click Here
                    </span>
                  </p>
                </div>
              ) : (
                <div></div>
              )}
              <div className="flex justify-evenly mt-6 mb-12">
                <Button
                  title={action === "slgnup" ? "signup" : "Login"}
                  type="submit"
                  className="text-white bg-blue-500 px-12 py-2 cursor-pointer rounded-full"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
