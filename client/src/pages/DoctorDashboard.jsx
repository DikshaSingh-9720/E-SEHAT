import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const DoctorDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <h2>{t('dashboard.doctorTitle')}</h2>

      <div className="dashboard-grid">
        <button onClick={() => navigate('/consultation')}>
          {t('dashboard.manageConsultations')}
        </button>

        <button onClick={() => navigate('/records')}>
          {t('dashboard.patientRecords')}
        </button>

        <button onClick={() => navigate('/medicine')}>
          {t('dashboard.medicineInventory')}
        </button>

        <button onClick={() => navigate('/symptoms')}>
          {t('dashboard.symptomAnalysis')}
        </button>

        <button onClick={() => navigate('/help')}>
          {t('dashboard.support')}
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;