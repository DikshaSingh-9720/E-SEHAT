import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <h2>Welcome, Admin</h2>

      {/* Quick Admin Actions */}
      <div className="quick-actions">
        <div onClick={() => navigate("/manage-users")} className="action-card">
          👥 Manage Users
        </div>
        <div onClick={() => navigate("/appointments")} className="action-card">
          📅 Manage Appointments
        </div>
        <div onClick={() => navigate("/reports")} className="action-card">
          📊 Reports & Analytics
        </div>
        <div onClick={() => navigate("/settings")} className="action-card">
          ⚙️ System Settings
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
