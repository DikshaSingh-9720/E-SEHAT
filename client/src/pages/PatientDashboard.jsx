import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const PatientDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Welcome, Aish</h2>
        <p>
          📍 Nagla Chandrabhan, Industrial Area Site-A, Mathura, Uttar Pradesh
        </p>
        <p>ais@gmail.com • 963852741</p>        
      </div>

      {/* Emergency Card */}
      <div className="emergency-card">
        <h3>🚨 Emergency</h3>
        <p>24/7 Emergency Helpline</p>
        <button className="call-btn">📞 Call Now</button>
      </div>

      {/* Quick Actions */}
      <h3>Quick Actions</h3>
      <div className="quick-actions">
        <div onClick={() => navigate("/consultation")} className="action-card">
          📹 Book Consultation
          <p>Connect with doctors online</p>
        </div>
        <div onClick={() => navigate("/records")} className="action-card">
          📑 View Records
          <p>Access your health history</p>
        </div>
        <div onClick={() => navigate("/symptoms")} className="action-card">
          🌿 Check Symptoms
          <p>AI-powered health checker</p>
        </div>
        <div onClick={() => navigate("/medicine")} className="action-card">
          💊 Find Medicine
          <p>Check local pharmacy stock</p>
        </div>
      </div>

      {/* Health Summary */}
      <div className="health-summary">
        <h3>❤️ Health Summary</h3>
        <p>Blood Pressure — <span className="normal">Normal</span></p>
        <p>Blood Sugar — <span className="elevated">Elevated</span></p>
        <p>Weight — <span className="track">On Track</span></p>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>🧪 Blood test results uploaded — 2 hours ago</li>
          <li>💊 Prescription refilled at Nabha Pharmacy — Yesterday</li>
          <li>👨‍⚕️ Consultation with Dr. Preet Kaur — 3 days ago</li>
        </ul>
      </div>
    </div>
  );
};

export default PatientDashboard;
