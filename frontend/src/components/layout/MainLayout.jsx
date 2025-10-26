// frontend/src/components/layout/MainLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar /> 
      <div
        className="flex-grow-1"
        style={{ marginLeft: "250px", minHeight: "100vh"}}
      >
        {children} 
      </div>
    </div>
  );
};

export default MainLayout;
