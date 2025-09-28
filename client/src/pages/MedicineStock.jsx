import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { OfflineContext } from '../context/OfflineContext';
import medicineService from '../services/medicineService';
import './MedicineStock.css';

const MedicineStock = () => {
  const { t } = useTranslation();
  const { isOnline } = useContext(OfflineContext);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      if (isOnline) {
        try {
          const result = await medicineService.getAvailableMedicines();
          setMedicines(result);
        } catch (error) {
          console.error('Error fetching medicines:', error);
          setMedicines([]);
        }
      } else {
        // Optionally load from local cache
        setMedicines([]);
      }
      setLoading(false);
    };

    fetchMedicines();
  }, [isOnline]);

  return (
    <div className="medicine-stock-page">
      <h2>{t('medicine.title')}</h2>

      {!isOnline && (
        <p className="offline-banner">{t('medicine.offlineMessage')}</p>
      )}

      {loading ? (
        <p>{t('medicine.loading')}</p>
      ) : medicines.length > 0 ? (
        <table className="medicine-table">
          <thead>
            <tr>
              <th>{t('medicine.name')}</th>
              <th>{t('medicine.quantity')}</th>
              <th>{t('medicine.expiry')}</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med, index) => (
              <tr key={index}>
                <td>{med.name}</td>
                <td>{med.quantity}</td>
                <td>{med.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{t('medicine.noStock')}</p>
      )}
    </div>
  );
};

export default MedicineStock;