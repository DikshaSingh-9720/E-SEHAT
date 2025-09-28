import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const PatientDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <h2>{t('dashboard.patientTitle')}</h2>

      <div className="dashboard-grid">
        <button onClick={() => navigate('/consultation')}>
          {t('dashboard.consultation')}
        </button>

        <button onClick={() => navigate('/records')}>
          {t('dashboard.healthRecords')}
        </button>

        <button onClick={() => navigate('/medicine')}>
          {t('dashboard.medicineStock')}
        </button>

        <button onClick={() => navigate('/symptoms')}>
          {t('dashboard.symptomChecker')}
        </button>

        <button onClick={() => navigate('/help')}>
          {t('dashboard.helpSupport')}
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;