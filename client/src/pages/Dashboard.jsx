import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import { OfflineContext } from '../context/OfflineContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const { isOnline } = useContext(OfflineContext);

  return (
    <div className="dashboard">
      <h2>{t('dashboard.welcome')}, {user?.name || t('dashboard.guest')}</h2>

      {!isOnline && (
        <p className="offline-banner">{t('dashboard.offline')}</p>
      )}

      <div className="dashboard-grid">
        <Link to="/consultation" className="dashboard-card">
          <h3>{t('dashboard.consultation')}</h3>
          <p>{t('dashboard.consultationDesc')}</p>
        </Link>

        <Link to="/records" className="dashboard-card">
          <h3>{t('dashboard.records')}</h3>
          <p>{t('dashboard.recordsDesc')}</p>
        </Link>

        <Link to="/symptoms" className="dashboard-card">
          <h3>{t('dashboard.symptoms')}</h3>
          <p>{t('dashboard.symptomsDesc')}</p>
        </Link>

        <Link to="/medicine" className="dashboard-card">
          <h3>{t('dashboard.medicine')}</h3>
          <p>{t('dashboard.medicineDesc')}</p>
        </Link>

        <Link to="/help" className="dashboard-card">
          <h3>{t('dashboard.help')}</h3>
          <p>{t('dashboard.helpDesc')}</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;