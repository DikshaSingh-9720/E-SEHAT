import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Welcome, Dr. Preet Kaur</h2>
        <p>📍 Mathura District Hospital • General Physician</p>
        <button className="logout-btn">Logout</button>
      </div>

      {/* Quick Actions */}
      <h3>Quick Actions</h3>
      <div className="quick-actions">
        <div onClick={() => navigate("/appointments")} className="action-card">
          📅 View Appointments
          <p>Check your schedule</p>
        </div>
        <div onClick={() => navigate("/patients")} className="action-card">
          👥 Patient Records
          <p>Access and update health data</p>
        </div>
        <div onClick={() => navigate("/prescriptions")} className="action-card">
          💊 Prescriptions
          <p>Write and manage prescriptions</p>
        </div>
        <div onClick={() => navigate("/messages")} className="action-card">
          💬 Messages
          <p>Communicate with patients</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="appointments-section">
        <h3>📅 Upcoming Appointments</h3>
        <ul>
          <li>
            👤 Aish Kumar — 10:00 AM  
            <span className="tag online">Online</span>
          </li>
          <li>
            👤 Rina Sharma — 11:30 AM  
            <span className="tag offline">In-person</span>
          </li>
          <li>
            👤 Rajesh Singh — 2:00 PM  
            <span className="tag online">Online</span>
          </li>
        </ul>
      </div>

      {/* Patient List */}
      <div className="patient-list">
        <h3>👥 Your Patients</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Visit</th>
              <th>Condition</th>
              <th>Next Appointment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Aish Kumar</td>
              <td>Sep 20, 2025</td>
              <td>Diabetes</td>
              <td>Today, 10:00 AM</td>
            </tr>
            <tr>
              <td>Rina Sharma</td>
              <td>Sep 15, 2025</td>
              <td>High BP</td>
              <td>Today, 11:30 AM</td>
            </tr>
            <tr>
              <td>Rajesh Singh</td>
              <td>Sep 10, 2025</td>
              <td>General Checkup</td>
              <td>Today, 2:00 PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorDashboard;
