import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { OfflineContext } from '../context/OfflineContext';
import recordService from '../services/recordService';
import RecordViewer from '../components/RecordViewer';
import './HealthRecords.css';

const HealthRecords = () => {
  const { t } = useTranslation();
  const { isOnline } = useContext(OfflineContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      if (isOnline) {
        try {
          const result = await recordService.getUserRecords();
          setRecords(result);
        } catch (error) {
          console.error('Error fetching records:', error);
          setRecords([]);
        }
      } else {
        // Optionally load from local cache
        setRecords([]);
      }
      setLoading(false);
    };

    fetchRecords();
  }, [isOnline]);

  return (
    <div className="health-records-page">
      <h2>{t('records.title')}</h2>

      {!isOnline && (
        <p className="offline-banner">{t('records.offlineMessage')}</p>
      )}

      {loading ? (
        <p>{t('records.loading')}</p>
      ) : (
        <RecordViewer records={records} />
      )}
    </div>
  );
};

export default HealthRecords;