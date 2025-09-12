import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSignupMutation } from '../features/auth/authApi';
import { setCredentials } from '../features/auth/authSlice'; 

export default function Signup() {
  const [signup, error] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
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
      console.log(formData)
      const data = await signup(formData).unwrap();
      dispatch(setCredentials(data));
      navigate('/dashboard');
      
    } catch (err) {
      //TODO:: Add Toast Notification for failure
      console.error("Signup failed", err);
    }
  };



  return (
    <div className="form-content">
      <div>
        <h1 className="">Sign Up</h1>
      </div>
      <form onSubmit={handleSubmit} className="">
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleUpdate}
          className="form-input"
        />
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
        <button className="authBtn">Sign Up</button>
        <p className="">
          Already have an account?{" "}
          <a href="/auth/login" className="">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
