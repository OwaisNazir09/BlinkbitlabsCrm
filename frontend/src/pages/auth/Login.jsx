import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/Logo.png";

import { useLoginMutation } from "./authService"; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const [login, { isLoading, error }] = useLoginMutation();
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const userData = await login(form).unwrap(); 
    dispatch(setCredentials(userData)); 
    navigate("/dashboard"); 
  } catch (err) {
    console.error(err);
    alert("Login failed!");
  }
};

  return (
    <div className="container-fluid vh-100" style={{ backgroundColor: "#000000ff" }}>
      <div className="row h-100">
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img src={loginImage} alt="Login Graphic" className="img-fluid" style={{ maxHeight: "800px" }} />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg p-5 w-65" style={{ borderRadius: "1rem" }}>
            <h2 className="text-center mb-4">Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control rounded-pill"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control rounded-pill"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 rounded-pill mb-3 shadow-sm" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
              {error && <p className="text-danger mt-2">Invalid credentials</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
