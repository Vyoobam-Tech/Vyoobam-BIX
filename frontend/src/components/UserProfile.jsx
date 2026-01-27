import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getMe, logout } from "../services/userService";
import { useNavigate } from "react-router-dom";
import Profile from "../pages/Profile";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    getMe()
      .then((data) => setUser(data))
      .catch(() => navigate("/login"));
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  return (
    <div ref={ref} className="position-relative">
      <button
        className="btn d-flex align-items-center gap-2"
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "transparent",
          border: "none",
          color: "#072141",
          cursor: "pointer",
        }}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <FaUserCircle size={28} />
        )}
        <span className="d-none d-md-inline">
          {user?.name || "User"}
        </span>
      </button>

      {open && (
        <div
          className="card shadow border-0"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            zIndex: 999,
            width: 230,
            borderRadius: 12,
          }}
        >
          <div className="card-body p-3">
            <div className="d-flex gap-2 align-items-center mb-2">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <FaUserCircle size={46} />
              )}
              <div>
                <div className="fw-bold">{user?.name}</div>
                <div className="text-muted" style={{ fontSize: 12 }}>
                  {user?.email}
                </div>
              </div>
            </div>

            <hr />

            <div className="d-flex flex-column gap-2">
              <button
                className="btn w-100 text-white"
                style={{ backgroundColor: "#182235" }}
                onClick={() => setShowProfile(true)}
              >
                View Profile
              </button>

              <button
                className="btn btn-sm btn-outline-danger w-100"
                onClick={handleLogout}
              >
                Logout
              </button>

              <Profile
                show={showProfile}
                onClose={() => setShowProfile(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
