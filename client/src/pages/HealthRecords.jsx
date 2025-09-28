import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import "./HealthRecords.css";

// Patient data
const patients = [
  {
    id: "P12345",
    name: "Rajesh Sharma",
    age: 30,
    gender: "male",
    bloodGroup: "B+",
    contact: "+91-9367853684",
    allergies: "None",
    records: [
      {
        type: "Prescription",
        title: "Blood Pressure Medication",
        date: "2025-09-15",
        doctor: "Dr. Sharma",
        status: "Completed",
        details: "Take one tablet daily after breakfast for 30 days.",
      },
      {
        type: "Lab Test",
        title: "Blood Sugar Test",
        date: "2025-09-10",
        doctor: "Dr. Gupta",
        status: "Pending",
        details: "Fasting blood sugar required. Report expected in 2 days.",
      },
    ],
    consultations: [
      {
        doctor: "Dr. Sharma",
        date: "2025-09-15",
        reason: "High blood pressure & dizziness",
        diagnosis: "Hypertension",
        treatment: "Prescribed blood pressure medication, monitor BP daily",
        followUp: "Next visit after 1 month",
      },
      {
        doctor: "Dr. Gupta",
        date: "2025-09-10",
        reason: "Routine checkup for sugar levels",
        diagnosis: "Pre-diabetes",
        treatment: "Diet modification and exercise recommended",
        followUp: "Follow-up in 2 weeks for blood sugar test",
      },
    ],
  },
  {
    id: "P67890",
    name: "Rohit Verma",
    age: 30,
    gender: "Male",
    bloodGroup: "O+",
    contact: "+91-9876543210",
    allergies: "Penicillin",
    records: [
      {
        type: "Prescription",
        title: "Cholesterol Medication",
        date: "2025-09-12",
        doctor: "Dr. Mehta",
        status: "Completed",
        details: "Take one tablet at night for 30 days",
      },
    ],
    consultations: [
      {
        doctor: "Dr. Mehta",
        date: "2025-09-12",
        reason: "High cholesterol",
        diagnosis: "Hyperlipidemia",
        treatment: "Prescribed Atorvastatin",
        followUp: "Next visit after 1 month",
      },
    ],
  },
];

const HealthRecords = () => {
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id);
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  const filteredRecords = selectedPatient.records.filter((record) =>
    record.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (idx) => {
    setExpandedRecord(expandedRecord === idx ? null : idx);
  };

  return (
    <div className="health-records-container">
      {/* Left Section */}
      <div className="health-records-left">
        {/* Patient Selector */}
        <div className="patient-selector">
          <label>Select Patient:</label>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="health-search-input">
          <FiSearch />
          <input
            type="text"
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Medical Records */}
        {filteredRecords.map((record, idx) => (
          <div key={idx} className="record-card">
            <div className="record-card-header">
              <h3>
                {record.type}: {record.title}
              </h3>
              <button className="toggle-btn" onClick={() => toggleExpand(idx)}>
                {expandedRecord === idx ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>
            <p className="record-info">
              <strong>Doctor:</strong> {record.doctor} | <strong>Date:</strong>{" "}
              {record.date}
            </p>
            <span
              className={`record-status ${
                record.status === "Completed"
                  ? "status-completed"
                  : "status-pending"
              }`}
            >
              {record.status}
            </span>
            {expandedRecord === idx && (
              <p className="record-info">{record.details}</p>
            )}
          </div>
        ))}

        {/* Doctor Visits / Consultations */}
        <h2 className="consultations-heading">Doctor Visits / Consultations</h2>
        <div className="consultations-container">
          {selectedPatient.consultations.map((visit, idx) => (
            <div key={idx} className="consultation-card">
              <h3>Visit with {visit.doctor}</h3>
              <p>
                <strong>Date of Visit:</strong> {visit.date}
              </p>
              <p>
                <strong>Reason:</strong> {visit.reason}
              </p>
              <p>
                <strong>Diagnosis:</strong> {visit.diagnosis}
              </p>
              <p>
                <strong>Treatment Plan:</strong> {visit.treatment}
              </p>
              <p>
                <strong>Follow-up Instructions:</strong> {visit.followUp}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Patient Info */}
      <div className="health-records-right">
        <h2>Patient Info</h2>
        <div className="patient-info">
          <p>
            <strong>Name:</strong> {selectedPatient.name}
          </p>
          <p>
            <strong>Age:</strong> {selectedPatient.age}
          </p>
          <p>
            <strong>Gender:</strong> {selectedPatient.gender}
          </p>
          <p>
            <strong>Patient ID:</strong> {selectedPatient.id}
          </p>
          <p>
            <strong>Blood Group:</strong> {selectedPatient.bloodGroup}
          </p>
          <p>
            <strong>Contact:</strong> {selectedPatient.contact}
          </p>
          <p>
            <strong>Allergies:</strong> {selectedPatient.allergies}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
