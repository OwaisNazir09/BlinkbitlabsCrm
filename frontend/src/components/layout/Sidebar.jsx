import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { FaTachometerAlt, FaUsers, FaEnvelope, FaPlus, FaEye } from "react-icons/fa";

// Sidebar routes configuration
const sidebarRoutes = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <FaTachometerAlt />,
    roles: ["Admin", "user"],
  },
  {
    label: "Enquiries",
    icon: <FaEnvelope />,
    roles: ["Admin", "user"],
    subRoutes: [
      { label: "Add Enquiry", path: "/enquiries/add", icon: <FaPlus /> },
      { label: "View Enquiries", path: "/enquiries/view", icon: <FaEye /> },
    ],
  },
  {
    label: "Users",
    path: "/users",
    icon: <FaUsers />,
    roles: ["Admin"],
  },
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const user = JSON.parse(localStorage.getItem("user")); 

  const toggleMenu = (label) => {
    setOpenMenus({ ...openMenus, [label]: !openMenus[label] });
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "250px", height: "100vh", position: "fixed" }}
    >
      <a
        href="/dashboard"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
      >
        <img
          src={logo}
          alt="Blinkbit Labs"
          className="img-fluid"
          style={{ maxHeight: "50px" }}
        />
        <strong className="p-3">BlinkBitLabs</strong>
      </a>
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        {sidebarRoutes
          .filter((route) => route.roles.includes(user?.role))
          .map((route) => (
            <li key={route.label} className="nav-item">
              {route.subRoutes ? (
                <>
                  <div
                    className="nav-link text-dark d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleMenu(route.label)}
                  >
                    <span>{route.icon} {route.label}</span>
                    <span>{openMenus[route.label] ? "▲" : "▼"}</span>
                  </div>

                  {openMenus[route.label] && (
                    <ul className="nav flex-column ms-3">
                      {route.subRoutes.map((sub) => (
                        <li key={sub.label} className="nav-item">
                          <NavLink
                            to={sub.path}
                            className={({ isActive }) =>
                              `nav-link ${isActive ? "active" : "text-dark"}`
                            }
                          >
                            {sub.icon} {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (

                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : "text-dark"}`
                  }
                >
                  {route.icon} {route.label}
                </NavLink>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
