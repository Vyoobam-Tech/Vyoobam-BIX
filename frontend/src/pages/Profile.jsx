import React, { useState, useEffect } from "react";
import { getMe } from "../services/userService";
import API from "../api/axiosInstance";
import { FaUser } from "react-icons/fa";
export default function Profile({ show, onClose }) {
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!show) return;
    getMe()
      .then((data) => setUser(data))
      .catch(() => onClose());
  }, [show, onClose]);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const save = async () => {
    try {
      setSaving(true);
      const res = await API.put(`/users/${user._id}`, user);
      setUser(res.data);
      alert("Profile updated");
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!show) 
    return null;

  if (!user)
    return (
      <div className="modal d-block">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content p-3">Loading...</div>
        </div>
      </div>
    );

  return (
    <div className="modal d-block">
      <div className="modal-dialog modal-sm modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#182235" }}>
            <h5 className="modal-title text-white d-flex align-items-center gap-2">
              <FaUser /> User Profile
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <label className="form-label">Name</label>
            <input
              className="form-control mb-2"
              name="name"
              value={user.name}
              onChange={handleChange}
            />

            <label className="form-label">Email</label>
            <input
              className="form-control mb-2"
              name="email"
              value={user.email}
              onChange={handleChange}
            />

            <label className="form-label">Phone</label>
            <input
              className="form-control"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button
              className="btn text-white"
              style={{ backgroundColor: "#182235" }}
              onClick={save}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

