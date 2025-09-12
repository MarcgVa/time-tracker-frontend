import { useEffect, useState } from "react"
import { useLoginMutation } from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const token = useSelector((state) => state.auth.token);


  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }  
  }), [token, navigate];


  const handleUpdate = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData).unwrap();
      dispatch(setCredentials(data));
      navigate('/dashboard');
      
    } catch (err) {
      console.error("Sign failed", err);
    }
  };


  return (
    <div className="form-content">
      <div>
        <h1>Login</h1>
      </div>
      <div className="form-content">
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleUpdate}
            className="form-input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleUpdate}
            className="form-input"
          />

          <div>
            <button className="authBtn">Login</button>
          </div>
          <p className="">
            Need an account?{" "}
            <a href="/auth/signup" className="">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
