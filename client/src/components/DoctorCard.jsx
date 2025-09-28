import React from 'react';

const DoctorCard = ({ doctor }) => {
  if (!doctor) return null;

  const handleConsult = (doctorId) => {
    alert(`Starting consultation with doctor ID: ${doctorId}`);
  };

  return (
    <div style={styles.card}>
      <h2>{doctor.name}</h2>
      <p><strong>Clinic:</strong> {doctor.clinic}</p>
      <p><strong>Specialization:</strong> {doctor.specialization || 'N/A'}</p>
      <p><strong>Consultation Fee:</strong> ${doctor.fee || 'N/A'}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span style={{ color: doctor.isOnline ? 'green' : 'red' }}>
          {doctor.isOnline ? 'Online Now' : 'Offline'}
        </span>
      </p>

      {doctor.isOnline ? (
        <button style={styles.consultBtn} onClick={() => handleConsult(doctor.id)}>
          Start Consultation
        </button>
      ) : (
        <button style={styles.disabledBtn} disabled>
          Not Available
        </button>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 20,
    margin: 10,
    width: 280,
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  consultBtn: {
    marginTop: 10,
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  disabledBtn: {
    marginTop: 10,
    padding: '10px 16px',
    backgroundColor: '#ccc',
    color: '#666',
    border: 'none',
    borderRadius: 4,
    cursor: 'not-allowed',
  },
};

export default DoctorCard;
