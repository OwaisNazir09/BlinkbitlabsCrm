import React, { useState } from "react";
import PageTitle from "../../components/common/PageTitle";


const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([
    { id: 1, name: "Shahzzad Dar", email: "shazzujgr@gmail.com", message: "Need CRM demo", status: "Pending" },
  ]);

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEnquiry = {
      id: enquiries.length + 1,
      ...form,
      status: "Pending",
    };
    setEnquiries([...enquiries, newEnquiry]);
    setForm({ name: "", email: "", message: "" });
  };

  const resolveEnquiry = (id) => {
    setEnquiries(
      enquiries.map((enq) =>
        enq.id === id ? { ...enq, status: "Resolved" } : enq
      )
    );
  };

  const deleteEnquiry = (id) => {
    setEnquiries(enquiries.filter((enq) => enq.id !== id));
  };

  return (
    <div className="p-4">
      <PageTitle title="Enquiries" />
      <h2 className="mb-4">Enquiries</h2>

      {/* Enquiries Table */}
      <div className="card shadow-sm p-3">
        <h5>Enquiry List</h5>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq) => (
              <tr key={enq.id}>
                <td>{enq.id}</td>
                <td>{enq.name}</td>
                <td>{enq.email}</td>
                <td>{enq.message}</td>
                <td>{enq.status}</td>
                <td>
                  {enq.status === "Pending" && (
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => resolveEnquiry(enq.id)}
                    >
                      Resolve
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteEnquiry(enq.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiries;
