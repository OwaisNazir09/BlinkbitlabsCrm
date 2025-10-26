import React from "react";
import PageTitle from "../../components/common/PageTitle";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: 1250 },
    { title: "Active Users", value: 980 },
    { title: "New Signups", value: 45 },
    { title: "Pending Tasks", value: 12 },
  ];

  const recentUsers = [
    { id: 1, name: "Shahzzad Dar", email: "shazzujgr@gmail.com", role: "User" },
    { id: 2, name: "Amit Sharma", email: "amit@gmail.com", role: "Admin" },
    { id: 3, name: "Priya Singh", email: "priya@gmail.com", role: "User" },
  ];

  return (
    <div>
      <PageTitle title="Dashboard" />
      <main className="p-4">
        <h1 className="display-5 fw-bold text-black mb-3">Dashboard</h1>
        <p className="lead text-black mb-4">
          Welcome to the Blinkbit Labs CRM Admin Panel. Here’s a quick overview of your stats and recent activity.
        </p>

        <div className="row mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="col-md-3 mb-3">
              <div className="card shadow-sm text-center p-3">
                <h5 className="card-title">{stat.title}</h5>
                <p className="card-text display-6">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card shadow-sm p-3">
          <h4 className="mb-3">Recent Users</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
