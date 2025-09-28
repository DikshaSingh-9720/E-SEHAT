import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import doctorService from '../services/doctorService';
import './AppointmentSelector.css'; // Optional styling

const AppointmentSelector = () => {
  const { t } = useTranslation();
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    if (specialty) {
      doctorService.getDoctorsBySpecialty(specialty).then(setDoctors);
    }
  }, [specialty]);

  const handleConfirm = () => {
    // Simulate booking logic
    setConfirmation(`${t('appointment.confirmed')} ${selectedDoctor} @ ${timeSlot}`);
  };

  return (
    <div className="appointment-selector">
      <h3>{t('appointment.book')}</h3>

      <label>{t('appointment.selectSpecialty')}</label>
      <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
        <option value="">{t('appointment.choose')}</option>
        <option value="general">{t('specialties.general')}</option>
        <option value="pediatrics">{t('specialties.pediatrics')}</option>
        <option value="gynecology">{t('specialties.gynecology')}</option>
        <option value="dermatology">{t('specialties.dermatology')}</option>
      </select>

      {doctors.length > 0 && (
        <>
          <label>{t('appointment.selectDoctor')}</label>
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
            <option value="">{t('appointment.choose')}</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.name}>{doc.name}</option>
            ))}
          </select>

          <label>{t('appointment.selectTime')}</label>
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
            <option value="">{t('appointment.choose')}</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
          </select>

          <button onClick={handleConfirm}>{t('appointment.confirm')}</button>
        </>
      )}

      {confirmation && <p className="confirmation">{confirmation}</p>}
    </div>
  );
};

export default AppointmentSelector;