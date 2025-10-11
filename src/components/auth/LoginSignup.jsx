import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../routes/auth/authApi";
import { useSignupMutation } from "../../routes/auth/authApi";
import { setCredentials } from "../../routes/auth/authSlice";
import { validateEmail, passwordStrength } from "../../utils/validation";
import Button from "../shared/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash,faEnvelope,faLock,faUser } from "@fortawesome/free-solid-svg-icons";


// Repeated stylings used on the component.
const InputBoxStyle = "w-400px h-50px px-4 py-2 m-2 bg-transparent ";
const InputContainerStyle =
  "w-480px h-80px px-4 py-2 m-3 flex items-center gap-3 bg-gray-500";
const ActiveTab =
  "text-white bg-indigo-600 cursor-pointer grow py-1 text-center";
const InactiveTab =
  "text-gray-700 bg-gray-500 cursor-pointer grow py-1 text-center";


export const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const validEmail =
    formData.email.length > 0 ? validateEmail(formData.email) : true;

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
      const data =
        action === "Login"
          ? await login(formData).unwrap()
          : await signup(formData).unwrap();

      dispatch(setCredentials(data));
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign failed", err);
    }
  };

  

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
      <div className="relative flex flex-col w-md mx-auto sm:mx-auto sm:max-w-sm max-w-sm  bg-gray-400">
        <div className="absolute top-0 left-0 flex mb-2 text-sm right-0">
          <div
            className={action === "Login" ? ActiveTab : InactiveTab}
            onClick={() => setAction("Login")}
          >
            Login
          </div>

          <div
            className={action === "Sign Up" ? ActiveTab : InactiveTab}
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </div>
        </div>

        <div className="relative flex flex-col mt-10">
          <div className="flex flex-col justify-center items-center mt-5">
            {action === "Sign Up" ? (
              <div className={InputContainerStyle}>
                <FontAwesomeIcon icon={faUser} className="size-5 text-gray-600 " />
                <input
                  name="name"
                  className={InputBoxStyle}
                  type="text"
                  placeholder="Name"
                  onChange={handleUpdate}
                />
              </div>
            ) : (
              <div></div>
            )}

            <div className={InputContainerStyle}>
              <FontAwesomeIcon icon={faEnvelope} className="size-5 text-gray-600" />
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
                <FontAwesomeIcon icon={faLock} className="size-5 text-gray-600" />
                <input
                  name="password"
                  required
                  className={InputBoxStyle}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleUpdate}
                  onReturnKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                />
              </div>
              <div className="">
                <Button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="cursor-pointer bg-white/0 dark:bg-black/0 size-1"
                  icon={showPassword ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye} className="size-5 text-gray-600" />}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
                  <span className="text-indigo-600 font-medium">
                    Click Here
                  </span>
                </p>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex justify-evenly mt-6 mb-12">
              <Button
                title={action === "Sign Up" ? "Sign up" : "Login"}
                type="submit"
                className="text-white bg-indigo-600 px-12 py-2 cursor-pointer rounded-full"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
