import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Resetpassword } from "../services/userService";
const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await Resetpassword(token, password);
      setMessage("Password has been reset successfully.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#c2cdd8ff" }}>
      <form className="card p-4 text-center" style={{ minWidth: 320 }} onSubmit={handleSubmit}>
        <h4 className="mb-3">Reset Password</h4>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3 text-start">
          <label className="form-label">New Password</label>
          <input type="password" className="form-control bg-light" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3 text-start">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control bg-light" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary w-100">Reset Password</button>

        <p className="mt-3 mb-0">
          Remembered? <Link to="/login" className="text-decoration-none text-primary">Sign in</Link>
        </p>
      </form>
    </div>
  );
};
export default ResetPassword;


