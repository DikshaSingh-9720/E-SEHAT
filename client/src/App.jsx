import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { OfflineProvider } from "./context/OfflineContext";

import Login from "./pages/Login";
import Register from "./components/Register";
import Consultation from "./pages/Consultation";
import HealthRecords from "./pages/HealthRecords"
import MedicineStock from "./pages/MedicineStock";
import SymptomChecker from "./pages/SymptomChecker";
import HelpSupport from "./pages/HealthSupport";

import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import OfflineSync from "./utils/OfflineSync";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./i18n/i18n";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <OfflineProvider>
          <Router>
            <div className="App">
              <Header />
              <OfflineSync />
              
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/patient-dashboard"
                  element={
                    <ProtectedRoute role="patient">
                      <PatientDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/doctor-dashboard"
                  element={
                    <ProtectedRoute role="doctor">
                      <DoctorDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedRoute role="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="/consultation" element={<Consultation />} />
                <Route path="/records" element={<HealthRecords />} />
                <Route path="/medicine" element={<MedicineStock />} />
                <Route path="/symptoms" element={<SymptomChecker />} />
                <Route path="/help" element={<HelpSupport />} />

                {/* fallback route */}
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
              </Routes>

              <Footer />
            </div>
          </Router>
        </OfflineProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;