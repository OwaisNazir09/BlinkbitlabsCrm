import React from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const Settings = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-4">Settings</h1>
          <p>Admin settings and profile management.</p>
        </main>
      </div>
    </div>
  );
};

export default Settings;
