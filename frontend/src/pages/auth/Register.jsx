import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import registerImage from "../../assets/Logo.png"
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock register, replace with API call
    console.log("Register:", form);
    // Optional: auto-login after register
    dispatch(setCredentials({ id: 2, email: form.email, role: "user" }));
    navigate("/dashboard");
  };

  return (
    <div className="container-fluid vh-100" style={{ backgroundColor: "#000000ff" }}>
      <div className="row h-100">
        {/* Left Image */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img
            src={registerImage}
            alt="Register Graphic"
            className="img-fluid"
            style={{ maxHeight: "600px" }}
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg p-5 w-65" style={{ borderRadius: "1rem" }}>
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>
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
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill mb-3 shadow-sm"
              >
                Register
              </button>
            </form>
            <div className="text-center mt-3">
              <p className="mb-0">
                Already have an account?{" "}
                <Link to="/login" className="text-primary fw-bold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
