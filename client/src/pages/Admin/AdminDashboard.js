import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  // Inline CSS styles
  const dashboardStyles = {
    padding: "3rem",
  };

  const cardStyles = {
    width: "75%",
    padding: "1.5rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    background: "#fff",
  };

  const detailStyles = {
    marginBottom: "1rem", // Add margin at the bottom of each detail
    borderBottom: "1px solid #ccc", // Add a line between details
    paddingBottom: "0.5rem", // Provide some spacing for the line
  };

  return (
    <Layout>
      <div style={dashboardStyles} className="dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div style={cardStyles} className="card">
              <div style={detailStyles}>
                <h5>Admin Name: {auth?.user?.name}</h5>
              </div>
              <div style={detailStyles}>
                <h5>Admin Email: {auth?.user?.email}</h5>
              </div>
              <div style={detailStyles}>
                <h5>Admin Contact: {auth?.user?.phone}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
