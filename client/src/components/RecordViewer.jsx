import React from 'react';
import './RecordViewer.css';
import { useTranslation } from 'react-i18next';

const RecordViewer = ({ records }) => {
  const { t } = useTranslation();

  if (!records || records.length === 0) {
    return <p className="no-records">{t('records.noData')}</p>;
  }

  return (
    <div className="record-viewer">
      <h3>{t('records.title')}</h3>
      {records.map((record, index) => (
        <div key={index} className="record-card">
          <div className="record-header">
            <span>{t('records.date')}: {record.date}</span>
            <span>{t('records.doctor')}: {record.doctor}</span>
          </div>
          <div className="record-body">
            <p><strong>{t('records.diagnosis')}:</strong> {record.diagnosis}</p>
            <p><strong>{t('records.prescription')}:</strong> {record.prescription}</p>
            {record.notes && <p><strong>{t('records.notes')}:</strong> {record.notes}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordViewer;