import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { OfflineContext } from '../context/OfflineContext';
import doctorService from '../services/doctorService';
import AppointmentCard from '../components/AppointmentSelector';
import './Consultation.css';

const Consultation = () => {
  const { t } = useTranslation();
  const { isOnline } = useContext(OfflineContext);
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      if (isOnline && specialty) {
        try {
          const result = await doctorService.getDoctorsBySpecialty(specialty);
          setDoctors(result);
        } catch (error) {
          console.error('Error fetching doctors:', error);
          setDoctors([]);
        }
      } else {
        // Optionally load from local cache
        setDoctors([]);
      }
      setLoading(false);
    };

    fetchDoctors();
  }, [specialty, isOnline]);

  return (
    <div className="consultation-page">
      <h2>{t('consultation.title')}</h2>

      <div className="specialty-selector">
        <label htmlFor="specialty">{t('consultation.selectSpecialty')}</label>
        <select
          id="specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">{t('consultation.choose')}</option>
          <option value="general">{t('specialties.general')}</option>
          <option value="pediatrics">{t('specialties.pediatrics')}</option>
          <option value="gynecology">{t('specialties.gynecology')}</option>
          <option value="dermatology">{t('specialties.dermatology')}</option>
        </select>
      </div>

      {!isOnline && (
        <p className="offline-warning">{t('consultation.offlineMessage')}</p>
      )}

      {loading ? (
        <p>{t('consultation.loading')}</p>
      ) : doctors.length > 0 ? (
        <div className="doctor-list">
          {doctors.map((doc) => (
            <AppointmentCard key={doc.id} doctor={doc} />
          ))}
        </div>
      ) : (
        <p>{t('consultation.noDoctors')}</p>
      )}
    </div>
  );
};

export default Consultation;