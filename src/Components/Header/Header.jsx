import React, { useEffect, useState } from "react";

import {
  FiLogOut,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] =
    useState(false);

  const [openLogoutModal, setOpenLogoutModal] =
    useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const storedUser =
      localStorage.getItem("taskUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

 const handleLogout = () => {
  localStorage.removeItem("taskUser");
  navigate("/login", { replace: true }); // replace: true kills the history entry
};

  return (
    <>
      <header className="dashboard-header">
        <h1>
          Task Management Dashboard
        </h1>

        <div className="profile-wrapper">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=3b82f6&color=fff`}
            alt="profile"
            className="profile-img"
            onClick={() =>
              setShowMenu(!showMenu)
            }
          />

          {showMenu && (
            <div className="profile-dropdown">
              <div className="profile-top">
                <h3>{user.name}</h3>

                <p>{user.email}</p>
              </div>

              <div className="dropdown-divider"></div>

              <ul>
                <li
                  className="logout-item"
                  onClick={() =>
                    setOpenLogoutModal(true)
                  }
                >
                  <FiLogOut />

                  <span>Sign Out</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <DeleteTaskModal
        isOpen={openLogoutModal}
        onClose={() =>
          setOpenLogoutModal(false)
        }
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out from your account?"
        confirmText="Sign Out"
        cancelText="Cancel"
        showTaskInfo={false}
      />
    </>
  );
};

export default Header;